import { useForm } from 'react-hook-form';
import regimg from '../../../src/assets/images/opinio-login-reg.webp'
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosCommon from '../../hooks/useAxiosCommon';

const Register = () => {

    const [showPass, setShowPass] = useState(false)

    const axiosCommon = useAxiosCommon();


    const { createUser, updateUserProfile, user, googleLogin, loading, setLoading, setUser } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)
        const name = data.name
        const photo = data.photo

        createUser(data.email, data.password)
            .then(result => {
                toast("Successfully registered")

                updateUserProfile(name, photo)
                    // .then(() => {
                    //     navigate('/')
                    // })
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: result.user?.photoURL,
                            role: 'User',
                            status: 'Bronze',
                        }
                        axiosCommon.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log('user added to the database')
                                    reset();
                                    navigate('/');
                                }
                            })

                        // using put
                        // const currentUser = {
                        //     name: data.name,
                        //     email: data.email,
                        //     role: 'User',
                        //     status: 'Bronze',
                        // }
                        // const { data } = axios.put(
                        //     `${import.meta.env.VITE_API_URL}/user`,
                        //     currentUser
                        // )
                        // navigate('/');


                    })
                // .catch(error => console.log(error))




            })



        // try {
        //     // setLoading(true)
        //     //2. User Registration
        //     const result = await createUser(data.email, data.password)
        //     // console.log(result)

        //     // 3. Save username and photo in firebase
        //     await updateUserProfile(data.name, data.photo)
        //     // navigate('/')
        //     toast("Successfully registered")
        // } catch (err) {
        //     console.log(err)
        //     toast(err.message)
        // }



    }


    const handleGoogleLogin = () => {
        googleLogin()
            // .then(result => setUser(result.user))
            .then(result => {
                // console.log(result.user);
                toast("Logging in");
                // post new user using post 
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'User',
                    status: 'Bronze',
                }
                axiosCommon.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        navigate('/');
                    })

                // using put 
                // const currentUser = {
                //     name: result.user?.displayName,
                //     email: result.user?.email,
                //     role: 'User',
                //     status: 'Bronze',
                // }
                // const { data } = axios.put(
                //     `${import.meta.env.VITE_API_URL}/user`,
                //     currentUser
                // )
                // navigate('/');

            })
    }

    useEffect(() => {
        if (user) {
            navigate(location?.state ? location.state : '/')

        }
    }, [user, location.state, navigate])

    return (
        <div>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-center bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${regimg})` }}></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <a href="/">
                            <p className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-4xl font-bold">opinio</p>
                        </a>
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Register now!
                    </p>

                    <button onClick={handleGoogleLogin} className="flex btn-block items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <div className="px-4 py-2">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                            </svg>
                        </div>

                        <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                    </button>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b lg:w-1/4"></span>

                        <p className="text-xs text-center text-gray-500 uppercase ">or register with email</p>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* <form onSubmit={handleSubmit(onSubmit)} className="card-body"> */}



                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Name</label>
                                <input {...register("name", { required: true })} name="name" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
                                <input {...register("email", { required: true })} name="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                                {errors.email && <span>This field is required</span>}
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Photo</label>
                                <input {...register("photo", { required: true })} name="photo" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="url" />
                                {errors.photo && <span>This field is required</span>}
                            </div>


                            <div className="mt-4 relative">
                                <div className="flex justify-between">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>

                                </div>

                                <input {...register("password", { required: true, minLength: 6 })} type={showPass ? "text" : "password"} name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" />

                                <span className="absolute top-10 text-xl right-5" onClick={() => setShowPass(!showPass)}>
                                    {
                                        showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }</span>

                                {errors.password?.type === "required" && (
                                    <p role="alert">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p role="alert">Password must be at least 6 characters.</p>
                                )}
                            </div>





                            {/* <div className="text-red-700">
                                {error && <p className="text-red-700">error!</p>}
                            </div> */}
                            <div className="form-control mt-6">
                                <button className="btn btn-neutral">Register</button>
                            </div>

                            {/* {
                                error && (
                                    <div className="toast toast-top toast-end">
                                        <div className="bg-red-400 alert alert-info">
                                            <span className="text-white">{error}</span>
                                        </div>
                                    </div>)
                            } */}

                            {/* {
                                error && <small className="text-red-500">{error}</small>
                            } */}


                        </form>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link to={"/login"} className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign in</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;