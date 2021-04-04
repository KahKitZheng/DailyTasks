import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "../utils/timer";
import { ROUNDS, WORK_TIMERS, BREAK_TIMERS } from "../utils/timer_constants";

export default function TimerSettingsModal({ closeModal }) {
  const [workTimer, setWorkTimer] = useState(1200);
  const [breakTimer, setBreakTimer] = useState(300);
  const [round, setRound] = useState(4);

  const isActive = (item) => {
    if (
      (item.duration === workTimer && item.type === "work") ||
      (item.duration === breakTimer && item.type === "break") ||
      item.round === round
    ) {
      return true;
    }
  };

  const handleOnPress = (isDuration) => {
    const settings = { round, workTimer, breakTimer };
    isDuration ? callBack(item.duration) : callBack(item.round);
  };

  const renderButton = (item, isDuration) => (
    <TouchableOpacity
      onPress={() => handleOnPress}
      style={[
        styles.button,
        { backgroundColor: isActive(item) ? "#C0C0C0" : null },
      ]}
    >
      <Text style={styles.duration}>
        {isDuration ? formatTime(item.duration, "MIN") : item.round}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
        <Ionicons name="close-sharp" size={24} color={"#000"} />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>Pomodoro Settings</Text>
      <Text style={styles.label}>Round:</Text>
      <FlatList
        data={ROUNDS}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={3}
        renderItem={({ item }) => renderButton(item, false, setRound)}
      />
      <Text style={styles.label}>Work timer:</Text>
      <FlatList
        data={WORK_TIMERS}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={3}
        renderItem={({ item }) => renderButton(item, true, setWorkTimer)}
      />
      <Text style={styles.label}>Break timer:</Text>
      <FlatList
        data={BREAK_TIMERS}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={3}
        renderItem={({ item }) => renderButton(item, true, setBreakTimer)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Roboto",
    marginTop: 40,
    marginBottom: 30,
  },
  row: {
    alignSelf: "stretch",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  button: {
    marginTop: 4,
    marginRight: 14,
    marginBottom: 34,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  duration: {
    fontSize: 18,
    fontFamily: "Roboto",
  },
});
