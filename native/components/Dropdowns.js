import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ApiContext } from '../context/ApiContext';
import { useTheme } from '@react-navigation/native';


export const DropdownDistricts = (props) => {
    const { districtId } = props
    const { districts, loading } = useContext(ApiContext)
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    const theme = useTheme()

    useEffect(() => {
        if (districtId > 0) {
            setValue(districtId)
        }
    }, [])

    return (
        <Dropdown
            // mode='modal'
            style={[
                styles.dropdown, 
                {borderColor: theme.colors.border}, 
                isFocus && { borderColor: theme.colors.border }]}
            placeholderStyle={styles.textStyle}
            selectedTextStyle={styles.textStyle}
            itemContainerStyle={{ height: 55 }}
            itemTextStyle={styles.textStyle}
            data={districts}
            maxHeight={300}
            labelField="name"
            valueField="ind"
            placeholder={!isFocus ? 'მუნიციპალიტეტი...' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.ind);
                setIsFocus(false);
                props.onChange(item.ind);
            }}
        />
    );
};

export const DropdownVillages = (props) => {
    const { villageId, districtId } = props
    const { villages, loading } = useContext(ApiContext)
    // const [filter, setFilter] = useState(villages.filter(villageSet => villageSet.district === districtId))
    const [value, setValue] = useState(villageId>0 ? villageId : '');
    const [isFocus, setIsFocus] = useState(false);

    const theme = useTheme()
    
    return (
        <Dropdown
            // mode = 'modal'
            style={[
                styles.dropdown, 
                {borderColor: theme.colors.border}, 
                isFocus && { borderColor: theme.colors.border }]}
            placeholderStyle={styles.textStyle}
            selectedTextStyle={styles.textStyle}
            itemContainerStyle={{ height: 55 }}
            itemTextStyle={styles.textStyle}
            data={districtId > 0 ? villages.filter(villageSet => villageSet.district === props.districtId) : []}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocus ? 'სოფელი...' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.id);
                setIsFocus(false);
                props.onChange(item.id);
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 35,
        // borderColor: '#4830A8',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    textStyle: {
        alignSelf: 'center',
        paddingTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#987400',
    },
});