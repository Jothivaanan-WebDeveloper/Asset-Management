import React from 'react'
import {
  Button
} from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import classes from './AssetHistoryNavigation.module.css';

export const AssetHistoryNavigation = () => {

  const data = useParams();
  console.log(data);

  return (
    <div>
      <header>
        <nav className={classes.list}>
          <NavLink to='' className={({ isActive }) => {
            return isActive ? classes.active : undefined;
          }}
            end
          >

            <Button
              variant="outlined"
              style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E", marginRight: "5px" }}
            >
              Maintenance History
            </Button>
          </NavLink>
          <NavLink to='assignedhistory' className={({ isActive }) => {
            return isActive ? classes.active : undefined
          }
          }>
            <Button
              variant="outlined"
              style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E", marginRight: "5px" }}
            >
              Assigned History
            </Button>
          </NavLink>

        </nav>
      </header>

    </div>
  )
}
