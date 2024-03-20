import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/util";
import { toast } from "react-toastify";

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
    sortTypeOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPage: 1,
    page: 1,
    monthlyApplications: [],
    ...initialFilterState,
};

export const getAllJobs = createAsyncThunk(
    "allJobs/getJobs",
    async (_, thunkAPI) => {
        let url = `/jobs`;

        try {
            const resp = await customFetch.get(url, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().userState.user.token
                    }`,
                },
            });

            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const deleteJob = createAsyncThunk(
    "job/deleteJob",
    async (jobId, thunkAPI) => {
        thunkAPI.dispatch(showLoading());
        try {
            const res = await customFetch.delete(`/jobs/${jobId}`, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().userState.user.token
                    }`,
                },
            });
            toast.success(res.data.msg);
            thunkAPI.dispatch(getAllJobs());
        } catch (error) {
            thunkAPI.dispatch(hideLoading());
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

const AllJobsSlice = createSlice({
    name: "allJobs",
    initialState,
    reducers: {
        showLoading: (state, action) => {
            state.isLoading = true;
        },
        hideLoading: (state, action) => {
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getAllJobs.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.isLoading = false;
                state.jobs = payload.jobs;
            })
            .addCase(getAllJobs.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            });
    },
});

export const { showLoading, hideLoading } = AllJobsSlice.actions;
export default AllJobsSlice.reducer;
