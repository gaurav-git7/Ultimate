// Blynk Configuration
#define BLYNK_TEMPLATE_NAME "smartdustbin"
#define BLYNK_AUTH_TOKEN "cb_iWbE3Ny2siPXwwJAwDjgVYtbzwgfU"
#define BLYNK_TEMPLATE_ID "TMPL3I9sDdv3k"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <BlynkSimpleEsp8266.h>



// WiFi Credentials
const char* ssid = "Gaurav's S23 FE";       // Replace with your WiFi SSID
const char* password = "gaurav3345"; // Replace with your WiFi Password

// Server Configuration
const char* serverHost = "192.168.191.124";  // Replace with your computer's IP address
const int serverPort = 5000;             // Your backend server port
const char* binDataEndpoint = "/bins/";  // Updated to match dashboard endpoint
const char* historyEndpoint = "/bins/";  // Base endpoint for history
const char* testEndpoint = "/bins/test"; // Test endpoint
const String binId = "1328";             // Your bin ID
const char* BIN_LOCATION = "Building 1, Floor 2"; // Location of the bin

// Blynk Variables
#define BLYNK_FILL_LEVEL_VIRTUAL_PIN V1
#define BLYNK_DISTANCE_VIRTUAL_PIN V2
#define BLYNK_BATTERY_VIRTUAL_PIN V3
#define BLYNK_STATUS_VIRTUAL_PIN V0
BlynkTimer blynkTimer;

// Ultrasonic Sensor Pins
#define TRIG_PIN D5
#define ECHO_PIN D6
#define LED_PIN D4  // LED to indicate bin is full

// Bin Configuration
const float binHeight = 30.0; // Height of bin in cm
float fillLevel = 0.0;
int batteryLevel = 100; // Mock battery level
float distance = 0.0;

// Threshold for notifications
const int NOTIFICATION_THRESHOLD = 80; // Fill level percentage to trigger notification
bool notificationSent = false; // Track if notification has been sent

// Debugging
const bool DEBUG_MODE = true;
unsigned long lastSensorReadTime = 0;
int rawDistanceValues[5]; // Store last 5 readings
int currentReadingIndex = 0;

WiFiClient client;
HTTPClient http;

// Function to measure distance using HC-SR04 with better error handling
float getDistance() {
    // Send pulse
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    
    // Reset timeout for reading
    const unsigned long timeout = 30000; // 30ms timeout
    unsigned long startTime = micros();
    
    // Wait for echo to start with timeout
    while (digitalRead(ECHO_PIN) == LOW) {
        if (micros() - startTime > timeout) {
            Serial.println("ERROR: Echo pin never went HIGH - check wiring");
            return binHeight;
        }
    }
    
    // Measure echo duration with timeout
    startTime = micros();
    while (digitalRead(ECHO_PIN) == HIGH) {
        if (micros() - startTime > timeout) {
            Serial.println("ERROR: Echo pin stuck HIGH - check wiring or remove obstacles");
            return binHeight;
        }
    }
    
    // Calculate pulse duration
    unsigned long duration = micros() - startTime;
    
    // Calculate distance in cm
    float distance = duration * 0.0343 / 2;
    
    // Store raw value for debugging
    rawDistanceValues[currentReadingIndex] = distance;
    currentReadingIndex = (currentReadingIndex + 1) % 5;
    
    // Print detailed debug info
    if (DEBUG_MODE) {
        Serial.print("Raw pulse duration (us): ");
        Serial.println(duration);
        Serial.print("Raw calculated distance: ");
        Serial.println(distance);
    }
    
    // Validate reasonable range
    if (distance <= 0 || distance > 400) {
        Serial.println("WARNING: Out of range reading: " + String(distance) + "cm");
        return binHeight; // Return max height for invalid readings
    }
    
    // Cap to bin height
    if (distance > binHeight) {
        distance = binHeight;
    }
    
    return distance;
}

