import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ViewStyle, View } from 'react-native';
import { StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatingActionButtonProps {
    iconName: string;
    onPress: () => void;
    style: StyleProp<ViewStyle>
}

export const FloatingActionButton = ({iconName: iconName, onPress, style}:FloatingActionButtonProps) => {
  return (
    <View style={{...style as any}}>
        <TouchableOpacity
            style={styles.blackButton}
            onPress={onPress}
        >
            <Icon 
                name={iconName}
                size={32}
                color="white"
            />

        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    blackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        backgroundColor: 'black',
        width: 48,
        height: 48,
        borderRadius: 100
    }
});
