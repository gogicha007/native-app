import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Image } from 'react-native'
import { useTheme } from "@react-navigation/native";
import { ApiContextProvider } from "../context/ApiContext";
import { DropdownDistricts } from '../components/Dropdowns';
import { Host } from "../components/Hosts";
import LocationsList from "../components/LocationsList";


const QuicktestScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [district, setDistrict] = useState(null)
    const [testsByDistrict, setTestsByDistrict] = useState([])

    const theme = useTheme()

    const handleGetLocations = () => {
        const getLocations = async () => {
            setLoading(true)
            try {
                const locationsResponse = await fetch(`${Host.localhost}/newlocations/${district}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Token ${userData.token}`,
                    },
                });
                const locationsJson = await locationsResponse.json();
                setTestsByDistrict(locationsJson);
            } catch (error) {
                console.error(error)
            } finally {
                console.log('its okey baby')
                setLoading(false)
            }
        };
        getLocations();
    }

    const handleLocationDetails = (data) => {
        navigation.navigate('NewLocations', data)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.districtsWrapper, {borderBottomColor: theme.colors.border}]}>
                <View style={{ width: 250 }}>
                    <ApiContextProvider>
                        <DropdownDistricts onChange={(data) => setDistrict(data)} />
                    </ApiContextProvider>
                </View>
                <Pressable
                    style={{ marginLeft: 20, alignSelf: 'center' }}
                    disabled={!district}
                    onPress={() => { handleGetLocations() }}>
                    <Image
                        source={require('../assets/forward-arrow-icon.png')}
                        style={[styles.getLocationsIcon, !district ? { tintColor: 'grey' } : { tintColor: '#987400' }]}
                    />
                </Pressable>
            </View>
            <View style={styles.locationsWrapper}>
                <ApiContextProvider>
                    <LocationsList listData={testsByDistrict} getLocationData={handleLocationDetails} isLoading={loading} />
                </ApiContextProvider>
            </View>
            <TouchableOpacity style={styles.plusButton}
                onPress={() => navigation.navigate('NewLocations', {})}
            >
                <Image
                    source={require('../assets/icons8-plus-math-100.png')}
                    style={styles.plusIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

export default QuicktestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    districtsWrapper: {
        flexDirection: 'row',
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#6E47FF',
        paddingVertical: 15,
    },
    getLocationsIcon: {
        height: 18,
        width: 23,
        tintColor: '#987400'
    },
    plusButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#FEC200',
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 40,
        shadowRadius: 10,
        shadowColor: '#654d00',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        elevation: 11,
    },
    plusIcon: {
        height: 40,
        width: 40,
    },
    locationsWrapper: {
        marginTop: 10,
        marginHorizontal: 15
    },
    icon: {
        width: 35,
        height: 35,
        position: 'relative',
        marginLeft: 5,
        marginRight: 12,
        tintColor: '#FEC200',
    },
})