import React from 'react';
import StudentDataTable from '../../../Componets/StudentDataTable ';
import Typography from '../../../../Component/modules/components/Typography';
import { useFetch } from '../../../../hooks/useFetch';
import { useUser } from '../../../../hooks/UserContext';
import { timeformat } from '../../../../UtilitiesFunctions/formatTime';
import SystemError from '../../../../Component/modules/views/Error/SystemError';

const StudentDetails = () => {
  const { user } = useUser();
  
  // Construct the URL if the user is available
  const url = user?.id ? `/student/agentstudentlist/${user.id}` : null;
  
  // Fetch data with the constructed URL
  const { data, error, loading } = useFetch(url, user?.jwt);

  // Loading state for both user and data fetching
  if (!user || !user.id || !user.jwt || loading) {
    return <p>Loading...</p>;  // You can also return a loading spinner or null
  }

  // Handle error state
  if (error) {
    return     <SystemError
    errorMessage={`OOPPs! our bad, Landed into an error : ${error.message}`}
  />
    // Customize error handling as needed
  }

  // Process the fetched data
  const convertedData = data?.map(item => ({
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
        <p>No student data available</p>  // Display a message when there's no data
      )}
    </div>
  );
};

export default StudentDetails;
