import React from 'react';
import StudentDataTable from '../../../Componets/StudentDataTable ';
import Typography from '../../../../Component/modules/components/Typography';
import { useFetch } from '../../../../hooks/useFetch';
import { useUser } from '../../../../hooks/UserContext';



const StudentDetails = () => {
    const studentData = [
        { id: 1, studentName: 'John Doe', dateRegistered: '2023-01-15', studyLevel: 'A' },
        { id: 2, studentName: 'Jane Smith', dateRegistered: '2023-02-20', studyLevel: 'B' },
        // Add more student data objects here
    ];
    const {user} = useUser()
    console.log(user)
    const url = `/student/agentlist/${user?.id}`;
    console.log(url);

      const {data,error} = useFetch(url,user?.jwt);

      const convertedData = Object.values(data).map(item => ({
        id: item.id,
        studentName: item.studentName,
        dateRegistered: item.createdAt, // You can format this date if needed
        studyLevel: item.studyLevel,
    }));
    
    //   console.log(data)
    return (
        <div>
            <Typography variant={'h1'}>Student details</Typography>
            <StudentDataTable data={convertedData} />
        </div>
    );
};

export default StudentDetails;


  

  