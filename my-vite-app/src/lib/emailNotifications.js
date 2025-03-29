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
 * Send a bin status email notification using Cloud Functions
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
    
    // Create a document in the 'emailNotifications' collection
    // This will trigger a Cloud Function to send the actual email
    await addDoc(collection(db, "emailNotifications"), {
      userId,
      binId: binData.binId,
      fillPercentage: binData.fillPercentage,
      location: binData.location || "Unknown location",
      type: "binStatus",
      status: binData.status,
      timestamp: serverTimestamp(),
      sent: false
    });
    
    console.log("Email notification queued for bin status update");
    return true;
  } catch (error) {
    console.error("Error queueing email notification:", error);
    return false;
  }
};

/**
 * Send a bin overflow alert email
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
    
    // Create a document in the 'emailNotifications' collection
    await addDoc(collection(db, "emailNotifications"), {
      userId,
      binId: binData.binId,
      fillPercentage: binData.fillPercentage,
      location: binData.location || "Unknown location",
      type: "binOverflow",
      urgent: binData.fillPercentage >= 90, // Mark as urgent if very full
      timestamp: serverTimestamp(),
      sent: false
    });
    
    console.log("Bin overflow email notification queued");
    return true;
  } catch (error) {
    console.error("Error queueing overflow email notification:", error);
    return false;
  }
};

/**
 * Send a collection scheduled email notification
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
    
    // Create a document in the 'emailNotifications' collection
    await addDoc(collection(db, "emailNotifications"), {
      userId,
      binId,
      location: location || "Unknown location",
      scheduledDate: scheduledDate || new Date(),
      type: "collectionScheduled",
      timestamp: serverTimestamp(),
      sent: false
    });
    
    console.log("Collection scheduled email notification queued");
    return true;
  } catch (error) {
    console.error("Error queueing collection email notification:", error);
    return false;
  }
}; 