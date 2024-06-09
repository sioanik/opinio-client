import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { RxAvatar } from "react-icons/rx";
import { HiSpeakerphone } from "react-icons/hi";
import useAnnouncements from "../../../hooks/useAnnouncements";
import useRole from "../../../hooks/useRole";




const Navbar = () => {
    const [role] = useRole()
    const { logOut, user } = useAuth()
    // console.log(role.role);
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
        <li><NavLink to={'/dashboard/payment/100'} >Membership</NavLink></li>

    </>
    const links2 = <>
        <li className="text-xl mb-2">{user?.displayName}</li>
        <li className="mb-2 btn btn-sm btn-neutral"><Link to={role.role=='Admin'?'dashboard/admin-home': 'dashboard/profile' } >Dashboard</Link></li>
        <li><button onClick={() => logOut()} className='btn btn-sm btn-neutral'>Logout</button></li>

    </>

    const [ann] = useAnnouncements()

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
                    <a className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text btn btn-ghost text-2xl md:text-4xl font-bold" href="/">opinio</a>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">

                        {links}

                    </ul>
                </div>
                <div className="navbar-end flex items-center">
                    {/* <ul className="menu flex justify-center menu-horizontal px-1">

                    </ul> */}
                    {
                        ann.length > 0 && !!user &&
                        <div className="mr-6 flex items-center gap-2">
                            <p className="text-2xl"><HiSpeakerphone /></p>
                            <div className="badge badge-neutral">{ann.length}</div>
                        </div>
                    }
                    <div>
                        {user ?
                            // <div className='flex justify-center items-center gap-5'>
                            //     <div className="text-black avatar">
                            //         <div className="w-12 rounded-full">
                            //             <img referrerPolicy="no-referrer" src={user?.photoURL} />
                            //         </div>


                            //     </div>

                            //     <button onClick={() => logOut()} className='btn btn-sm btn-neutral'>Logout</button>

                            // </div> 
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="">

                                    {
                                        user?.photoURL ?
                                            <img className="object-cover mr-3 w-12 h-12 rounded-full" referrerPolicy="no-referrer" src={user?.photoURL} />
                                            :
                                            <p className="text-4xl"><RxAvatar /></p>
                                    }

                                </div>

                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-auto">

                                    {links2}

                                </ul>
                            </div>
                            :

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