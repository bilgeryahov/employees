import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBU5Fkifs-dGDIkvEUIrKzt3IYUqY6rfDU",
    authDomain: "employees-70f8e.firebaseapp.com",
    databaseURL: "https://employees-70f8e.firebaseio.com",
    projectId: "employees-70f8e",
    storageBucket: "employees-70f8e.appspot.com",
    messagingSenderId: "450462568510",
    appId: "1:450462568510:web:6919bdeaea0c7af0"
});

export const secretRef = firebaseApp.database().ref().child('secret');