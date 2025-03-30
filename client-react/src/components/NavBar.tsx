import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

const NavBar = () => {
    const context = useContext(UserContext);
    return (
        <>
            <nav style={{ position: "fixed", top: "5px", right: "50px", display: "flex", gap: "30px" }}>
                <Link to='/'>Home</Link>
                {/* <Link to="/songs">SongsList</Link> */}
                {context?.user && context.user.id &&  <Link to="/songs">SongsList</Link> }
               
            </nav>
        </>
    )
}
export default NavBar;