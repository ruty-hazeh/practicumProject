import { createBrowserRouter } from "react-router"
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

