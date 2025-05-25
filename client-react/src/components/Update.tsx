import { useRef, useState, useContext, FormEvent } from "react";
import { UserContext } from "./userContext";
import { Button, Modal, Box, TextField } from "@mui/material";
import { ApiClient, UserDTO } from "../api/client";

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

const Update = ({ setUpdate }: { setUpdate: () => void }) => {
  const apiClient = new ApiClient("https://localhost:7208");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const context = useContext(UserContext);
  const [open, setOpen] = useState(true);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!context?.user?.id) {
      alert("User not logged in");
      return;
    }

    const name = nameRef.current?.value?.trim() || context.user.name || "";
    const email = emailRef.current?.value?.trim() || context.user.email || "";
    const password = passwordRef.current?.value?.trim() || context.user.password || "";

    if (!password) {
      alert("Password is required");
      return;
    }

    const updatedUser = new UserDTO({ name, email, password });

    try {
      console.log("Sending update for ID:", context.user.id);
      await apiClient.userPUT(context.user.id, updatedUser);

      context.userDispatch({
        type: "UPDATE",
        data: updatedUser,
      });

      setOpen(false);
      setUpdate();
    } catch (error: any) {
      console.error("Update failed:", error);
      alert("שגיאה בעדכון המשתמש");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setUpdate();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleUpdate}>
        <Box sx={style}>
          <TextField
            label="User Name"
            inputRef={nameRef}
            defaultValue={context?.user?.name || ""}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            inputRef={emailRef}
            defaultValue={context?.user?.email || ""}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            inputRef={passwordRef}
            defaultValue={context?.user?.password || ""}
            type="password"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "black",
              color: "white",
              borderRadius: "10px",
              border: "2px solid white",
              mt: 2,
            }}
          >
            Send
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default Update;
