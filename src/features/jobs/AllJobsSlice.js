import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
    search: "",
    searchStatus: "all",
    searchType: "all",
    sortType: "latest",
    searchStatusOptions: ["all", "interview", "declined", "pending"],
    searchTypeOptions: [
        "all",
        "full-time",
        "part-time",
        "remote",
        "internship",
    ],
    sortTypeOptions: ["latest", 'oldest', 'a-z', 'z-a'],
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPage: 1,
    page: 1,
    monthlyApplications: {...initialFilterState}
};

const AllJobsSlice = createSlice({
    name: "allJobs",
    initialState,
    reducers: {},
});

export const {} = AllJobsSlice.actions;
export default AllJobsSlice.reducer;
