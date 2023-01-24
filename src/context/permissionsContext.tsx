import { createContext, useState } from 'react';
import { PermissionStatus } from 'react-native-permissions';

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

    const askLocationPermission = () => {

    }
    const checkLocationPermission = () =>{

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