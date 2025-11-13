'use client'

import Image from 'next/image'

interface ThemePreviewProps {
  logoUrl?: string
  coverImageUrl?: string
  primaryColor: string
  secondaryColor: string
  restaurantName: string
}

export function ThemePreview({ 
  logoUrl, 
  coverImageUrl, 
  primaryColor, 
  secondaryColor,
  restaurantName 
}: ThemePreviewProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Preview</h3>
      
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {/* Cover Image */}
        {coverImageUrl ? (
          <div className="relative h-32 w-full">
            <Image
              src={coverImageUrl}
              alt="Cover"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div 
            className="h-32 w-full"
            style={{ backgroundColor: primaryColor }}
          />
        )}
        
        {/* Header with Logo */}
        <div className="p-4 border-b border-gray-200" style={{ backgroundColor: secondaryColor }}>
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src={logoUrl}
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {restaurantName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="font-bold text-lg" style={{ color: primaryColor }}>
                {restaurantName}
              </h2>
              <p className="text-xs text-gray-500">Digital Menu</p>
            </div>
          </div>
        </div>
        
        {/* Sample Menu Items */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div>
              <h4 className="font-medium text-sm">Sample Product</h4>
              <p className="text-xs text-gray-500">Delicious menu item</p>
            </div>
            <span className="font-bold text-sm" style={{ color: primaryColor }}>
              $12.99
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div>
              <h4 className="font-medium text-sm">Another Product</h4>
              <p className="text-xs text-gray-500">Tasty dish</p>
            </div>
            <span className="font-bold text-sm" style={{ color: primaryColor }}>
              $8.50
            </span>
          </div>
        </div>
        
        {/* Sample Button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="w-full py-2 px-4 rounded-lg text-white font-medium text-sm"
            style={{ backgroundColor: primaryColor }}
          >
            View Details
          </button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        This is how your menu will look to customers
      </p>
    </div>
  )
}
