import React from 'react'
import { TabsNavigator } from '@repo/navigation/TabsNavigator'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BrandProvider } from '@repo/theme/context'
import { brandConfig } from './brandConfig'
enableScreens()

export default function App() {
  console.log('TabsNavigator:', TabsNavigator)
  console.log('typeof TabsNavigator:', typeof TabsNavigator)
  return (
    <SafeAreaProvider>
      <BrandProvider config={brandConfig}>
        <TabsNavigator />
      </BrandProvider>
    </SafeAreaProvider>
  )
}
