import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View, Platform } from "react-native";
import { ListItem, Button, Icon } from 'react-native-elements';
import firebase from "react-native-firebase";

const iconNS = Platform.OS === 'ios' ? 'ios' : 'md'

const iconsByType = {
	strength: { name: iconNS+"-fitness", type: "ionicon" },
	sport: { name: iconNS+"-bicycle", type: "ionicon" },
	cardio: { name: iconNS+"-heart-empty", type: "ionicon" },
	flexibility: { name: iconNS+"-body", type: "ionicon" }
}

export default class Excercises extends React.Component {
    constructor() {
        super();
		this.ref = firebase.firestore().collection("excercise").orderBy('type');
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            excercises: []
        };
    }

    onCollectionUpdate = querySnapshot => {
        const excercises = [];
        querySnapshot.forEach(doc => {
            const { name, description, type } = doc.data();
            excercises.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,
                description,
                type
            });
        });
        this.setState({
            excercises,
            isLoading: false
        });
    };

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
		let currentLabel = "";
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        return (
            <ScrollView style={styles.container}>
				{this.state.excercises.map((item, i) => {
					if (item.type != currentLabel) {
						currentLabel = item.type;
						return (<React.Fragment key={i}>
							<ListItem
								title={item.type}
								leftIcon={iconsByType[item.type]}
								titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase'}}
							/>
							<ListItem
								title={item.name}
							/>
						</React.Fragment>
						)
					} else {
						return (<ListItem
							key={i}
							title={item.name}
						/>)
					}
				})}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 paddingBottom: 22
	},
	item: {
	  padding: 10,
	  fontSize: 18,
	  height: 44,
	},
	activity: {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  alignItems: 'center',
	  justifyContent: 'center'
	}
  })