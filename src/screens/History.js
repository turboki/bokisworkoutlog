import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class History extends React.Component {
	
    render() {
        return (
            <View style={styles.container}>
                <Text>History</Text>
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
