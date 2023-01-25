import React, { useEffect, useRef } from 'react';
// import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from './LoadingScreen';
import { FloatingActionButton } from '../components/FloatingActionButton';


export const HomeScreen = () => {

    const { hasPosition, initialPosition, getCurrentLocation} = useLocation();

    const mapViewRef = useRef<MapView>(); // Crea una referencia al componente MapView


    // Retorna a la posición central --> Ubicación del ususario
    const setCenterPosition = async () => {
        const {latitude, longitude} = await getCurrentLocation();

        mapViewRef.current?.animateCamera({
            center: {
                latitude, longitude
            }
        })
    }

    if (!hasPosition) {
        <LoadingScreen />
    }

    return (
        <Container title="Home">
            <View style={styles.container}>
                <MapView
                    ref={element => mapViewRef.current = element!} // Sea segura que contiene un valor
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ ...styles.map, display: hasPosition ? 'flex' : 'none' }}
                    showsUserLocation={true} // Cumple la misma funcion de setCenterPosition
                    region={{
                        latitude: initialPosition.latitude,
                        longitude: initialPosition.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>

                <FloatingActionButton
                    iconName='locate'
                    onPress={setCenterPosition}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10
                    }}
                />
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
