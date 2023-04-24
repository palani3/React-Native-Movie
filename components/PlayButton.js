import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default class PlayButton extends React.PureComponent {
  render() {
    const { handelPress } = this.props;
    return (
      <View style={styles.container}>
        <Pressable onPress={() => handelPress()} style={styles.button}>
          <Text style={styles.movieButton}>PLay</Text>
          <FontAwesome
            style={{ padding: 10 }}
            name="play"
            size={20}
            color="black"
          />
        </Pressable>

        <Pressable style={styles.button1}>
          <Text style={styles.movieButton}>Download</Text>
          <MaterialIcons name="file-download" size={25} color="black" />
        </Pressable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#2196F3',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 3,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  movieButton: {
    color: "#000",
    fontSize: 16,
    marginRight: 10,
  },
  movieDownload: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  button1: {
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  movieDownload: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
});
