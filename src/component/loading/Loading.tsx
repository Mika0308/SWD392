import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Loading: React.FC = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [slideAnim]);

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.loadingBar, { transform: [{ translateX }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 4,
        width: '100%',
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
        borderRadius: 2,
    },
    loadingBar: {
        width: '20%',
        height: '100%',
        backgroundColor: '#2196F3',
        borderRadius: 2,
    },
});

export default Loading;
