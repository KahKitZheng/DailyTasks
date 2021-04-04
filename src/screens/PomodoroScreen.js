import React, { useState } from "react";
import {
  Animated,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";

export default function PomodoroScreen() {
  const [key, setKey] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(5); // seconds
  const [completed, setCompleted] = useState(false);

  const ONE_SECOND_IN_MS = 1000;

  /**
   * Odd indices are the pauses and even indices the duration
   */
  const PATTERN = [
    // Start immediately
    0 * ONE_SECOND_IN_MS,

    0.5 * ONE_SECOND_IN_MS,
    0 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS,

    0.5 * ONE_SECOND_IN_MS,

    0.5 * ONE_SECOND_IN_MS,
    0 * ONE_SECOND_IN_MS,
    0.5 * ONE_SECOND_IN_MS,
  ];

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
      <Animated.Text style={styles.remainingTime}>
        {remainingTime === 0 ? (
          <FontAwesome name="repeat" size={48} color="black" />
        ) : (
          `${formattedMinutes}:${formattedSeconds}`
        )}
      </Animated.Text>
    );
  };

  console.log({ completed, duration, isPlaying });

  const handlePlayAgain = () => {
    if (completed) {
      setCompleted(false);
      setDuration(5);
      setPlaying(true);
      setKey(Math.floor(Math.random() * 100) + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          completed === true ? handlePlayAgain() : setPlaying(!isPlaying);
        }}
      >
        <CountdownCircleTimer
          key={key}
          size={300}
          strokeWidth={14}
          isPlaying={isPlaying}
          duration={duration}
          colors="#D85963"
          onComplete={() => {
            setCompleted(true);
            Vibration.vibrate(PATTERN, false);
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPlaying(false);
          setDuration(1500);
          setKey(Math.floor(Math.random() * 100) + 1);
        }}
      >
        <Text>25:00</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  remainingTime: {
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "Roboto",
    color: "#000",
  },
  button: {
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Roboto",
    margin: 20,
    backgroundColor: "#D85963",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
