/**
 * Created by ggoma on 2016. 11. 26..
 */
import React, {Component} from 'react';
import {
Animated,
Dimensions,
View,
Text,
ListView,
StyleSheet
} from 'react-native';

import MailListItem from './mail-list-item';
import { Button } from 'react-native-elements';

export default class MailList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(
                props.data.logs //just used to populate the list
            ),
            height: new Animated.Value(0)
        };

        this._renderRow = this._renderRow.bind(this);
        this.showUndo = this.showUndo.bind(this);
    }

    showUndo() {
        this.props.showUndo();
    }

    _renderRow(logs) {
        return (
            <MailListItem showUndo={this.showUndo} logs={logs}/>
        )
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
            </View>
        )
    }
}