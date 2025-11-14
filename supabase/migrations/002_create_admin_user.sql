-- Create Admin User
-- This script creates a test admin user for development/testing purposes
-- 
-- IMPORTANT: Change these credentials in production!
-- Email: admin@qrmenu.app
-- Password: Admin123!
--
-- To run this in Supabase:
-- 1. Go to SQL Editor in Supabase Dashboard
-- 2. Copy and paste this script
-- 3. Click "Run"

-- First, create the auth user
-- Note: You need to create the user in Supabase Auth UI first, then run this script
-- OR use Supabase API to create the user programmatically

-- For manual creation via Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Email: admin@qrmenu.app
-- 4. Password: Admin123!
-- 5. Copy the user ID
-- 6. Replace 'YOUR_USER_ID_HERE' below with the actual user ID

-- Insert admin user record
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from auth.users
INSERT INTO admin_users (user_id, role)
VALUES (
  'YOUR_USER_ID_HERE'::uuid,
  'super_admin'
)
ON CONFLICT (user_id) DO NOTHING;

-- Verify the admin user was created
SELECT 
  au.id,
  au.user_id,
  au.role,
  au.created_at,
  u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
