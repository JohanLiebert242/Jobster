import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch, getUserFromLocalStorage } from "../../utils/util";
import { toast } from "react-toastify";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

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

export const editJob = createAsyncThunk(
    "/job/editJob",
    async ({ jobId, job }, thunkAPI) => {
        try {
            const res = await customFetch.patch(`/jobs/${jobId}`, job, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().userState.user.token
                    }`,
                },
            });
            thunkAPI.dispatch(clearValue());
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

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
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success("Job modified...");
            })
            .addCase(editJob.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { handleInputChange, clearValue, setEditJob } =
    AddJobSlice.actions;
export default AddJobSlice.reducer;
