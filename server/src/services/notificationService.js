// Centralized Notification Service
// Handles all notification creation across the application

import { supabaseAdmin } from '../config/supabase.js';
import { NOTIFICATION_TYPES } from '../config/constants.js';

/**
 * Create a notification in the database
 * @param {Object} params - Notification parameters
 * @param {string} params.userId - User ID to receive the notification
 * @param {string} params.type - Notification type from NOTIFICATION_TYPES
 * @param {string} params.title - Notification title
 * @param {string} params.content - Notification content/message
 * @param {string} [params.actionUrl] - URL to navigate when clicked
 * @param {string} [params.actionText] - Button text for action
 * @param {string} [params.referenceType] - Type of referenced item (project, job, message, etc.)
 * @param {string} [params.referenceId] - ID of the referenced item
 * @param {string} [params.fromUserId] - ID of the user who triggered the notification
 */
export async function createNotification({
  userId,
  type,
  title,
  content,
  actionUrl,
  actionText,
  referenceType,
  referenceId,
  fromUserId
}) {
  try {
    const { error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: userId,
        notification_type: type,
        title,
        content,
        action_url: actionUrl,
        action_text: actionText,
        reference_type: referenceType,
        reference_id: referenceId,
        from_user_id: fromUserId
      });

    if (error) {
      console.error('Create notification error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Create notification error:', error);
    return { success: false, error };
  }
}

/**
 * Notify project/job owner when someone applies
 * @param {Object} params
 * @param {string} params.ownerId - Project/job owner's profile ID
 * @param {string} params.applicantId - Applicant's profile ID
 * @param {string} params.itemId - Project or job ID
 * @param {string} params.itemType - 'project' or 'job'
 * @param {string} params.itemTitle - Title of the project or job
 */
export async function notifyNewApplication({
  ownerId,
  applicantId,
  itemId,
  itemType,
  itemTitle
}) {
  // Get applicant info
  const { data: applicant } = await supabaseAdmin
    .from('profiles')
    .select('full_name')
    .eq('id', applicantId)
    .single();

  const applicantName = applicant?.full_name || 'Someone';
  const itemLabel = itemType === 'project' ? 'project' : 'job posting';

  return createNotification({
    userId: ownerId,
    type: NOTIFICATION_TYPES.NEW_APPLICATION,
    title: `New Application Received`,
    content: `${applicantName} has applied to your ${itemLabel}: "${itemTitle}"`,
    actionUrl: `/${itemType}s/${itemId}/applications`,
    actionText: 'View Application',
    referenceType: itemType,
    referenceId: itemId,
    fromUserId: applicantId
  });
}

/**
 * Notify applicant when their application status changes
 * @param {Object} params
 * @param {string} params.applicantId - Applicant's profile ID
 * @param {string} params.status - New status (viewed, shortlisted, accepted, rejected, etc.)
 * @param {string} params.itemId - Project or job ID
 * @param {string} params.itemType - 'project' or 'job'
 * @param {string} params.itemTitle - Title of the project or job
 * @param {string} params.fromUserId - User who changed the status
 */
