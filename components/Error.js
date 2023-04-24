import { Text, View ,StyleSheet} from 'react-native'
import React, { Component } from 'react'

const defaultData ={
    errorText1:"oops something went wrong",
    errorText2:"Please try again",

}

export class Error extends React.PureComponent {
  render() {
    const {errorText1,errorText2} =this.props
    return (
      <View style={styles.container}>
        <Text style={{fontWeight:"bold"}}>oops something went wrong</Text>
        <Text style={{fontWeight:"bold"}}>Please try again</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    }

})
Error.defaultData = defaultData

export default Error