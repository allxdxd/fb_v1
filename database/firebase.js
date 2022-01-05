import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBs1Hf9yJ_q3O8dmlWlb-byFPgBSiYH-TQ",
    authDomain: "fb-v1-d42e9.firebaseapp.com",
    projectId: "fb-v1-d42e9",
    storageBucket: "fb-v1-d42e9.appspot.com",
    messagingSenderId: "347067385236",
    appId: "1:347067385236:web:39e7c093021c53df537b81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default {
    db,
}