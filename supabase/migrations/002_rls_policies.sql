-- Enable Row Level Security on all tables
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RESTAURANTS TABLE POLICIES
-- ============================================

-- Restaurant owners can view their own restaurant
CREATE POLICY "Restaurant owners can view own restaurant"
  ON restaurants FOR SELECT
  USING (auth.uid() = owner_id);

-- Restaurant owners can update their own restaurant
CREATE POLICY "Restaurant owners can update own restaurant"
  ON restaurants FOR UPDATE
  USING (auth.uid() = owner_id);

-- Restaurant owners can insert their own restaurant
CREATE POLICY "Restaurant owners can insert own restaurant"
  ON restaurants FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Public can view restaurants (for digital menu display)
CREATE POLICY "Public can view restaurants"
  ON restaurants FOR SELECT
  USING (true);

-- Admins can view all restaurants
CREATE POLICY "Admins can view all restaurants"
  ON restaurants FOR SELECT
  USING (is_admin());

-- Admins can update all restaurants
CREATE POLICY "Admins can update all restaurants"
  ON restaurants FOR UPDATE
  USING (is_admin());

-- ============================================
-- CATEGORIES TABLE POLICIES
-- ============================================

-- Restaurant owners can manage their own categories
CREATE POLICY "Restaurant owners can view own categories"
  ON categories FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can insert own categories"
  ON categories FOR INSERT
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can update own categories"
  ON categories FOR UPDATE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can delete own categories"
  ON categories FOR DELETE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Public can view categories (for digital menu display)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

-- ============================================
-- PRODUCTS TABLE POLICIES
-- ============================================

-- Restaurant owners can manage their own products
CREATE POLICY "Restaurant owners can view own products"
  ON products FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can insert own products"
  ON products FOR INSERT
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can update own products"
  ON products FOR UPDATE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can delete own products"
  ON products FOR DELETE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Public can view products (for digital menu display)
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (true);

-- ============================================
-- QR CODES TABLE POLICIES
-- ============================================

-- Restaurant owners can manage their own QR codes
CREATE POLICY "Restaurant owners can view own qr_codes"
  ON qr_codes FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can insert own qr_codes"
  ON qr_codes FOR INSERT
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can delete own qr_codes"
  ON qr_codes FOR DELETE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- ============================================
-- MENU VIEWS TABLE POLICIES
-- ============================================

-- Restaurant owners can view their own analytics
CREATE POLICY "Restaurant owners can view own menu_views"
  ON menu_views FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Anyone can insert menu views (for tracking)
CREATE POLICY "Anyone can insert menu_views"
  ON menu_views FOR INSERT
  WITH CHECK (true);

-- Admins can view all menu views
CREATE POLICY "Admins can view all menu_views"
  ON menu_views FOR SELECT
  USING (is_admin());

-- ============================================
-- PAYMENTS TABLE POLICIES
-- ============================================

-- Restaurant owners can view their own payments
CREATE POLICY "Restaurant owners can view own payments"
  ON payments FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Admins can view all payments
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (is_admin());

-- Admins can insert payments
CREATE POLICY "Admins can insert payments"
  ON payments FOR INSERT
  WITH CHECK (is_admin());

-- Admins can update payments
CREATE POLICY "Admins can update payments"
  ON payments FOR UPDATE
  USING (is_admin());

-- ============================================
-- ADMIN USERS TABLE POLICIES
-- ============================================

-- Only admins can view admin users
CREATE POLICY "Admins can view admin_users"
  ON admin_users FOR SELECT
  USING (is_admin());

-- Only admins can insert admin users
CREATE POLICY "Admins can insert admin_users"
  ON admin_users FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can delete admin users
CREATE POLICY "Admins can delete admin_users"
  ON admin_users FOR DELETE
  USING (is_admin());