// Function to connect to WiFi and Blynk
void connectToWiFi() {
    Serial.print("Connecting to WiFi...");
    WiFi.begin(ssid, password);

    int attempt = 0;
    while (WiFi.status() != WL_CONNECTED && attempt < 20) {
        Serial.print(".");
        digitalWrite(LED_PIN, !digitalRead(LED_PIN)); // Blink while connecting
        delay(500);
        attempt++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nConnected to WiFi! IP Address: " + WiFi.localIP().toString());
        digitalWrite(LED_PIN, HIGH); // LED ON when connected
        delay(500);
        digitalWrite(LED_PIN, LOW);
        
        // Connect to Blynk
        Blynk.begin(BLYNK_AUTH_TOKEN, ssid, password);
        Serial.println("Connected to Blynk!");
    } else {
        Serial.println("\nFailed to connect to WiFi!");
    }
}

// Test server connection
bool testConnection() {
    String url = "http://" + String(serverHost) + ":" + String(serverPort) + String(testEndpoint);
    
    Serial.print("Testing server connection: ");
    Serial.println(url);
    
    http.begin(client, url);
    int httpCode = http.GET();
    
    if (httpCode > 0) {
        Serial.println("Response code: " + String(httpCode));
        if (httpCode == HTTP_CODE_OK) {
            String payload = http.getString();
            Serial.println("Server response: " + payload);
            http.end();
            return true;
        }
    } else {
        Serial.println("Connection failed: " + http.errorToString(httpCode));
    }
    
    http.end();
    return false;
}

// Function to send bin data to server
void sendDataToServer() {
  // Check if WiFi is connected
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected");
    return;
  }

  // Get current timestamp
  unsigned long currentTime = millis();
  
  // Calculate status based on fill level
  String status = "normal";
  if (fillLevel >= 80) {
    status = "critical";
  } else if (fillLevel >= 50) {
    status = "warning";
  }

  // Prepare JSON data with fields matching dashboard expectations
  DynamicJsonDocument doc(1024);
  doc["binId"] = binId;
  doc["location"] = BIN_LOCATION;
  doc["distance"] = distance;
  doc["fillPercentage"] = fillLevel;
  doc["batteryLevel"] = batteryLevel;
  doc["timestamp"] = currentTime;  // Send current timestamp
  doc["status"] = status;          // Add status field
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  // Create HTTP client
  HTTPClient http;
  
  // Begin HTTP request with updated endpoint
  String url = "http://" + String(serverHost) + ":" + String(serverPort) + String(binDataEndpoint) + String(binId);
  Serial.print("Sending data to: ");
  Serial.println(url);
  
  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  
  // Send PUT request instead of POST to update existing bin data
  int httpCode = http.PUT(jsonData);
  bool success = false;
  
  // Check response
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Server response code: " + String(httpCode));
    Serial.println("Server response: " + payload);
    
    // Parse the response
    DynamicJsonDocument responseDoc(1024);
    DeserializationError error = deserializeJson(responseDoc, payload);
    
    if (!error) {
      // Check for notification alert in response
      if (responseDoc.containsKey("notification")) {
        const char* notificationMessage = responseDoc["notification"]["message"];
        Serial.println("Notification: " + String(notificationMessage));
        
        // Flash LED to indicate notification
        for (int i = 0; i < 5; i++) {
          digitalWrite(LED_PIN, HIGH);
          delay(100);
          digitalWrite(LED_PIN, LOW);
          delay(100);
        }
      }
      
      if (httpCode == 200 || httpCode == 201) {
        success = true;
      }
    }
  } else {
    Serial.println("Error sending data to server. Error: " + String(http.errorToString(httpCode).c_str()));
  }
  
  http.end();
  
  // If there was a problem with the PUT request, try to create the bin with POST
  if (!success && httpCode == HTTP_CODE_NOT_FOUND) {
    Serial.println("Bin not found, trying to create it...");
    
    // Create endpoint
    String createUrl = "http://" + String(serverHost) + ":" + String(serverPort) + "/bins";
    http.begin(client, createUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Send POST request to create bin
    int createCode = http.POST(jsonData);
    
    if (createCode > 0) {
      Serial.println("Create bin response: " + String(createCode));
      String createPayload = http.getString();
      Serial.println("Create response: " + createPayload);
      if (createCode == 200 || createCode == 201) {
        Serial.println("Bin created successfully!");
        success = true;
      }
    } else {
      Serial.println("Failed to create bin. Error: " + String(http.errorToString(createCode).c_str()));
    }
    
    http.end();
  }
  
  // Also send data to history endpoint if the main operation was successful
  if (success) {
    sendHistoryData();
    Serial.println("Data sent successfully!");
  } else {
    Serial.println("Failed to send data after all attempts.");
  }
}

