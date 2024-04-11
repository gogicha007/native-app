import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const DeleteTestModal = (props) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={[styles.titles, { marginBottom: 15 }]}>წავშალოთ ტესტი # {props.idx} ?</Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={[styles.button, { marginRight: 20 }]}
            onPress={() => props.deleteTest(props.idx, props.id)}>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', color: '#FEC200', alignSelf: 'center' }}
            >
              წაშლა
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, ]}
            onPress={() => props.deleteModalVisible(false)}>
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

export default DeleteTestModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 120,
    width: 300,
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
  titles: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    color: '#4830A8',
    fontSize: 14,
    fontWeight: 'bold'
  },
})