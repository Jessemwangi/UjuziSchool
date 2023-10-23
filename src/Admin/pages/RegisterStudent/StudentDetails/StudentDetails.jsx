import React from 'react';
import StudentDataTable from '../../../Componets/StudentDataTable ';
import Typography from '../../../../Component/modules/components/Typography';

const studentData = [
    { id: 1, studentName: 'John Doe', dateRegistered: '2023-01-15', studyLevel: 'A' },
    { id: 2, studentName: 'Jane Smith', dateRegistered: '2023-02-20', studyLevel: 'B' },
    // Add more student data objects here
  ];
const StudentDetails = () => {

    return (
        <div>
            <Typography variant={'h1'}>Student details</Typography>
            <StudentDataTable data={studentData} />
        </div>
    );
};

export default StudentDetails;


  

  