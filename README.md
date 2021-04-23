# DailyTasks

A basic Android to-do app using React Native and Expo.

<div float="left">
  <img src="../DailyTask/assets/dailytask_list.png" width="295" />
  <img src="../DailyTask/assets/dailytask_list_details.png" width="295" />
  <img src="../DailyTask/assets/dailytask_list_details_delete.png" width="295" />
</div>

----
## Development

### Firebase

1. Go to [Firebase console](https://console.firebase.google.com/) and create a new Web App project. Copy the generated Firebase config and paste the contents into `src/firebase/firebaseConfig.js`. Example file can be found [here](../DailyTask/src/firebase/firebaseConfig.example.js).
2. Enable `Email/Password` sign-in method in Firebase Authentication.
3. Create a Firestore Database.


### Run the app

1. Install Node modules

```bash
npm install
```

2. Start the Metro bundler from Expo and scan the QR code using Expo Go app

```bash
npm run start
```

----

## Production

### Create new APK

```bash
expo build:android --release-channel android
```

### Send OTA update

```bash
expo publish --release-channel android
```

By default over-the-air update is automatically on. It will take up to 30 seconds for the app to download the latest version. If it isn't finished by then, it will fallback to the cached version until the next launch. More info about Expo automatic updates can be found [here](https://docs.expo.io/guides/configuring-ota-updates/#automatic-updates).

----

## Built with

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore)