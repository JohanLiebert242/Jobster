import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { logoutUser, toggleSideBar } from "../features/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const displaySidebar = () => dispatch(toggleSideBar());
    const user = useSelector((store) => store.userState.user);

    const [dropDown, setDropDown] = useState(false);
    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };
    return (
        <Wrapper>
            <div className="nav-center">
                <button type="button" className="toggle-btn">
                    <FaAlignLeft onClick={displaySidebar} />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                <div onClick={handleDropDown} className="btn-container">
                    <button className="btn" type="button">
                        <FaUserCircle />
                        {user.name}
                        <FaCaretDown />
                    </button>
                    <div
                        className={
                            dropDown ? "dropdown show-dropdown" : "dropdown"
                        }
                    >
                        <button
                            onClick={handleLogout}
                            className="dropdown-btn"
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Navbar;
