-- Create storage buckets for images

-- Restaurant logos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'restaurant-logos',
  'restaurant-logos',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Restaurant cover images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'restaurant-covers',
  'restaurant-covers',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Product images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- ============================================
-- STORAGE POLICIES FOR RESTAURANT LOGOS
-- ============================================

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
