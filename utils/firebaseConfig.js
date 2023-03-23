import { REACT_APP_FIREBASE_KEY } from "@env";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, signOut } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "recipe-app-c5434.firebaseapp.com",
  projectId: "recipe-app-c5434",
  storageBucket: "recipe-app-c5434.appspot.com",
  messagingSenderId: "216766024843",
  appId: "1:216766024843:web:54a06446fe1a23e8d8588e",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const getCollectionByFieldInArray = async (
  collectionName,
  field,
  searchedField,
  isOrder
) => {
  //orderby baska seyleri bozabilir silebilirim.
  let data = [];
  const userRef = collection(db, `${collectionName}`);
  let q;
  if (isOrder === true) {
    q = query(
      userRef,
      where(`${field}`, "==", `${searchedField}`),
      orderBy("timestamp", "desc")
    );
  } else {
    q = query(userRef, where(`${field}`, "==", `${searchedField}`));
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const getCollectionSnapshot = async (collection, uid) => {
  // const snapshot = (await getDoc(doc(db, `${collection}`, `${uid}`))).data();
  // return snapshot;
  return (await getDoc(doc(db, `${collection}`, `${uid}`))).data();
};

export const getCollectionByField = async (
  collectionName,
  field,
  searchedField
) => {
  let data;
  const userRef = collection(db, `${collectionName}`);
  const q = query(userRef, where(`${field}`, "==", `${searchedField}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = doc.data();
  });
  return data;
};

export const realTimeGetCollectionByField = async (
  collectionName,
  field,
  searchedField
) => {
  let data;
  const userRef = collection(db, `${collectionName}`);
  const q = query(userRef, where(`${field}`, "==", `${searchedField}`));
  return q;

  let x = undefined;

  const unsubs = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      x = doc.data();
      // doc.data() is never undefined for query doc snapshots
    });
  });

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   data = doc.data();
  // });
  // return data;
};

export const getFavorites = async (favoritesArray, setSnap) => {
  let data = [];
  const postRef = collection(db, "post");

  const q = query(postRef, where("documentId", "in", favoritesArray));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    data.push(doc.data());
  });
  return data;
};

export const updateField = async (collection, uid, updatedField) => {
  let status = false;
  const document = doc(db, `${collection}`, `${uid}`);
  await updateDoc(document, updatedField).then(() => {
    status = true;
  });
  return status;
};

export const searchRecipe = async (recipe) => {
  console.log(recipe);
  recipe = recipe[0].toUpperCase() + recipe.slice(1).toLowerCase();
  let data = [];

  try {
    const docRef = collection(db, `post`);
    const querySnapshot = await getDocs(
      query(docRef, orderBy("timestamp", "desc"))
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().title.split(" ").includes(recipe)) {
        data.push(doc.data());
      }
    });
  } catch (error) {
    console.log(error);
  }
  return data;
};
