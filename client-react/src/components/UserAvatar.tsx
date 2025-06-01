import { Box, Avatar, Typography, Button, Modal } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useContext, useState } from "react";
import { UserContext } from "./userContext";
import Update from "./Update";

const style = {
  position: "absolute",
  top: "5%",
  left: "5%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  padding: 2,
  width: 250,
  bgcolor: 'background.paper',
  borderRadius: 2,
}
const UserAvatar = () => {
  const context = useContext(UserContext);
  console.log("User context: ", context?.user.name);
  const [open, setOpen] = useState(false)
  if (!context)
    return null;
  return (<>
    <Box sx={style}>
      <Typography sx={{ fontWeight: "bold", color: "#333", marginBottom: 1, }}
      >Hello {context?.user.name}</Typography>
      <Avatar sx={{ bgcolor: pink[600], width: 56, height: 56, fontSize: 24, fontWeight: "bold", }}
      >{context?.user.name?.charAt(0).toLocaleUpperCase()}</Avatar>

      <Button color="primary" variant="contained"
        sx={{
          background: 'black',
          color: 'white',
          borderRadius: '10px',
          border: '2px solid white', mt: 2
        }} onClick={() => setOpen(true)}>update your details</Button>
    </Box>
    <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="update-form-modal">
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
      >
        <Update setUpdate={() => setOpen(false)} />
      </Box>
    </Modal>
  </>)

}
export default UserAvatar;











// "use client"

// import { Avatar } from "@mui/material"
// import { Button } from "@mui/material"
// import { Card, CardContent } from "@mui/material"
// import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
// import { Music, User, LogOut } from "lucide-react"

// const UsernameAvatar = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//               <Music className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white">SoundWave</h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <Avatar className="w-10 h-10 border-2 border-purple-400">
//               <AvatarImage src="/placeholder.svg?height=40&width=40" />
//               <AvatarFallback className="bg-purple-600 text-white">
//                 <User className="w-5 h-5" />
//               </AvatarFallback>
//             </Avatar>
//             <Button  className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>

//         {/* Welcome Card */}
//         <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
//           <CardContent className="p-8">
//             <div className="text-center">
//               <h2 className="text-4xl font-bold text-white mb-4">Welcome to Your Music World</h2>
//               <p className="text-white/80 text-lg">
//                 Start exploring, creating playlists, and enjoying your favorite music
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Placeholder for music player components */}
//         <div className="text-center text-white/60">
//           <p>Music player components will be added here...</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UsernameAvatar



// import { Avatar } from "@mui/material"
// import { Button } from "@mui/material"
// import { Card, CardContent } from "@mui/material"
// import { Music, User, LogOut } from "lucide-react"

// const UsernameAvatar = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//               <Music className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white">SoundWave</h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <Avatar
//               src="/placeholder.svg?height=40&width=40"
//               className="w-10 h-10 border-2 border-purple-400"
//             >
//               <User className="w-5 h-5" />
//             </Avatar>
//             <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>

//         {/* Welcome Card */}
//         <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
//           <CardContent className="p-8">
//             <div className="text-center">
//               <h2 className="text-4xl font-bold text-white mb-4">Welcome to Your Music World</h2>
//               <p className="text-white/80 text-lg">
//                 Start exploring, creating playlists, and enjoying your favorite music
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Placeholder */}
//         <div className="text-center text-white/60">
//           <p>Music player components will be added here...</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UsernameAvatar
