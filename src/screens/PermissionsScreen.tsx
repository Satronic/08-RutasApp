import React from 'react';
import { Platform } from 'react-native';
import {
    // Text,
    // View
    Button
} from 'react-native';
import { check, request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { Container } from '../components/Container';

export const PermissionsScreen = () => {

    const checkLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            // permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); 
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); 
        } else {
            // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); 
        }

        console.log({permissionStatus});
    }

    return (
        <Container title="Permissions">
            <Button
                title="Obtener Permiso"
                onPress={checkLocationPermission}
            />
        </Container>
    )
}
