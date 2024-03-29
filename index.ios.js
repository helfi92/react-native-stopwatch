import React from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },

 render: function() {
   return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>
   </View>
 },
 laps: function() {
   return this.state.laps.map((time, index) => {
     return <View key={index} style={styles.lap}>
      <Text style={styles.lapText}>
        Lap #{index + 1}
      </Text>
      <Text style={styles.lapText}>{formatTime(time)}</Text>
     </View>
   })
 },
 handleStartPress: function() {
   if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
   }

   this.setState({
     startTime: new Date(),
   });

   this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
   }, 30);
 },
 handleLapPress: function() {
   var lap = this.state.timeElapsed;

   this.setState({
     startTime: new Date(),
     laps: this.state.laps.concat([lap])
   });
 },
 startStopButton: function() {
   var style = this.state.running ? styles.stopButton : styles.startButton;
   return (
     <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style]} >
       <Text>
         {this.state.running ? 'Stop' : 'Start'}
       </Text>
     </TouchableHighlight>
   )
 },
 lapButton: function() {
   return <TouchableHighlight
      underlayColor="gray"
      style={styles.button}
      onPress={this.handleLapPress} >
     <Text>
       Lap
     </Text>
   </TouchableHighlight>
 },

});

var styles= StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: {
    flex: 0.62,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 0.38,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
