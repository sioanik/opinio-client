import { NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import UserMenu from "./Menu/UserMenu";
import AdminMenu from "./Menu/AdminMenu";
import useAuth from "../../../hooks/useAuth";


const Sidebar = () => {
    const { logOut } = useAuth()

    const [role, isLoading] = useRole()
    // console.log(role.role);

    const navigate = useNavigate()

    const signout = () => {
        logOut()
        navigate('/')
    }

    const links2 = <>
        {/* <li><NavLink to={'profile'}>Profile</NavLink></li> */}
        <li><button onClick={signout} className="bg-slate-300">Logout</button> </li>
    </>

    return (
        <aside className="flex flex-col w-48 md:w-48 lg:w-64 min-h-screen px-4 py-8 overflow-y-auto bg-slate-200 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a href="/">
                <p className="text-center text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-xl font-bold">opinio</p>
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">

                <div>
                    <ul className="menu menu-vertical px-1 gap-4">

                        {role.role === 'User' && <UserMenu></UserMenu>}
                        {role.role === 'Admin' && <AdminMenu></AdminMenu>}
                        {/* {links} */}

                    </ul>
                </div>
                <div>
                    <ul className="menu menu-vertical px-1 gap-4">

                        {links2}

                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;