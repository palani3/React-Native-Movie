import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Button,
} from "react-native";
import VideoPlayer from "react-native-video-controls";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dateFormat from "dateformat";
import { getMoviesByID } from "../services/services";
import PlayButton from "../components/PlayButton";
const placeHolderImage = require("../assets/placeholder.png");
import BottomSheet from "@gorhom/bottom-sheet";

const Details = ({ navigation, route }) => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const MovieID = route.params.movieDetails;
  const [modalVisible, setModalVisible] = useState(false);
  const [detailMovie, setDetailMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const videoShow = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    getMoviesByID(MovieID).then((movieData) => {
      setDetailMovie(movieData);
      setLoading(true);
    });
  }, [MovieID]);

  return (
    <View>
      {loading && (
        <View>
          <ScrollView>
            <View style={{ position: "relative" }}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={
                  detailMovie.poster_path
                    ? {
                        uri:
                          "https://image.tmdb.org/t/p/w500" +
                          detailMovie.poster_path,
                      }
                    : placeHolderImage
                }
              />
              <View style={styles.smallImageContent}>
                <Image
                  resizeMode="contain"
                  style={styles.smallImage}
                  source={
                    detailMovie.poster_path
                      ? {
                          uri:
                            "https://image.tmdb.org/t/p/w500" +
                            detailMovie.poster_path,
                        }
                      : placeHolderImage
                  }
                />

                <View
                  style={{
                    flexDirection: "column",
                    width: 200,
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={styles.mvieTitle}>{detailMovie.title}</Text>
                  <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <StarRating
                      animation={"flash"}
                      emptyStarColor={"black"}
                      fullStarColor={"gold"}
                      starSize={20}
                      disabled={false}
                      maxStars={1}
                      rating={detailMovie.vote_average / 2}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        color: "#fff",
                      }}
                    >
                      {detailMovie.vote_average / 2}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <PlayButton handelPress={videoShow} />

            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Feather name="bookmark" size={24} color="black" />
                <Text style={{ fontSize: 12 }}>Add List</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Feather name="youtube" size={25} color="black" />
                <Text style={{ fontSize: 12 }}>Trailer</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <FontAwesome5 name="telegram-plane" size={25} color="black" />
                <Text style={{ fontSize: 12 }}>Share</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                OverView
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "red",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                {`Release Date:` +
                  dateFormat(detailMovie.release_date, "d mmmm, yyyy")}
              </Text>
              {loading && (
                <Text style={styles.overview}>{detailMovie.overview}</Text>
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                Genres
              </Text>
              <View style={{ flexDirection: "row" }}>
                {detailMovie.genres.map((data) => {
                  return (
                    <Text key={data.id} style={styles.overview}>
                      {data.name}
                    </Text>
                  );
                })}
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                Productions
              </Text>

              <View style={{ flexDirection: "row" }}>
                {detailMovie.production_companies.map((data) => {
                  return (
                    <Text key={data.id} style={styles.overview}>
                      {data.name}
                    </Text>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoShows}>
              <Pressable onPress={() => videoShow()}>
                <Text>Developing Stage click me to close</Text>
              </Pressable>
              {/* <VideoPlayer
                onBack={() => {
                  videoShow();
                }}
                navigator={navigation}
                source={{ uri: "https://vjs.zencdn.net/v/oceans.mp4" }}
              /> */}
            </View>
          </Modal>

          {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        // enabledGestureInteraction={true}
        enableOverDrag={true}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet> */}
        </View>
      )}
      {!loading && <ActivityIndicator size={"large"} />}
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    position: "relative",
    opacity: 0.5,
    backgroundColor: "#000",
    width: "100%",
    height: Dimensions.get("screen").height / 1.5,
  },
  smallImageContent: {
    position: "absolute",
    // width:"100%",
    // flexDirection:"column",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    left: 20,
    bottom: 50,
  },
  mvieTitle: {
    margin: 10,
    width: "100%",
    fontSize: 20,
    color: "#fff",

    // left:Dimensions.get("screen").width-250
  },
  overview: {
    fontSize: 14,

    margin: 25,
  },
  smallImage: {
    borderRadius: 15,

    width: 100,
    height: 200,
  },
  videoShows: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Details;
