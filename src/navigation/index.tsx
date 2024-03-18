import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './Screens';
import HomeScreen from '../screens/Home';
import {Colors} from '../theme/Colors';
import SplashScreen from '../screens/Splash';
import MenuScreen from '../screens/Menu';
import BillingScreen from '../screens/Billing';
import PaymentScreen from '../screens/Payment';
import {StackParamList} from './navigators';
import ReportsScreen from '../screens/Reports';
const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            color: Colors.white,
          },
          headerTintColor: Colors.white,
        }}>
        <Stack.Screen
          name={'SPLASH'}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={'HOME'} component={HomeScreen} />
        <Stack.Screen name={'Menu'} component={MenuScreen} />
        <Stack.Screen name={'Billing'} component={BillingScreen} />
        <Stack.Screen name={'Payment'} component={PaymentScreen} />
        <Stack.Screen name={'Reports'} component={ReportsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
