"use client"
import { useEffect, useState } from 'react'
import 'firebase/firestore';
import { firestore } from '../firebase';
import { initializeApp } from 'firebase/app';
import HistoryProduct from '../components/HistoryProduct';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

// import firebase from 'firebase/app';
// import { fetchOrders } from '../firebase'


const page = () => {
    const [orders, setOrders] = useState("");
    const [user, setUser] = useState(null);
    const { googleSignIn, logOut, signInWithGoogle } = UserAuth()

    const [loading, error] = useAuthState(getAuth());
    const [authLoaded, setAuthLoaded] = useState(false);


    console.log(user)

    const calculateGrandTotal = (order) => {
        console.log(order)
        let sum = 0
        for (let i = 0; i < order.length; i++) {
            console.log(order[i].totalPrice)
            sum += order[i].totalPrice
        }
        return sum.toFixed(2)
    }


    const fetchOrders = async (userId) => {
        // const orders = collection(firestore, `users/${userId}/orders`);
        // const snapshot = await getDocs(orders);


        // const result = snapshot.docs.map(doc => doc.data());
        // console.log(result)
        // return result;

        // Reference to the user document
        const userDocRef = doc(firestore, 'users', userId);

        // Get the snapshot of the user document
        const userDocSnapshot = await getDoc(userDocRef);

        // Extract the 'orders' array from the user document
        const ordersArray = userDocSnapshot.exists() ? userDocSnapshot.data().orders || [] : [];
        const reversedOrders = ordersArray.slice().reverse();

        console.log('User Orders:', ordersArray);
        setOrders(ordersArray);


    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            // Update the component state with the user information
            setUser(user);
            console.log(user)
            const userId = user.uid
            console.log(userId)

            if (user && user.uid) {
                fetchOrders(userId)
            }
        });

        // Clean up the observer when the component unmounts
        return () => unsubscribe();

    }, []); // The empty dependency array ensures the effect runs once on mount

    useEffect(() => {
        // This log will reflect the updated state after the component re-renders
        console.log(orders);
    }, [orders]);

    // Render content based on user authentication state
    return (
        <div className="my-20 mx-8 flex flex-col ">
            <div>
                <h1 className="mb-5">Order History</h1>
            </div>
            <div className="flex flex-col">
                {orders && orders.map((order) => (

                    <HistoryProduct order={order}
                        grandTotal={calculateGrandTotal(order)} />

                ))}
            </div>

        </div>
    );
}

export default page
