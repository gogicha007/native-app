import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import {
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    View,
    ActivityIndicator,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'


const LoginScreen = ({ navigation, title }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loading, login } = useContext(AuthContext)

    const theme = useTheme()

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={loading} size='large' />
            <View style={styles.wrapper}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../assets/Group_212.png')}
                    />
                    <Text style={styles.version}>v1.9.3</Text>
                </View>
                <TextInput
                    style={[
                            styles.input, 
                            { borderColor: theme.colors.border }, 
                            { color: theme.colors.input_text },
                        ]}
                    value={username}
                    placeholder='username'
                    placeholderTextColor = {theme.colors.input_text}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={[
                        styles.input, 
                        { borderColor: theme.colors.border }, 
                        { color: theme.colors.input_text }
                    ]}
                    vlaue={password}
                    placeholder='password'
                    placeholderTextColor = {theme.colors.input_text}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <Button
                    title='Login'
                    onPress={() => login(username, password)}
                />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white',
        justifyContent: 'center',
    },
    imageWrapper: {
        marginBottom: 20,
        alignItems: 'center'
    },
    version: {
        fontSize: 17,
        color: '#717374',
        marginVertical: 20,
    },
    wrapper: {
        width: '80%',
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
})