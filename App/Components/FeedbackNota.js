import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity } from 'react-native';
import styles from './Styles/FeedbackNotaStyle'

const REACTIONS = [
  { label: "Preocupado", src: require('../Images/worried.png'), bigSrc: require('../Images/worried_big.png') },
  { label: "Triste", src: require('../Images/sad.png'), bigSrc: require('../Images/sad_big.png') },
  { label: "Satisfeito", src: require('../Images/smile.png'), bigSrc: require('../Images/smile_big.png') },
  { label: "Feliz", src: require('../Images/ambitious.png'), bigSrc: require('../Images/ambitious_big.png') },
  { label: "Surpreso", src: require('../Images/surprised.png'), bigSrc: require('../Images/surprised_big.png') },
];

const WIDTH = 320;
const DISTANCE =  WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;

export default class FeedbackNota extends Component {

  constructor(props) {
    super(props);
    this._pan = new Animated.Value(2 * DISTANCE);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

        this.updatePan(offset);
      }
    });
  }

  updatePan(toValue) {
    Animated.spring(this._pan, { toValue, friction: 7 }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text style={styles.welcome}>
            Conte-nos como se sente:
          </Text>
          
          <View style={styles.line} />

          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u-20, u, u+20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];

              if (u-20 < 0) {
                inputRange = [u, u+20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u+20 > END) {
                inputRange = [u-20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }


              return (
                <TouchableOpacity onPress={() => this.updatePan(u)} activeOpacity={0.9} key={idx}>
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[styles.smiley, {
                        transform: [{
                          scale: this._pan.interpolate({
                            inputRange,
                            outputRange: scaleOutputRange,
                            extrapolate: 'clamp',
                          })
                        }]
                      }]}
                    />
                  </View>

                  <Animated.Text style={[styles.reactionText, {
                    top: this._pan.interpolate({
                      inputRange,
                      outputRange: topOutputRange,
                      extrapolate: 'clamp',
                    }),
                    color: this._pan.interpolate({
                      inputRange,
                      outputRange: colorOutputRange,
                      extrapolate: 'clamp',
                    })
                  }]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View {...this._panResponder.panHandlers} style={[styles.bigSmiley, {
              transform: [{
                translateX: this._pan.interpolate({
                  inputRange: [0, END],
                  outputRange: [0, END],
                  extrapolate: 'clamp',
                })
              }]
            }]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[styles.bigSmileyImage, {
                      opacity: this._pan.interpolate({
                        inputRange,
                        outputRange,
                        extrapolate: 'clamp',
                      })
                    }]}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}