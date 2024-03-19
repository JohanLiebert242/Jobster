import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "../../utils/util";

const initialState = {
    isLoading: false,
    position: "",
    company: "",
    jobLocation: getUserFromLocalStorage()?.location || "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    isEditing: false,
    editJobId: "",
};

const AddJobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        handleInputChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValue: (state, action) => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || "",
            };
        },
    },
});

export const { handleInputChange, clearValue } = AddJobSlice.actions;
export default AddJobSlice.reducer;
