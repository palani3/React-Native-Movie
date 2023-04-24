// import { View, Text } from 'react-native'
// import React from 'react'

// export default function List() {
//   return (
//     <View>
//       <Text>List</Text>
//     </View>
//   )
// }
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import React, { Component } from 'react'
import { getPopularMovies } from "../services/services";
import Card from "./Card";
import propTypes from "prop-types"

const propTypess={
    title:propTypes.string,
    content:propTypes.array

}


export default class List extends React.PureComponent {
  render() {
    const {navigation,title,content} = this.props
    return (
        <View style={styles.list}>
             <View><Text style={styles.text}>{title}</Text></View>
      <View>
              <FlatList horizontal={true} data={content} 
              renderItem={({item})=><Card navigation={navigation} item={item}/>}></FlatList>

      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    list:{
        marginTop:25
    },
text:{
  // marginVertical:20,
  marginHorizontal:10,
    fontSize:18,
    fontWeight:"bold",
    paddingBottom:20
}
})

List.propTypes = propTypess