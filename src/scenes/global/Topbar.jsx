import { Box, Divider, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const toggleSidebarIcon = useMediaQuery('(max-width:600px)');


  const toggleSidebar = () => {
    setOpen(!open);
    setIsToggleClicked(!isToggleClicked);

  }

  const changeMargin = isToggleClicked ? { ml: 0, flex: 1 } : { ml: 10, flex: 1 }

  props.setIsSidebar(open);

  return (
    <div style={{ "position": "sticky", "top": 0, "zIndex": "3", background: "#ffffff" }}>
      <Box display="flex" justifyContent="space-between" p={2} >
       { <Box
          display="flex"
          visibility="visible"
          borderRadius="3px"
          onClick={toggleSidebar}
        >
          {toggleSidebarIcon && <IconButton sx={changeMargin}>
            {
              !isToggleClicked ?
                <KeyboardDoubleArrowLeftIcon /> :
                <KeyboardDoubleArrowRightIcon />
            }

          </IconButton>}
         
        </Box>}


        {/* ICONS */}
        <Box display="flex">
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> */}
          <IconButton>
            <NotificationsOutlinedIcon  style={{color:"#30325E"}}/>
          </IconButton>
          {/* <IconButton>
            <SettingsOutlinedIcon />
          </IconButton> */}
          <IconButton>
            <PersonOutlinedIcon  style={{color:"#30325E"}}/>
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </div>

  );
};

export default Topbar;
