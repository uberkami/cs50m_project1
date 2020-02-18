import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TextInput, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';

let workActive = false;
let countInterval

export default class App extends React.Component {
  constructor() {
    super()
    this.myUi = React.createRef()
    this.state = {
      count: (25*60),
      workMinutes: 25,
      pauseMinutes: 5,
      workTime: true,
    }
  }

  minutesLeft() {
    return Math.floor(this.state.count / 60)
  }


  secondsLeft() {
    return this.state.count % 60
  }


  countDown() {
    console.log('this.state.count in timeout/intervall', this.state.count)
    this.setState({
      count: this.state.count - 1
    })
    console.log('countDownlog')
    if (this.state.count === 0) {
      Vibration.vibrate(1000)
      this.stopCount()
      workActive = false
      let work = this.state.workTime
      console.log('countDown this.state.workTime', this.state.workTime)
      this.setState({ workTime: !work })
      console.log('countDown2 this.state.workTime', this.state.workTime)
      this.startCount()
    }
  }


  startCount() {
    //check if timer is running
    if (workActive === false) {
      console.log('workactive in startcount == false')
      let countTime = 99
      if (this.state.count === 0 && workActive === false) {
        console.log('if count === 0 && !workActive?')
        console.log('workminutes input', this.state.workMinutes)
        console.log('pauseminutes input', this.state.pauseMinutes)
        if (this.state.workTime) {
          if (isNaN(this.state.workMinutes) || this.state.workMinutes <= 0) {
            countTime = 25 * 60
          } else {
            countTime = (this.state.workMinutes * 60)
          }
        } else {
          if (isNaN(this.state.pauseMinutes) || this.state.pauseMinutes <= 0) {
            countTime = 5 * 60
          } else {
            countTime = (this.state.pauseMinutes * 60)
          }
        }
        this.setState({
          count: countTime
        })
      }
      workActive = true
      console.log('this.state.count', this.state.count)
      countInterval = setInterval(() => {
        this.countDown()
      }, 1000)
      console.log('end of startcount')
    }
  }


  stopCount() {
    console.log('stopCount')
    workActive = false
    clearInterval(countInterval)
  }


  resetTimer() {
    console.log('reset1: this.state.count', this.state.count)
    if (isNaN(this.state.workMinutes) || this.state.workMinutes <= 0) {
    this.setState({
      workTime: true,
      count: (25*60),
    })
    } else {
      this.setState({
        workTime: true,
        count: (this.state.workMinutes * 60),
      })
    }
    this.stopCount()
    workActive = false
    console.log('reset 2: this.state.count', this.state.count)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.big}>Pomodoro Timer</Text>
        <View style={styles.rowContainer}>
          <Text >{this.state.workTime ? "Work time: " : "Rest time:"}</Text>
          <Text id="count" style={styles.timer}> {this.minutesLeft()} : {this.secondsLeft()} </Text>
        </View>
        <ScrollView>
          <View style={styles.rowContainer}>
            <Text>Work time: </Text>
            <TextInput id="workMinutes" placeholder='25' style={styles.input} onChangeText={(workMinutes) => this.setState({ workMinutes })}
            ></TextInput>
          </View>
          <View style={styles.rowContainer}>
            <Text>Pause time: </Text>
            <TextInput id="pauseMinutes" placeholder='5' style={styles.input} onChangeText={(pauseMinutes) => this.setState({ pauseMinutes })}
            ></TextInput>
          </View>
          <View style={styles.rowContainer}>
            <Button id="startButton" title="start" onPress={() => this.startCount()} style={styles.button} />
            <Text>   </Text>
            <Button id="stopButton" title="stop" onPress={() => this.stopCount()} style={styles.button} />
            <Text>   </Text>
            <Button id="resetButton" title="reset" onPress={() => this.resetTimer()} style={styles.button} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  big: {
    flex: 1,
    color: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: Constants.statusBarHeight,

  },
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    height: 50,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    margin: 202,
    padding: 400,
    fontSize: 20,
    borderWidth: 1,
  },
  timer: {
    alignSelf: 'stretch',
    padding: 0,
    fontSize: 40,

  }
});
