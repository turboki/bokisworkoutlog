import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import firebase from "react-native-firebase";

export default class Profile extends React.Component {
    state = {
        isLoading: true,
        currentUser: {},
        profile: {}
    };

    componentDidMount() {
        const { currentUser } = firebase.auth();
        const ref = firebase
            .firestore()
            .collection("profile")
            .where("email", "==", currentUser.email);
        ref.get().then(querySnapshot => 
            querySnapshot.forEach(doc => {
                if (doc.exists) {
                    this.setState({
                        profile: doc.data(),
                        key: doc.id,
                        isLoading: false,
                        currentUser
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        currentUser
                    });
                }
            })
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        return (
            <ScrollView>
                <Card style={styles.container}>
                    <View style={styles.subContainer}>
                        <View>
                            <Input
                                label="Nickname"
                                defaultValue={this.state.profile.nickname}
                                placeholder='Enter your nickname'
                                />
                            <Input
                                label="Email"
                                defaultValue={this.state.profile.email}
                                placeholder='Enter your email'
                                />
                        </View>
                    </View>
                    <View style={styles.detailButton}>
                        <Button
                            large
                            backgroundColor={"#CCCCCC"}
                            leftIcon={{ name: "edit" }}
                            title="Edit"
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#CCCCCC"
    },
    activity: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    detailButton: {
        marginTop: 10
    }
});
