import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Host } from "../components/Hosts";


export const ApiContext = createContext([]);

export const ApiContextProvider = ({ children }) => {
    const { userData } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])

    const getDistricts = async () => {
        setLoading(true)
        try {
            const districtsResponse = await fetch(`${Host.localhost}/districts/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Token ${userData.token}`,
                },
            });
            const districtsJson = await districtsResponse.json();
            setDistricts(districtsJson);
            // console.log(districtsJson)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const getVillages = async () => {
        setLoading(true)
        try {
            const villagesResponse = await fetch(`${Host.localhost}/villages/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userData.token}`,
                },
            });
            const villagesJson = await villagesResponse.json();
            setVillages(villagesJson);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDistricts();
        getVillages();
    }, []);

    return (
        <ApiContext.Provider value={{ districts, villages, loading }}>
            {children}
        </ApiContext.Provider>
    );
};
