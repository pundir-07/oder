// import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../utils/firebaseConfig"



// export async function signupUserWithEmailAndPassword(email: string, password: string) {
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             console.log(userCredential)

//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage)
//         });
// }

// export async function signupWithPhoneNumber(phone: string) {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: "invisible"
//     });
//     const appVerifier = window.recaptchaVerifier
//     signInWithPhoneNumber(auth, phone, appVerifier)
//         .then((confirmationResult) => {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             window.confirmationResult = confirmationResult;
//             console.log("Confirmation block")
//             console.log(confirmationResult)
//             confirmationResult.confirm("784511").then(res => {
//                 console.log(res)
//             }).catch(err => {
//                 console.log(err)
//             })
//             // ...
//         }).catch((error) => {
//             console.log(error)
//         });
// }