/*import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchDataByCategory } from '../api/fatsecret';

const BreakfastScreen = () => {
    const navigation = useNavigation();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const category = 'Kahvaltı'; // Kategori olarak 'Breakfast' seçiliyor
                const data = await fetchDataByCategory(category);
                setFoods(data.foods);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching foods: ", error);
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const renderFoodItem = ({ item }) => {
        return (
            <View style={styles.foodContainer}>
                <Image
                    source={{ uri: item.photo_url }}
                    style={styles.foodImage}
                />
                <Text style={styles.foodName}>{item.food_name}</Text>
                <Text style={styles.foodDescription}>{item.food_description}</Text>
                <TouchableOpacity onPress={() => handleFoodLinkPress(item.food_url)}>
                    <Text style={styles.foodLink}>More Info</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleFoodLinkPress = (foodLink) => {
        Linking.openURL(foodLink);
    };

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#b6d877" style={styles.loadingIndicator} />
            ) : (
                <>
                    <FlatList
                        data={foods}
                        renderItem={renderFoodItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={renderSeparator}
                    />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                        <Text style={styles.goBackButtonText}>Back</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303642',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    foodContainer: {
        backgroundColor: '#232c37',
        padding: 20,
        marginBottom: 20,
        borderRadius: 15,
    },
    foodImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    foodDescription: {
        fontSize: 14,
        color: '#dddddd',
        marginBottom: 8,
    },
    foodLink: {
        fontSize: 12,
        color: '#bebebe',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    separator: {
        width: '100%',
        backgroundColor: '#333333',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goBackButton: {
        backgroundColor: '#303642',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    goBackButtonText: {
        color: '#b6d877',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BreakfastScreen;
*/


import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BreakfastScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Text style={styles.goBackButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BreakfastScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303642',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goBackButton: {
        backgroundColor: '#303642',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    goBackButtonText: {
        color: '#b6d877',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})