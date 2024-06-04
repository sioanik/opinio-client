import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import { LuBadgeInfo } from "react-icons/lu";


const Profile = () => {

    const { user, loading } = useAuth()
    const [role, isLoading] = useRole()
    // console.log(role)

    if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover object-center w-full h-56"
                    src={user.photoURL}
                    alt="avatar"
                />
                <div className="flex items-center px-6 py-3 bg-gray-900">
                    <p className="text-white text-xl"><LuBadgeInfo /></p>
                    <h1 className="mx-3 text-lg font-semibold text-white">{role.status}</h1>
                </div>
                <div className="px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {user.displayName} <span>({role.role})</span>
                    </h1>
                    
                    <p className="py-2 text-gray-700 dark:text-gray-400">
                       ID- {user.uid}
                    </p>
                    <p className="py-2 text-gray-700 dark:text-gray-400">
                        {user.email}
                    </p>
                    {/* <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="suitcase icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M14 11H10V13H14V11Z" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                            />
                        </svg>
                        <h1 className="px-2 text-sm">Meraki UI</h1>
                    </div> */}
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;