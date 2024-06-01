import {useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { logOut, user } = useAuth()

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        // console.log(localTheme);
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])



    const handleToggleTheme = (e) => {
        // console.log(e.target.checked);
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }

    }

    const links = <>
        <li><NavLink to={'/'} >Home</NavLink></li>
        
    </>

    return (
        <div>
            <div className="navbar w-[90%] mx-auto bg-base-100 my-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>


                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">

                            {links}

                        </ul>
                    </div>
                    <a className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text btn btn-ghost text-xl font-bold" href="/">NomadNest</a>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">


                        {links}


                    </ul>
                </div>
                <div className="navbar-end flex items-center">
                    <ul className="menu flex justify-center menu-horizontal px-1">

                    </ul>
                    <div>
                        {user ?
                            <div className='flex justify-center items-center gap-5'>
                                <div className="text-black avatar tooltip tooltip-bottom">
                                    <div data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName} className="w-12 rounded-full">
                                        <img referrerPolicy="no-referrer" src={user?.photoURL} />
                                        <Tooltip id="my-tooltip" />
                                    </div>


                                </div>

                                <button onClick={() => logOut()} className='btn btn-sm btn-neutral'>Logout</button>

                            </div> :

                            <div className="flex gap-2">
                                <button className='btn btn-xs h-9 btn-neutral'>
                                    <Link to={'/register'}>Register</Link>
                                </button>
                                <button className='btn btn-xs h-9 btn-neutral'>
                                    <Link to={'/login'}>Login</Link>
                                </button>
                            </div>


                        }
                    </div>
                    <div className="pl-4">
                        <label className="cursor-pointer grid place-items-center">
                            <input onChange={handleToggleTheme} type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;