import { useState, useEffect } from "react";
import {
  DataGrid, GridToolbarContainer, GridToolbarColumnsButton,
  GridToolbarFilterButton, GridToolbarDensitySelector, GridCell,
}
  from "@mui/x-data-grid";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
import {
  Button
} from "@mui/material";
import axios from "axios";

import NewAssetForm from "./NewAssetForm";
import AssignReAssign from "./AssignReAssign/AssignReAssign";

import { Link, NavLink } from "react-router-dom";
// import AssetAssignProcess from "./AssetAssignProcess";
import './AssetManagement.css'
import { AddBoxOutlined, HistoryToggleOffOutlined } from "@mui/icons-material";
import { hover } from "@testing-library/user-event/dist/hover";

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);
// const buttonBaseProps = {
//   color: 'primary',
//   size: 'small',
//   startIcon: <ExportIcon />,
// };


const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openReAssign, setOpenReAssign] = useState(false);

  const [newBrand, setNewBrand] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isFlex = useMediaQuery("(max-width:600px) or (max-width:850px)");

  const columns = [
    { field: "id", headerName: "Asset ID", width: 160, flex: isFlex ? 0 : 1 },
    { field: "assetName", headerName: "Asset Name", width: 160, flex: isFlex ? 0 : 1 },
    { field: "category", headerName: "Category", width: 160, flex: isFlex ? 0 : 1 },
    { field: "brand", headerName: "Brand", width: 160, flex: isFlex ? 0 : 1 },
    { field: "currentStage", headerName: "Current Stage", width: 160, flex: isFlex ? 0 : 1 },
    { field: "assigned", headerName: "Assigned To", width: 160, flex: isFlex ? 0 : 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        // console.log("params", params);
        const handleAssign = () => {
          setOpenAssign(!openAssign);

          // console.log(`Edit row ${params.row.id}`);
        };
        const handleReAssign = () => {
          setOpenReAssign(!openReAssign);

          // console.log(`Edit row ${params.row.id}`);
        };


        return (
          <>
            {
              (params.row.brand.toLocaleLowerCase() === 'dell' ||
                params.row.brand.toLocaleLowerCase() === 'samsung' ||
                params.row.brand.toLocaleLowerCase() === 'hp' ||
                params.row.brand.toLocaleLowerCase() === 'asus') ?
                <Button
                  onClick={handleAssign}
                  variant="contained"
                  size="small"
                  style={{ marginRight: "10px", background: "#30325E", fontSize: "13px", width: "30%" }}
                >
                  Assign
                </Button> :
                <Button
                  onClick={handleReAssign}
                  variant="contained"
                  size="small"
                  style={{ marginRight: "10px", background: "#FF8A00", fontSize: "13px", width: "30%" }}>
                  Re-Assign
                </Button>
            }

            <Link to={`/assetmanagement/${params.row.id}`}>

              {/* <Button
                variant="contained"
                size="small"
                style={{ marginRight: "10px", background: "#535ac8", fontSize: "13px" }}>
              </Button> */}
              <IconButton style={{ marginLeft: "0%" }}>
                <i style={{ fontSize: "13px" }}>History&nbsp;</i>
                <HistoryToggleOffOutlined /></IconButton>
            </Link>

          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchRows = async () => {
      const response = await axios.get(`${apiUrl}`);
      setRows(response.data);
    };
    fetchRows();
  }, []);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }

  const handleAddClick = () => {
    setOpenAddDialog(true);

  };

  const handleAssignSubmit = async () => {
    // console.log("Closed");
    setOpenAssign(false);
  }

  const handleReAssignSubmit = async () => {
    // console.log("Closed");
    setOpenReAssign(false);
  }

  const handleAddClose = (props) => {
    setOpenAddDialog(false);
    setOpenAssign(false);
    setOpenReAssign(false);
    console.log(props);
  };

  const handleAddSubmit = async () => {
    const newRow = {
      brand: newBrand,
    };
    const response = await axios.post(`${apiUrl}`, newRow);
    setRows([...rows, response.data]);
    setOpenAddDialog(false);
    setNewBrand("");
  };

  const formParams = (props) => {
    console.log(props);
  }

  return (
    <>
      <Box m="20px">
        <div>
          <Button
            variant="contained"
            startIcon={<AddBoxOutlined />}
            // color="primary"
            style={{ background: "#30325E", marginBottom: "5px", fontSize: "16px" }}
            onClick={handleAddClick}
          >
            New Asset
          </Button>

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                position: "relative",
                border: "none",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              },
              "& .MuiDataGrid-cell": {
                // background: "white",
                borderBottom: "1px solid lightgray",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[900],
              },
              "& .MuiDataGrid-columnHeaders": {
                color: "30325E",
                fontSize: "16px",
                backgroundColor: "white",
                borderBottom: "1px solid #30325E",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "white",
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[500]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#30325E`,
                fontSize: "14px",

              },
              "& .MuiTablePagination-selectLabel ,.css-1hgjne-MuiButtonBase-root-MuiIconButton-root, .css-7ms3qr-MuiTablePagination-displayedRows, .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon, .css-baf1rs-MuiInputBase-root-MuiTablePagination-select": {
                color: "#30325E !important",
                fontSize: "14px !important"
              },
              "& .MuiDataGrid-row": {
                background: "white",
                cursor: "pointer"
              },
              "& .MuiDataGrid-row:hover": {
                background: "whitesmoke",
                cursor: "pointer"
              },

            }}
          >

            <DataGrid
              autoHeight
              rows={rows}
              // disableSelectionOnClick={true}
              onCellClick={(params, event) => {
                event.preventDefault();
              }}
              columns={columns}
              componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
              components={{ Toolbar: CustomToolbar }}
              rowsPerPageOptions={[10, 20]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
            {({ field }) => (
              <GridCell
                disableClickEventBubbling
                {...field}
              />
            )}


            {/* <AssetAssignProcess /> */}

            {/* New Asset */}
            {openAddDialog && <NewAssetForm
              openDialog={openAddDialog}
              closeDialog={handleAddClose} />}

            {/*Assign  */}
            {openAssign && <AssignReAssign assign={true}
              openDialog={openAssign}
              closeDialog={handleAddClose} />}

            {/* ReAssign */}
            {openReAssign && <AssignReAssign assign={false}
              openDialog={openReAssign}
              closeDialog={handleAddClose} />}
          </Box>

        </div >
      </Box >
    </>
  );
};

export default AssetManagement;
