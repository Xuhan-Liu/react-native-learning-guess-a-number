import React, { useState } from 'react'
import { Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import DefaultStyle from '../constants/default-styles'
import MainButton from '../components/MainButton'

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
  }
  let confirmedOutput = <Text/>
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onConfirm(selectedNumber)}>START GAME</MainButton>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyle.bodyText}>Select a Number</Text>
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
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
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
    alignItems: 'center',
  }
})

export default StartGameScreen
