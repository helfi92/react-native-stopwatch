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
      timeElapsed: null
    }
  },

 render: function() {
   return <View style={styles.container}>
      <View style={[styles.header, this.border('yellow')]}>
        <View style={[styles.timerWrapper, this.border('red')]}>
          <Text>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[this.border('green'), styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer, this.border('blue')]}>
        <Text>
          I am a list of Laps
        </Text>
      </View>
   </View>
 },
 handleStartPress: function() {
   var startTime = new Date();
   setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime
      });
   }, 30);
 },
 startStopButton: function() {
   return (
     <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}>
       <Text>
         Start
       </Text>
     </TouchableHighlight>
   )
 },
 lapButton: function() {
   return <View>
     <Text>
       Lap
     </Text>
   </View>
 },
 border: function(color) {
   return {
     borderColor: color,
     borderWidth: 4
   }
 }
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
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
