# Auckland travel advisory app
##### built using React Native

## Setup

```bash
$ cd traveladvisor
$ npm install
$ react-native start
$ react-native run-android
```

## API key

This app uses public APIs from Auckland Transport to get the notifications. To use those APIs the app needs a key. 
Anybody can sign up for an API key on https://dev-portal.at.govt.nz/

Before building the app replace the "xxxxxxxxxxxxxxxxx" placeholder in **traveladvisor/components/settings.js** with a valid key.

## Running an Android Emulator

Go into the android sdk tools directory:

```bash
$ cd android-sdk-linux/tools
```

Run the AVD Manager and create/manage emulators from there

```bash
$ ./android avd
```

## Android Build

 - Update the following keys with appropriate values in the **android/gradle.properties** file
	 - MYAPP_RELEASE_STORE_PASSWORD
	 - MYAPP_RELEASE_KEY_PASSWORD
 - Go into the android build directory 
 ```bash
 $ cd traveladvisor/android/
 ```
 - Run gradlew with the assembleRelease option 
 ```bash
 $ ./gradlew assembleRelease
 ```

On successful build, the APKs will be located under **traveladvisor/traveladvisor/android/app/build/outputs/apk**.
