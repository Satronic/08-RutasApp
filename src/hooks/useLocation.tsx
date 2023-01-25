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

        // Promise *****

        getCurrentLocation()
            .then(position => {
                setInitialPosition(position);
                setHasPosition(true);
            })
            .catch(error => console.log(error))

        // Callback *****

        // Geolocation.getCurrentPosition(
        //     (info => {
        //         setInitialPosition({
        //             latitude: info.coords.latitude,
        //             longitude: info.coords.longitude
        //         });

        //         setHasPosition(true);
        //     }),
        //     (error => console.log(error)),
        //     {
        //         enableHighAccuracy: true // Obtiene las corrdenadas del GPS
        //     }
        // );

    }, []);

    const getCurrentLocation = (): Promise<Position> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (error) => reject({ error }),
                {
                    enableHighAccuracy: true // Obtiene las corrdenadas del GPS
                }
            );
        })
    }

    return {
        hasPosition,
        initialPosition,
        getCurrentLocation
    }
}
