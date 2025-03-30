import { createBrowserRouter } from "react-router"
import AppLayout from "./components/AppLayout"
import SongsPage from "./components/SongsPage";




export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children:
            [
                { path: 'songs', element: <SongsPage /> },  // מסך הבית

            ]
    }

])
export default myRouter;

