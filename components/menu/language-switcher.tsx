'use client'

import { Button } from '@/components/ui/button'

interface LanguageSwitcherProps {
  currentLanguage: 'tr' | 'en'
  onLanguageChange: (language: 'tr' | 'en') => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentLanguage === 'tr' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('tr')}
      >
        TR
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('en')}
      >
        EN
      </Button>
    </div>
  )
}
