// import { useRef, useState, useContext, FormEvent } from "react";
// import { UserContext } from "./userContext";
// import { Button, Modal, Box, TextField } from "@mui/material";
// import { ApiClient, UserDTO } from "../api/client";

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

// const Update = ({ setUpdate }: { setUpdate: () => void }) => {
//   const apiClient = new ApiClient("https://server-dotnet.onrender.com");
//   const nameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const context = useContext(UserContext);
//   const [open, setOpen] = useState(true);

//   const handleUpdate = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!context?.user?.id) {
//       alert("User not logged in");
//       return;
//     }

//     const name = nameRef.current?.value?.trim() || context.user.name || "";
//     const email = emailRef.current?.value?.trim() || context.user.email || "";
//     const password = passwordRef.current?.value?.trim() || context.user.password || "";

//     if (!password) {
//       alert("Password is required");
//       return;
//     }

//     const updatedUser = new UserDTO({ name, email, password });

//     try {
//       console.log("Sending update for ID:", context.user.id);
//       await apiClient.userPUT(context.user.id, updatedUser);

//       context.userDispatch({
//         type: "UPDATE",
//         data: updatedUser,
//       });

//       setOpen(false);
//       setUpdate();
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       alert("שגיאה בעדכון המשתמש");
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={() => {
//         setOpen(false);
//         setUpdate();
//       }}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <form onSubmit={handleUpdate}>
//         <Box sx={style}>
//           <TextField
//             label="User Name"
//             inputRef={nameRef}
//             defaultValue={context?.user?.name || ""}
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Email"
//             inputRef={emailRef}
//             defaultValue={context?.user?.email || ""}
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             inputRef={passwordRef}
//             defaultValue={context?.user?.password || ""}
//             type="password"
//             fullWidth
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               background: "black",
//               color: "white",
//               borderRadius: "10px",
//               border: "2px solid white",
//               mt: 2,
//             }}
//           >
//             Send
//           </Button>
//         </Box>
//       </form>
//     </Modal>
//   );
// };

// export default Update;



"use client"

import { useRef, useState, useContext, type FormEvent } from "react"
import { UserContext } from "./userContext"
import { ApiClient, UserDTO } from "../api/client"

const Update = ({ setUpdate }: { setUpdate: () => void }) => {
  const apiClient = new ApiClient("https://server-dotnet.onrender.com")
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const context = useContext(UserContext)
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!context?.user?.id) {
      alert("User not logged in")
      setIsLoading(false)
      return
    }

    const name = nameRef.current?.value?.trim() || context.user.name || ""
    const email = emailRef.current?.value?.trim() || context.user.email || ""
    const password = passwordRef.current?.value?.trim() || context.user.password || ""

    if (!password) {
      alert("Password is required")
      setIsLoading(false)
      return
    }

    const updatedUser = new UserDTO({ name, email, password })

    try {
      console.log("Sending update for ID:", context.user.id)
      await apiClient.userPUT(context.user.id, updatedUser)

      context.userDispatch({
        type: "UPDATE",
        data: updatedUser,
      })

      setOpen(false)
      setUpdate()
    } catch (error: any) {
      console.error("Update failed:", error)
      alert("שגיאה בעדכון המשתמש")
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.4); }
          50% { box-shadow: 0 0 40px rgba(72, 202, 228, 0.6); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Modal Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          animation: "backdropFadeIn 0.3s ease-out",
        }}
        onClick={() => {
          setOpen(false)
          setUpdate()
        }}
      >
        {/* Modal Container */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "450px",
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 25%, rgba(240, 147, 251, 0.95) 50%, rgba(245, 87, 108, 0.95) 75%, rgba(79, 172, 254, 0.95) 100%)",
            borderRadius: "25px",
            padding: "0",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            animation: "modalSlideIn 0.4s ease-out",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Decorative Elements */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "60px",
              height: "60px",
              background: "linear-gradient(45deg, #ff6b6b, #feca57)",
              borderRadius: "50%",
              opacity: 0.3,
              animation: "float 3s ease-in-out infinite",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              width: "40px",
              height: "40px",
              background: "linear-gradient(45deg, #48cae4, #a8e6cf)",
              borderRadius: "50%",
              opacity: 0.4,
              animation: "float 4s ease-in-out infinite reverse",
            }}
          ></div>

          {/* Header */}
          <div
            style={{
              textAlign: "center",
              padding: "40px 40px 20px",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.background = "rgba(255, 255, 255, 0.3)"
                target.style.transform = "scale(1.1)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.background = "rgba(255, 255, 255, 0.2)"
                target.style.transform = "scale(1)"
              }}
              onClick={() => {
                setOpen(false)
                setUpdate()
              }}
            >
              ✕
            </button>

            {/* Logo */}
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(45deg, #ff6b6b, #feca57, #48cae4, #a8e6cf)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                animation: "pulse 3s ease-in-out infinite",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span style={{ fontSize: "40px" }}>⚙️</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "white",
                margin: "0 0 10px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Update Profile
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.8)",
                margin: "0",
                textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              Update your account information
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: "0 40px 40px" }}>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Username Field */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "20px",
                    zIndex: 1,
                  }}
                >
                  👤
                </div>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Username"
                  defaultValue={context?.user?.name || ""}
                  style={{
                    width: "100%",
                    padding: "15px 15px 15px 50px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "15px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.6)"
                    target.style.background = "rgba(255, 255, 255, 0.2)"
                    target.style.transform = "scale(1.02)"
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.3)"
                    target.style.background = "rgba(255, 255, 255, 0.1)"
                    target.style.transform = "scale(1)"
                  }}
                />
              </div>

              {/* Email Field */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "20px",
                    zIndex: 1,
                  }}
                >
                  📧
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  defaultValue={context?.user?.email || ""}
                  style={{
                    width: "100%",
                    padding: "15px 15px 15px 50px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "15px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.6)"
                    target.style.background = "rgba(255, 255, 255, 0.2)"
                    target.style.transform = "scale(1.02)"
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.3)"
                    target.style.background = "rgba(255, 255, 255, 0.1)"
                    target.style.transform = "scale(1)"
                  }}
                />
              </div>

              {/* Password Field */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "20px",
                    zIndex: 1,
                  }}
                >
                  🔒
                </div>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  defaultValue={context?.user?.password || ""}
                  style={{
                    width: "100%",
                    padding: "15px 15px 15px 50px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "15px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.6)"
                    target.style.background = "rgba(255, 255, 255, 0.2)"
                    target.style.transform = "scale(1.02)"
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement
                    target.style.border = "2px solid rgba(255, 255, 255, 0.3)"
                    target.style.background = "rgba(255, 255, 255, 0.1)"
                    target.style.transform = "scale(1)"
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: isLoading ? "rgba(255, 255, 255, 0.3)" : "linear-gradient(45deg, #ff6b6b, #feca57)",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "15px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.4s ease",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  animation: isLoading ? "none" : "glow 3s ease-in-out infinite",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(-2px) scale(1.02)"
                    target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(0) scale(1)"
                    target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: "20px" }}>💾</span>
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Update

