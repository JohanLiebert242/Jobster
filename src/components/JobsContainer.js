import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

function JobsContainer() {
    const { jobs, isLoading } = useSelector((store) => store.allJobsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllJobs());
    }, []);

    if (isLoading) {
        return <Loading center />;
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>Job title</h5>
            <div className="jobs">
                {jobs.map((job) => (
                    <Job key={job._id} {...job} />
                ))}
            </div>
        </Wrapper>
    );
}

export default JobsContainer;
