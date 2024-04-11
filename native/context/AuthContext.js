import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Host } from "../components/Hosts";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)

    const login = async (username, password) => {
        setLoading(true)
        try {
            const response = await fetch(`${Host.localhost}/nativelog/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                body: JSON.stringify({ 'username': username, 'password': password })
            })
            const userInfo = await response.json()
            // console.log(userInfo)
            if (response.status === 200) {
                setUserData(userInfo);
                // AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo))
            } else {
                alert('Incorrect User credentials!')
            }

        } catch (error) {
            alert(error)
            console.log(error)
        }
        setLoading(false)
    }

    const logout = () => {
        setLoading(true)
        // AsyncStorage.removeItem('@userInfo')
        setUserData({})
        setLoading(false)
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                login,
                logout,
                userData,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

