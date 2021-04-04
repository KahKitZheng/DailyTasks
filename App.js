import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./src/context/authContext";
import { StatusBar } from "expo-status-bar";

// Import navigation modules
import { NavigationContainer } from "@react-navigation/native";
import {
  AuthNavigation,
  TodoNavigation,
} from "./src/navigation/StackNavigator";

// Import Firebase libraries
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./src/firebase/firebaseConfig";

// Disables timer warning
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_USER":
          return {
            ...prevState,
            user: action.payload,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignOut: false,
            user: action.payload,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignOut: true,
            user: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      user: null,
    }
  );

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      // if already initialized, use that one
      firebase.app();
    }

    const bootstrapAsync = async () => {
      let user;

      try {
        user = await SecureStore.getItemAsync("user");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_USER", user: user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        await firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            dispatch({ type: "SIGN_IN", payload: res.user });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: async () => {
        firebase.auth().signOut();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const db = firebase.firestore();
        const { displayName, email, password } = data;
        let newUser = {};

        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            newUser = authUser;
            return db
              .doc(`users/${authUser.user.uid}`)
              .set(
                { uid: authUser.user.uid, email, displayName },
                { merge: true }
              );
          })
          .then(() => {
            return dispatch({ type: "SIGN_IN", payload: newUser.user });
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {state.user == null ? <AuthNavigation /> : <TodoNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
