import { User } from "./user";
import { createContext } from "react";


export type UserContextType={
    user:User,
    userDispatch:React.Dispatch<any>
};
export const UserContext=createContext<UserContextType|null>(null);
    