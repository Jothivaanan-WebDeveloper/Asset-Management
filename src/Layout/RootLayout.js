import React, { useState } from 'react';
import Sidebar from '../scenes/global/Sidebar';
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Outlet } from 'react-router-dom';
import Topbar from '../scenes/global/Topbar';

const RootLayout = () => {
    const [isSidebar, setIsSidebar] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState('');
    const matches = useMediaQuery('(max-width:600px)');



    const toggleSidebar = (props) => {
        // console.log("Add",props);
        setIsSidebar(props);
    };

    const [theme, colorMode] = useMode();
    return (
        <>
            <Sidebar isSidebar={isSidebar} isOpen={isSidebar} />

            <main className="content">
                <Topbar setIsSidebar={toggleSidebar} />
                {matches ? <div className='minoutlet'>
                <Outlet />
                </div>:<div className='outlet'>
                    <Outlet />
                </div>}
            </main>
        </>
    )
}

export default RootLayout;