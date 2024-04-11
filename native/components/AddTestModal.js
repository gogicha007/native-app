import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'

const AddTestModal = (props) => {
  const [date, setDate] = useState('')
  const [validDate, setValidDate] = useState(false)
  const [debit, setDebitA] = useState('')
  const [debitb, setDebitB] = useState('')
  const [turbidity, setTurbidity] = useState('')
  const [bact, setBact] = useState('')
  const [laqt, setLaqt] = useState('')
  const [ecoli, setEcoli] = useState('')
  const [coliphages, setColiphages] = useState('')
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
  // add Test
  const addTest = () => {
    if (checkData()) {
      setDate('')
      setDebitA('')
      setDebitB('')
      setTurbidity('')
      setBact('')
      setLaqt('')
      setEcoli('')
      setColiphages('')
      //
      props.addModalVisible(false)
      props.sendNewTest([
        {
          id: 0,
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
            placeholder='0'
            value={debit}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>დებეტი B: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setDebitB(text)}
            placeholder='0'
            value={debitb}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>სიმღვრივე: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setTurbidity(text)}
            placeholder='0'
            value={turbidity}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>ბაქტერიები: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setBact(text)}
            placeholder='0'
            value={bact}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>ლაქტოზა: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setLaqt(text)}
            placeholder='0'
            value={laqt}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>ჩხირი: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setEcoli(text)}
            placeholder='0'
            value={ecoli}
          />
        </View>
        <View style={styles.modalInputWrapper}>
          <Text style={[styles.titles, styles.modalTitles]}>კოლიფაგ: </Text>
          <TextInput
            style={[styles.input, Platform.select({ web: { outlineStyle: 'none', } })]}
            onChangeText={text => setColiphages(text)}
            placeholder='0'
            value={coliphages}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={[styles.button, styles.buttonClose, { marginRight: 20 }]}
            onPress={addTest}>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', color: '#FEC200', alignSelf: 'center' }}
            >
              დამატება
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.addModalVisible(false)}>
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

export default AddTestModal

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