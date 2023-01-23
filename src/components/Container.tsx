import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Header } from './Header';

interface ContainerProps {
    title: string;
    children?: JSX.Element | JSX.Element[];
}

export const Container = ({ title, children }: ContainerProps) => {
    return (
        <View style={styles.container}>
            <Header title={title} />
            <View style={styles.body}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10
    },
    body: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});
