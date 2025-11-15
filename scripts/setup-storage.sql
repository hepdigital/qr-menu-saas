-- Setup Storage Buckets for Production
-- Run this in Supabase SQL Editor if buckets don't exist

-- Check if buckets exist and create them if they don't
DO $$
BEGIN
  -- Restaurant logos bucket
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'restaurant-logos') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'restaurant-logos',
      'restaurant-logos',
      true,
      5242880, -- 5MB in bytes
      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    );
  END IF;

  -- Restaurant cover images bucket
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'restaurant-covers') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'restaurant-covers',
      'restaurant-covers',
      true,
      5242880, -- 5MB in bytes
      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    );
  END IF;

  -- Product images bucket
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'product-images',
      'product-images',
      true,
      5242880, -- 5MB in bytes
      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    );
  END IF;
END $$;

-- ============================================
-- STORAGE POLICIES FOR RESTAURANT LOGOS
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view restaurant logos" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can upload own logos" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can update own logos" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can delete own logos" ON storage.objects;

-- Anyone can view logos (public bucket)
CREATE POLICY "Public can view restaurant logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-logos');

-- Restaurant owners can upload their own logos
CREATE POLICY "Restaurant owners can upload own logos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-logos' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can update their own logos
CREATE POLICY "Restaurant owners can update own logos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-logos' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can delete their own logos
CREATE POLICY "Restaurant owners can delete own logos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-logos' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- ============================================
-- STORAGE POLICIES FOR RESTAURANT COVERS
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view restaurant covers" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can upload own covers" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can update own covers" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can delete own covers" ON storage.objects;

-- Anyone can view covers (public bucket)
CREATE POLICY "Public can view restaurant covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-covers');

-- Restaurant owners can upload their own covers
CREATE POLICY "Restaurant owners can upload own covers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurant-covers' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can update their own covers
CREATE POLICY "Restaurant owners can update own covers"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurant-covers' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can delete their own covers
CREATE POLICY "Restaurant owners can delete own covers"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurant-covers' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- ============================================
-- STORAGE POLICIES FOR PRODUCT IMAGES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can upload own product images" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can update own product images" ON storage.objects;
DROP POLICY IF EXISTS "Restaurant owners can delete own product images" ON storage.objects;

-- Anyone can view product images (public bucket)
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Restaurant owners can upload their own product images
CREATE POLICY "Restaurant owners can upload own product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can update their own product images
CREATE POLICY "Restaurant owners can update own product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );

-- Restaurant owners can delete their own product images
CREATE POLICY "Restaurant owners can delete own product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    auth.uid() IN (
      SELECT owner_id FROM restaurants
      WHERE id::text = (storage.foldername(name))[1]
    )
  );
