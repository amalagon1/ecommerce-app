'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";


const AuthContext = createContext()

export const UserAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    // New auth function

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            let user = result.user;

            // Set the user document reference
            const userDocRef = doc(firestore, 'users', user.uid);

            // Check if the user already exists in the Firestore "users" collection
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
                // User doesn't exist, create a new document in the "users" collection
                await setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    orders: []

                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [user])


    return (
        <AuthContext.Provider value={{ user, setUser, googleSignIn, signInWithGoogle, logOut }}>{children}</AuthContext.Provider>
    )
}

