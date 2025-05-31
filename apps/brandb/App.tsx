import React from 'react'
import { TabsNavigator } from '@repo/navigation'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BrandProvider } from '@repo/theme'
import { brandConfig } from './brandConfig'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
enableScreens()

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <BrandProvider config={brandConfig}>
          <TabsNavigator />
        </BrandProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
