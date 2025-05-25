import { createBrowserRouter } from "react-router"
import AppLayout from "./components/AppLayout"
import SongsPage from "./components/SongsPage";
import PlaylistPage from "./components/PlaylistPage";




export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children:
            [
                
                { path: 'songs', element: <SongsPage /> },  // רשימת שירים
                { path: 'playlist', element: <PlaylistPage /> },  // רשימות השמעה 

            ]
    }

])
export default myRouter;

