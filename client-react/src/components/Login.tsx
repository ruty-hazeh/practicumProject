import { Modal, Button, Box, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

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
const Login = ({ successLogin, typeAction, close }: { successLogin: Function; typeAction: string, close: Function }) => {
  const context = useContext(UserContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true)
  const [, setUserId] = useState<string>();
  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const link =
        typeAction === "Sign"
          ? "https://localhost:7208/api/Auth/register"
          : "https://localhost:7208/api/Auth/login";

      const res = await axios.post(link, {
        firstName: firstNameRef.current?.value,
        password: passwordRef.current?.value,
      });
      setUserId(res.data.userId);
      context?.userDispatch({
        type: "CREATE",
        data: {
          id: res.data.userId,
          firstName: firstNameRef.current?.value || '',
          password: passwordRef.current?.value || ''
        }
      });
      setOpen(false);
      successLogin();

    } catch (e: any) {

      if (e.status === 400 || e.status === 401) {
        alert(typeAction === "Sign" ? "User already exists" : "User not found");
      }
      console.error(e);
    }
  }
  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmitLogin}>
          <TextField label="FirstName" inputRef={firstNameRef} fullWidth sx={{ mb: 2 }} />
          <TextField label="Password" inputRef={passwordRef} type="password" fullWidth sx={{ mb: 2 }} />

          <Button type="submit" variant="contained"
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
  )
}

export default Login;