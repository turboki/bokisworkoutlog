import React from "react";
import { View, Text, Button } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";

import Loading from "./src/screens/Loading";
import SignUp from "./src/screens/SignUp";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import History from "./src/screens/History";
import Stats from "./src/screens/Stats";
import AdminHome from "./src/screens/AdminHome";
import Profile from "./src/screens/Profile";
import Excercises from "./src/screens/Excercises";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: "#F2E9BC"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold"
    }
};

const tabBarOptions =  {
  labelStyle: {
    fontWeight: "bold"
  },
  tabStyle: {
    width: 100,
  },
  activeTintColor: "#731016",
  showIcon: true,
  style: {
    backgroundColor: '#F2E9BC',
  },
}

const HomeWrapper = createStackNavigator(
    {
        Home
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions
    }
);
const StatsWrapper = createStackNavigator(
    {
        Stats
    },
    {
        initialRouteName: "Stats",
        defaultNavigationOptions
    }
);

const HistoryWrapper = createStackNavigator(
    {
        History
    },
    {
        initialRouteName: "History",
        defaultNavigationOptions
    }
);

const MainStack = createBottomTabNavigator(
  {
    Home: {
        screen: HomeWrapper
    },
    History: {
        screen: HistoryWrapper
    },
    Stats: {
        screen: StatsWrapper
    }
  },
  {
    tabBarOptions
  }
);

const AdminStack = createStackNavigator(
    {
        AdminHome,
        Profile,
        Excercises
    },
    {
        initialRouteName: "AdminHome",
        defaultNavigationOptions: {
            gesturesEnabled: false
        }
    }
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        Settings: {
            screen: AdminStack
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: RootStack
        },
        Loading,
        SignUp,
        Login
    },
    {
        initialRouteName: "Loading",
        index: 0,
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);
