import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';
import { Chart } from "react-google-charts";


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   // maintainAspectRatio:false,
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top'
//     },
//     title: {
//       display: true,
//       text: 'Chart',
//     },
//   },
// };

// const data = {
//   labels:['Laptop','Mouse','Headset','KeyBoard','LaptopStand','Laptop','Mouse','Headset','KeyBoard','LaptopStand'],
//   datasets:[
//     {
//       label:'Total',
//       data:[20,20,20,20,20,20,20,20,20,20],
//       backgroundColor:'#ff9f40'
//     },
//     {
//       label:'Assigned',
//       data:[10,10,5,6,9,10,10,5,6,9],
//       backgroundColor:'#fe6383'
//     },
//     {
//       label:'Not Assigned',
//       data:[10,10,15,14,11,10,10,15,14,11],
//       backgroundColor:'#4ac0c0'
//     }
//   ]
// }



export const data = [
  ["Assets", "TotalAssets", "Assigned","UnAssigned"],
  ["Laptop", 20, 9,11],
  ["Mouse", 20, 9,11],
  ["KeyBoard", 20, 9,11],
  ["HeadSet", 20, 9,11],
  ["LaptopStand", 20, 9,11]
  
];

export const options = {
  title: "Total Assignable Assets",
  chartArea: { width: "70%" },
  hAxis: {
    title: "Asset Count",
    minValue: 0,
  },
  vAxis: {
    title: "Classification",
    minValue: 0,
  },
};




export default function BarChart() {

  return(
    <div style={{margin:'0px'}}>
     <Chart
      chartType="BarChart"
      height="350px"
      data={data}
      options={options}
    />
        {/* <Bar options={options} data={data} /> */}
      

    </div>
  ) ;

  // const [hovered, setHovered] = useState(undefined);
  // const [selected, setSelected] = useState(0);

 

  // const DUMMY_DATAS=[
  //   { title: 'One', value: 60, color: '#4ac0c0' },
  //   { title: 'Two', value: 30, color: '#ffcc56' },
  //   { title: 'One', value: 20, color: '#fe6383' },
  //   { title: 'Two', value: 50, color: '#ff9f40' },
    
  //   ]

  //   const defaultLabelStyle = {
  //     fontSize: '1.5px',
  //     fontFamily: 'sans-serif',
  //     fill :'#fff'


  //   };

  //   const data = DUMMY_DATAS.map((entry, i) => {
  //     if (hovered === i) {
  //       return {
  //         ...entry,
  //         color: 'lightgrey',
  //       };
  //     }
  //     return entry;
  //   });
  //   return (
  //   <div>
  //       <PieChart 
  //       data={data}
  //       radius={12} 
  //       lineWidth='50' 
  //       // startAngle={0} 
  //       // lengthAngle={360} 
  //       segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
  //       segmentsShift={(index) => (index === selected ? 3 : 0.2)}
  //       // totalValue={90} 
  //       // paddingAngle={0} 
  //       // rounded={false} 
  //       // animate={true} 
  //       // animationDuration={1000}
  //       label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
  //       labelStyle={defaultLabelStyle}
  //       labelPosition ={75}
        
  //       // segmentsTabIndex={1120}
  //       // reveal={100}
  //       // background=''
  //       // center={[20,20]}
  //       // viewBoxSize={[100,100]}
  //       onClick={(event, index) => {
  //         setSelected(index === selected ? undefined : index);
  //         console.log('CLICK', { event, index });
          
  //       }}
  //       onMouseOver={(_, index) => {
  //         setHovered(index);
  //       }}
  //       onMouseOut={() => {
  //         setHovered(undefined);
  //       }}
        
  //       />
  //   </div>
  // )
}
