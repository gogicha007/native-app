import React, { useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MeterScreen from '../screens/MeterScreen';
import QuicktestScreen from '../screens/QuicktestScreen';
import NewLocationScreen from '../screens/NewLocationScreen';
import { AuthContext } from '../context/AuthContext';
import { themes } from './themes';
import Header from './Header';


const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { userData } = useContext(AuthContext)
    const colorScheme = useColorScheme()

    // useEffect(()=>{
    //     console.log('color scheme', colorScheme)
    // },[colorScheme]);

    const theme = {mode : colorScheme === 'dark' ? 'dark' : 'light'};
    let activeColors = themes[theme.mode]
    
    // console.log('current theme', theme.mode)
    // console.log('active colors', activeColors)

    return (
        <NavigationContainer theme={activeColors}>
            <Stack.Navigator>
                {userData.token ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerTitle: () => <Header title={userData.name} />,
                                headerStyle: {
                                    backgroundColor: '#6E47FF'
                                },
                                headerTintColor: 'white'
                            }}
                        />
                        <Stack.Group>
                            <Stack.Screen
                                name="Meters"
                                component={MeterScreen}
                                options={{
                                    title: "მრიცხველები",
                                    headerTitleStyle: { color: '#F5F7FB' },
                                    headerTintColor: '#FEC200',
                                    headerStyle: {
                                        backgroundColor: '#6E47FF'
                                    },
                                }}
                            />
                        </Stack.Group>
                        <Stack.Group>
                            <Stack.Screen
                                name="QuickTests"
                                component={QuicktestScreen}
                                options={{
                                    title: 'ანალიზები',
                                    headerTitleStyle: { color: '#F5F7FB' },
                                    headerTintColor: '#FEC200',
                                    headerStyle: {
                                        backgroundColor: '#6E47FF'
                                    },
                                }}
                            />
                            <Stack.Screen
                                name='NewLocations'
                                component={NewLocationScreen}
                                options={{
                                    title: 'ახალი ლოკაცია',
                                    headerTitleStyle: { color: '#F5F7FB' },
                                    headerTintColor: '#FEC200',
                                    headerStyle: {
                                        backgroundColor: '#6E47FF'
                                    },
                                }}
                            />
                        </Stack.Group>
                    </Stack.Group>
                )
                    : (
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    )}


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation