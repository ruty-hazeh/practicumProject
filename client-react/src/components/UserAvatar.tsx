// import { Box, Avatar, Typography, Button, Modal } from "@mui/material";
// import { pink } from "@mui/material/colors";
// import { useContext, useState } from "react";
// import { UserContext } from "./userContext";
// import Update from "./Update";

// const style = {
//   position: "absolute",
//   top: "5%",
//   left: "5%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   gap: 2,
//   padding: 2,
//   width: 250,
//   bgcolor: 'background.paper',
//   borderRadius: 2,
// }
// const UserAvatar = () => {
//   const context = useContext(UserContext);
//   console.log("User context: ", context?.user.name);
//   const [open, setOpen] = useState(false)
//   if (!context)
//     return null;
//   return (<>
//     <Box sx={style}>
//       <Typography sx={{ fontWeight: "bold", color: "#333", marginBottom: 1, }}
//       >Hello {context?.user.name}</Typography>
//       <Avatar sx={{ bgcolor: pink[600], width: 56, height: 56, fontSize: 24, fontWeight: "bold", }}
//       >{context?.user.name?.charAt(0).toLocaleUpperCase()}</Avatar>

//       <Button color="primary" variant="contained"
//         sx={{
//           background: 'black',
//           color: 'white',
//           borderRadius: '10px',
//           border: '2px solid white', mt: 2
//         }} onClick={() => setOpen(true)}>update your details</Button>
//     </Box>
//     <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="update-form-modal">
//       <Box sx={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 400,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 24,
//         p: 4,
//       }}
//       >
//         <Update setUpdate={() => setOpen(false)} />
//       </Box>
//     </Modal>
//   </>)

// }
// export default UserAvatar;




"use client"

import { useContext, useState } from "react"
import { UserContext } from "./userContext"
import Update from "./Update"

const UserAvatar = () => {
  const context = useContext(UserContext)
  console.log("User context: ", context?.user.name)
  const [open, setOpen] = useState(false)

  if (!context) return null

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.4); }
          50% { box-shadow: 0 0 30px rgba(72, 202, 228, 0.6); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>

      {/* User Avatar Card */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          padding: "25px",
          width: "280px",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 25%, rgba(240, 147, 251, 0.9) 50%, rgba(245, 87, 108, 0.9) 75%, rgba(79, 172, 254, 0.9) 100%)",
          borderRadius: "20px",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          animation: "slideIn 0.6s ease-out",
          zIndex: 100,
        }}
      >
        {/* Floating Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "30px",
            height: "30px",
            background: "linear-gradient(45deg, #feca57, #ff6b6b)",
            borderRadius: "50%",
            opacity: 0.4,
            animation: "float 3s ease-in-out infinite",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
            width: "20px",
            height: "20px",
            background: "linear-gradient(45deg, #48cae4, #a8e6cf)",
            borderRadius: "50%",
            opacity: 0.5,
            animation: "float 4s ease-in-out infinite reverse",
          }}
        ></div>

        {/* Welcome Text */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "900",
            color: "white",
            marginBottom: "5px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(45deg, #ffffff, #feca57)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hello {context?.user.name}! 👋
        </div>

        {/* Avatar */}
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(45deg, #ff6b6b, #feca57, #48cae4, #a8e6cf)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
            color: "white",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            animation: "pulse 3s ease-in-out infinite",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer Effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
              backgroundSize: "200px 100%",
              animation: "shimmer 2s infinite",
            }}
          ></div>
          <span style={{ position: "relative", zIndex: 1 }}>{context?.user.name?.charAt(0).toLocaleUpperCase()}</span>
        </div>

        {/* User Info */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "8px",
              textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Username:</span> {context?.user.name}
          </div>
          {context?.user.email && (
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "8px",
                textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                wordBreak: "break-all",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Email:</span> {context?.user.email}
            </div>
          )}
        </div>

        {/* Update Button */}
        <button
          style={{
            width: "100%",
            padding: "15px",
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            animation: "glow 3s ease-in-out infinite",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(-2px) scale(1.02)"
            target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(0) scale(1)"
            target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
          }}
          onClick={() => setOpen(true)}
        >
          <span style={{ fontSize: "18px" }}>⚙️</span>
          Update Details
        </button>

        {/* Music Note Decoration */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "25px",
            fontSize: "24px",
            opacity: 0.3,
            animation: "float 5s ease-in-out infinite",
          }}
        >
          🎵
        </div>
      </div>

      {/* Update Modal */}
      {open && <Update setUpdate={() => setOpen(false)} />}
    </>
  )
}

export default UserAvatar







