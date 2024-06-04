import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";


const Dashboard = () => {

    const links = <>
        <Sidebar></Sidebar>
    </>

    return (
        <div className="flex">
            <div>



                {/* <div className="drawer md:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <label htmlFor="my-drawer-2" className="btn btn-block btn-neutral drawer-button md:hidden">Open Menu</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>

                    </div>
                </div> */}

                <div>
                    <div>
                        {/* <a className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text btn btn-ghost text-xl font-bold lg:hidden" href="/">Open Menu</a> */}
                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-ghost m-4 fixed lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>


                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">

                                {links}

                            </ul>
                        </div>


                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-4">

                            {links}

                        </ul>
                    </div>
                </div>

            </div >
            <div className="mx-auto m-10">
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Dashboard;




