import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import Header from "../components/Header";
import CreateEventPage from "../pages/CreateEventPage";
import AdminPage from "../pages/AdminPage";
import Redirect from "./Redirect";

const Routes = () => {
    const { token } = useAuth();

    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <Header><ProtectedRoute role={"ROLE_USER"}/></Header>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Redirect />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <div>User Profile</div>,
            },
            {
                path: "/new",
                element: <CreateEventPage />,
            }
        ],
      },
    ];

    const routesForAdminOnly = [
        {
            path: "/admin",
            element: <Header><ProtectedRoute role={"ROLE_ADMIN"} /></Header>,
            children: [
                {
                    path: "/admin",
                    element: <AdminPage />,
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
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
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