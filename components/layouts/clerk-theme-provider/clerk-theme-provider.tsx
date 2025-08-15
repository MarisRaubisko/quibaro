'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'


export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const actualTheme = localStorage.getItem('theme')
    if(actualTheme){
      setTheme(actualTheme || 'system')
    }
  }, [setTheme])
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? (dark as any) : undefined,
        variables: resolvedTheme === 'dark' ? { colorBackground: '#0d0d0d', colorInputBackground: "#0d0d0d" } : {},
      }}
    >
        {children}
    </ClerkProvider>
  )
}