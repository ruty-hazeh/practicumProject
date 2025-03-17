import { useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import axios from "axios";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const Update = ({ setUpdate }: { setUpdate: Function }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phonRef = useRef<HTMLInputElement>(null);


  const context = useContext(UserContext);
  const [open, setOpen] = useState(true)


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context?.user.firstName) {
      alert("User not logged in");
      return;
    }
    try {
      const res = await axios.put('http://localhost:3000/api/user/',
        {
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          address: addressRef.current?.value,
          email: emailRef.current?.value,
          phone: phonRef.current?.value
        }
        , { headers: { "user-id": context?.user.id, }, }
      )
      context?.userDispatch({
        type: 'UPDATE',
        data: {
          firstName: firstNameRef.current?.value || '',
          lastName: lastNameRef.current?.value || '',
          email: emailRef.current?.value || '',
          address: addressRef.current?.value || '',
          phoneNumber: phonRef.current?.value || ''
        }
      })
      setOpen(false);
      setUpdate();

    } catch (e: any) {
      if (e.status === 404)
        alert('אין כזה משתמש');
      console.log(e);
    }
  }
  return (<>
    <Modal open={open} onClose={() => setUpdate()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <form onSubmit={handleUpdate}>
        <Box sx={style}>
          <TextField label='firstuserName' inputRef={firstNameRef} />
          <TextField label='lastuserName' inputRef={lastNameRef} />
          <TextField label='address' inputRef={addressRef} />
          <TextField label='email' inputRef={emailRef} />
          <TextField label='phone' inputRef={phonRef} />

          <Button type="submit" variant="contained" sx={{
            background: 'black',
            color: 'white',
            borderRadius: '10px',
            border: '2px solid white', mt: 2
          }} >Send </Button>
        </Box>
      </form>
    </Modal>
  </>)
}
export default Update;
