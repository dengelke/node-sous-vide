# Decompilation

This is a guide on how to reverse engineer the Anova Android APK, which should be generalisable for any Android React Native application.

## Download APK

Head to the [apkpure anova download page](https://m.apkpure.com/anova-culinary/com.anovaculinary.android) and get the latest version of the Android (3.3.9 at time of writing).

## Download APKTool

APKTool is a tool to reverse engineer 3rd party apps follow the [Installation Instructions](https://ibotpeaches.github.io/Apktool/install/) for your operating system.

i.e. for Mac with Homebrew

```
brew install apktool
```

Then to decompile the previously downloaded APK

```
apktool d Anova\ Culinary_v3.3.9_apkpure.com.apk
```

## Decompile React Native Code

The decompiled app code contains an index.android.bundle which is React Native source code, however it is extremely hard to read. Therefore need to use [react-native-decompiler](https://github.com/richardfuca/react-native-decompiler) to automate the hard work!

```
git clone https://github.com/richardfuca/react-native-decompiler.git
cd react-native-decompiler 
npm start -- -i ../Anova\ Culinary_v3.3.9_apkpure.com/assets/index.android.bundle -o ../android-js/output
```

> Note this may take awhile to complete

Which will then create a folder `android-js/output` with a series of numbered js files from 0 to 2267 with some missing