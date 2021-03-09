
# App Mobile dành cho cán bộ

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://tandan.com.vn)



# New Features!


### Tech

Dillinger uses a number of open source projects to work properly:

* [React Native](https://facebook.github.io/react-native/) - Build mobile apps with React

### Installation

Install `node_modules`:
```bash
yarn
```

### APIs


| API| README |
| ------ | ------ |
| API Tan Dan |  [GoogleDocs](https://docs.google.com/spreadsheets/d/1XhBQI95d64Z3z-_rWSE7RONuJXLGkWlIRGIGCaGDJHk/edit?ts=5df8ac49#gid=2078208879)  |

### Plugins


| Plugin | README |
| ------ | ------ |
| TUT|[tut](https://dev.to/calintamas/how-to-manage-staging-and-production-environments-in-a-react-native-app-4naa)  |


### Development

**Rename Package Name in React Native**

 - For Android:
Manually change it in ``android/app/src/main/java/com/PROJECT_NAME/MainActivity.java``
```bash
package MY.APP.ID;
```

``android/app/src/main/java/com/PROJECT_NAME/MainApplication.java``
```bash
package MY.APP.ID;
```

``android/app/src/main/AndroidManifest.xml``
```bashpackage="MY.APP.ID"
```
``android/app/build.gradle``
```bash
applicationId "MY.APP.ID"
```

Gradle' cleaning in the end (in /android folder):
```bash
./gradlew clean
```

-	For iOS:

Change the Bundle Id in Xcode.
```bash
cd /ios/
pod install --repo-update
```
**Fix blacklist in `node_modules`**
``\node_modules\metro-config\src\defaults\blacklist.js``

```sh
var sharedBlacklist = [
	/node_modules[\/\\]react[\/\\]dist[\/\\].*/,
	/website\/node_modules\/.*/,
	/heapCapture\/bundle\.js/,
	/.*\/__tests__\/.*/
];
```

**Lỗi IOS khi cài lottie-react-native**
``https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios``

**Sửa font FontAwesome5 cho react-native-elements**

``./node_modules/react-native-elements/src/helpers/getIconType.js``
```sh
import FAIcon from 'react-native-vector-icons/FontAwesome5';
```

-	run chmod 755 android/gradlew inside your app root folder
then run react-native run-android

**Lỗi push code git tandan**
``git config --local -e``
change entry of
``url = git@github.com:username/repo.git``
to
``url = https://github.com/username/repo.git``

#### Building for source
For production release:
```sh
yarn run android
```


### Publishing to Google Play Store
```sh
cd android
./gradlew bundleRelease
```

```sh
source $HOME/.bash_profile
```
Ios: copy local.properties to android/local.properties

Configure the ANDROID_HOME environment variable

```sh
https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment.
```


open .bash_profile

```sh
export ANDROID_HOME=/Users/polaris/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

source ~/.bash_profile

adb reverse tcp:8081 tcp:8081


### Todos

 - ...



$ cd ios
$ rm -rf Podfile.lock
$ pod install


//https://danhmuc.namdinh.gov.vn/sites/madinhdanh/Lists/DanhMucDonVi/AllItems.aspx



Fix tiếng trong NodePlayer RSTP :

Đối với IOS:
./node_modules/react-native-nodemediaclient/ios/RCTNodeMediaClient/RCTNodePlayerView.m
Thêm
```sh
  [_np setAudioEnable:NO];
```

ở dòng 33
```sh
- (void)setInputUrl:(NSString *)inputUrl {
  _inputUrl = inputUrl;
  [_np setInputUrl:inputUrl];
  [_np setAudioEnable:NO];              //Thêm dòng này
  if(_autoplay) {
    [_np start];
  }
}
```

Đối với Android:

node_modules/react-native-nodemediaclient/android/src/main/java/cn/nodemedia/react_native_nodemediaclient/RCTNodePlayerView.java

thêm
```sh
mNodePlayer.setAudioEnable(false);
```
ở dòng 50
```sh
    public void setInputUrl(String inputUrl) {
        mNodePlayer.setInputUrl(inputUrl);
        mNodePlayer.setAudioEnable(false);   //Thêm dòng này
        if(isAutoPlay) {
            start();
        }
    }
```
