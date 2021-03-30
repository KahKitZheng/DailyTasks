import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BaseButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";

export default function ListCard(props) {
  const { navigation } = props;
  const { id, title, color, description, sublists } = props.list;

  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  function getCardSize(event) {
    const { width, height } = event.nativeEvent.layout;

    setCardWidth(width);
    setCardHeight(height - 6);
  }

  const renderLeftActions = () => (
    <BaseButton rippleColor="#fff" onPress={() => props.handleDeleteList(id)}>
      <View style={styles.iconDelete}>
        <Ionicons name="close-sharp" size={24} color={"#000"} />
      </View>
    </BaseButton>
  );

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <Shadow
        startColor="#00000010"
        distance={8}
        offset={[24, 7]}
        size={[cardWidth, cardHeight]}
      >
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() =>
            navigation.navigate("List Details", {
              listTitle: title,
              listColor: color,
              subLists: sublists,
            })
          }
        >
          <View style={styles.wrapper}>
            <View
              style={[
                styles.accentBorder,
                { borderColor: color, backgroundColor: color },
              ]}
            />
            <View
              style={[styles.container, { borderLeftColor: color }]}
              onLayout={(event) => getCardSize(event)}
            >
              <Text style={styles.cardTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingTop: 4,
    paddingHorizontal: 20,
  },
  accentBorder: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderWidth: 4,
    height: 100,
  },
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#fff",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginBottom: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  cardDescription: {
    color: "#7F8A9D",
    lineHeight: 18,
    paddingTop: 4,
  },
  iconDelete: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    paddingRight: 15,
  },
});
