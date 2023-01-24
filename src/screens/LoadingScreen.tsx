import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native';
import { Container } from '../components/Container';
import { PermissionContext } from '../context/permissionsContext';

export const LoadingScreen = () => {

    const { checkLocationPermission } = useContext(PermissionContext);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    return (
        <Container title="Loading">
            <ActivityIndicator size={64}/>
            {/* <Text style={{color: 'white'}}>{JSON.stringify(permissions, null, 4)}</Text> */}
        </Container>
    )
}
