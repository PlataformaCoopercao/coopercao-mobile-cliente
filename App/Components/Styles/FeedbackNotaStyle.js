import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity } from 'react-native'

const size = 42;
const WIDTH = 320;
const DISTANCE =  WIDTH / 5;
const END = WIDTH - DISTANCE;


export default StyleSheet.create({
  container: {
    flex: 1
  },
  wrap: {
    width: WIDTH,
    marginBottom: 30,
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
    fontWeight: '600',
    marginBottom: 50,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: 'transparent',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 30,
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  },

})