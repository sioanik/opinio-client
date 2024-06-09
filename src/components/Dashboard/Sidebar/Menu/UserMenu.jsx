import { NavLink } from "react-router-dom";


const UserMenu = () => {
    return (
        <div>
            <li><NavLink to={'profile'}>My Profile</NavLink></li>
            <li><NavLink to={'add-post'}>Add Post</NavLink></li>
            <li><NavLink to={'my-posts'}>My Posts</NavLink></li>
        </div>
    );
};

export default UserMenu;