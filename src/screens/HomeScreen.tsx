import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';


import Geolocation from '@react-native-community/geolocation';



export const HomeScreen = () => {

    useEffect(() => {

        Geolocation.getCurrentPosition(
            info => console.log(info), 
            (error => console.log(error)),
            {
                
            }
        );

    }, [])


    return (
        <Container title="Home">
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    showsUserLocation={true}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
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
