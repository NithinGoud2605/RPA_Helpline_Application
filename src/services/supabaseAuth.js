import { supabase } from '../config/supabase';
import { api } from './api';

/**
 * Supabase Auth OTP Service
 * Uses Supabase's built-in OTP authentication
 */

/**
 * Send OTP to email using Supabase Auth
 */
export async function sendEmailOTP(email) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Don't create new user, just send OTP
        emailRedirectTo: undefined
      }
    });

    if (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
}

/**
 * Verify email OTP using Supabase Auth
 */
export async function verifyEmailOTP(email, otp) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });

    if (error) {
      throw new Error(error.message || 'Invalid or expired OTP');
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
}

/**
 * Send OTP to phone using Supabase Auth
 */
export async function sendPhoneOTP(phone) {
  try {
    // Ensure phone has country code
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    const { data, error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        shouldCreateUser: false
      }
    });

    if (error) {
      // In test mode, Supabase might return an error but OTP is still generated
      // Check Supabase Dashboard → Authentication → Logs for the OTP
      if (error.message?.includes('test') || error.message?.includes('SMS')) {
        throw new Error('SMS not configured. Check Supabase Dashboard → Authentication → Logs for OTP code (Test Mode).');
      }
      throw new Error(error.message || 'Failed to send SMS OTP. Enable Test Mode in Supabase Dashboard for free OTP.');
    }

    return { 
      success: true, 
      data,
      // In test mode, show helpful message
      testMode: process.env.NODE_ENV === 'development' ? 'Check Supabase Dashboard → Authentication → Logs for OTP' : undefined
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Verify phone OTP using Supabase Auth
 */
export async function verifyPhoneOTP(phone, otp) {
  try {
    // Ensure phone has country code
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms'
    });

    if (error) {
      throw new Error(error.message || 'Invalid or expired OTP');
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
}

/**
 * Resend OTP (email or phone)
 */
export async function resendOTP(type, identifier) {
  try {
    let formattedIdentifier = identifier;
    
    if (type === 'phone') {
      formattedIdentifier = identifier.startsWith('+') ? identifier : `+91${identifier}`;
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      [type]: formattedIdentifier,
      options: {
        shouldCreateUser: false
      }
    });

    if (error) {
      throw new Error(error.message || 'Failed to resend OTP');
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
}

/**
 * Update verification status in backend after Supabase Auth verification
 * This syncs Supabase Auth verification with our custom users table
 */
export async function syncVerificationStatus(type, identifier) {
  try {
    return await api.post('/otp/sync-verification', { type, identifier });
  } catch (error) {
    // Don't throw - syncing is not critical
    console.warn('Failed to sync verification status:', error);
    return { success: false };
  }
}

