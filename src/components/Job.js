import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob } from "../features/jobs/AddJobSlice";
import { setEditJob } from "../features/jobs/AddJobSlice";

function Job({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) {
    const dispatch = useDispatch();
    const date = moment(createdAt).format("MMM Do, YYYY");

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link
                            onClick={() =>
                                dispatch(
                                    setEditJob({
                                        editJobId: _id,
                                        position,
                                        company,
                                        jobLocation,
                                        jobType,
                                        status,
                                    })
                                )
                            }
                            to="/home/add-job"
                            className="btn edit-btn"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => dispatch(deleteJob(_id))}
                            type="button"
                            className="btn delete-btn"
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
}

export default Job;
