import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    getUserFromLocalStorage,
    addUserToLocalStorage,
    removeUserFromLocalStorage,
} from "../../utils/util";

const initialState = {
    user: getUserFromLocalStorage(),
    isSideBarOpen: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = {
                ...action.payload.user,
                token: action.payload.user.token,
            };
            const name = user.name;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello there ${name}`);
        },
        logoutUser: (state, action) => {
            state.user = null;
            state.isSideBarOpen = false;
            removeUserFromLocalStorage();
            toast.success("Logging out...");
        },
        updateUser: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            addUserToLocalStorage(user);
        },
        toggleSideBar: (state, action) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
    },
});

export const { loginUser, logoutUser, toggleSideBar, updateUser } =
    userSlice.actions;
export default userSlice.reducer;
