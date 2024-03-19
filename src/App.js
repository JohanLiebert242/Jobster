import {
    LandingPage,
    Error,
    Register,
    AllJobs,
    AddJob,
    Profile,
    HomeLayout,
    Login,
} from "./pages";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./store";

import { loader as homeLoader } from "./pages/HomeLayout";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as profileAction } from "./pages/Profile";
import { action as addJobAction } from "./pages/AddJob";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomeLayout />,
        loader: homeLoader(store),
        children: [
            {
                path: "all-jobs",
                element: <AllJobs />,
            },
            {
                path: "add-job",
                element: <AddJob />,
                action: addJobAction(store)
            },
            {
                path: "profile",
                element: <Profile />,
                action: profileAction(store)
            },
        ],
    },
    {
        index: true,
        element: <LandingPage />,
        errorElement: <Error />,
    },
    {
        path: "/register",
        element: <Register />,
        action: registerAction,
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction(store),
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
