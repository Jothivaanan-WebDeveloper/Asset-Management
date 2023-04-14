import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { AssetHistoryNavigation } from '../scenes/AssetManagement/AssetNavigation/AssetHistoryNavigation'

export const AssetRootLayout = () => {
  return (
    <>
        <Box m="20px">
            <AssetHistoryNavigation />
            <Outlet />
        </Box>
       
    </>
  )
}
