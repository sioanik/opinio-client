import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div>
            <div>
            <li><NavLink to={'manage-users'}>Manage Users</NavLink></li>
            <li><NavLink to={'activities'}>Activities</NavLink></li>
            <li><NavLink to={'make-announcement'}>Make Announcement</NavLink></li>
        </div>
        </div>
    );
};

export default AdminMenu;