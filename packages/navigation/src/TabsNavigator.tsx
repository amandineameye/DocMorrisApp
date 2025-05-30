import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'
import { type Theme } from '@repo/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HomeScreen, CategoriesScreen } from '@repo/discovery/screens'
import { PrescriptionsScreen } from '@repo/prescription-services/screens'
import { CartScreen } from '@repo/checkout/screens'
import { AccountScreen } from '@repo/user-account/screens'

type TabBarIconProps = {
  color: string
  focused: boolean
  size: number
}

type ScreenOptionsProps = {
  route: {
    name: 'Home' | 'Categories' | 'Cart' | 'Account' | 'Prescriptions'
  }
}

const Tab = createBottomTabNavigator()

export const TabsNavigator = () => {
  const theme = useTheme() as Theme

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary.background,
      primary: theme.colors.primary.primary1,
    },
  }

  const screenOptions = ({ route }: ScreenOptionsProps) => ({
    tabBarLabelStyle: {
      fontFamily: theme.fonts.button.medium.fontFamily,
    },
    headerShown: false,
    tabBarIcon: ({ color }: TabBarIconProps) => {
      let iconName

      switch (route.name) {
        case 'Home':
          iconName = 'home-outline'
          break
        case 'Categories':
          iconName = 'grid-outline'
          break
        case 'Cart':
          iconName = 'cart-outline'
          break
        case 'Account':
          iconName = 'person-outline'
          break
        case 'Prescriptions':
          iconName = 'receipt-outline'
          break
        default:
          iconName = 'ellipse-outline' // fallback icon
      }

      return <Ionicons name={iconName} size={20} color={color} />
    },
  })

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Categories" component={CategoriesScreen} />
          <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}
