import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DinnerScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Text style={styles.goBackButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DinnerScreen

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