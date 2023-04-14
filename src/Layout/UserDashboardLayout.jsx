import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserDashboardNavigation } from '../scenes/UserDashboard/Navigation/UserDashboardNavigation'

export const UserDashboardLayout = () => {
    return (
        <>
            <Box m="20px">
                <UserDashboardNavigation />
                <Outlet />
            </Box>

        </>
    )
}
