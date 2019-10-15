import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyle from '../constants/default-styles'
import { Ionicons } from '@expo/vector-icons'
import MainButton from '../components/MainButton'
import DefaultStyles from '../constants/default-styles'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = (numOfRounds, itemData) => (
  <View style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{numOfRounds - itemData.index}</Text>
    <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
  </View>
)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
        {
          text: 'Sorry!', style: 'cancel'
        }
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    }
    if (direction === 'greater') {
      currentLow.current = currentGuess + 1
    }
    const newGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(newGuess)
    setPastGuess(curState => [newGuess.toString(), ...curState])
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.bodyText}>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white"/>
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/*<ScrollView contentContainerStyle={styles.list}>*/}
        {/*  {pastGuess.map((g, index) => renderListItem(g, pastGuess.length - index))}*/}
        {/*</ScrollView>*/}
        <FlatList keyExtractor={item => item} data={pastGuess} contentContainerStyle={styles.list}
                  renderItem={renderListItem.bind(this, pastGuess.length)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default GameScreen
