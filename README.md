# DailyTasks

## Local development

1. Install node modules

```bash
npm install
```

2. Start Metro bundler from Expo and scan the QR code using Expo Go app

```bash
npm run start
```

## Create new APK


```bash
expo build:android --release-channel android
```

## Send OTA update



```bash
expo publish --release-channel android
```

By default over-the-air update is automatically on. It will take up to 30 seconds for the app to download the latest version. If it isn't finished by then, it will fallback to the cached version until the next launch. More info about Expo automatic updates can be found [here](https://docs.expo.io/guides/configuring-ota-updates/#automatic-updates).