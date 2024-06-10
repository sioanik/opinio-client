import { NavLink } from "react-router-dom";


const UserMenu = () => {
    return (
        <div>
            <li className="pb-3"><NavLink to={'profile'}>My Profile</NavLink></li>
            <li className="pb-3"><NavLink to={'add-post'}>Add Post</NavLink></li>
            <li className="pb-3"><NavLink to={'my-posts'}>My Posts</NavLink></li>
        </div>
    );
};

export default UserMenu;