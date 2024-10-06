import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Using MaterialIcons for Google icons

// Define the type for the user profile
interface Profile {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
}

const ProfileScreen: React.FC = () => {
    // Set up state for the user profile
    const [profile, setProfile] = useState<Profile>({
        name: 'Robi',
        email: 'robi123@gmail.com',
        phone: '89304527943',
        avatarUrl: 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'
    });

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />

            {/* Profile Info */}
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.phone}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>

            {/* Profile Options */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="history" size={20} color="blue" />
                    <Text style={styles.optionText}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="request-page" size={20} color="blue" />
                    <Text style={styles.optionText}>Create Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="privacy-tip" size={20} color="blue" />
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="settings" size={20} color="blue" />
                    <Text style={styles.optionText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="logout" size={20} color="blue" />
                    <Text style={styles.optionText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        padding: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
        borderWidth: 3,
        borderColor: 'lightblue',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        color: '#999',
        marginVertical: 5,
    },
    optionsContainer: {
        width: '100%',
        marginTop: 30,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 18,
        color: '#333',
        marginLeft: 15,
    },
});

export default ProfileScreen;
