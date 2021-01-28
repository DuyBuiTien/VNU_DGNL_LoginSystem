
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




https://turbobit.net/2xn0795u5h8f.html
https://turbobit.net/mae6hm2zqk3h.html
https://turbobit.net/0mmg80l8k2an.html
https://turbobit.net/bjfqooa2t7bq.html
https://turbobit.net/v4dj9lwsg4l3.html
https://turbobit.net/8m291gha9mbe.html
https://turbobit.net/53shczah5uh2.html
https://turbobit.net/wf9s3gpgxajm.html
https://turbobit.net/jtdthekn7agh.html
https://turbobit.net/uh8rmqsw6c62.html
https://turbobit.net/9r8tqstoircd.html
https://turbobit.net/ll3nu751w2w6.html
https://turbobit.net/w67qyppud9ot.html
https://turbobit.net/64rp1ybd3d6c.html
https://turbobit.net/lk4hcdsaqfjg.html
https://turbobit.net/s2sq1vovk4am.html
https://turbobit.net/4kuhg83ct1r5.html
https://turbobit.net/51cjcnso5rpf.html
https://turbobit.net/tey6w9h3vcq0.html
https://turbobit.net/7k5qw7ivvij6.html
https://turbobit.net/a2jaghmud7vq.html
https://turbobit.net/4tbsr92v7an7.html
https://turbobit.net/cyfwz5q6xj42.html
https://turbobit.net/h9ql5wkxkmgl.html
https://turbobit.net/xq22eaa59egw.html
https://turbobit.net/hs95q4nunqsq.html
https://turbobit.net/jzpf4db7xx1l.html
https://turbobit.net/mzinfeqhr66k.html
https://turbobit.net/4cwqwm4u85hy.html
https://turbobit.net/1ull2942i96y.html
https://turbobit.net/ht96nz84svf5.html
https://turbobit.net/k4g3zspfl6vd.html
https://turbobit.net/paynbms6khb5.html
https://turbobit.net/zdq29o3zjq5p.html
https://turbobit.net/5zxkq6u2k3a2.html
https://turbobit.net/mytlmpenhtwj.html
https://turbobit.net/q39pwktf8mq2.html
https://turbobit.net/paynbms6khb5.html
https://turbobit.net/7vgmfdpvhupy.html
https://turbobit.net/bswivvwmzgfl.html
https://turbobit.net/0wy1w70jjx1o.html
https://turbobit.net/a02d6j4whv2w.html
https://turbobit.net/jhwjl6li8qia.html
https://turbobit.net/vvwtm3zp492n.html
https://turbobit.net/9w1rmuthf5b5.html
https://turbobit.net/2xpc8s4bw6rn.html
https://turbobit.net/ck96r6yf759b.html
https://turbobit.net/wwfkw8jdmehm.html
https://turbobit.net/23ouhayzbr5f.html
https://turbobit.net/shryqgt4aqot.html
https://turbobit.net/brrbbjd67cqw.html
https://turbobit.net/q0sc5lyuel6n.html