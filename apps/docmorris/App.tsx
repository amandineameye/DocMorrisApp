import React from 'react'
import { TabsNavigator } from '@repo/navigation/TabsNavigator'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BrandProvider } from '@repo/theme/context'
import { brandConfig } from './brandConfig'
enableScreens()

export default function App() {
  console.log('BrandProvider:', BrandProvider)
  console.log('typeof BrandProvider:', typeof BrandProvider)
  return (
    <SafeAreaProvider>
      <BrandProvider config={brandConfig}>
        <TabsNavigator />
      </BrandProvider>
    </SafeAreaProvider>
  )
}
