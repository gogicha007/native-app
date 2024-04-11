import React, { useState, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput, ActivityIndicator, Pressable, TouchableOpacity, Platform, Image } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { Host } from "../components/Hosts";


const MeterScreen = ({ navigation }) => {
    const { userData } = useContext(AuthContext)
    const [meterNo, setMeterNo] = useState('')
    const [readings, setReadings] = useState('')
    const [checkedMeterId, setCheckedMeterId] = useState('')
    const [customerData, setCustomerData] = useState({ name: '', address: '', phone: '', prev_reading: '' })
    const [loading, setLoading] = useState(false)

    const theme = useTheme()

    const handleCheckMeter = async (meterNo) => {
        setCheckedMeterId('')
        if (!meterNo.trim()) {
            alert('Please Enter Meter ID');
            return;
        }
        setLoading(true)
        const apiResponse = await fetch(`${Host.localhost}/api/meters/${meterNo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userData.token}`,
            },
        });
        const finalData = await apiResponse.json();
        if (apiResponse.status === 200) {
            setCustomerData(
                existingValues => (
                    {
                        ...existingValues,
                        name: finalData.customer_name,
                        address: finalData.customer_address,
                        phone: finalData.customer_phone,
                        prev_reading: finalData.reading,
                    })
            )
            setCheckedMeterId(finalData.meter_id.toString())
        } else {
            alert('Please enter correct Meter ID')
        }
        setLoading(false)
    }

    const handleSaveReadings = async () => {
        let today = new Date()
        const zeroPad = (d) => {
            return ("0" + d).slice(-2)
        }
        let theDate = [today.getUTCFullYear(), zeroPad(today.getMonth() + 1), zeroPad(today.getDate())].join("-");
        setLoading(true)
        const apiResponse = await fetch(`${Host.localhost}/api/billing/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Token ${userData.token}`
            },
            body: JSON.stringify(
                {
                    'reading': readings,
                    'meter': checkedMeterId,
                    'reader': userData.user_id,
                    'date': theDate
                })
        });
        let savedData = await apiResponse.json();
        if (apiResponse.status === 201) {
            console.log(savedData)
            setCheckedMeterId('')
            setMeterNo('')
            Object.keys(customerData).forEach(k => customerData[k] = '')
            setReadings('')
            alert('Readings saved')
        } else {
            alert('Readings not saved, try correct values!')
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator color={'red'} size='large' />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={[styles.meterIdWrapper, { borderColor: theme.colors.border }]}>
                <TextInput
                    // style={[styles.meterId, Platform.select({ web: { outlineStyle: 'none', } })]}
                    style={[styles.meterId, { color: theme.colors.input_text }]}
                    onChangeText={text => setMeterNo(text)}
                    placeholder='Enter Meter ID'
                    placeholderTextColor={theme.colors.input_text}
                    value={meterNo}
                />
                <TouchableOpacity onPress={() => handleCheckMeter(meterNo)}>
                    <View style={[styles.meterButton, { borderColor: theme.colors.border }]}>
                        <Image source={require('../assets/search.png')} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[
                styles.customerContainer,
                { borderBottomColor: theme.colors.border },
                { borderTopColor: theme.colors.border }
            ]}
            >
                <View style={styles.infoItem}>
                    <Image
                        source={require('../assets/user-solid.png')}
                        style={[styles.icon, { height: 30, width: 26.25 }]}
                    />
                    <Text style={styles.text}>{customerData.name}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Image
                        source={require('../assets/location-dot-solid.png')}
                        style={[styles.icon, { height: 30, width: 22.5 }]}
                    />
                    <Text style={styles.text}>{customerData.address}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Image
                        source={require('../assets/phone-volume-solid.png')}
                        style={[styles.icon, { height: 25, width: 25 }]} />
                    <Text style={styles.text}>{customerData.phone}</Text>
                </View>
            </View>
            <View style={[styles.readingsWrapper,]}>
                <Text style={[styles.readingsTitle, { color: theme.colors.input_text }]}>
                    წინა ჩვენება:
                </Text>
                <Text style={[
                    styles.prevReading,
                    { borderColor: theme.colors.border },
                    { color: theme.colors.input_text }
                ]}>
                    {customerData.prev_reading}
                </Text>
                <Text style={[styles.readingsTitle, { color: theme.colors.input_text }]}>
                    ახალი ჩვენება:
                </Text>
                <TextInput
                    style={[
                        styles.readingsInput,
                        { borderColor: theme.colors.border },
                        Platform.select({ web: { outlineStyle: 'none', } }),
                        { color: theme.colors.input_text }
                    ]}
                    // editable={checkedMeterId.trim()}
                    onChangeText={text => setReadings(text)}
                    value={readings}
                />
                <Pressable
                    style={styles.readingsButton}
                    onPress={() => handleSaveReadings()}
                    disabled={!checkedMeterId.trim()}
                >
                    <Text style={{ color: '#FEC200', fontSize: 18 }}>შენახვა</Text>
                </Pressable>
            </View>
        </View >
    )
}

export default MeterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    meterIdWrapper: {
        height: 40,
        borderColor: '#4830A8',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justidyContent: 'space-between',
    },
    meterId: {
        height: 40,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4830A8',
        paddingLeft: 10,
        flex: 1
    },
    meterButton: {
        backgroundColor: '#E2DAFF',
        height: 40,
        width: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: '#4830A8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customerContainer: {
        flexDirection: 'column',
        marginVertical: 20,
        marginHorizontal: 15,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#4830A8',
        borderTopColor: '#4830A8',
    },
    infoItem: {
        height: 30,
        flexDirection: 'row',
        marginLeft: 0,
        marginVertical: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#482FA8'
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    readingsWrapper: {
        marginHorizontal: 15,
    },
    readingsTitle: {
        fontSize: 14,
        color: '#4830A8',
        marginBottom: 5,
    },
    prevReading: {
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4830A8',
        borderColor: '#4830A8',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
        paddingTop: 5,
    },
    readingsInput: {
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4830A8',
        borderColor: '#4830A8',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
    },
    readingsButton: {
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#6E47FF",
        marginTop: 20,
    },
    icon: {
        width: 25,
        height: 25,
        position: 'relative',
        marginLeft: 5,
        marginRight: 12,
        tintColor: '#FEC200',
    },
})