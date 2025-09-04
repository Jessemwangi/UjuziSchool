import { useFetch } from "../../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, CircularProgress } from "@mui/material";

function PricingTable({
  title,
  id,
  documentId,
  delay,
  amount,
  duration,
  sm_text,
  item_off_1,
  item_off_2,
  list,
}) {

 
  return (
    <div
      className="col-lg-4"
      data-sal-delay={delay}
      //  data-sal="slide-up"
      data-sal-duration="800"
    >
      <div className="pricing-table">
        <div className="pricing-header">
          <h6 className="title">{title}</h6>
          <div className="price-wrap">
            <span className="amount">${amount}</span>
            <span className="duration">{duration}</span>
          </div>
          <p>{sm_text}</p>
        </div>

        <div className="pricing-body">
          <ul className="list-item">
            {list && list.map(({description, id}) => (
              <li key={id}>
                <i className="icon-20"></i>{description|| 'Feature'}
              </li>
            ))}

            <li className={`${item_off_1 ? "item-off" : ""}`}>
              <i className="icon-20"></i>Course discussions
            </li>
            {/* <li className={`${item_off_1 ? "item-off" : ""}`}>
              <i className="icon-20"></i>Offline learning
            </li> */}
          </ul>
        </div>

        <div className="pricing-btn">
          <Link
            className="edu-btn btn-border btn-medium"
            to={`/member/admin/package/${documentId}`}
          >
            Select plan<i className="icon-east"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

const PricingArea = () => {
  const url =
    "/subscription-packages?populate[item_per_packages][populate][subscription_package_items]=true&populate[charges]=true";
  const { data, loading, error } = useFetch(url);
  const navigate = useNavigate();

  if (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      error.message ||
      "Something went wrong";
    if (errorMessage === "Forbidden") {
      return (
        <div className="adminMain">
          <div className="main-content">
            <Alert severity="info" sx={{ marginBottom: "1rem" }}>
              You are not an agent
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate("/member/agent-registration")}
            >
              Register as Agent
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="adminMain">
          <div className="main-content">
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              {errorMessage}
            </Alert>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }
  }

  if (loading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (!data?.data?.length || !data?.data > 0) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="info" sx={{ marginBottom: "1rem" }}>
            Sorry but we could not find any package
          </Alert>
        </div>
      </div>
    );
  }
 

  return (
    <div className="container">
      <div
        className="section-title section-center"
        data-sal="slide-up"
        data-sal-duration="400"
      >
        <span className="pre-title">View membership Plans</span>
        <h2 className="title">Great Membership Plan</h2>
        <span className="shape-line">
          <i className="icon-19"></i>
        </span>
      </div>
      <div className="row g-5">
        {data?.data &&
          data?.data?.map(({ packageName, id,documentId, charges,duration,descritpion,item_per_packages}) => (
            <PricingTable
              key={id}
              id={id}
              documentId={documentId}
              delay="500"
              title={packageName}
              amount={charges.reduce(
                (acc, item) => acc + item.amount,
                0
              )}
              duration={duration}
              item_off_1={true}
              sm_text={descritpion}
              item_off_2={true}
              list={
                item_per_packages?.flatMap(
                  (subItem) =>
                    subItem?.subscription_package_items || []
                ) || []
              }
            />
          ))}
      </div>
    </div>
  );
};

export default PricingArea;
