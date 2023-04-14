import React from 'react'
import {
    Button
} from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import classes from './UserDashboardNavigation.module.css';

export const UserDashboardNavigation = () => {

    const data = useParams();
    console.log(data);

    return (
        <div>
            <header>
                <nav className={classes.list}>
                    <NavLink sx={{ gridColumn: "span 2" }}
                        style={{ marginRight: "5px" }}
                        to='/dashboard' className={({ isActive }) => {
                            return isActive ? classes.active : undefined;
                        }}
                        end
                    >
                        <Button
                            variant="outlined"
                            style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E", marginRight: "5px" }}
                        >
                            Assigned Assets
                        </Button>
                    </NavLink>

                    <NavLink sx={{ gridColumn: "span 2" }} to='assignedassethistory' className={({ isActive }) => {
                        return isActive ? classes.active : undefined
                    }
                    }>
                        <Button
                            variant="outlined"
                            style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E", marginRight: "5px" }}
                        >
                            Assigned Assets History
                        </Button>
                    </NavLink>

                </nav>
            </header>

        </div>
    )
}
