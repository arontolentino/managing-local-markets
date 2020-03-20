import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCY2GemZhH18ZVPJF02IA2IJgUhCiEPeIU',
	authDomain: 'marketinglocalmarkets.firebaseapp.com',
	databaseURL: 'https://marketinglocalmarkets.firebaseio.com',
	projectId: 'marketinglocalmarkets',
	storageBucket: 'marketinglocalmarkets.appspot.com',
	messagingSenderId: '483302591028',
	appId: '1:483302591028:web:df871d5068dd0470df1861'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
