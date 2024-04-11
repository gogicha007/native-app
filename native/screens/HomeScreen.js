import React from 'react'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'


const HomeScreen = ({ navigation }) => {
    const theme = useTheme()
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Meters')}
            >
                <Text style={styles.text}>
                    მრიცხველები
                </Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('QuickTests')}
            >
                <Text style={styles.text}>
                    სწრაფი ტესტები
                </Text>
            </Pressable>
        </View >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '70%',
        height: '20%',
        backgroundColor: '#6E47FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FEC200',
    }
})