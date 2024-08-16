import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement:
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "signup",
                element: <SignUp/>
            }
        ]
    }
])