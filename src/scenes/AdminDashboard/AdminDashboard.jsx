import { Box } from '@mui/material';
import React from 'react';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import CategoryList from '../../components/CategoryList';
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
  const data= useParams();
  console.log(data);
  return (
    <>
      <Box m="20px">
        {/* <CategoryList /> */}
        <BarChart />
        <PieChart />
      </Box>
    </>
  )
}

export default AdminDashboard; 