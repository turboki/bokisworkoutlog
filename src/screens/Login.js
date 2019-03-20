import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { SocialIcon } from "react-native-elements";
import firebase from "react-native-firebase";
import { GoogleSigninButton } from "react-native-google-signin";
import facebookLogin from "../auth/facebookLogin";
import googleLogin from "../auth/googleLogin";

export default class Login extends React.Component {
    state = { email: "", password: "", errorMessage: null };

    static navigationOptions = {
        headerLeft: null
    };

    handleLogin = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate("Main"))
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    handleFacebookLogin = async () => {
        const fbLogin = await facebookLogin();
        console.log(fbLogin);
	};
	
	handleGoogleLogin = async () => {
		const gLogin = await googleLogin();
		console.log(gLogin);
	}

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                {this.state.errorMessage && (
                    <Text style={{ color: "red" }}>
                        {this.state.errorMessage}
                    </Text>
                )}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Login" onPress={this.handleLogin} />
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate("SignUp")}
                />
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={this.handleFacebookLogin}
                    style={styles.facebookLogin}
                />

				<GoogleSigninButton
					style={{ width: 192, height: 48 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={this.handleGoogleLogin}
					disabled={this.state.isSigninInProgress}
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
    },
    textInput: {
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8
    },
    facebookLogin: {
        padding: 20
    }
});
