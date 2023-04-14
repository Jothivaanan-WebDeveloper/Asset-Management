import { useState, useEffect, useRef } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Box, useMediaQuery } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import AddNewBrand from "./AddNewBrand";
import EditBrand from "./EditBrand";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const Brand = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [editingRow, setEditingRow] = useState("null");
  const inputRef = useRef(null);

  // const matches = useMediaQuery("(max-width:600px)");
  const isFlex = useMediaQuery("(max-width:600px) or (max-width:850px)");

  // const width1 = matches ? 120 : 340;
  // const buttonplace = matches ? 0 : 16;

  useEffect(() => {
    const fetchRows = async () => {
      //Getting Data From DataBase
      const response = await axios.get(`${apiUrl}`);
      setRows(response.data);
      //autofocus for edit brand view
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // console.log(inputRef.current.focus());
    };
    fetchRows();
  }, []);

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setUpdateDialog(false);
  };



  const columns = [
    {
      field: "id",
      headerName: "Brand ID",
      headerStyle: { backgroundColor: "blue", color: "white" },
      width: 160, flex: isFlex ? 0 : 1

    },
    { field: "brand", headerName: "Brand Name", width: 160, flex: isFlex ? 0 : 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160, flex: isFlex ? 0 : 1,
      renderCell: (params) => {
        const handleEdit = () => {
          // console.log(`Edit row ${params.row.id}`);
          // console.log(`Edit row ${params.row.brand}`);
          setEditingRow(params.row);
          setUpdateDialog(true);
        };

        return (
          <>
            <Button
              color="primary"
              style={{ color: "#30325E" }}
              size="small"
              onClick={handleEdit}
            >
              <EditIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };

  const fetchRow = (props) => {
    setRows(props);
  };
  const editData = (props) => {
    setRows(props);
  };

  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            variant="contained"
            startIcon={<AddBoxOutlined />}
            // sx={{ mb: 1, ml: buttonplace, fontSize: "14px" }}
            sx={{ mb: 1, fontSize: "14px" }}
            style={{ background: "#30325E", marginBottom: "5px", fontSize: "16px" }}

            onClick={handleAddClick}
          >
            New Brand
          </Button>

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            height="75vh"
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
              "& .MuiDataGrid-row" : {
                background: "white",
                cursor: "pointer"
              },
              "& .MuiDataGrid-row:hover" : {
                background: "whitesmoke",
                cursor: "pointer"
              },

            }}
          >
            <div
              style={{ height: 580, width: "100%", position: "sticky", top: 0 }}
            >
              <DataGrid
                style={{ background: "#fcfcfc" }}
                rows={rows}
                columns={columns}
                componentsProps={{
                  toolbar: { csvOptions: { fields: ["postId", "email"] } },
                }}
                // components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                autoWidth
                autoHeight
              />
            </div>
          </Box>
          {/* Add new Brand */}
         {openAddDialog &&( <AddNewBrand
            openAddDialog={openAddDialog}
            postData={fetchRow}
            tableRowData={rows}
            handleAddClose={handleAddClose}
          />)}

          {/* Edit Brand */}

         {updateDialog && (<EditBrand
            openUpdateDialog={updateDialog}
            tableRowsData={rows}
            editingRow={editingRow}
            handleAddClose={handleAddClose}
            editData={editData}
          />) }
        </div>
      </Box>
    </>
  );
};

export default Brand;
