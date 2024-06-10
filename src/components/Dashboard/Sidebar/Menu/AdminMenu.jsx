import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div>
            <div>
            <li className="pb-3"><NavLink to={'admin-home'}>Admin Profile</NavLink></li>
            <li className="pb-3"><NavLink to={'manage-users'}>Manage Users</NavLink></li>
            <li className="pb-3"><NavLink to={'reported-comments'}>Reported Comments</NavLink></li>
            <li className="pb-3"><NavLink to={'make-announcement'}>Make Announcement</NavLink></li>
        </div>
        </div>
    );
};

export default AdminMenu;