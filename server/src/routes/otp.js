import express from 'express';
import { body } from 'express-validator';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Sync verification status after Supabase Auth verification
// This updates our custom users table when Supabase Auth verifies email/phone
router.post('/sync-verification', authenticateToken, asyncHandler(async (req, res) => {
  const { type, identifier } = req.body;
  const userId = req.userId;

  if (!['email', 'phone'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Must be "email" or "phone"' });
  }

  // Get user profile
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('user_id')
    .eq('id', userId)
    .single();

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  // Get user from users table
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('email, phone')
    .eq('id', profile.user_id)
    .single();

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update verification status
  const updates = {};
  
  if (type === 'email' && user.email === identifier) {
    updates.email_verified = true;
    updates.email_verified_at = new Date().toISOString();
  } else if (type === 'phone') {
    // Format phone for comparison
    const formattedPhone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
    if (user.phone === formattedPhone || user.phone === identifier) {
      updates.phone_verified = true;
      updates.phone = formattedPhone;
    }
  }

  if (Object.keys(updates).length > 0) {
    await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', profile.user_id);
  }

  res.json({
    message: 'Verification status synced successfully',
    verified: true
  });
}));

export default router;
