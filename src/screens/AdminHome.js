import React from "react";
import { Platform, StyleSheet, Button, View } from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "react-native-firebase";

const iconNS = Platform.OS === 'ios' ? 'ios' : 'md'

export default class AdminHome extends React.Component {
    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        return {
            headerTitle: "Settings",
            headerRight: (
                <Button
                    onPress={() => {
                        navigation.navigate("Main");
                    }}
                    title="Close"
                />
            )
        };
    };

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <View>
                <ListItem
                    title="User Profile"
                    leftIcon={{ name: iconNS+"-contact", type: "ionicon" }}
                    onPress={() => {
                        this.props.navigation.navigate("Profile");
                    }}
                />
                <ListItem
                    title="Excercises"
                    leftIcon={{ name: iconNS+"-fitness", type: "ionicon" }}
                    onPress={() => {
                        this.props.navigation.navigate("Excercises");
                    }}
                />
                <ListItem
                    title="Sign Out"
                    leftIcon={{ name: iconNS+"-log-out", type: "ionicon" }}
                    onPress={this.signOutUser}
                />
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
