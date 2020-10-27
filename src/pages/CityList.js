import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import { CityItem, SearchBar } from '../components'

let originalList = []

const CityList = (props) => {
    const [cityList, setCityList] = useState([]);
    const [loading, setLoading] = useState(false);

    // ASYNC-AWAIT 
    // const fetchCityData = async () => {
    //     const { data } = await axios.get("https://opentable.herokuapp.com/api/cities");
    //     setCityList(data.cities);
    //     originalList = [...data.cities];
    // }

    const fetchCityData =()=>{
        setLoading(true);
                
        axios.get("https://opentable.herokuapp.com/api/cities").then(response => {
            setCityList(response.data.cities);
            setLoading(false);
            originalList = [...response.data.cities];
        })
    }

    useEffect(() => {
        fetchCityData();
    }, [])

    const renderCities = ({ item }) => {
        return (
                        <CityItem
                cityName={item}
                onSelect={() => props.navigation.navigate('Restaurants', { selectedCity: item })}
            />
        )
    }

    const renderSeperator = () => <View style={{ borderWidth: 1, borderColor: '#e0e0e0' }} />

    function searchCity(search) {
        const filteredCities = originalList.filter(city => {
            const text = search.toUpperCase();
            const cityName = city.toUpperCase();

            return cityName.indexOf(text) > -1;
        })

        setCityList(filteredCities);
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>

            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating = {true} color = '#bc2b78' size="large" />
                        </View> :

                <View><Text style={{ margin: 5, fontWeight: 'bold', fontSize: 30 }}>Cities</Text>
                <SearchBar
                    placeholder="Search a city..."
                    onSearch={(value) => searchCity(value)}
                />
                <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    data={cityList}
                    renderItem={renderCities}
                    ItemSeparatorComponent={renderSeperator}
                />
                    </View> }
            
            
            </View>

 
        </SafeAreaView>
    )
    }

export { CityList };