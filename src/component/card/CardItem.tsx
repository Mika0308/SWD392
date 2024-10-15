// CardItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardItemProps {
    title: string;
    description: string;
    imageUrl: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, description, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.cardImage} />
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 4,
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center',
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10, // Add some space between the image and text
    },
    textContainer: {
        flex: 1, // Allow text to take available space
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#444',
    },
});

export default CardItem;
