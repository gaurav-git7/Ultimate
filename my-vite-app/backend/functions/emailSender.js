const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Configure nodemailer with your email service provider details
// For production, you should store these in Firebase environment config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Get user's email from their userId
async function getUserEmail(userId) {
  try {
    const user = await admin.auth().getUser(userId);
    return user.email;
  } catch (error) {
    console.error('Error fetching user email:', error);
    return null;
  }
}

// Process the email notification queue
exports.processEmailNotifications = functions.firestore
  .document('emailNotifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    try {
      const notificationData = snapshot.data();
      
      // Skip if already sent (shouldn't happen on creation, but just in case)
      if (notificationData.sent) {
        console.log('Notification already sent, skipping:', context.params.notificationId);
        return null;
      }
      
      // Get the user's email
      const email = await getUserEmail(notificationData.userId);
      if (!email) {
        console.error('Could not find email for user:', notificationData.userId);
        await snapshot.ref.update({ 
          error: 'User email not found',
          processedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return null;
      }
      
      // Prepare email content based on notification type
      let mailOptions = {
        from: `"Smart Bin System" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
        to: email
      };
      
      // Handle different notification types
      switch (notificationData.type) {
        case 'binOverflow':
          mailOptions.subject = `🚨 ALERT: Bin #${notificationData.binId} is Overflowing!`;
          mailOptions.html = `
            <h2>Smart Bin Overflow Alert</h2>
            <p>Your bin at <strong>${notificationData.location}</strong> requires immediate attention.</p>
            <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 10px; margin: 15px 0;">
              <p style="color: #721c24; font-weight: bold;">Current fill level: ${notificationData.fillPercentage}%</p>
            </div>
            <p>Please schedule a collection as soon as possible.</p>
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #dc3545; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
              View Dashboard
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
              This is an automated message from your Smart Bin Monitoring System.
            </p>
          `;
          break;
          
        case 'binStatus':
          mailOptions.subject = `Smart Bin Status Update: Bin #${notificationData.binId}`;
          
          // Determine status color
          let statusColor = '#28a745'; // green for normal
          if (notificationData.status === 'warning') {
            statusColor = '#ffc107'; // yellow for warning
          } else if (notificationData.status === 'critical') {
            statusColor = '#dc3545'; // red for critical
          }
          
          mailOptions.html = `
            <h2>Smart Bin Status Update</h2>
            <p>Your bin at <strong>${notificationData.location}</strong> has been updated:</p>
            <div style="border: 1px solid #dee2e6; border-radius: 5px; padding: 15px; margin: 15px 0;">
              <p><strong>Fill Level:</strong> <span style="color: ${statusColor};">${notificationData.fillPercentage}%</span></p>
              <p><strong>Status:</strong> <span style="color: ${statusColor};">${notificationData.status.toUpperCase()}</span></p>
              <p><strong>Updated:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
              View Dashboard
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
              This is an automated message from your Smart Bin Monitoring System.
            </p>
          `;
          break;
          
        case 'collectionScheduled':
          const scheduledDate = notificationData.scheduledDate.toDate().toLocaleString();
          mailOptions.subject = `Collection Scheduled for Bin #${notificationData.binId}`;
          mailOptions.html = `
            <h2>Waste Collection Scheduled</h2>
            <p>A collection has been scheduled for your bin at <strong>${notificationData.location}</strong>.</p>
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; padding: 15px; margin: 15px 0;">
              <p style="color: #155724;"><strong>Scheduled Time:</strong> ${scheduledDate}</p>
              <p style="color: #155724;"><strong>Bin ID:</strong> ${notificationData.binId}</p>
            </div>
            <p>Please ensure the bin is accessible for collection.</p>
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #28a745; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
              View Dashboard
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
              This is an automated message from your Smart Bin Monitoring System.
            </p>
          `;
          break;
          
        default:
          console.log('Unknown notification type:', notificationData.type);
          await snapshot.ref.update({ 
            error: `Unknown notification type: ${notificationData.type}`,
            processedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          return null;
      }
      
      // Send the email
      await transporter.sendMail(mailOptions);
      
      // Update the notification status
      await snapshot.ref.update({
        sent: true,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`Email sent successfully for notification: ${context.params.notificationId}`);
      return null;
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Update the notification with error information
      await snapshot.ref.update({
        error: error.message,
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return null;
    }
  });

// Daily report email
exports.sendDailyReports = functions.pubsub.schedule('0 7 * * *') // Every day at 7 AM
  .timeZone('America/New_York')
  .onRun(async (context) => {
    try {
      // Get all users
      const usersSnapshot = await admin.firestore().collection('users').get();
      
      for (const userDoc of usersSnapshot.docs) {
        const user = userDoc.data();
        
        // Skip users who don't want daily reports
        if (user.preferences?.notifications?.dailyReports === false) {
          continue;
        }
        
        // Get user's bins
        const binsSnapshot = await admin.firestore()
          .collection('bins')
          .where('owner', '==', userDoc.id)
          .get();
        
        // Skip if user has no bins
        if (binsSnapshot.empty) {
          continue;
        }
        
        // Get user's email
        const email = await getUserEmail(userDoc.id);
        if (!email) continue;
        
        // Compile bin status data
        let binStatusHtml = '';
        let criticalBinsCount = 0;
        
        for (const binDoc of binsSnapshot.docs) {
          const bin = binDoc.data();
          
          // Get latest bin data
          const binDataSnapshot = await admin.firestore()
            .collection('binData')
            .where('binId', '==', bin.binId)
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();
            
          if (!binDataSnapshot.empty) {
            const binData = binDataSnapshot.docs[0].data();
            const statusColor = binData.fillPercentage >= 80 ? '#dc3545' : 
                               binData.fillPercentage >= 50 ? '#ffc107' : '#28a745';
                               
            if (binData.fillPercentage >= 80) criticalBinsCount++;
            
            binStatusHtml += `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${bin.binId}</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${bin.location || 'Unknown'}</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <span style="color: ${statusColor};">${binData.fillPercentage}%</span>
                </td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${new Date(binData.timestamp).toLocaleString()}</td>
              </tr>
            `;
          }
        }
        
        // Prepare and send email
        const mailOptions = {
          from: `"Smart Bin System" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
          to: email,
          subject: `Smart Bin Daily Report - ${criticalBinsCount > 0 ? `${criticalBinsCount} Critical Bins` : 'All Normal'}`,
          html: `
            <h2>Smart Bin Daily Status Report</h2>
            <p>Here's the current status of your waste bins as of ${new Date().toLocaleString()}:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Bin ID</th>
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Location</th>
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Fill Level</th>
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                ${binStatusHtml}
              </tbody>
            </table>
            
            ${criticalBinsCount > 0 ? `
              <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 10px; margin: 15px 0;">
                <p style="color: #721c24; font-weight: bold;">⚠️ You have ${criticalBinsCount} bins requiring immediate attention!</p>
              </div>
            ` : `
              <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; padding: 10px; margin: 15px 0;">
                <p style="color: #155724; font-weight: bold;">✅ All bins are at normal levels.</p>
              </div>
            `}
            
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
              View Dashboard
            </a>
            
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
              This is an automated daily report from your Smart Bin Monitoring System.<br>
              To unsubscribe from these reports, update your notification preferences in your account settings.
            </p>
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`Daily report sent to ${email}`);
      }
      
      return null;
    } catch (error) {
      console.error('Error sending daily reports:', error);
      return null;
    }
  }); 