import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Home from "./screens/Home";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./screens/Details";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SearchList from "./screens/SearchList";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Ionicons
                  name="search"
                  size={24}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "white",
          }}
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "white",
          }}
          name="Search"
          component={SearchList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
