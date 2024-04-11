import React, { useContext } from 'react'
import { useTheme } from '@react-navigation/native'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { ApiContext } from '../context/ApiContext'

const LocationsList = (props) => {
    const { listData, getLocationData, isLoading } = props
    const { districts, villages } = useContext(ApiContext)

    const theme = useTheme()

    const handleGetDetails = (id) => {
        const data = listData.find(t => t.id === id)
        props.getLocationData(data)
    }

    const testItem = ({ item }) => (
        <View style={[styles.testItem, { backgroundColor: theme.colors.card }]}>
            <View style={styles.infoSection}>
                <Text style={styles.testText}>{item.lon}, {item.lat};</Text>
                <Text numberOfLines={1} style={styles.testText}>{item.name};</Text>
                <Text style={styles.testText}>
                    {districts.find(t => t.ind === item.district)?.name},  {villages.find(t => t.id === item.village)?.name};
                </Text>
                <View style={styles.testsNo}>
                    <Text
                        style={{ fontSize: 14, fontWeight: 'bold', color: '#F5F7FB', marginTop: -4 }}
                    >
                        ტესტები: {item.tests.length}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity onPress={() => handleGetDetails(item.id)}>
                    <View style={styles.getDetailsButton}>
                        <Image source={require('../assets/thin-chevron-arrow-right-icon.png')} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
    return (
        <View>
            {!isLoading ? (
                <FlatList
                    data={listData}
                    renderItem={testItem}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{ height: 150 }}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text>აირჩიეთ მუნიციპალიტეტი...</Text>}
                />
            ) : (
                <View style={styles.spinnerWrapper}>
                    <ActivityIndicator animating={isLoading} size='large' color='#6E47FF' />
                </View>
            )
            }
        </View >
    )
}

export default LocationsList

const styles = StyleSheet.create({
    spinnerWrapper: {
        position: 'absolute',
        top: 200,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    testItem: {
        flexDirection: 'row',
        height: 105,
        borderRadius: 12,
        // backgroundColor: '#E2DAFF',
        paddingStart: 10,
        paddingTop: 5,
        marginBottom: 10,
    },
    testText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4830A8'
    },
    testsNo: {
        width: 117,
        height: 30,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#4830A8',
    },
    icon: {
        width: 35,
        height: 35,
        position: 'relative',
        marginLeft: 5,
        marginRight: 12,
        tintColor: '#FEC200',
    },
    infoSection: {
        width: 300,
    },
    buttonSection: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})