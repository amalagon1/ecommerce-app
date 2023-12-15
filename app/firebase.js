import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAlEYqf5S5RQAxPQ_MibgLDGkShyUrI1KI",
    authDomain: "test-project-94c92.firebaseapp.com",
    projectId: "test-project-94c92",
    storageBucket: "test-project-94c92.appspot.com",
    messagingSenderId: "181256789630",
    appId: "1:181256789630:web:5661552a04f5615677c22f",
    measurementId: "G-KG7ZTDLBDD"
};

const saveOrderToFirestore = async (userId, orderDetails) => {
    try {
        const orderRef = await firestore.collection('orders').add({
            userId,
            createdAt: new Date(),
            ...orderDetails,
        });
        console.log('Order saved with ID:', orderRef.id);
        return orderRef.id; // Optionally, you can return the order ID
    } catch (error) {
        console.error('Error saving order:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};

const newCollection = async () => {
    firebase.firestore().collection("new-coll").add({ "Hello": "World" })
}

// const fetchOrders = async () => {
//     try {
//         const querySnapshot = await getDocs(collection(firestore, 'orders', user.uid));
//         const ordersData = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setOrders(ordersData);
//         console.log(ordersData)
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//     }
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);





export { auth, firestore, saveOrderToFirestore, newCollection }

