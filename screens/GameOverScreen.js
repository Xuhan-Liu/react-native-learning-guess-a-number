import React from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import DefaultStyle from '../constants/default-styles'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover"/>
        {/*<Image*/}
        {/*  fadeDuration={3000}*/}
        {/*  style={styles.image}*/}
        {/*  source={{ uri: 'https://pbs.twimg.com/profile_images/438756755397300224/kp8rmJes_400x400.jpeg' }}/>*/}
      </View>
      <Text style={{ ...DefaultStyle.bodyText, ...styles.resultText }}>You phone needed <Text
        style={styles.highlight}>{props.rounds}</Text> rounds
        to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
      <MainButton onPress={props.restart}>NEW GAME</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 30,
    overflow: 'hidden'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  }
})

export default GameOverScreen
