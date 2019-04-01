import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Button,
    ScrollView
} from 'react-native';

import Header from './header';
import MailList from './mail-list';
import ComposeMail from './compose-mail';
import tokenClient from '../api/TokenClient';
import ActionButton from 'react-native-action-button';
import { Ionicons as Icon } from '@expo/vector-icons';
import colors from './colors';


const {width} = Dimensions.get('window');

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            undoHeight: new Animated.Value(0),
            offset: 10,
            isLoading: true,
            undoShown: false,
            modal: false,
            userData: {name:"Sudhanshu", icon:"S",
            "logs":[{
                "amount": 1000,
                "boolPersonal": false,
                "category": "Personal",
                "completeLog": "Message for testing hey are you there this is agin done.",
                "msgRefId": "123456789",
                "secUsername": "",
                "title": "Testing log title: Messag",
                "uniqueRefId": "07f784ae0abc5048d4c53aa38591687f8d268bdd1007a60bfab9ba59"
            }]},
        }
        this.showUndo = this.showUndo.bind(this);
        this.hideUndo = this.hideUndo.bind(this);
    }

    async componentDidMount() {
        fetch("http://172.23.148.154:8080/api/v1/user", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await tokenClient.getAccessToken()}`,
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "Response Body -> " + JSON.stringify(responseData)
            );  
            this.setState({userData: responseData});
            this.setState({isLoading: false});
        })
        .done();
    }

    showUndo() {
        if(this.state.undoShown) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.hideUndo()
            }, 3000);
            return
        }

        console.log('showing undo');

        this.setState({undoShown: true});
        var height = 42;

        var i = 0;
        this.interval = setInterval(() => {
            if(i > height) {
                clearInterval(this.interval);
            }
            this.setState({offset: i});
            i += 3;
        }, 3)
        Animated.timing(
            this.state.undoHeight,
            {
                toValue: height
            }
        ).start();


        this.timeout = setTimeout(() => {
            this.hideUndo()
        }, 3000);

    }

    hideUndo() {
        if(!this.state.undoShown) {
            return
        }

        console.log('hiding undo');
        Animated.timing(
            this.state.undoHeight,
            {
                toValue: 0
            }
        ).start();

        this.setState({undoShown: false});
        var height = 0;

        var i = 42;
        this.interval = setInterval(() => {
            if(i < height) {
                clearInterval(this.interval);
            }
            this.setState({offset: i});
            i -= 3;
        }, 3)

    }

    renderUndo() {
        const {undoHeight, undoShown} = this.state;
        const {black, lightBlue} = colors
        var opacity = this.state.undoHeight.interpolate({
            inputRange: [0, 42],
            outputRange: [0, 1],
        })

        return (
            <Animated.View style={{height: undoHeight, width, position: 'absolute', bottom: 0, backgroundColor: black}}>
                <Animated.View style={{flex: 1, opacity, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{paddingLeft: 16, color: 'white'}}>Message archived.</Text>
                    <TouchableOpacity>
                        <Text style={{paddingRight: 16, color: lightBlue, fontWeight: '700'}}>UNDO</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }

    // To display Active Buttons
    renderFOB(offsetXValue) {
        const {offset} = this.state;
        const { onLogout } =  this.props;
        return (
            <ActionButton 
                buttonColor="rgba(231,76,60,1)">
                offsetX={10}
                offsetY={offset}>
                <ActionButton.Item buttonColor='#9b59b6' title="Logout" onPress={onLogout}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6' title="Create" onPress={() => {this.setState({modal: true})}}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
                // // icon={<Icon name='md-create' style={styles.actionButtonIcon}/>}
                // offsetY={offset}
                // offsetX={offsetXValue}
                // // onPress={() => {this.setState({modal: true})}}
                // onPress={onLogout}
        )
    }

    // To open compose screen
    renderModal() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modal}
                onRequestClose={() => {}}
            >
                <ComposeMail onPress={() => this.setState({modal: false})} />
            </Modal>
        )
    }

    render() {
        console.log(this.state.userData)
        const {modal} = this.state;
        if (this.state.isLoading) {
            console.log("innn")
          return (<View><Text>Loading...</Text></View>)
        }
        console.log("out")
        return (
            <View style={{flex: 1}}>
                <StatusBar animated={true} barStyle={modal ? "default" : "light-content"}/>
                <Header/>
                <MailList showUndo={this.showUndo} data={this.state.userData}/>
                {this.renderFOB()}
                {this.renderUndo()}
                {this.renderModal()}
            </View>
        )
    }

}

var styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
