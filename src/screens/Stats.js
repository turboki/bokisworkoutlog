import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Stats extends React.Component {
	
    render() {
        return (
            <View style={styles.container}>
                <Text>Stats</Text>
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
