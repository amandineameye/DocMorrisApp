import React from 'react'
import { TabsNavigator } from '@repo/navigation'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BrandProvider } from '@repo/theme'
import { brandConfig } from './brandConfig'
enableScreens()

export default function App() {
  return (
    <SafeAreaProvider>
      <BrandProvider config={brandConfig}>
        <TabsNavigator />
      </BrandProvider>
    </SafeAreaProvider>
  )
}
