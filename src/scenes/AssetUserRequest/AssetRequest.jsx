import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useMediaQuery, useTheme } from "@mui/material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddBoxOutlined } from "@mui/icons-material";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const isFlex = useMediaQuery("(max-width:600px) or (max-width:850px)");

  const columns = [
    { field: "AssetName", headerName: "Asset Name", width: 160, flex: isFlex ? 0 : 1 },
    { field: "Requestdate", headerName: "Request Date", width: 160, flex: isFlex ? 0 : 1 },
    { field: "RequestType", headerName: "Request Type", width: 160, flex: isFlex ? 0 : 1 },
    { field: "Assigneddate", headerName: "Assigned Date", width: 160, flex: isFlex ? 0 : 1 },
    { field: "Description", headerName: "Description", width: 160, flex: isFlex ? 0 : 1 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const handleEdit = (params) => {
          console.log(`Edit row ${params.row.id}`);
        };


        return (
          <>
            <Button
              color="primary"
              style={{ color: "#A4A9FC" }}
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

  const handleAddClose = () => {
    setOpenAddDialog(false);
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
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Service") {
      setIsShowing(true);
    } else if (event.target.value === "Exchange") {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  };

  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            variant="contained"
            style={{ background: "#30325E", marginBottom: "5px", fontSize: "16px" }}
            startIcon={<AddBoxOutlined />}
            onClick={handleAddClick}
          >
            New Request
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
            <div
              style={{ height: 580, width: "100%", position: "sticky", top: 0 }}
            >
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
                components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </div>
          </Box>

          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add New Request</h2>
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Asset Name"
                type="text"
                fullWidth
                style={{ marginBottom: "10px" }}
              />

              <LocalizationProvider
                style={{ marginTop: "10px" }}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="Request Date"
                  sx={{
                    width: "100%",
                  }}
                />
              </LocalizationProvider>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel>Request Type</InputLabel>
                <Select
                  label="Request Type"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Exchange">Exchange</MenuItem>
                </Select>
              </FormControl>

              {!isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Classification </InputLabel>
                  <Select label="Classification"></Select>
                </FormControl>
              )}

              {isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Asset Assigned </InputLabel>
                  <Select label="Asset ASsigned"></Select>
                </FormControl>
              )}
              <TextField
                autoFocus
                label="Description"
                type="text"
                fullWidth
                style={{ marginTop: "10px" }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleAddSubmit}
                variant="contained"
                style={{ background: "#30325E", fontSize: "13px" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E" }}
                onClick={handleAddClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default AssetRequest;
