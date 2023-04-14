import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";

export default function AssetServiceManagement() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      <div>
        {/* <h1 style={{ color: "gray" }}>Asset Service Management</h1> */}
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            ml: 2,
            mt: 2,
            mr: 2,
          }}
        >
          <TextField label="Service ID" fullWidth sx={{ gridColumn: "span 2" }} />

          <TextField
            label="Service Provider"
            fullWidth
            sx={{ gridColumn: "span 2" }}
          />

          <TextField label="Request ID" fullWidth sx={{ gridColumn: "span 2" }} />

          {/* Request Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker label="Request Date" sx={{ gridColumn: "span 2" }} />
          </LocalizationProvider>

          <TextField label="Asset ID" fullWidth sx={{ gridColumn: "span 2" }} />

          <TextField label="Asset Name" fullWidth sx={{ gridColumn: "span 2" }} />

          <TextField
            label="Complain Detail"
            fullWidth
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            label="Service Completed detail"
            fullWidth
            multiline
            rows={2}
            sx={{ gridColumn: "span 2" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Service Given Date"
              sx={{ gridColumn: "span 2" }}
            />
          </LocalizationProvider>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px" mr="20px">
          <Box display="flex" gap="15px">
            <Button
              variant="contained"
              style={{ fontSize: "15px" }}
              color="secondary">
              Save
            </Button>
            <Button
              style={{ fontSize: "15px" }}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
