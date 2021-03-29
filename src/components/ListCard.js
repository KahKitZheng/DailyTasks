import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function ListCard(props) {
  const { navigation } = props;
  const { title, color, description, sublists } = props.list;

  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  function getCardSize(event) {
    const { width, height } = event.nativeEvent.layout;

    setCardWidth(width);
    setCardHeight(height - 6);
  }

  return (
    <Shadow
      startColor="#00000010"
      distance={8}
      offset={[6, 3]}
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
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
});
