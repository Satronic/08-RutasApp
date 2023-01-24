import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from './LoadingScreen';


export const HomeScreen = () => {

    const { hasPosition, initialPosition } = useLocation();

    if(!hasPosition) {
        <LoadingScreen />
    }

    return (
        <Container title="Home">
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{...styles.map, display: hasPosition ? 'flex' : 'none'}}
                    showsUserLocation={true}
                    region={{
                        latitude: initialPosition.latitude,
                        longitude: initialPosition.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        </Container>
    )
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // height: 400,
        // width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
