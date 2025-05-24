import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HomeScreen } from '@repo/discovery/screens/HomeScreen';
import { CategoriesScreen } from '@repo/discovery/screens/CategoriesScreen';
import { PrescriptionsScreen } from '@repo/prescription-services/screens/PrescriptionsScreen';
import { CartScreen } from '@repo/checkout/screens/CartScreen';
import { AccountScreen } from '@repo/user-account/screens/AccountScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => {
  const theme = useTheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      primary: theme.colors.primary.primary1,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
