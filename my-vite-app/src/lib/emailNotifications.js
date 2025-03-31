import { getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Send email verification to the currently logged in user
 * @returns {Promise<boolean>} Success status
 */
export const sendVerificationEmail = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error("No user is currently logged in");
      return false;
    }
    
    await sendEmailVerification(user);
    console.log("Verification email sent to", user.email);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

/**
 * Send password reset email to a specific email address
 * @param {string} email The email address to send the reset link to
 * @returns {Promise<boolean>} Success status
 */
export const sendPasswordReset = async (email) => {
  try {
    if (!email) {
      console.error("Email address is required");
      return false;
    }
    
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to", email);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

/**
 * Send a bin status email notification using Firebase
 * @param {string} userId The user ID to send the notification to
 * @param {object} binData The bin data object
 * @returns {Promise<boolean>} Success status
 */
export const sendBinStatusEmail = async (userId, binData) => {
  try {
    if (!userId || !binData) {
      console.error("User ID and bin data are required");
      return false;
    }

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.error("No user email found");
      return false;
    }

    // Add email notification to Firestore
    await addDoc(collection(db, "mail"), {
      to: user.email,
      message: {
        subject: `Bin Status Report - Bin ${binData.binId}`,
        html: `
          <h2>Bin Status Report</h2>
          <p>Here's the current status of your bin:</p>
          <ul>
            <li><strong>Bin ID:</strong> ${binData.binId}</li>
            <li><strong>Location:</strong> ${binData.location || "Unknown location"}</li>
            <li><strong>Fill Level:</strong> ${binData.fillPercentage}%</li>
            <li><strong>Status:</strong> ${binData.status}</li>
            <li><strong>Battery Level:</strong> ${binData.batteryLevel}%</li>
            <li><strong>Distance to Waste:</strong> ${binData.distance}cm</li>
          </ul>
          <p>Report generated at: ${new Date().toLocaleString()}</p>
        `,
      },
      createdAt: serverTimestamp()
    });

    console.log("Status email notification queued for", user.email);
    return true;
  } catch (error) {
    console.error("Error sending status email:", error);
    return false;
  }
};

/**
 * Send a bin overflow alert email using Firebase
 * @param {string} userId The user ID to send the notification to
 * @param {object} binData The bin data object
 * @returns {Promise<boolean>} Success status
 */
export const sendBinOverflowEmail = async (userId, binData) => {
  try {
    if (!userId || !binData) {
      console.error("User ID and bin data are required");
      return false;
    }

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.error("No user email found");
      return false;
    }

    // Add email notification to Firestore
    await addDoc(collection(db, "mail"), {
      to: user.email,
      message: {
        subject: `⚠️ URGENT: Bin Overflow Alert - Bin ${binData.binId}`,
        html: `
          <h2 style="color: #ff0000;">⚠️ Bin Overflow Alert!</h2>
          <p>Your bin requires immediate attention:</p>
          <ul>
            <li><strong>Bin ID:</strong> ${binData.binId}</li>
            <li><strong>Location:</strong> ${binData.location || "Unknown location"}</li>
            <li><strong>Current Fill Level:</strong> ${binData.fillPercentage}%</li>
            <li><strong>Status:</strong> OVERFLOW ALERT</li>
          </ul>
          <p>Alert generated at: ${new Date().toLocaleString()}</p>
          <p>Please take immediate action to prevent overflow issues.</p>
        `,
      },
      createdAt: serverTimestamp()
    });

    console.log("Overflow alert email queued for", user.email);
    return true;
  } catch (error) {
    console.error("Error sending overflow alert email:", error);
    return false;
  }
};

/**
 * Send a collection scheduled email notification using Firebase
 * @param {string} userId The user ID to send the notification to
 * @param {string} binId The bin ID
 * @param {string} location The bin location
 * @param {Date} scheduledDate The scheduled collection date
 * @returns {Promise<boolean>} Success status
 */
export const sendCollectionScheduledEmail = async (userId, binId, location, scheduledDate) => {
  try {
    if (!userId || !binId) {
      console.error("User ID and bin ID are required");
      return false;
    }

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.error("No user email found");
      return false;
    }

    // Add email notification to Firestore
    await addDoc(collection(db, "mail"), {
      to: user.email,
      message: {
        subject: `Collection Scheduled - Bin ${binId}`,
        html: `
          <h2>Bin Collection Scheduled</h2>
          <p>A collection has been scheduled for your bin:</p>
          <ul>
            <li><strong>Bin ID:</strong> ${binId}</li>
            <li><strong>Location:</strong> ${location || "Unknown location"}</li>
            <li><strong>Scheduled Date:</strong> ${scheduledDate.toLocaleString()}</li>
          </ul>
          <p>Notification sent at: ${new Date().toLocaleString()}</p>
          <p>The collection team will arrive at the scheduled time.</p>
        `,
      },
      createdAt: serverTimestamp()
    });

    console.log("Collection scheduled email queued for", user.email);
    return true;
  } catch (error) {
    console.error("Error sending collection scheduled email:", error);
    return false;
  }
}; 