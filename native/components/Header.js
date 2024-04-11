import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, StatusBar } from 'react-native'
import { AuthContext } from '../context/AuthContext'


export default function Header({ title }) {
    const { logout } = useContext(AuthContext)

    return (
        <View style={styles.header}>
            <StatusBar
                color='#F5F7FB'
                backgroundColor={'#4830A8'}
            />
            <View style={styles.userWrapper}>
                <Image source={require('../assets/f_user-regular.png')} style={styles.icon} />
                <Text style={styles.headerText}>
                    {title}
                </Text>
            </View>
            <Pressable style={{marginRight: 45}} onPress={logout}>
                <Image source={require('../assets/f-logout.png')} style={styles.logoutIcon} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userWrapper: {
        flexDirection: 'row'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#F3F4FB',
        letterSpacing: 1,
    },
    icon: {
        width: 24.5,
        height: 28,
        position: 'relative',
        tintColor: '#FEC200',
        marginLeft: 2,
        marginRight: 12,
    },
    logoutIcon: {
        height: 26,
        width: 26,
        tintColor: '#FEC200'
    },
    logoutButton: {
        marginRight: 45,
    },
})