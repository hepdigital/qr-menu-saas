import { createClient } from '@/lib/supabase/server'

/**
 * Get the current authenticated user and their session
 */
export async function getSession() {
  const supabase = await createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    return null
  }
  
  return session
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

/**
 * Get the restaurant for the current authenticated user
 */
export async function getCurrentRestaurant() {
  const user = await getCurrentUser()
  
  if (!user) {
    return null
  }
  
  const supabase = await createClient()
  
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()
  
  if (error || !restaurant) {
    return null
  }
  
  return restaurant
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}

/**
 * Check if the current user is a super admin
 */
export async function isAdmin() {
  const user = await getCurrentUser()
  
  if (!user) {
    return false
  }
  
  const supabase = await createClient()
  
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (error || !adminUser) {
    return false
  }
  
  return true
}

/**
 * Get admin user details
 */
export async function getAdminUser() {
  const user = await getCurrentUser()
  
  if (!user) {
    return null
  }
  
  const supabase = await createClient()
  
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (error || !adminUser) {
    return null
  }
  
  return adminUser
}
