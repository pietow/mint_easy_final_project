import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./formPage.scss";
import PassResetForm from "../../components/passResetForm/PassResetForm";
import { instance } from '../../axiosInstance';
import LoginForm from "../../components/loginForm/LoginForm";
import { useAuthStateContext } from "../../contexts/AuthStateContext";
import { useNavigate } from "react-router-dom";
const FormPage = () => {
    const [open, setOpen] = useState(false);
    //const history = useHistory();
    const location = useLocation();
    const navigate = useNavigate();
    const { showLoginForm, setShowLoginForm, setIsLoggedIn, setUsername, msg, setMsg } = useAuthStateContext();



    useEffect(() => {
        // Extracting params from the URL
        const path = location.pathname;
        const params = path.split('/');

        // Check if coming from "/reset-password/:uid/:token"
        if (path.startsWith('/reset-password')) {
            const uid = params[2]; // Extracting uid from URL
            const token = params[3]; // Extracting token from URL
            console.log(uid, token);

            // Show the PassResetForm with the extracted uid and token

            // Pass these parameters to the PassResetForm component
            setOpen(true);

        }

        // Check if coming from "/confirm-email/:key"
        if (path.startsWith('/confirm-email')) {
            const key = params[2]; // Extracting key from URL
            console.log(key);

            // Redirect to the endpoint with the extracted key
        
            instance.post(`/registration/account-confirm-email/${key}/`, {key:key})
            .then((response) => {
                console.log("response: ", response);

                // Set the state of the component to show the login form

            if (response.status === 200) {
                navigate('/');
                setShowLoginForm(true);
                setIsLoggedIn(false);
                setUsername(''); 
                setMsg('Email confirmed, you can log in now');
                console.log("msg", msg)
            }




                return response;
            })
            .catch((error) => {
                console.log("error: ", error);
                console.log(error);
            });
        }
    }, [location.pathname, setShowLoginForm, setIsLoggedIn, setUsername, open]); 

    return (
        <div className="home">
            {open && (
                <div className="passResetForm">
                    <PassResetForm setOpen={setOpen} />
                </div>
            )}
        {showLoginForm && <LoginForm slug="Password verified, you can log in now" setOpen={setShowLoginForm} handleLogin={() => {}} />}

        </div>
    );
};

export default FormPage;
