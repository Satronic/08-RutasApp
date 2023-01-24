import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { PermissionContext } from '../context/permissionsContext';
import { HomeScreen } from '../screens/HomeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {

    const { permissions } = useContext(PermissionContext);

    if (permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />
    }

    return (
        <Stack.Navigator
            // initialRouteName="PermissionsScreen" // Defaul page on load app
            screenOptions={{
                headerShown: false,
            }}
        >
            {
                permissions.locationStatus === 'granted'
                    ? <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
            }


        </Stack.Navigator>
    );
}