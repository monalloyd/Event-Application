import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Error from "../pages/Error";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";

const Routes = () => {
    const { token } = useAuth();

    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <ProtectedRoute role={"ROLE_USER"}/>,
        errorElement: <Error />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <div>User Profile</div>,
            }
        ],
      },
    ];

    const routesForAdminOnly = [
        {
            path: "/admin",
            element: <ProtectedRoute role={"ROLE_ADMIN"} />,
            children: [
                {
                    path: "/admin",
                    element: <div>Admin stuff</div>,
                },
                
            ],
        }
    ];
  
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        }
    ];
    
    const router = createBrowserRouter([
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAdminOnly,
      ...routesForAuthenticatedOnly,
    ]);
  
    return <RouterProvider router={router} />;
};
  
export default Routes;