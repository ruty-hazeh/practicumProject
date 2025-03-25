


// import { Modal, Button, Box, TextField } from "@mui/material";
// import { FormEvent, useContext, useRef, useState } from "react";
// import { UserContext } from "./userContext";
// import { ApiClient, LoginModel, UserDTO } from "../api/client";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const Login = ({ successLogin, typeAction, close }: { successLogin: Function; typeAction: string; close: Function }) => {
//   const context = useContext(UserContext);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null); // הוספת שדה מייל
//   const [open, setOpen] = useState(true);

//   const handleSubmitLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     const apiClient = new ApiClient("https://localhost:7208");

//     try {
//       let res:any;
//       if (typeAction === "Sign") {
//         // רישום משתמש חדש
//         const registerModel = new UserDTO();
//         registerModel.name = nameRef.current?.value || "";
//         registerModel.password = passwordRef.current?.value || "";
//         registerModel.email = emailRef.current?.value || ""; // הוספת מייל

//         res = await apiClient.register(registerModel);
//         console.log("Response from server:", res);
//         if (!res) {
//           console.error("No response from the server.");
//         } else if (!res.token && !res.message) {
//           console.error("Response is missing token or message:", res);
//         }



//       } else {  
//         // התחברות למערכת
//         const loginModel = new LoginModel();
//         loginModel.name = nameRef.current?.value || "";
//         loginModel.password = passwordRef.current?.value || "";

//         res = await apiClient.login(loginModel);
//         console.log("Response from server:", res);
//       }

//       if (res && (res.token || res.message)) {
//         context?.userDispatch({
//           type: "CREATE",
//           data: {
//             id: nameRef.current?.value || "",
//             firstName: nameRef.current?.value || "",
//             password: passwordRef.current?.value || "",
//           },
//         });

//         setOpen(false);
//         successLogin();
//       }
//     } catch (e: any) {
//       console.error("Error:", e);
//       alert(typeAction === "Sign" ? "User already exists" : "Invalid username or password");
//     }
//   };
//   return (
//     <Modal
//       open={open}
//       onClose={() => close()}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <form onSubmit={handleSubmitLogin}>
//           <TextField label="Name" inputRef={nameRef} fullWidth sx={{ mb: 2 }} />
//           {typeAction === "Sign" && <TextField label="Email" inputRef={emailRef} fullWidth sx={{ mb: 2 }} />}
//           <TextField label="Password" inputRef={passwordRef} type="password" fullWidth sx={{ mb: 2 }} />

//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               background: "black",
//               color: "white",
//               borderRadius: "10px",
//               border: "2px solid white",
//             }}
//           >
//             {typeAction}
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default Login;



import { Modal, Button, Box, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./userContext";
import { ApiClient, LoginModel, UserDTO } from "../api/client";

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
  const emailRef = useRef<HTMLInputElement>(null); // הוספת שדה מייל
  const [open, setOpen] = useState(true);

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    const apiClient = new ApiClient("https://localhost:7208");

    try {
      let res: any;
      if (typeAction === "Sign") {
        // רישום משתמש חדש
        const registerModel = new UserDTO();
        registerModel.name = nameRef.current?.value || "";
        registerModel.password = passwordRef.current?.value || "";
        registerModel.email = emailRef.current?.value || ""; // הוספת מייל


        console.log("Sending request:", JSON.stringify(registerModel));

        res = await apiClient.register(registerModel);
        console.log("Response from server:", res);

        if (!res || !res.token || !res.message) {
          console.error("Response is missing token or message:", res);
        } else {
          // טיפול בתגובה טובה מהשרת
          console.log("Registration successful:", res);
        }

      } else {
        // התחברות למערכת
        const loginModel = new LoginModel();
        loginModel.name = nameRef.current?.value || "";
        loginModel.password = passwordRef.current?.value || "";


        res = await apiClient.login(loginModel);
        console.log("Response from server:", res);
      }
          
      if (res && (res.token || res.message)) {
        context?.userDispatch({
          type: "CREATE",
          data: {
            id: nameRef.current?.value || "",
            firstName: nameRef.current?.value || "",
            password: passwordRef.current?.value || "",
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
            {typeAction}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
