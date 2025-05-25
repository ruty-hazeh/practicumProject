
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

import { Modal, Button, Box, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./userContext";
import { ApiClient, LoginModel, UserDTO } from "../api/client";
// import jwt_decode from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = ({ successLogin, typeAction, close }: { successLogin: Function; typeAction: string; close: Function }) => {
  const context = useContext(UserContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    const apiClient = new ApiClient("https://localhost:7208");

    try {
      let res: any;

      const name = nameRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      const email = emailRef.current?.value || "";

      if (typeAction === "Sign") {
        const registerModel = new UserDTO();
        registerModel.name = name;
        registerModel.password = password;
        registerModel.email = email;

        console.log("Sending register request:", JSON.stringify(registerModel));
        res = await apiClient.register(registerModel);
        console.log("Register response:", res);

        if (!res || !res.token ) {
          console.error("Response missing token or message:", res);
        } else {
       
          console.log("Registration successful:", res);
        }

      } else {
        const loginModel = new LoginModel();
        loginModel.name = name;
        loginModel.password = password;

        console.log("Sending login request:", JSON.stringify(loginModel));
        res = await apiClient.login(loginModel);
        console.log("Login response:", res);
      }

  
      const payload = parseJwt(res.token);
      if (!payload?.id) {
        console.error("User ID not found in token payload!");
        return;
      }
      const userId = payload.id;

      console.log(userId)
      if (res && (res.token )) {
        context?.userDispatch({
          type: "CREATE",
          data: {
            id: userId,
            name: name,
            password: password,
          },
        });

        setOpen(false);
        successLogin();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (e: any) {
      console.error("Error:", e);
      alert(typeAction === "Sign" ? "User already exists" : "Invalid username or password");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmitLogin}>
          <TextField label="Name" inputRef={nameRef} fullWidth sx={{ mb: 2 }} />
          {typeAction === "Sign" && <TextField label="Email" inputRef={emailRef} fullWidth sx={{ mb: 2 }} />}
          <TextField label="Password" inputRef={passwordRef} type="password" fullWidth sx={{ mb: 2 }} />

          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "black",
              color: "white",
              borderRadius: "10px",
              border: "2px solid white",
            }}
          >
            {typeAction}\
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
