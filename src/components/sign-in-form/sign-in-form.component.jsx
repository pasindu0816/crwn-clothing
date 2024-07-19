import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer, ButtonsContainer } from './sign-in-form.styles'

const defaultFormFields = {
    email: '',
    password: '',
} 

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate(); // Initialize useNavigate hook

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
        navigate('/shop'); // Redirect to shop after Google sign in
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
            navigate('/shop'); // Redirect to shop after email/password sign in
        
        } catch (error) {
            if (error.code === "auth/invalid-login-credentials") {
                alert('incorrect email or password');
            }
            console.log(error);
        }

    }
 
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In </Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In </Button>
                </ButtonsContainer>

            </form>
        </SignUpContainer>
    );
};

export default SignInForm;
