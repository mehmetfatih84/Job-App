import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    newJobData.date = new Date().toLocaleDateString();
    newJobData.id = v4();

    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("Yeni iş eklendi");

        dispatch(createJob(newJobData));

        navigate("/");
      })
      .catch(() => {
        toast.error("Ekleme işleminde sorun oluştu.");
      });
  };

  const removeDuplicates = (key) => {
    const arr = jobState.jobs.map((job) => job[key]);
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" type="text" required />

            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" type="text" required />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" type="text" required />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Gönder</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
