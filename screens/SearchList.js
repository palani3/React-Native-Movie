import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { searchMovieTv } from "../services/services";
import { FlatList } from "react-native";
import Card from "../components/Card";
export default function SearchList({ navigation }) {
  const [text, setText] = useState("");
  const [SearchResult, setSearchResult] = useState("");

  const handleChangeText = (newText) => {
    setText(newText);
  };
  const onSubmit = (query) => {
    Promise.all([
      searchMovieTv(query, "movie"),
      searchMovieTv(query, "tv")
    ]
    ).then(([searchData,tv]) => {
      const searchResult =[...searchData,...tv]
      console.log("searchResult",searchResult)
      setSearchResult(searchResult)});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Search Movie or TV"
            value={text}
            onChangeText={handleChangeText}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => {
            onSubmit(text);
          }}
        >
          <Ionicons
            name="search"
            size={25}
            color="#000"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchItems}>
        {SearchResult && SearchResult.length > 0 && (
          <FlatList
            data={SearchResult}
            numColumns={3}
            renderItem={({ item }) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
          {SearchResult && SearchResult.length == 0 && (
            <View style={{justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:18,marginBottom:10}}>Sorry no Result Found Please Retype</Text>
            <Text style={{fontSize:18,marginBottom:10}}>Search type Movie or TV/Text</Text>
              </View>
         
        )}
        {!SearchResult &&(
          <View>
            <Text>Try Something to Movie Keywords</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "green",
    height: 50,
    padding: 8,
    // paddingHorizontal:10,
    // paddingVertical:10
  },
  container: {
    paddingHorizontal: 15,
    marginTop: Dimensions.get("screen").height / 9,
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    flexBasis: "auto",
    flexGrow: 1,
    paddingRight: 10,
    // flexDirection: "row",
  },
  searchItems: {
    marginVertical: 20,
    marginHorizontal: 5,
  },
});
