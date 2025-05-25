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