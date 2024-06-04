import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Dashboard/Common/Profile/Profile";
import AddPost from "../pages/Dashboard/User/AddPost/AddPost";
import MyPosts from "../pages/Dashboard/User/MyPosts/MyPosts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import Comments from "../pages/Comments/Comments";
import ReportedComments from "../pages/Dashboard/Admin/ReportedComments/ReportedComments";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/comments/:id',
                element: <Comments></Comments>,
            },
        ],
    },
    {
        path: '/dashboard',
        element:
            (<PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'profile',
                element:
                    (<PrivateRoute>
                        <Profile></Profile>
                    </PrivateRoute>)
            },
            {
                path: 'add-post',
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <AddPost></AddPost>
                        </UserRoute>
                    </PrivateRoute>)
            },
            {
                path: 'my-posts',
                element:
                    (<PrivateRoute>
                        <UserRoute>
                            <MyPosts></MyPosts>
                        </UserRoute>
                    </PrivateRoute>)
            },
            {
                path: 'manage-users',
                element:
                    (<PrivateRoute>
                        <AdminRoute>
                            <ManageUsers></ManageUsers>
                        </AdminRoute>
                    </PrivateRoute>)
            },
            {
                path: 'reported-comments',
                element:
                    (<PrivateRoute>
                        <AdminRoute>
                            <ReportedComments></ReportedComments>
                        </AdminRoute>
                    </PrivateRoute>)
            },
            {
                path: 'make-announcement',
                element:
                    (<PrivateRoute>
                        <AdminRoute>
                            <MakeAnnouncement></MakeAnnouncement>
                        </AdminRoute>
                    </PrivateRoute>)
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
])
