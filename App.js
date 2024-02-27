import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { createClient } from 'pexels';

export default function App() {
    const [img, setImg] = useState('');
    const client = createClient('dJPiCXI3dFo6JOPUPL3hpjlAzw0AycGgd55Q3wiG9JM3rdTTSqFaCuRn');
    const getCat = () => {
        fetch('https://api.pexels.com/v1/curated', {
            headers: {
                'Authorization': 'dJPiCXI3dFo6JOPUPL3hpjlAzw0AycGgd55Q3wiG9JM3rdTTSqFaCuRn'
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.photos && data.photos.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.photos.length);
                const randomPhoto = data.photos[randomIndex];
                setImg(randomPhoto.src.large);
            } else {
                console.error('Aucune photo disponible dans les données reçues de l\'API');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération de l\'image :', error);
        });
    }

    useEffect(() => {
        getCat();
    }, []);

    const handleNewImage = () => {
        getCat();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Une image de chat aléatoire</Text>
            <Image source={{uri: img}} style={styles.img} />
            <TouchableOpacity
                style={styles.button}
                onPress={handleNewImage}
            >
                <Text style={styles.buttonText}>Nouvelle image !</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
        color: 'white',
    },
    img: {
        width: '80%',
        height: '45%',
        marginBottom: 90,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
