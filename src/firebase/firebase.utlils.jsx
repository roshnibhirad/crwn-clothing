  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  
  const config = {
    apiKey: "AIzaSyAcQNMHhzGYmzk24_83yGLspktEyMdHyJI",
    authDomain: "crwn-db-d66e7.firebaseapp.com",
    databaseURL: "https://crwn-db-d66e7.firebaseio.com",
    projectId: "crwn-db-d66e7",
    storageBucket: "crwn-db-d66e7.appspot.com",
    messagingSenderId: "109050950102",
    appId: "1:109050950102:web:7ff8f932c160f9a3c4f477",
    measurementId: "G-SBTE1J7HGF"
  };

  
  firebase.initializeApp(config);
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;