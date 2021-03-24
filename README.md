# DailyTasks

# Android dev setup

Create a `local.properties` file in the android directory and set the android sdk path.

```bash
sdk.dir = /home/${USER}/Android/Sdk
```

Then start metro which bundles the javascript code

```bash
npx react-native start
```

Finally start the app

```bash
npm run android
```
