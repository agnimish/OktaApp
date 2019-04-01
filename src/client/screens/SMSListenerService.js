import SmsListener from 'react-native-android-sms-listener'
 
SmsListener.addListener(message => {
  console.info(message)
})


// import React, {Component} from 'react';
// import {
// View,
// Dimensions,
// Text,
// TextInput,
// TouchableOpacity,
// StyleSheet,
// } from 'react-native';
// import colors from './colors';
// import { Ionicons } from '@expo/vector-icons';
// const {width} = Dimensions.get('window');

// export default class ComposeMail extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//           message: ''
//         }
//     }   

//     sendmessage = async() => {
//         console.log(this.state.message);
//         fetch("http://172.23.148.154:8080/api/v1/logs/new/", {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${await tokenClient.getAccessToken()}`
//
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 msg: `${this.state.message}`,
//                 boolPersonal: 'false',
//                 secUsername: ''
//             })
//         })
//         // .then((response) => response.json())
//         .then((responseData) => {
//             console.log(responseData);
//         })
//         .done();
//       }

//     render() {
//         const {lightGray, gray} = colors;
//         return (
//             <View style={{flex: 1, paddingTop: 20}}>
//                 <View style={{padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//                 borderBottomColor: lightGray, borderBottomWidth: 0.7}}>
//                     <TouchableOpacity onPress={this.props.onPress}>
//                         <Ionicons name='ios-arrow-back' color='gray' size={24} />
//                     </TouchableOpacity>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//                         <Ionicons name='md-attach' color='gray' size={24} style={{paddingRight: 24}}/>
//                         <Ionicons name='md-send' color='gray' size={24} onPress={() => this.sendmessage()}/>
//                     </View>
//                 </View>

//                 <View style={styles.input}>
//                     <TextInput style={styles.default} placeholder='To' placeholderTextColor={gray} />
//                 </View>
//                 <View style={styles.input}>
//                     <TextInput style={styles.default} placeholder='From' placeholderTextColor={gray} />
//                 </View>
//                 <View style={styles.input}>
//                     <TextInput style={styles.default} placeholder='Subject' placeholderTextColor={gray}/>
//                 </View>

//                 <View style={[styles.input, {height: 500}]}>
//                     <TextInput returnKeyLabel = {"next"} onChangeText={(text) => this.setState({message: text})}
//                     style={styles.default} multiline={true} autoFocus={true} placeholder='Compose message' placeholderTextColor={gray}/>
//                 </View>

//             </View>
//         )
//     }
// }

// var styles = StyleSheet.create({
//     input: {
//         height: 48,
//         alignItems:'center',
//         padding: 8,
//         borderBottomColor: colors.lightGray, borderBottomWidth: 1},
//     default: {
//         flex: 1,
//         fontSize: 14,
//         padding: 4,
//         fontWeight: '400',
//     },
//     inputView: {borderWidth: 1,height: 32, padding: 4, flexDirection: 'row', alignItems: 'center'}
// })