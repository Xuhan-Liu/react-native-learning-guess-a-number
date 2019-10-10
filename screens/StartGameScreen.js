import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = input => {
    setEnteredValue(input.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
  }

  const confirmInputHandler = () => {
    Keyboard.dismiss()
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler }
      ])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    props.onConfirm(chosenNumber)
  }
  let confirmedOutput = <Text/>
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <View>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <Button title="START GAME" onPress={() => {}}/>
        </View>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input style={styles.input}
                 blurOnSubmit autoCapitalize='none'
                 autoCorrect={false}
                 keyboardType='number-pad'
                 maxLength={2}
                 value={enteredValue}
                 onChangeText={numberInputHandler}/>
          <View style={styles.btnContainer}>
            <View style={styles.btn}><Button color={Colors.accent} title="Reset"
                                             onPress={resetInputHandler}/></View>
            <View style={styles.btn}><Button color={Colors.primary} title="Confirm"
                                             onPress={confirmInputHandler}/></View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  btn: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen
