import {Platform} from 'react-native';

import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const createFile = async (path, data) => {
  try {
    return await RNFS.writeFile(path, data, 'base64')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((errr) => {
        RNFS.unlink(path);
        RNFS.writeFile(path, data, 'base64');
      });
  } catch (err) {
    console.warn(err);
  }

  return null;
};

const HandleFile = async (data, file_Name) => {
  try {
    const path = `${RNFS.DocumentDirectoryPath}/${file_Name}`;

    await createFile(path, data);

    if (Platform.OS === 'android') {
      const android = RNFetchBlob.android;
      let filename = file_Name.toLowerCase();
      if (filename.includes('.doc') || filename.includes('.docx')) {
        // Word document
        android.actionViewIntent(path, 'application/msword');
      } else if (filename.includes('.pdf')) {
        // PDF file
        android.actionViewIntent(path, 'application/pdf');
      } else if (filename.includes('.ppt') || filename.includes('.pptx')) {
        // Powerpoint file
        android.actionViewIntent(path, 'application/vnd.ms-powerpoint');
      } else if (filename.includes('.xls') || filename.includes('.xlsx')) {
        // Excel file
        android.actionViewIntent(path, 'application/vnd.ms-excel');
      } else if (filename.includes('.zip') || filename.includes('.rar')) {
        // WAV audio file
        android.actionViewIntent(path, 'application/x-wav');
      } else if (filename.includes('.rtf')) {
        // RTF file
        android.actionViewIntent(path, 'application/rtf');
      } else if (filename.includes('.wav') || filename.includes('.mp3')) {
        // WAV audio file
        android.actionViewIntent(path, 'audio/x-wav');
      } else if (filename.includes('.gif')) {
        // GIF file
        android.actionViewIntent(path, 'image/gif');
      } else if (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png')) {
        // JPG file
        android.actionViewIntent(path, 'image/jpeg');
      } else if (filename.includes('.txt')) {
        // Text file
        android.actionViewIntent(path, 'text/plain');
      } else if (
        filename.includes('.3gp') ||
        filename.includes('.mpg') ||
        filename.includes('.mpeg') ||
        filename.includes('.mpe') ||
        filename.includes('.mp4') ||
        filename.includes('.avi')
      ) {
        // Video files
        android.actionViewIntent(path, 'video/*');
      } else {
        android.actionViewIntent(path, '*/*');
      }
    } else {
      RNFetchBlob.ios.openDocument(path);
    }
  } catch (error) {
    console.log('LOI DOC FILE');
    console.log(error);
  }
};

export default HandleFile;
