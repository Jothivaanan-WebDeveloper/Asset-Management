import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SaveCancelButtonUI(props) {
  return (
    <Stack spacing={2} direction="row">

      <Button variant="contained"
      style={{ background: "#6870fa"}}
       >Save</Button>
            
      <Button variant="text"
      style={{ background: "#f2f0f0"}}
      >Cancel</Button>

    </Stack>
  );
}
