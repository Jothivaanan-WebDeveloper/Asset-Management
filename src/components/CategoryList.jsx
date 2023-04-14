import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Chart } from "react-google-charts";
import { width } from '@mui/system';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//     labels: ['Accepted', 'Rejected', 'Pending', 'FullFilled'],
//     datasets: [
//       {
//         label: '',
//         data: [12,10,20,30],
//         backgroundColor: [
//             '#fe6383',
//             '#88d3a3',
//             '#36a2eb',
//             '#a388d3',
          
//         ],
//         borderColor: [
//             '#fff',
//             '#fff',
//             '#fff',
//             '#fff',
          
//         ],
//         borderWidth: 3,
        
        
//       }
//     ],
//   };
  
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top'
//       },
//       title: {
//         display: true,
//         text: 'PIE CHART',
//       },
//     },
//   }

export const data = [
  ["Category", "Products"],
  ["Assignable", 20],
  ["Non-Assignable", 10],
  
];

const totalAssets = 30;

export const options = {
  title: "Total Assets : " + totalAssets,
};



  export default function CategoryList(){
    return (
       <>
        
        <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
            {/* <Pie data={data} options={options} />; */}

       </>
          
    )
   
   
  } 