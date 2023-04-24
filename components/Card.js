import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
const placeHolderImage = require("../assets/placeholder.png");
import propTypes from "prop-types";

const propTypess = {
  item: propTypes.object,
};

export class Card extends React.PureComponent {
  render() {
    const { navigation, item } = this.props;
    console.log("card", item);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", { movieDetails: item.id });
        }}
        style={styles.container}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? { uri: "https://image.tmdb.org/t/p/w500" + item.poster_path }
              : placeHolderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: "center",
    // justifyContent:"center",
    height: 200,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: "absolute",
    width: 100,
    top: 10,
    alignSelf: "center",
    textAlign: "center",
  },
});

Card.propTypes = propTypess;
export default Card;
