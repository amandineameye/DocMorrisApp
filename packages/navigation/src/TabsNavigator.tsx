import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@repo/theme/types'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomeScreen } from '@repo/discovery/screens/HomeScreen';
import { CategoriesScreen } from '@repo/discovery/screens/CategoriesScreen';
import { PrescriptionsScreen } from '@repo/prescription-services/screens/PrescriptionsScreen';
import { CartScreen } from '@repo/checkout/screens/CartScreen';
import { AccountScreen } from '@repo/user-account/screens/AccountScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => {
  const theme = useTheme() as ThemeType;;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary.background,
      primary: theme.colors.primary.primary1,
    },
  };

  const screenOptions = ({ route }) => ({
  tabBarLabelStyle: {
    fontFamily: theme.fonts.button.medium.fontFamily,
  },
  headerShown: false,
 tabBarIcon: ({ color, size }) => {
      let iconName: string;

      switch (route.name) {
        case 'Home':
          iconName = 'home-outline';
          break;
        case 'Categories':
          iconName = 'grid-outline';
          break;
        case 'Cart':
          iconName = 'cart-outline';
          break;
        case 'Account':
          iconName = 'person-outline';
          break;
          case 'Prescriptions':
          iconName = 'receipt-outline';
          break;
        default:
          iconName = 'ellipse-outline'; // fallback icon
      }

      return <Ionicons name={iconName} size="20" color={color} />;
    },
});


  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
