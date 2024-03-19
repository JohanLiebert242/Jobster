import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/SmallSideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../features/user/userSlice";
import {NavLinks} from '../components';

function SmallSideBar() {
    const isOpen = useSelector((store) => store.userState.isSideBarOpen);
    const dispatch = useDispatch();
    const displaySidebar = () => dispatch(toggleSideBar());
    return (
        <Wrapper>
            <div
                className={
                    isOpen
                        ? "sidebar-container show-sidebar"
                        : "sidebar-container"
                }
            >
                <div className="content">
                    <button type="button" className="close-btn">
                        <FaTimes onClick={displaySidebar} />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks displaySidebar={displaySidebar}/>
                </div>
            </div>
        </Wrapper>
    );
}

export default SmallSideBar;
