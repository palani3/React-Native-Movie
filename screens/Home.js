import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from "../services/services";
import { SliderBox } from "react-native-image-slider-box";
import List from "../components/List";
import Error from "../components/Error";

const dimensions = Dimensions.get("screen");

export default function Home({ navigation }) {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovie, setFamilyMovie] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
    ]);
  };
  useEffect(() => {
    getData().then(
      ([upComingMovie, popularMovies1, popularTvData, familyMovies]) => {
        const movieImagesArray = [];
        upComingMovie.forEach((movie) => {
          movieImagesArray.push(
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
          );
        });
        setMovieImages(movieImagesArray);
        setPopularMovies(popularMovies1);
        setPopularTv(popularTvData);
        setFamilyMovie(familyMovies);
        setLoader(true)
      }
    );
    getUpcomingMovies()
      .then((movies) => {
        console.log(movies);
        const movieImagesArray = [];
        movies.forEach((movie) => {
          movieImagesArray.push(
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
          );
        });
        setMovieImages(movieImagesArray);
      })
      .catch(() => {setError(true)}).finally(()=>setLoader(true))
  }, []);

  return (
    <View>
      {loader && !error && (<ScrollView>
        {movieImages && (
          <View style={styles.sliderContainer}>
            <SliderBox
              dotStyle={styles.sliderStyle}
              images={movieImages}
              autoplay={true}
              sliderBoxHeight={dimensions.height / 1.5}
              circleLoop={true}
            />
          </View>
        )}
      
         {/* Popular Movies */}

        {popularMovies && (
          <View style={styles.carouselContainer}>
            <List  navigation={navigation} title={"Popular Movies"} content={popularMovies} />
          </View>
        )}
         {/* FPopular TV Shows */}

        {popularTv && (
          <View style={styles.carouselContainer}>
            <List navigation={navigation} title={"Popular TV Shows"} content={popularTv} />
          </View>
        )}
         {/* Family  Movies */}
        {familyMovie && (
          <View style={styles.carouselContainer}>
            <List navigation={navigation} title={"Family Movies"} content={familyMovie} />
          </View>
        )}
      </ScrollView>)}
      {!loader && ( <ActivityIndicator size={"large"}/>)}
     {error && <Error/>}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    // paddingVertical:20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
   paddingVertical:10
  },
  sliderStyle: {
    height: 0,
  },
});
