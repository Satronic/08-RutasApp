import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='PermissionsScreen' // Defaul page on load app
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        </Stack.Navigator>
    );
}