// New function to send history data
void sendHistoryData() {
  if (WiFi.status() != WL_CONNECTED) {
    return;
  }
  
  // Create history entry
  DynamicJsonDocument historyDoc(512);
  historyDoc["timestamp"] = millis();
  historyDoc["fillPercentage"] = fillLevel;
  historyDoc["batteryLevel"] = batteryLevel;
  
  String historyData;
  serializeJson(historyDoc, historyData);
  
  // Create HTTP client
  HTTPClient http;
  
  // History endpoint
  String historyUrl = "http://" + String(serverHost) + ":" + String(serverPort) + 
                      String(historyEndpoint) + String(binId) + "/history";
  
  http.begin(client, historyUrl);
  http.addHeader("Content-Type", "application/json");
  
  // Send POST request to add history entry
  int httpCode = http.POST(historyData);
  
  if (httpCode > 0) {
    Serial.println("History data sent, response code: " + String(httpCode));
  } else {
    Serial.println("Failed to send history data. Error: " + String(http.errorToString(httpCode).c_str()));
  }
  
  http.end();
}

// Send data to Blynk
void sendDataToBlynk() {
  // Update Blynk virtual pins with latest data
  Blynk.virtualWrite(BLYNK_FILL_LEVEL_VIRTUAL_PIN, fillLevel);
  Blynk.virtualWrite(BLYNK_DISTANCE_VIRTUAL_PIN, distance);
  Blynk.virtualWrite(BLYNK_BATTERY_VIRTUAL_PIN, batteryLevel);
  
  // Update status LED on Blynk
  if (fillLevel >= NOTIFICATION_THRESHOLD) {
    Blynk.virtualWrite(BLYNK_STATUS_VIRTUAL_PIN, 255); // Red LED on
    
    // Send Blynk notification if threshold is reached and notification not yet sent
    if (!notificationSent) {
      // Send notification through Blynk event
      String notificationMessage = "⚠ ALERT: Bin #" + String(binId) + " is " + String(fillLevel) + "% full!";
      Blynk.logEvent("bin_full_alert", notificationMessage);
      Serial.println("Blynk notification sent: " + notificationMessage);
      notificationSent = true;
    }
  } else {
    Blynk.virtualWrite(BLYNK_STATUS_VIRTUAL_PIN, 0); // LED off
    
    // Reset notification flag if level drops below threshold
    if (fillLevel < NOTIFICATION_THRESHOLD - 10) { // Hysteresis of 10%
      notificationSent = false;
    }
  }
}

void printSensorDiagnostics() {
    Serial.println("\n===== SENSOR DIAGNOSTICS =====");
    Serial.println("TRIG_PIN (D5) state: " + String(digitalRead(TRIG_PIN)));
    Serial.println("ECHO_PIN (D6) state: " + String(digitalRead(ECHO_PIN)));
    Serial.println("Last 5 raw distance readings:");
    for (int i = 0; i < 5; i++) {
        Serial.print(rawDistanceValues[i]);
        Serial.print("cm, ");
    }
    Serial.println("\n=============================");
}

