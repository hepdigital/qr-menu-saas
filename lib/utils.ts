import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price according to currency
 * @param price - The price amount
 * @param currency - Currency code (TRY, USD, EUR)
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(price: number, currency: string): string {
  const symbols: Record<string, string> = {
    TRY: '₺',
    USD: '$',
    EUR: '€'
  }
  
  const symbol = symbols[currency] || currency
  
  // Format with 2 decimal places
  const formatted = price.toFixed(2)
  
  // For Turkish Lira, symbol comes after the amount
  if (currency === 'TRY') {
    return `${formatted}${symbol}`
  }
  
  // For USD and EUR, symbol comes before
  return `${symbol}${formatted}`
}
