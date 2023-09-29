import React from 'react';

import TeamDetails from './TeamDetails';
import instructors_data from '../../../Data/instructors';
import { useParams } from 'react-router-dom';

const DynamicTeamDetails = () => {
    // let { id } = useParams();
    const id =2
    const team = instructors_data.find(item => Number(item.id) === Number(id))
    console.log(team)
    return (
       <div>
        hello hope
       </div>
            // <TeamDetails team={team} />
      
    )
}

 export default DynamicTeamDetails;

// export async function getStaticPaths() {
//     const paths = instructors_data.map((instructor) => {
//         return {
//             params:{
//                 id:`${instructor.id}`
//             }
//         }
//     })
//     return {
//       paths,
//       fallback: false,
//     }
//   }

// export async function getStaticProps(context) {
//     return {
//         props: {}
//     }
// }