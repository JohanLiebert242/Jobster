import { Outlet, redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import SmallSideBar from "../components/SmallSideBar";
import { BigSideBar } from "../components";
import Wrapper from "../assets/wrappers/HomeLayout";

export const loader = (store) => (async) => {
    const user = store.getState().userState.user;
    if (!user) {
        toast.error("You have to log in to access this page!");
        return redirect("/");
    }

    return null;
};

function HomeLayout() {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSideBar />
                <BigSideBar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
}

export default HomeLayout;
