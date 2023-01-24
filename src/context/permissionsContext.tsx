import { createContext, useEffect, useState } from 'react';
import { check, request, PERMISSIONS, PermissionStatus, openSettings } from 'react-native-permissions';
import { Platform, AppState } from 'react-native';

export interface PermissionState {
    locationStatus: PermissionStatus;
};

export const permissionsInitState: PermissionState = {
    locationStatus: 'unavailable'
};

type PermissionsContextProps = {
    permissions: PermissionState,
    askLocationPermission: () => void,
    checkLocationPermission: () => void
};

export const PermissionContext = createContext({} as PermissionsContextProps);


export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionsInitState);

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if (state === 'active') return;
            checkLocationPermission();
        })
    }, []);


    const askLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            // permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); 
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if(permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
        console.log({ permissionStatus });
    };

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            // permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            // permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
        console.log({ permissionStatus });
    }

    return (
        <PermissionContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            {children}
        </PermissionContext.Provider>
    )
}