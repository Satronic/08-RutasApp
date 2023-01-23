import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: 'white',
        borderWidth: 0.5
    },
    headerText: {
        color: '#33CC00',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
