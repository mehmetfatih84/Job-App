import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = ({ getJobs }) => {
  const jobState = useSelector((store) => store.jobReducer);

  return (
    <div className="list-page">
      <Filter />
      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
