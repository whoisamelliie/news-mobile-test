# News Mobile Test (React Native)

## Goal

Cross-platform mobile app: news list (search/filter/infinite scroll), details + WebView, favorites with local storage, push notifications, biometric auth with logout, file upload/download.

## Stack

- Expo React Native + TypeScript
- Feature-Sliced Design (FSD)
- Redux Toolkit + RTK Query
- React Navigation
- AsyncStorage
- WebView
- Expo Notifications (push)
- Expo Local Authentication (biometrics)
- FileSystem + DocumentPicker (download/upload)

## Setup

```bash
npm install
```

## Run the Project

npx expo start
Then:
Press a for Android
Press i for iOS
Or scan QR code with Expo Go

## Code Quality

npm run lint
npm run format

## Project Structure

The project follows Feature-Sliced Design (FSD):
src/
├── app
├── processes
├── pages
├── widgets
├── features
├── entities
└── shared
