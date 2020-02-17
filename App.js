import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TextInput, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';

let workActive = false;
let countInterval
// let startButton = document.getElementById("startButton")
// let stopButton = document.getElementById("stopButton")
export default class App extends React.Component {
  constructor() {
    super()
    this.myUi = React.createRef()
    this.state = {
      count: 0,
      workMinutes: 0,
      pauseMinutes: 0,
      workTime: true,
    }
  }

  minutesLeft() {
    return Math.floor(this.state.count / 60)
  }

  secondsLeft() {
    return this.state.count % 60
  }


  setTimer(remainingTime) {
    console.log('setTimer', remainingTime)
    this.setState({
      count: remainingTime * 60
    }).bind(this)
    console.log('setTimer ende', remainingTime)
  }


  countDown() {
    console.log('this.state.count in timeout/intervall', this.state.count)
    this.setState({
      // count: this.state.count - 1
      count: this.state.count - 1
    })
    // this.setTimer(this.state.count - 1).bind(this)
    console.log('countDownlog')
    if (this.state.count === 0) {
      Vibration.vibrate(1000)
      this.stopCount()
      workActive = false
      let work = this.state.workTime
      console.log('countDown this.state.workTime', this.state.workTime)
      this.setState({workTime: !work})
      console.log('countDown2 this.state.workTime', this.state.workTime)
      this.startCount()
    }
  }


  startCount() {
    console.log('startCount workMinutes:', document.getElementById("workMinutes").value)
    console.log('type workMinutes:', typeof(document.getElementById("workMinutes").value))
    console.log('startCount pauseMinutes:', document.getElementById("pauseMinutes").value)
    console.log('type pauseMinutes:', typeof(document.getElementById("pauseMinutes").value))
    // console.log('this.myui', this.myUi)
    //check if timer is running
    if (workActive === false) {
      console.log('workactive in startcount == false')
      let countTime = 99
      if (this.state.count === 0 && workActive === false) {
        console.log('if count === 0 && !workActive?')


        // if (isNaN(this.state.workMinutes) || this.state.workMinutes <= 0) {
        //   console.log('if not 1: this.state.count', this.state.count)
        //   console.log('if  not?')
        //   // (() => this.setTimer(25))

        //   // {() => this.setState({workMinutes: 25})}

        //   console.log('if not 2: this.state.count', this.state.count)
        // }
        // let pauseMinutes = document.getElementById("pauseMinutes").value
        console.log('workminutes input', this.state.workMinutes)
        console.log('pauseminutes input', this.state.pauseMinutes)
        if (this.state.workTime) {
          // if (isNaN(Number(this.state.workMinutes)) || this.state.workMinutes <= 0) {
          if (isNaN(document.getElementById("workMinutes").value) || document.getElementById("workMinutes").value <= 0) {
          // if (document.getElementById("workMinutes").value <= 0) {
            countTime = 25 * 60
          } else {

            countTime = document.getElementById("workMinutes").value
            // countTime = this.myUi
            // countTime = this.state.workMinutes
          }
        } else {
          // if (isNaN(this.state.pauseMinutes) || this.state.pauseMinutes <= 0) {
          if (isNaN(document.getElementById("pauseMinutes").value) || document.getElementById("pauseMinutes").value <= 0) {
            countTime = 5 * 60
          } else {
            countTime = document.getElementById("pauseMinutes").value
            // countTime = this.state.pauseMinutes
          }
        }
        this.setState({
          count: countTime
        })
      }
      workActive = true
      console.log('this.state.count', this.state.count)
      // let countText = document.getElementById("count")
      // let newCount = this.state.count - 1 

      countInterval = setInterval(() => {
        this.countDown()

      }, 1000)
      console.log('end of startcount')
    }
  }
  stopCount() {
    console.log('stopCount')
    workActive = false
    let startButton = document.getElementById("startButton")
    // startButton.disabled = false
    clearInterval(countInterval)
  }
  resetTimer() {
    console.log('reset1: this.state.count', this.state.count)

    this.stopCount()
    workActive = false
    console.log('reset 2: this.state.count', this.state.count)

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.big}>Pomodoro Timer</Text>
        <View style={styles.rowContainer}>
          <Text>{this.state.workTime ? "Work time: " : "Rest time:"}</Text>
          <Text id="count"> {this.minutesLeft()} : {this.secondsLeft()} </Text>
        </View>
        <ScrollView>
          <View style={styles.rowContainer}>
            <Text>Work time: </Text>
            <TextInput id="workMinutes" placeholder='25' style={styles.input} ref={this.myUi}></TextInput>
            {/* <TextInput id="workMinutes" placeholder='25' style={styles.input} onChangeText={(work) => {
              this.setState({ workMinutes })
            }}></TextInput> */}
          </View>
          <View style={styles.rowContainer}>
            <Text>Pause time: </Text>
            <TextInput id="pauseMinutes" placeholder='5' style={styles.input}></TextInput>
          </View>
          <View style={styles.rowContainer}>
            <Button id="startButton" title="start" onPress={() => this.startCount()} style={styles.button} />
            <Button id="stopButton" title="stop" onPress={() => this.stopCount()} style={styles.button} />
            <Button id="resetButton" title="reset" onPress={() => this.resetTimer()} style={styles.button} />
          </View>
          <Text> test</Text>
          <Text>I Love Lulu!</Text>
          <Switch checked={true}></Switch>

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
    padding: 10,
    height: 20,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    padding: 40,
    fontSize: 20,
    borderWidth: 1,
  }
});
