# Auckland Transport Travel Impacts App - built using React Native #

`cd traveladvisor`

`npm install`

`react-native start`

`react-native run-android`

# Running an Android Emulator
cd into the android sdk tools directory

`cd android-sdk-linux/tools`

Run the AVD Manager and create/manage emulators from there

`./android avd`


# Android Build

 - Update the following keys with appropriate values in the `android/gradle.properties` file
	 - MYAPP_RELEASE_STORE_PASSWORD
	 - MYAPP_RELEASE_KEY_PASSWORD
 - Go into the android build directory`cd traveladvisor/android/`
 - Run gradlew with the assembleRelease option:`./gradlew assembleRelease`

On successful build, the APKs will be located under:
`traveladvisor/traveladvisor/android/app/build/outputs/apk`
