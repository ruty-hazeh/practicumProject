import { createBrowserRouter } from "react-router"
import HomePage from "./components/HomePage"
import AppLayout from "./components/AppLayout"




export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children:
            [
               

            ]
    }

])
export default myRouter;

