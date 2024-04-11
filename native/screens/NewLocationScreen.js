import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import * as Location from 'expo-location';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Image } from 'react-native'
import { ApiContextProvider } from "../context/ApiContext";
import { DropdownDistricts, DropdownVillages } from '../components/Dropdowns'
import { Host } from "../components/Hosts";
import TestsComponent from "../components/TestsComponent";


const NewLocationScreen = ({ route, navigation }) => {
    const [initData, setInitData] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [springName, setSpringName] = useState('')
    const [district, setDistrict] = useState(route.params?.district)
    const [village, setVillage] = useState(route.params?.village)
    const [list, setList] = useState(route.params?.tests !== undefined ? route.params.tests : [])
    const [deletedTests, setDeletedTests]=useState([])

    const theme = useTheme()

    // permissions to use phone gps data
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('გთხოვთ ჩართოთ ლოკაციაზე წვდომა!');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLongitude(currentLocation.coords.longitude.toFixed(7))
        setLatitude(currentLocation.coords.latitude.toFixed(7));
        console.log(`'გრძედი:'${currentLocation.coords.longitude}; 'განედი:'${currentLocation.coords.latitude}`)
    }

    useEffect(() => {
        if (Object.keys(route.params).length > 0) {
            setInitData(route.params)
            setId(route.params.id)
            setLongitude(route.params.lon)
            setLatitude(route.params.lat)
            setSpringName(route.params.name)
            setDistrict(route.params.district)
            setVillage(route.params.village)
            setList(route.params.tests)
            console.log('edit location')
        } else {
            getPermissions();
            console.log('add new location')
        }
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        const apiResponse = await fetch(`${Host.localhost}/savenewlocations/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Token ${userData.token}`
            },
            body: JSON.stringify(
                {
                    'id': id,
                    'longitude': longitude,
                    'latitude': latitude,
                    'spring': springName,
                    'district': district,
                    'village': village,
                    'tests': list,
                    'deletedTests' : deletedTests,
                })
        });
        let savedData = await apiResponse.json();
        
        if (apiResponse.status === 201) {
            // console.log(savedData)
            alert('მონაცემები შენახულია')
            navigation.goBack()
        } else {
            alert('შეცდომა, შეიყვანეთ სწორი მონაცემები!')
        }
        setLoading(false)
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.coordsContainer}>
                <Text style={[styles.titles, { color: theme.colors.text }]}>კოორდინატები:</Text>
                <View style={styles.coordsWrapper}>
                    <Text style={styles.coordsText}>{longitude}</Text>
                    <Text style={styles.coordsText}>{latitude}</Text>
                    <TouchableOpacity
                        style={styles.refreshCoords}
                        onPress={() => { getPermissions() }}
                    >
                        <Image source={require('../assets/find-location-icon.png')} style={styles.refreshIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.springContainer}>
                <Text style={[styles.titles, { color: theme.colors.text }]}>წყაროს დასახელება:</Text>
                <TextInput
                    style={[
                        styles.springNameInput,
                        { borderColor: theme.colors.border },
                        { color: theme.colors.text },
                        Platform.select({ web: { outlineStyle: 'none', } })]}
                    onChangeText={text => setSpringName(text)}
                    value={springName}
                />
            </View>
            <ApiContextProvider>
                <View style={styles.regions}>
                    <DropdownDistricts onChange={(data) => setDistrict(data)} districtId={district} />
                </View>
                <View style={styles.regions}>
                    <DropdownVillages onChange={(data) => setVillage(data)} districtId={district} villageId={village} />
                </View>
                <TestsComponent locationData={list} sendTests={setList} delTests={setDeletedTests}/>
            </ApiContextProvider>
            <View style={styles.submitWrapper}>
                <Pressable
                    style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FEC200' }}>
                        შენახვა
                    </Text>
                </Pressable>
            </View>
        </View >
    )
}

export default NewLocationScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'flex-start',
    },
    springContainer: {
        justifyContent: 'flex-end'
    },
    springNameInput: {
        height: 33,
        width: '85%',
        marginLeft: 15,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#392686',
        borderColor: '#4830A8',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 10,

    },
    coordsContainer: {
        justifyContent: 'flex-start'
    },
    coordsWrapper: {
        width: '90%',
        flexDirection: 'row',
        marginLeft: 15,
        marginBottom: 3,
    },
    coordsText: {
        height: 33,
        width: 140,
        marginTop: 3,
        marginRight: 10,
        paddingHorizontal: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        color: '#F5F7FB',
        borderRadius: 8,
        backgroundColor: '#6E47FF',
    },
    refreshCoords: {
        height: 33,
        width: 50,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FEC200',
        borderRadius: 8,
        backgroundColor: '#6E47FF',
    },
    refreshIcon: {
        height: 19,
        width: 19,
        tintColor: '#FEC200'
    },
    // regions
    regions: {
        width: '85%',
        marginLeft: 15,
        marginVertical: 5,
        fontSize: 20,
        fontWeight: '700',
    },
    submitWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        height: 40,
        width: 200,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#6E47FF",
    },
    titles: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        color: '#4830A8',
        fontSize: 14,
        fontWeight: 'bold'
    },
})