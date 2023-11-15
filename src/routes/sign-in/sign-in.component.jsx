import { 
    signInWithGooglePopup,  
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const result = await getRedirectResult(auth);

    //             if (result.user) {
    //                 const userDocRef = await createUserDocumentFromAuth(result.user);
    //             }
    //         } catch (error) {
    //             console.error('Error during Firebase redirect result:', error);
    //         }
    //     };

    //     fetchUser();
    // }, []);


    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);    
    }

    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;