// Blynk connected callback
BLYNK_CONNECTED() {
  // This function is called when Blynk is connected
  Serial.println("Blynk connected!");
  
  // Sync all virtual pins on connect
  Blynk.syncAll();
}

void setup() {
    Serial.begin(115200);
    delay(1000); // Give time for serial to initialize
    Serial.println("\n\n===== SmartBin System Starting =====");
    Serial.println("Version: 1.3 - Updated Server Integration");
    
    // Initialize pins
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(LED_PIN, OUTPUT);
    
    // Initial state
    digitalWrite(TRIG_PIN, LOW);
    digitalWrite(LED_PIN, LOW);
    
    // Initialize array
    for (int i = 0; i < 5; i++) {
        rawDistanceValues[i] = 0;
    }
    
    // Print pin configuration
    Serial.println("\nPIN CONFIGURATION:");
    Serial.println("TRIG_PIN: D5 (GPIO" + String(TRIG_PIN) + ")");
    Serial.println("ECHO_PIN: D6 (GPIO" + String(ECHO_PIN) + ")");
    Serial.println("LED_PIN: D4 (GPIO" + String(LED_PIN) + ")");
    Serial.println("Bin height: " + String(binHeight) + "cm");
    
    // Connection
    connectToWiFi();
    
    // Test server connection
    Serial.println("\n===== Testing Server Connection =====");
    if (testConnection()) {
        Serial.println("✓ Server connection successful!");
        // Blink LED 3 times to indicate successful connection
        for (int i = 0; i < 3; i++) {
            digitalWrite(LED_PIN, HIGH);
            delay(200);
            digitalWrite(LED_PIN, LOW);
            delay(200);
        }
    } else {
        Serial.println("✗ Server connection failed!");
        Serial.println("Please check server IP and port settings:");
        Serial.println(" - Server IP: " + String(serverHost));
        Serial.println(" - Server Port: " + String(serverPort));
        Serial.println(" - Test endpoint: " + String(testEndpoint));
        
        // Blink LED rapidly 5 times to indicate connection failure
        for (int i = 0; i < 5; i++) {
            digitalWrite(LED_PIN, HIGH);
            delay(100);
            digitalWrite(LED_PIN, LOW);
            delay(100);
        }
    }
    
    // Setup timer for Blynk
    blynkTimer.setInterval(10000L, sendDataToBlynk); // Send data to Blynk every 10 seconds
    
    Serial.println("Setup complete!");
}

void loop() {
    // Run Blynk
    Blynk.run();
    blynkTimer.run();
    
    // Check WiFi connection
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi disconnected, reconnecting...");
        connectToWiFi();
    }
    
    // Print diagnostics every 2 minutes
    if (millis() - lastSensorReadTime >= 120000 || lastSensorReadTime == 0) {
        printSensorDiagnostics();
        lastSensorReadTime = millis();
    }
    
    // Read sensor
    Serial.println("\nTaking distance measurement...");
    distance = getDistance();
    fillLevel = constrain(((binHeight - distance) / binHeight) * 100, 0, 100);
    
    Serial.println("===== Bin Status =====");
    Serial.println("Distance: " + String(distance) + "cm");
    Serial.println("Fill level: " + String(fillLevel) + "%");
    Serial.println("Battery: " + String(batteryLevel) + "%");
    Serial.println("======================");
    
    // Indicate fill level with LED
    if (fillLevel >= NOTIFICATION_THRESHOLD) {
        digitalWrite(LED_PIN, HIGH); // LED ON when bin is full
    } else {
        digitalWrite(LED_PIN, LOW);
    }
    
    // Send data every 15 seconds
    static unsigned long lastSendTime = 0;
    if (millis() - lastSendTime >= 15000 || lastSendTime == 0) {
        lastSendTime = millis();
        sendDataToServer();
    }
    
    delay(5000); // Measure every 5 seconds
}