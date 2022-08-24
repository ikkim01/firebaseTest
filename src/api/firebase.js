import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// 파이어베이스 Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};

firebase.initializeApp(firebaseConfig);

// 사용할 기능들은 알아보기 쉽게 이름을 지은뒤 export 해서 필요한곳에 사용하자
const firestore = firebase.firestore();

export { firestore };
