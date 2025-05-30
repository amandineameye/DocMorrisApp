import React from 'react'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BrandProvider } from '@repo/theme'
import { brandConfig } from './brandConfig'
import { TabsNavigator } from '@repo/navigation'

// Instead of handling screen navigation with just JavaScript, let the phone’s native system manage the screens, like a real iOS or Android app would
// Only the current screen is active, others are paused or unloaded. Less memory usage, faster and smoother transitions
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