export async function notifyApplicationStatusChange({
  applicantId,
  status,
  itemId,
  itemType,
  itemTitle,
  fromUserId
}) {
  // Map status to notification type and message
  const statusMap = {
    viewed: {
      type: NOTIFICATION_TYPES.APPLICATION_VIEWED,
      title: 'Application Viewed',
      message: `Your application for "${itemTitle}" has been viewed`
    },
    reviewed: {
      type: NOTIFICATION_TYPES.APPLICATION_STATUS,
      title: 'Application Reviewed',
      message: `Your application for "${itemTitle}" has been reviewed`
    },
    shortlisted: {
      type: NOTIFICATION_TYPES.APPLICATION_SHORTLISTED,
      title: 'Application Shortlisted',
      message: `Congratulations! Your application for "${itemTitle}" has been shortlisted`
    },
    interview: {
      type: NOTIFICATION_TYPES.APPLICATION_SHORTLISTED,
      title: 'Interview Scheduled',
      message: `Great news! You've been selected for an interview for "${itemTitle}"`
    },
    accepted: {
      type: NOTIFICATION_TYPES.APPLICATION_ACCEPTED,
      title: 'Application Accepted',
      message: `Congratulations! Your application for "${itemTitle}" has been accepted`
    },
    offer: {
      type: NOTIFICATION_TYPES.APPLICATION_ACCEPTED,
      title: 'Offer Extended',
      message: `You have received an offer for "${itemTitle}"`
    },
    phone_screen: {
      type: NOTIFICATION_TYPES.APPLICATION_SHORTLISTED,
      title: 'Phone Screen Scheduled',
      message: `A phone screen has been scheduled for "${itemTitle}"`
    },
    technical_round: {
      type: NOTIFICATION_TYPES.APPLICATION_SHORTLISTED,
      title: 'Technical Round Scheduled',
      message: `A technical round has been scheduled for "${itemTitle}"`
    },
    rejected: {
      type: NOTIFICATION_TYPES.APPLICATION_REJECTED,
      title: 'Application Update',
      message: `Your application for "${itemTitle}" was not selected this time`
    },
    withdrawn: {
      type: NOTIFICATION_TYPES.APPLICATION_STATUS,
      title: 'Application Withdrawn',
      message: `Your application for "${itemTitle}" has been withdrawn`
    }
  };

  const statusInfo = statusMap[status];
  
  // Don't send notification for pending or unknown statuses
  if (!statusInfo) {
    return { success: false, reason: 'No notification needed for this status' };
  }

  return createNotification({
    userId: applicantId,
    type: statusInfo.type,
    title: statusInfo.title,
    content: statusInfo.message,
    actionUrl: `/applications`,
    actionText: 'View Application',
    referenceType: itemType,
    referenceId: itemId,
    fromUserId
  });
}

/**
 * Notify user when they receive a new message
 * @param {Object} params
 * @param {string} params.recipientId - Message recipient's profile ID
 * @param {string} params.senderId - Message sender's profile ID
 * @param {string} params.conversationId - Conversation ID
 * @param {string} params.messagePreview - First 100 chars of message
 */
export async function notifyNewMessage({
  recipientId,
  senderId,
  conversationId,
  messagePreview
}) {
  // Get sender info
  const { data: sender } = await supabaseAdmin
    .from('profiles')
    .select('full_name')
    .eq('id', senderId)
    .single();

  const senderName = sender?.full_name || 'Someone';

  return createNotification({
    userId: recipientId,
    type: NOTIFICATION_TYPES.NEW_MESSAGE,
    title: `New Message from ${senderName}`,
    content: messagePreview || 'You have a new message',
    actionUrl: `/messages?conversation=${conversationId}`,
    actionText: 'View Message',
    referenceType: 'message',
    referenceId: conversationId,
    fromUserId: senderId
  });
}

/**
 * Notify user when they receive a new review
 * @param {Object} params
 * @param {string} params.revieweeId - User being reviewed
 * @param {string} params.reviewerId - User who wrote the review
 * @param {number} params.rating - Rating given (1-5)
 * @param {string} params.reviewId - Review ID
 */
export async function notifyNewReview({
  revieweeId,
  reviewerId,
  rating,
  reviewId
}) {
  // Get reviewer info
  const { data: reviewer } = await supabaseAdmin
    .from('profiles')
    .select('full_name')
    .eq('id', reviewerId)
    .single();

  const reviewerName = reviewer?.full_name || 'Someone';

  return createNotification({
    userId: revieweeId,
    type: NOTIFICATION_TYPES.NEW_REVIEW,
    title: `New ${rating}-Star Review`,
    content: `${reviewerName} left you a ${rating}-star review`,
    actionUrl: `/profile`,
    actionText: 'View Review',
    referenceType: 'review',
    referenceId: reviewId,
    fromUserId: reviewerId
  });
}

/**
 * Notify user when their profile is verified
 * @param {Object} params
 * @param {string} params.userId - User whose profile was verified
 * @param {string} params.badgeType - Type of verification badge
 */
export async function notifyProfileVerified({
  userId,
  badgeType
}) {
  return createNotification({
    userId,
    type: NOTIFICATION_TYPES.PROFILE_VERIFIED,
    title: 'Profile Verified',
    content: `Congratulations! Your profile has been verified with a ${badgeType || 'verified'} badge`,
    actionUrl: '/profile',
    actionText: 'View Profile',
    referenceType: 'profile',
    referenceId: userId
  });
}

// Export all functions as a service object for convenience
export const NotificationService = {
  create: createNotification,
  notifyNewApplication,
  notifyApplicationStatusChange,
  notifyNewMessage,
  notifyNewReview,
  notifyProfileVerified
};

export default NotificationService;


