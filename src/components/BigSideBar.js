import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSideBar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

function BigSideBar() {
    const isSidebarOpen = useSelector((store) => store.userState.isSideBarOpen);

    return (
        <Wrapper>
            <div
                className={
                    isSidebarOpen
                        ? "sidebar-container"
                        : "sidebar-container show-sidebar"
                }
            >
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSideBar;
