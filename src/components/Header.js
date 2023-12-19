import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ onLogout }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Main App</Text>
            <TouchableOpacity onPress={onLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF', // Change as needed
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
    },
});

export default Header;
