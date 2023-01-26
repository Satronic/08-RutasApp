import React, { useEffect, useRef, useState } from 'react';
// import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from './LoadingScreen';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { Text } from 'react-native';


export const HomeScreen = () => {

    const {
        userPosition,
        hasPosition,
        initialPosition,
        routePoints,
        getUserPosition,
        followUserPosition,
        stopFollowUserPosition
    } = useLocation();

    const [showPolyline, setShowPolyline] = useState(true);

    const mapViewRef = useRef<MapView>(); // Crea una referencia al componente MapView

    const followingUserPosition = useRef<boolean>(true); // Almacena el estado del seguimiento


    useEffect(() => {
        followUserPosition();

        // Se debe cancelar el seguimiento cuando se finalice el componente
        return () => {
            stopFollowUserPosition();
        }
    }, []);

    // Centrar la ubicacion cada vez que el usuario se desplaza dando seguimiento
    useEffect(() => {

        if (!followingUserPosition.current) return;

        const { latitude, longitude } = userPosition;
        mapViewRef.current?.animateCamera({
            center: {
                latitude, longitude
            }
        });
        // console.log(routePoints);
    }, [userPosition]);



    // Retorna a la posición central --> Ubicación del ususario
    const setCenterPosition = async () => {
        const { latitude, longitude } = await getUserPosition();

        followingUserPosition.current = true;

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
                    onTouchStart={() => followingUserPosition.current === false} // Desactiva el seguimiento si el usuario desea cambiar de posicion en el mapa
                >
                    {
                        showPolyline &&
                        (
                            <Polyline
                                style={{ zIndex: 999 }}
                                coordinates={routePoints}
                                strokeColor={"green"}
                                strokeWidth={3}
                            />
                        )
                    }
                </MapView>

                <FloatingActionButton
                    iconName='locate-outline'
                    onPress={setCenterPosition}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10
                    }}
                />

                <FloatingActionButton
                    iconName='navigate-circle-outline'
                    onPress={() => setShowPolyline(!showPolyline)}
                    style={{
                        position: 'absolute',
                        bottom: 65,
                        right: 10
                    }}
                />

                <Text
                    style={{
                        position: 'absolute',
                        bottom: 115,
                        right: 18,
                        padding: 5,
                        color: 'white',
                        backgroundColor: 'black'
                    }}
                >
                    {
                        showPolyline
                            ? 'ON'
                            : 'OFF'
                    }
                </Text>
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
