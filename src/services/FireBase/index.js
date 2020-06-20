/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,

};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/**
 * Role
 * 0 - user
 * 1 - Recruiter
 * 2 - Admin
 */

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, photoURL, displayName } = user;
    try {
      await userRef.set({
        name: displayName,
        email,
        photoURL,
        role: 0,
        createdAt: new Date(),
        isActive: true,
        ...additionalData,
      });
    } catch (error) {
      return;
    }
  }
  return getUserDocument(user.uid);
};
export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    // console.error('Error fetching user', error);
    return null;
  }
};
export const updateUserDocument = async (
  { uid }, { displayName, jobPosition, country, region, city, linkedin }) => {
  if (!uid) return null;
  try {
    const userRef = firestore.doc(`users/${uid}`);
    const updateSingle = userRef.update({
      displayName,
      jobPosition,
      country,
      region,
      city,
      linkedin,
    });
    return updateSingle;
  } catch (error) {
    return null;
  }
};
export const getAllUsers = async () => {
  const users = [];
  try {
    await firestore.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          users.push(doc.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
    return users;
  } catch (error) {
    return null;
  }
};

export const getAllJobs = async () => {
  const jobs = [];
  try {
    await firestore.collection('jobs')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          jobs.push(doc.data());
        });
      })
      .catch(err => {
        alert('Erro Inesperado', err);
      });
    return jobs;
  } catch (error) {
    return null;
  }
};
