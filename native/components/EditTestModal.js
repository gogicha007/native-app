import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'

const EditTestModal = (props) => {
    // console.log(props.data)
    const [id, setId] = useState(props.data.id)
    const [idx, setIdx] = useState(props.data.idx)
    const [date, setDate] = useState(props.data.date)
    const [validDate, setValidDate] = useState(false)
    const [debit, setDebitA] = useState(!props.data.debit ? '0' : props.data.debit.toString())
    const [debitb, setDebitB] = useState(!props.data.debitb ? '0' : props.data.debitb.toString())
    const [turbidity, setTurbidity] = useState(!props.data.turbidity ? '0' : props.data.turbidity.toString())
    const [bact, setBact] = useState(!props.data.bact ? '0' : props.data.bact.toString())
    const [laqt, setLaqt] = useState(!props.data.laqt ? '0' : props.data.laqt.toString())
    const [ecoli, setEcoli] = useState(!props.data.ecoli ? '0' : props.data.ecoli.toString())
    const [coliphages, setColiphages] = useState(!props.data.coliphages ? '0' : props.data.coliphages.toString())
    // check date validity
    const isValidDate = () => {
        let pattern = /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/
        let m = date.match(pattern)
        !m ? setValidDate(false) : setValidDate(true)
    }
    useEffect(() => {
        isValidDate();
    }, [date])
    // check test data
    const checkData = () => {
        return validDate && debit
    }
    // update Test
    const updateTest = () => {
        if (checkData()) {
            props.editModalVisible(false)
            props.editTestData([
                {
                    id: id,
                    idx: idx,
                    date: date,
                    debit: debit,
                    debitb: !debitb ? 0 : debitb,
                    turbidity: !turbidity ? 0 : turbidity,
                    bact: !bact ? 0 : bact,
                    laqt: !laqt ? 0 : laqt,
                    ecoli: !ecoli ? 0 : ecoli,
                    coliphages: !coliphages ? 0 : coliphages,
                }
            ])
        } else {
            alert('შეავსეთ სრულად...')
        }
    }
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={[styles.titles, { marginBottom: 15 }]}>სწრაფი ტესტი</Text>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>თარიღი: </Text>
                    <TextInput
                        style={[styles.input, !validDate && { color: 'red' }, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setDate(text)}
                        placeholder="რრ-თთ-წწწწ"
                        value={date}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>დებეტი A: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setDebitA(text)}
                        value={debit}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>დებეტი B: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setDebitB(text)}
                        value={debitb}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>სიმღვრივე: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setTurbidity(text)}
                        value={turbidity}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>ბაქტერიები: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setBact(text)}
                        value={bact}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>ლაქტოზა: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setLaqt(text)}
                        value={laqt}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>ჩხირი: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setEcoli(text)}
                        value={ecoli}
                    />
                </View>
                <View style={styles.modalInputWrapper}>
                    <Text style={[styles.titles, styles.modalTitles]}>კოლიფაგ: </Text>
                    <TextInput
                        style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
                        onChangeText={text => setColiphages(text)}
                        value={coliphages}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={[styles.button, { marginRight: 20 }]}
                        onPress={updateTest}>
                        <Text
                            style={{ fontSize: 14, fontWeight: 'bold', color: '#FEC200', alignSelf: 'center' }}
                        >
                            შენახვა
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button]}
                        onPress={() => props.editModalVisible(false)}>
                        <Text
                            style={{ fontSize: 14, fontWeight: 'bold', color: '#FEC200', alignSelf: 'center' }}
                        >
                            გაუქმება
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default EditTestModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 530,
        width: 350,
        backgroundColor: '#E2DAFF',
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        height: 30,
        width: 100,
        marginTop: 12,
        borderRadius: 12,
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#6E47FF',
    },
    modalInputWrapper: {
        height: 42,
        width: 300,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: '#6E47FF',
        borderRadius: 12,
        flexDirection: 'row'
    },
    modalTitles: {
        height: 40,
        marginTop: 0,
        marginLeft: 5,
        textAlignVertical: 'center',
        borderRightWidth: 0.5,
        borderRightColor: '#6E47FF'
    },
    input: {
        paddingLeft: 5,
        color: '#4830A8'
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