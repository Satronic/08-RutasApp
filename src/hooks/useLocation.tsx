import React, { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';
import { Position } from '../interfaces/appInterfaces';


export const useLocation = () => {

    const [hasPosition, setHasPosition] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Position>({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {

        Geolocation.getCurrentPosition(
            (info => {
                setInitialPosition({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude
                });

                setHasPosition(true);
            }),
            (error => console.log(error)),
            {
                enableHighAccuracy: true // Obtiene las corrdenadas del GPS
            }
        );

    }, [])

    return {
        hasPosition,
        initialPosition
    }
}
