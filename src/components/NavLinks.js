import links from "../utils/links";
import { NavLink } from "react-router-dom";

function NavLinks({ displaySidebar }) {
    return (
        <div className="nav-links">
            {links.map((link) => (
                <NavLink
                    onClick={displaySidebar}
                    className={({ isActive }) => {
                        return isActive ? "nav-link active" : "nav-link";
                    }}
                    key={link.id}
                    to={link.path}
                >
                    <span className="icon">{link.icon}</span>
                    {link.text}
                </NavLink>
            ))}
        </div>
    );
}

export default NavLinks;
