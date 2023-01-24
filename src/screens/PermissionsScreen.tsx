import React, { useContext } from 'react';
import { Platform, Text } from 'react-native';
import {
    // Text,
    // View
    Button
} from 'react-native';
import { Container } from '../components/Container';
import { PermissionContext } from '../context/permissionsContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionContext)

    return (
        <Container title="Permissions">
            <Text style={{color: 'white', alignSelf: 'center'}}>Es necesario el uso del GPS para acceder a la aplicación.</Text>
            <Button
                title="Obtener Permiso"
                onPress={askLocationPermission}
            />
            {/* <Text style={{color: 'white'}}>{JSON.stringify(permissions, null, 4)}</Text> */}
        </Container>
    )
}
