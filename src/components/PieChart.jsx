import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// import { Card, Container, Row } from 'react-bootstrap';

import { Chart } from "react-google-charts";
// import { width } from '@mui/system';

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
  ["Task", "Hours per Day"],
  ["Accepted", 11],
  ["Rejected", 11],
  ["Pending", 11],
  ["FullFilled", 11]
];

export const options = {
  title: "Asset Request List",
  chartArea: { width: "50%" },
  
};



export default function PieChart() {
  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
   
        options={options}
        height={"350px"}
      />
      {/* <Pie data={data} options={options} />; */}

    </>

  )


} 