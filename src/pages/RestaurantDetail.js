import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, Button, Linking, TouchableOpacity} from 'react-native';


import {Star} from "../components/Star"

const RestaurantDetail = (props) => {
    const { selectedRestaurant } = props.route.params;
    console.log(selectedRestaurant)


   
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.name}>{selectedRestaurant.name}</Text>

                <Image
                    style={styles.image}
                    source={{ uri: selectedRestaurant.image_url }}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{selectedRestaurant.address}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{selectedRestaurant.area}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{selectedRestaurant.postal_code}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Star arif={selectedRestaurant}/>
                </View>
                <TouchableOpacity style={styles.reserve} onPress={() =>{Linking.openURL(selectedRestaurant.mobile_reserve_url)} }>  
                   <Text style={styles.restext}>Reserve a Table </Text></TouchableOpacity>
            </View> 
        </SafeAreaView>
    )
}

export { RestaurantDetail }

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    name: { fontWeight: '300', fontSize: 30 },
    image: { height: Dimensions.get('window').height / 3 },
    infoContainer: {
        backgroundColor: '#29b6f6',
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    infoText: { color: 'white', fontWeight: 'bold' },
    reserve:{
        color:"white",
        backgroundColor:"black",
        textAlign:"center",
        justifyContent:"center",
        borderRadius:10,
        marginTop:70
    },restext:{
        color:"white",
        textAlign:"center",
        justifyContent:"center",
        fontSize:20,
        padding:5
       
        
    },
})

