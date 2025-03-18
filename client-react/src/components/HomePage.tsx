
import Login from "./Login";
import { useState } from "react";
import Username_avatar from "./UserAvatar";
import { Box, Button } from "@mui/material";

const HomePage = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [type, setType] = useState('Login');

    const handleLoginSuccess = () => {
        setIsLogin((prev) => {
            if (!prev) setIsLoginOpen(false);
            return !prev;
        });
    }
    return (<>
        {!isLogin && (
            <Box
                sx={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 2 }}>
                <Button variant="contained" color="error" onClick={() => { setIsLoginOpen(true); setType('Sign'); }}>
                    Sign
                </Button>

                <Button variant="contained" color="error" onClick={() => { setIsLoginOpen(true); setType('Login'); }}>
                    Login
                </Button>
            </Box>
        )
        }
        {isLoginOpen && <Login successLogin={handleLoginSuccess} typeAction={type} close={() => setIsLoginOpen(false)} />}
        {isLogin && <Username_avatar />}
    </>)
}
export default HomePage;