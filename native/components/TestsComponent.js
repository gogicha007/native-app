import React, { useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View, Modal, Image, Pressable } from 'react-native'
import AddTestModal from './AddTestModal';
import DeleteTestModal from './DeleteTestModal';
import EditTestModal from './EditTestModal';

const TestsComponent = (props) => {
    const { locationData } = props;
    const theme = useTheme()
    // tests
    const [testNumber, setTestNumber] = useState(0)  // number of tests
    const [currentTest, setCurrentTest] = useState(0)
    const [resultsList, setResultsList] = useState([])
    const [deletedList, setDeletedList] = useState([])
    //CRUD modals
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    // append Tests
    const appendTests = (data) => {
        setResultsList([...resultsList, { ...data[0], idx: testNumber + 1 }])
        setCurrentTest(resultsList.length + 1)
        setTestNumber(testNumber + 1)
    }
    // edit test
    const editTest = (data) => {
        setResultsList(resultsList.map((result) => result.idx === data[0].idx ? data[0] : result))
    }
    // delete test
    const deleteTest = (idx, id) => {
        console.log(deletedList)
        if (id > 0) {
            let deleted = [...deletedList, id]
            console.log('deletes list', deleted)
            setDeletedList([...deletedList, id])
            props.delTests(deleted)
        }

        let newResults = resultsList.filter(result => result.idx !== idx)
        setResultsList(newResults)
        setCurrentTest(newResults.length)
        props.sendTests(newResults)
        setDeleteModalVisible(false)
    }
    // update main list
    useEffect(() => {
        props.sendTests(resultsList)
    }, [resultsList])
    // populate initial data if any
    useEffect(() => {
        if (locationData.length > 0) {
            let results = locationData.map((item, i) => ({ ...item, idx: i + 1 }))
            setResultsList(results)
            setCurrentTest(locationData.length)
            setTestNumber(locationData.length)
        }
    }, [])

    useEffect(() => {
        console.log('resultsList', resultsList)
        console.log('deleted list', deletedList)
    }, [resultsList, deletedList])

    return (
        <View>
            <Text style={[styles.titles, { marginTop: 3, fontStyle: 'italic', color: theme.colors.text }]}>ანალიზები:</Text>
            <View style={styles.testContainer}>
                <Pressable
                    disabled={resultsList.length === 0 ? true : false}
                    style={styles.testDetails}
                    onLongPress={() => { setEditModalVisible(true) }}>
                    <View style={styles.testNumber}>
                        <Text style={styles.testText}>{currentTest > 0 && resultsList[currentTest - 1].idx}</Text>
                    </View>
                    <View style={styles.testInfo}>
                        <Text style={styles.testText}>თარიღი: {currentTest > 0 && resultsList[currentTest - 1].date}</Text>
                        <Text style={styles.testText}>დებეტი A: {currentTest > 0 && resultsList[currentTest - 1].debit}</Text>
                        <Text style={styles.testText}>დებეტი B: {currentTest > 0 && resultsList[currentTest - 1].debitb}</Text>
                        <Text style={styles.testText}>სიმღვრივე: {currentTest > 0 && resultsList[currentTest - 1].turbidity}</Text>
                        <Text style={styles.testText}>ბაქტერიები: {currentTest > 0 && resultsList[currentTest - 1].bact}</Text>
                        <Text style={styles.testText}>ლაქტოზა: {currentTest > 0 && resultsList[currentTest - 1].lact}</Text>
                        <Text style={styles.testText}>ჩხირი: {currentTest > 0 && resultsList[currentTest - 1].ecoli}</Text>
                        <Text style={styles.testText}>კოლიფაგ: {currentTest > 0 && resultsList[currentTest - 1].coliphages}</Text>
                    </View>
                </Pressable>
                <View style={styles.testButtons}>
                    <Pressable
                        onPress={() => { currentTest > 1 && setCurrentTest(currentTest - 1) }}
                    >
                        <Image
                            source={require('../assets/double-arrow-top-icon.png')}
                            style={{ tintColor: '#FEC200', height: 25, width: 25, }} />
                    </Pressable>
                    <Pressable onPress={() => { setAddModalVisible(true) }}>
                        <Image
                            source={require('../assets/plus-icon.png')}
                            style={{ tintColor: '#FEC200', height: 25, width: 25, }} />
                    </Pressable>
                    <Pressable
                        disabled={resultsList.length === 0 ? true : false}
                        onLongPress={() => { setDeleteModalVisible(true) }}>
                        <Image
                            source={require('../assets/incorrect-icon.png')}
                            style={{ tintColor: '#f44336', height: 22, width: 22, }} />
                    </Pressable>
                    <Pressable onPress={() => { currentTest != resultsList.length && setCurrentTest(currentTest + 1) }}>
                        <Image
                            source={require('../assets/double-arrow-bottom-icon.png')}
                            style={{ tintColor: '#FEC200', height: 25, width: 25, }} />
                    </Pressable>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => {
                    setAddModalVisible(!addModalVisible);
                }}>
                <AddTestModal addModalVisible={setAddModalVisible} sendNewTest={appendTests} />
            </Modal>
            <Modal
                animationType='slide'
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => { setDeleteModalVisible(false) }}>
                <DeleteTestModal
                    deleteModalVisible={setDeleteModalVisible}
                    idx={resultsList.length > 0 && resultsList[currentTest - 1].idx}
                    id={resultsList.length > 0 && resultsList[currentTest - 1].id}
                    deleteTest={deleteTest} />
            </Modal>
            <Modal
                animationType='slide'
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => { setEditModalVisible(false) }}>
                <EditTestModal
                    editModalVisible={setEditModalVisible}
                    data={resultsList.length > 0 && resultsList[currentTest - 1]}
                    idx={resultsList.length > 0 && resultsList[currentTest - 1].idx}
                    editTestData={editTest}
                />
            </Modal>
        </View>
    )
}

export default TestsComponent

const styles = StyleSheet.create({
    // tests
    testContainer: {
        flexDirection: 'row',
        width: '85%',
        height: 240,
        backgroundColor: '#E2DAFF',
        borderRadius: 12,
        marginLeft: 15,
        marginBottom: 25,
    },
    testDetails: {
        flexDirection: 'row',
        height: 180,
        marginLeft: 10,
        alignSelf: 'center',
        backgroundColor: '#4830A8',
        borderRadius: 12,
    },
    testNumber: {
        width: 34,
        backgroundColor: '#6E47FF',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    testInfo: {
        marginLeft: 5,
        width: 230,
        alignSelf: 'center'
    },
    testText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F5F7FB',
    },
    testButtons: {
        marginLeft: 20,
        marginVertical: 14,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    titles: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },

})