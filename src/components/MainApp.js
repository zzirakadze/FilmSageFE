import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Header from './Header';
import {removeToken} from "../utils/storage";
const MainApp = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchedMovies = [
            {
                id: '1',
                title: 'Inception',
                poster: 'https://upload.wikimedia.org/wikipedia/ka/1/17/Inception-poster.jpg'
            },
            {
                id: '2',
                title: 'Interstellar',
                poster: 'https://upload.wikimedia.org/wikipedia/ka/b/bc/Interstellar_film_poster.jpg'
            },
            {
                id: '6',
                title: 'Memento',
                poster: 'https://upload.wikimedia.org/wikipedia/ka/c/c7/Memento_poster.jpg'
            },
        ];
        setMovies(fetchedMovies);
    }, []);

    const renderMovie = ({ item }) => (
        <TouchableOpacity
            style={styles.movieItem}
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
        >
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        await removeToken();
                        console.log('Token removed');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }
                },
            ]
        );
    };


    return (
        <>
            <Header onLogout={handleLogout} />
            <View style={styles.container}>
                <FlatList
                    data={movies}
                    renderItem={renderMovie}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    movieItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    poster: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        marginLeft: 10,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    logoutButton: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f00', // Red color for the logout button
        borderRadius: 5,
        margin: 10,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MainApp;
