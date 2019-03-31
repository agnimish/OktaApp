/**
 * Created by ggoma on 2016. 11. 27..
 */
import React, {Component} from 'react';
import {
View,
Dimensions,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
} from 'react-native';
import colors from './colors';
import { Ionicons } from '@expo/vector-icons';
const {width} = Dimensions.get('window');

export default class ComposeMail extends Component {

    constructor(props){
        super(props)
        this.state = {
          message: ''
        }
    }   

    sendmessage = async() => {
        console.log(this.state.message);
        fetch("http://172.23.148.154:8080/api/v1/logs/new/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer eyJraWQiOiJJYTJpUUhhTmtnOE9ERW1MenRQb3NIUkwyNC1JRDBlUmxxdV9yNUQyeUxnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlpfVzVWSVFQMzNtSFZJelNXTi1HaU1qNGl3ZHJYY3JsRENJcWxkTGJYVjQiLCJpc3MiOiJodHRwczovL2Rldi0zMDQ5NTkub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTU0MDc2MzIwLCJleHAiOjE1NTQwNzk5MjAsImNpZCI6IjBvYWQ0Zjg5ajNEbDBpYUVHMzU2IiwidWlkIjoiMDB1ZW9rd25tZ281R1JSZk8zNTYiLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSJdLCJzdWIiOiJTdWJhbnNhbEBpaXRrLmFjLmluIn0.j7J2kH9vZAot-T0uGqsqBhHunxdf7Xls_pnAV8H3ZhkRp4_suDQdUtrDjsxMEQRLDVjJGu8VAXzwxo60Dvr_BFZwYTGUiXQ9V27vly-X11gQ14lcBZs5Ep003fG2dsdqbvH5Mg76Ff-qkADpm3IJytABjpYxGp7_lPKnmnW1qwKk0aRaaw5YeY6crisL-ru3-KIusl_keyQmeK_ZTFP-ZtRUwe4Ruo3Dva6ysXrdeukxpZeeY6YIUz7lVRHV8aNpN9YYIJWCC7S3QFROs_kLxAi5R4yVq-o-r3zSLEe-e8O0hEau1joCJ-F7Tg8E6YkId3ngddPN2uCHvO-2QyPq8Q`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msg: `${this.state.message}`,
                boolPersonal: 'false',
                secUsername: ''
            })
        })
        // .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        })
        .done();
      }

    render() {
        const {lightGray, gray} = colors;
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <View style={{padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                borderBottomColor: lightGray, borderBottomWidth: 0.7}}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Ionicons name='ios-arrow-back' color='gray' size={24} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Ionicons name='md-attach' color='gray' size={24} style={{paddingRight: 24}}/>
                        <Ionicons name='md-send' color='gray' size={24} onPress={() => this.sendmessage()}/>
                    </View>
                </View>

                <View style={styles.input}>
                    <TextInput style={styles.default} placeholder='To' placeholderTextColor={gray} />
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.default} placeholder='From' placeholderTextColor={gray} />
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.default} placeholder='Subject' placeholderTextColor={gray}/>
                </View>

                <View style={[styles.input, {height: 500}]}>
                    <TextInput returnKeyLabel = {"next"} onChangeText={(text) => this.setState({message: text})}
                    style={styles.default} multiline={true} autoFocus={true} placeholder='Compose message' placeholderTextColor={gray}/>
                </View>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    input: {
        height: 48,
        alignItems:'center',
        padding: 8,
        borderBottomColor: colors.lightGray, borderBottomWidth: 1},
    default: {
        flex: 1,
        fontSize: 14,
        padding: 4,
        fontWeight: '400',
    },
    inputView: {borderWidth: 1,height: 32, padding: 4, flexDirection: 'row', alignItems: 'center'}
})