import React from "react";
import StudentDataTable from "../../../Componets/StudentDataTable ";
import Typography from "../../../../Component/modules/components/Typography";
import { useFetch } from "../../../../hooks/useFetch";
import { useUser } from "../../../../hooks/UserContext";
import { timeformat } from "../../../../UtilitiesFunctions/formatTime";
import SystemError from "../../../../Component/modules/views/Error/SystemError";
import { Alert, CircularProgress } from "@mui/material";
import Button from "../../../../Component/modules/components/Button";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  // Construct the URL if the user is available
  const url = user?.id ? `/student/agentstudentlist/${user.id}` : null;
  const { data, error, loading } = useFetch(url);

  // Loading state for both user and data fetching
  if (!user || !user.id || !user.jwt || loading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }
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
              sx={{ marginRight: "2rem" }}
            >
              Register as Agent
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/member/admin`)}
              sx={{
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Go Home
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
              sx={{ marginRight: "2rem" }}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/member/admin`)}
              sx={{
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Go Home
            </Button>
          </div>
        </div>
      );
    }
  }

  const convertedData = data?.map((item) => ({
    id: item.id,
    studentName: item.studentName,
    dateRegistered: timeformat(item.createdAt), // Format date
    studyLevel: item.studyLevel,
  }));

  return (
    <div>
      <Typography variant="h1">Student details</Typography>
      {/* Render the table only if convertedData exists */}
      {convertedData && convertedData.length > 0 ? (
        <StudentDataTable data={convertedData} />
      ) : (
        <p>No student data available</p> // Display a message when there's no data
      )}
    </div>
  );
};

export default StudentDetails;
