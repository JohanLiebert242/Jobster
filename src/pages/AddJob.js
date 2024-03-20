import { Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashBoardFormPage";
import TitleSection from "../components/TitleSection";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { clearValue, handleInputChange } from "../features/jobs/AddJobSlice";
import { customFetch } from "../utils/util";
import { toast } from "react-toastify";
import { logoutUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { editJob } from "../features/jobs/AddJobSlice";

export const action =
    (store) =>
    async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const { user } = store.getState().userState;

        try {
            const res = await customFetch.post("/jobs", data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            toast.success("Job added!");
            store.dispatch(clearValue());

            return res.data;
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.msg;
            toast.error(message);
            if (error.status === 401) {
                store.dispatch(logoutUser);
            }
            return null;
        }
    };

function AddJob() {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobTypeOptions,
        jobType,
        statusOptions,
        status,
        isEditing,
        editJobId,
    } = useSelector((store) => store.jobState);

    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.userState);

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleInputChange({ name, value }));
    };

    console.log(isEditing);

    useEffect(() => {
        if (!isEditing) {
            dispatch(
                handleInputChange({ name: "jobLocation", value: user.location })
            );
        }
    }, []);

    useEffect(() => {
        if (isEditing) {
            dispatch(
                editJob({
                    jobId: editJobId,
                    job: {
                        position,
                        company,
                        jobLocation,
                        status,
                    },
                })
            );
        }
    }, []);


    return (
        <Wrapper>
            <Form method="POST" className="form">
                <TitleSection text={isEditing ? "Edit Job" : "Add Job"} />
                <div className="form-center">
                    <FormInput
                        onChange={(e) => handleJobInput(e)}
                        name="position"
                        text="Position"
                        type="text"
                        value={position}
                    />
                    <FormInput
                        onChange={(e) => handleJobInput(e)}
                        name="company"
                        text="Company"
                        type="text"
                        value={company}
                    />
                    <FormInput
                        name="jobLocation"
                        text="Job Location"
                        type="text"
                        value={jobLocation}
                        onChange={(e) => handleJobInput(e)}
                    />
                    <FormSelect
                        name="status"
                        labelText="Status"
                        lists={statusOptions}
                        value={jobType}
                        onChange={(e) => handleJobInput(e)}
                    />
                    <FormSelect
                        name="jobType"
                        labelText="Job Type"
                        lists={jobTypeOptions}
                        value={status}
                        onChange={(e) => handleJobInput(e)}
                    />
                    <div className="btn-container">
                        <button
                            onClick={() => dispatch(clearValue())}
                            type="button"
                            className="btn btn-block clear-btn"
                        >
                            clear
                        </button>
                        <button
                            type="submit"
                            className="btn btn-block submit-btn"
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </Form>
        </Wrapper>
    );
}

export default AddJob;
