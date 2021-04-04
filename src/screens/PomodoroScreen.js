import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  Pressable,
  Vibration,
  StyleSheet,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import TimerSettingsModal from "../components/TimerSettingsModal";
import * as Time from "../utils/timer";
import * as TIMER from "../utils/timer_constants";

export default function PomodoroScreen() {
  const [key, setKey] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(1200); // seconds
  const [completed, setCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const playAgain = () => {
    if (completed) {
      setCompleted(false);
      setDuration(duration);
      setPlaying(true);
      setKey(Math.floor(Math.random() * 100) + 1);
    }
  };

  const resetTimer = () => {
    setCompleted(false);
    setDuration(duration);
    setPlaying(false);
    setKey(Math.floor(Math.random() * 100) + 1);
    Vibration.vibrate(TIMER.RESET_PATTERN, false);
  };

  const onFinish = () => {
    Vibration.vibrate(TIMER.FINISH_PATTERN, false);
    setCompleted(true);
  };

  const renderTime = ({ remainingTime }) => (
    <Text style={styles.remainingTime}>
      {remainingTime === 0 ? (
        <FontAwesome name="repeat" size={48} color="black" />
      ) : (
        Time.formatTime(remainingTime)
      )}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TimerSettingsModal closeModal={() => setModalVisible(false)} />
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="black"
          style={styles.settings}
        />
      </TouchableOpacity>
      <View style={styles.timer}>
        <Pressable
          onPress={() =>
            completed === true ? playAgain() : setPlaying(!isPlaying)
          }
          onLongPress={() => resetTimer()}
        >
          <CountdownCircleTimer
            key={key}
            size={300}
            strokeWidth={14}
            colors="#D85963"
            duration={duration}
            isPlaying={isPlaying}
            onComplete={() => onFinish()}
          >
            {renderTime}
          </CountdownCircleTimer>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  settings: {
    alignSelf: "flex-end",
    paddingTop: 12,
    paddingRight: 12,
  },
  timer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  timerSettings: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  timerSettingText: {
    fontSize: 24,
    fontFamily: "Roboto",
    paddingBottom: 2,
    paddingHorizontal: 10,
  },
});
