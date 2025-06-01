
// function parseJwt(token: string) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   } catch {
//     return null;
//   }
// }

// import { Modal, Button, Box, TextField } from "@mui/material";
// import { FormEvent, useContext, useRef, useState } from "react";
// import { UserContext } from "./userContext";
// import { ApiClient, LoginModel, UserDTO } from "../api/client";
// // import jwt_decode from "jwt-decode";

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
//   const emailRef = useRef<HTMLInputElement>(null);
//   const [open, setOpen] = useState(true);

//   const handleSubmitLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     const apiClient = new ApiClient("https://server-dotnet.onrender.com");

//     try {
//       let res: any;

//       const name = nameRef.current?.value || "";
//       const password = passwordRef.current?.value || "";
//       const email = emailRef.current?.value || "";

//       if (typeAction === "Sign") {
//         const registerModel = new UserDTO();
//         registerModel.name = name;
//         registerModel.password = password;
//         registerModel.email = email;

//         console.log("Sending register request:", JSON.stringify(registerModel));
//         res = await apiClient.register(registerModel);
//         console.log("Register response:", res);

//         if (!res || !res.token ) {
//           console.error("Response missing token or message:", res);
//         } else {
       
//           console.log("Registration successful:", res);
//         }

//       } else {
//         const loginModel = new LoginModel();
//         loginModel.name = name;
//         loginModel.password = password;

//         console.log("Sending login request:", JSON.stringify(loginModel));
//         res = await apiClient.login(loginModel);
//         console.log("Login response:", res);
//       }

  
//       const payload = parseJwt(res.token);
//       if (!payload?.id) {
//         console.error("User ID not found in token payload!");
//         return;
//       }
//       const userId = payload.id;

//       console.log(userId)
//       if (res && (res.token )) {
//         context?.userDispatch({
//           type: "CREATE",
//           data: {
//             id: userId,
//             name: name,
//             password: password,
//           },
//         });

//         setOpen(false);
//         successLogin();
//       } else {
//         alert("Something went wrong. Please try again.");
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
//             {typeAction}\
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default Login;

"use client"

import { type FormEvent, useContext, useRef, useState } from "react"
import {
  Button,
  Input,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import { Music, User, Mail, Lock } from "lucide-react"
import { UserContext } from "./userContext"
import { ApiClient, LoginModel, UserDTO } from "../api/client"

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

const Login = ({
  successLogin,
  typeAction,
  close,
}: {
  successLogin: () => void
  typeAction: string
  close: () => void
}) => {
  const context = useContext(UserContext)
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const apiClient = new ApiClient("https://server-dotnet.onrender.com")

    try {
      let res: any
      const name = nameRef.current?.value ?? ""
      const password = passwordRef.current?.value ?? ""
      const email = emailRef.current?.value ?? ""

      if (typeAction === "Sign") {
        const registerModel = new UserDTO()
        registerModel.name = name
        registerModel.password = password
        registerModel.email = email

        res = await apiClient.register(registerModel)
      } else {
        const loginModel = new LoginModel()
        loginModel.name = name
        loginModel.password = password

        res = await apiClient.login(loginModel)
      }

      const payload = parseJwt(res.token)
      if (!payload?.id) {
        console.error("User ID not found in token payload!")
        alert("Invalid token received")
        setIsLoading(false)
        return
      }

      if (res && res.token) {
        context?.userDispatch({
          type: "CREATE",
          data: { id: payload.id, name, password },
        })
        setOpen(false)
        successLogin()
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (e: any) {
      console.error("Error:", e)
      alert(typeAction === "Sign" ? "User already exists" : "Invalid username or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => close()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/20 text-white">
        <div className="relative">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {typeAction === "Sign" ? "Join SoundWave" : "Welcome Back"}
          </DialogTitle>
          <div className="text-center text-gray-300">
            {typeAction === "Sign"
              ? "Create your account and start your musical journey"
              : "Sign in to access your music library"}
          </div>
        </div>

        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSubmitLogin} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                <Input
                  id="name"
                  inputRef={nameRef}
                  placeholder="Enter your username"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                  autoComplete="username"
                />
              </div>

              {typeAction === "Sign" && (
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-200 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    id="email"
                    inputRef={emailRef}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                    autoComplete="email"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-gray-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <Input
                  id="password"
                  inputRef={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                  autoComplete={typeAction === "Sign" ? "new-password" : "current-password"}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {typeAction === "Sign" ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : typeAction === "Sign" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {typeAction === "Sign" ? "Already have an account?" : "Don't have an account?"}
                <button
                  className="text-purple-400 hover:text-purple-300 p-0 ml-1 h-auto font-normal underline bg-transparent border-none"
                  onClick={() => close()}
                  type="button"
                >
                  {typeAction === "Sign" ? "Sign in here" : "Sign up here"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default Login
