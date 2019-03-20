import React from "react";
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    Button,
    BackHandler
} from "react-native";
import firebase from "react-native-firebase";
import Logo from "../static/logo.svg";
import { Icon } from 'react-native-elements'


export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
						headerTitle: (<Logo width={32} height={32}/>),
            headerRight: (
                <Icon
									type='ionicon'
									name='ios-menu'
									onPress={() => navigation.navigate("Settings")}
									containerStyle={{paddingRight:20}}
								/>
						)
        };
    };

    state = { currentUser: null };

    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
    }

    render() {
        const { currentUser } = this.state;
        return (
            <View style={styles.container}>
                <Text>Hi {currentUser && currentUser.email}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
		}
});
