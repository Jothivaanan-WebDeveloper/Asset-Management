import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import { BuildOutlined, GridViewOutlined, LiveHelpOutlined, SettingsSuggestOutlined } from "@mui/icons-material";
// import classes from './Index1.module.css';


const Item = ({ title, to, icon, selected, setSelected ,setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSelected,setIsSelected] = useState(true);
  return (
    <MenuItem
      active={isSelected}
      style={{
        // color: "#595959",
        color: '#FC8019',
      }}
      onClick={() => {
        setSelected(title);
        setIsCollapsed(true);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <NavLink to={to} className={({ isActive }) => {
        return isActive ? setIsSelected(true)
          : setIsSelected(false)

      }
      }></NavLink>
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");
  const matches = useMediaQuery('(max-width:600px)');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);

  }

  const handleClick = () => {
    setIsCollapsed(true);

  }

  return (
    <Box className="sidebarContainer"
      sx={{
        "& .pro-sidebar-inner": {
          // background: `#A4A9FC !important`,
          background: `#30325E !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          // color: `${colors.grey[400]} !important`,
          color: `#FF8A00  !important`,
          background: `white`,
        },
        "& .pro-menu-item.active": {
          // color: `${colors.grey[400]} !important`,
          // color: 'white',
          // background: `#FF8A00  !important`,
          color: `#FF8A00  !important`,
          background: `white`,
        },
        "& .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout ul": {
          height: "100vh !important"
        }
      }}
    >
      <div >
        <ProSidebar
          // rtl="true"
          collapsed={isCollapsed}
          breakPoint={props.isOpen ? "xxl" : ""}

        // closeOnClick ={true}
        // rtl={true}
        >
          <div>
            <Menu iconShape="square" >
              {/* LOGO AND MENU ICON */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "12px 0 20px 0",
                  // borderBottom: "1px solid lightgray",
                  color: "#FF8A00",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    {/* <Typography variant="h3" color={colors.grey[100]}>
                      ADMIN
                    </Typography> */}
                    <IconButton
                      onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon
                         />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {/* {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Ed Roh
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )} */}

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                {/* <Tooltip title="Dashboard" placement="right"> */}
                <Item

                  title="Dashboard"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}
                />
                {/* </Tooltip> */}


                {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography> */}
                <Item
                  title="Brand"
                  to="/brand"
                  icon={<BrandingWatermarkOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />
                <Item
                  title="Classification"
                  to="/classification"
                  icon={<AccountTreeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />
                <Item
                  title="Asset Management"
                  to="/assetmanagement"
                  icon={<RoomPreferencesOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />

                {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography> */}
                <Item
                  title="Asset Request List"
                  to="/requestlist"
                  icon={<LiveHelpOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />
                {/* <Item
                  title="Service Mmanagement"
                  to="/servicemanagement"
                  icon={<BuildOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                /> */}
                <Divider />
                <Item
                  title="User Dashboard"
                  to="/dashboard"
                  icon={<GridViewOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />
                <Item
                  title="Asset Request"
                  to="/request"
                  icon={<LiveHelpOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  setIsCollapsed={setIsCollapsed}

                />

              </Box>

              {/* MENU ICON */}

            </Menu>
          </div>
        </ProSidebar>
      </div>
    </Box>
  );
};

export default Sidebar;
