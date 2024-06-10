import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import axios from "axios";


const auth = getAuth(app)
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
        })
        console.log(response);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // Get token from server
    const getToken = async (email) => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    // const saveUser = async user => {
    //     const currentUser = {
    //         name: user?.displayName,
    //         email: user?.email,
    //         role: 'User',
    //         status: 'Bronze',
    //     }
    //     const { data } = await axios.put(
    //         `${import.meta.env.VITE_API_URL}/user`,
    //         currentUser
    //     )
    //     return data
    // }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                getToken(currentUser.email)
                // console.log(currentUser);
                // saveUser(currentUser)
                setLoading(false)
            }
            else {
                axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                    withCredentials: true,
                })
                .then(res =>{
                    console.log(res.data);
                })
            }
        })
        return () => {
            return unsubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;