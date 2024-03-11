import firebase from "../Config/firebase";

export const login = async (email,password) => {
    const responseUSer = await firebase
    .auth()
    .signInWithEmailAndPassword(email,password);
    return responseUSer;
}