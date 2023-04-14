import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { Box, Divider, useMediaQuery } from "@mui/material";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddBoxOutlined } from "@mui/icons-material";

// import classes from "./tabelui.module.css";


const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

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

const Classification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newClassification, setNewClassification] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedvalue, setSelectedValue] = useState("");
  const isFlex = useMediaQuery("(max-width:600px) or (max-width:850px)");

  const columns = [
    { field: "id", headerName: "Classification Id", width: 160, flex: isFlex ? 0 : 1 },
    { field: "classification", headerName: "Classification Name", width: 160, flex: isFlex ? 0 : 1 },
    { field: "category", headerName: "Category", width: 160, flex: isFlex ? 0 : 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        const handleEdit = () => {
          console.log(`Edit row ${params.row.id}`);
        };

        return (
          <>
            <Button
              color="primary"
              style={{ color: "#6870fa" }}
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

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleAddSubmit = async () => {



    const newRow = {
      classification: newClassification,
      category: selectedvalue,
    };
    const response = await axios.post(`${apiUrl}`, newRow);
    setRows([...rows, response.data]);
    setOpenAddDialog(false);
    setNewClassification("");
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }
  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            size="small"
            startIcon={<AddBoxOutlined />}
            variant="contained"
            style={{ background: "#30325E", marginBottom: "5px", fontSize: "16px" }}
            onClick={handleAddClick}
          >
            New Classification
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
                // components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} />
            </div>
          </Box>

          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle style={{ height: "70px" }}>
              <h2 style={{ marginBottom: "-10px" }}>Classification Details</h2>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="ID Auto Generated"
                type="text"
                placeholder="Auto Generated"
                fullWidth
                disabled
              />
              <TextField
                autoFocus
                margin="dense"
                label="Classification"
                type="text"
                fullWidth
                value={newClassification}
                onChange={(e) => setNewClassification(e.target.value)}
                InputProps={{
                  required: true,
                }}
              />
              <FormControl fullWidth style={{ marginTop: "10px" }} >
                <InputLabel>Category </InputLabel>
                <Select label="Category" value={selectedvalue} onChange={handleChange}>
                  {/* <MenuItem value="">Select Category</MenuItem> */}
                  <MenuItem value="Assignable" >Assignable</MenuItem>
                  <MenuItem value="Non-Assignable">Non-Assignable</MenuItem>
                </Select>
              </FormControl>
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
                onClick={handleAddClose}
                variant='outlined'
                style={{ border: "1px solid #30325E", fontSize: "14px", color: "#30325E" }}
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

export default Classification;
