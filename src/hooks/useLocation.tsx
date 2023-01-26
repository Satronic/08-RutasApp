import React, { useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';
import { Position } from '../interfaces/appInterfaces';


export const useLocation = () => {

    const [hasPosition, setHasPosition] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Position>({
        latitude: 0,
        longitude: 0
    });

    const [userPosition, setUserPosition] = useState<Position>({
        latitude: 0,
        longitude: 0
    });

    const [routePoints, setRoutePoints] = useState<Position[]>([])

    const watchId = useRef<number>();

    useEffect(() => {

        // Promise *****

        getUserPosition()
            .then(position => {
                setInitialPosition(position);
                setUserPosition(position);
                setRoutePoints(points => [...points, position]);
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

    const getUserPosition = (): Promise<Position> => {
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
    };

    const followUserPosition = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {
                setUserPosition({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                });
                setRoutePoints(points => [...points, {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }])
            },
            (error => console.log(error)),
            {
                enableHighAccuracy: true, // Obtiene las corrdenadas del GPS
                distanceFilter: 5 // Intervalo donde toma muestras de la posicion
            }
        );
    };


    const stopFollowUserPosition = () => {
        if(watchId.current) {
            Geolocation.clearWatch(watchId.current)
        }
    };

    return {
        hasPosition,
        initialPosition,
        userPosition,
        routePoints,
        getUserPosition,
        followUserPosition,
        stopFollowUserPosition
    }
}
