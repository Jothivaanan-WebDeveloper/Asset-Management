import { Label } from '@mui/icons-material';
import {
  Box, Button, Dialog, DialogContent, DialogActions, DialogTitle,
  FormControl, InputLabel, MenuItem, TextField, Divider
}
  from '@mui/material';
import Select from '@mui/material/Select';
import useMediaQuery from "@mui/material/useMediaQuery";
import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { useState } from 'react';

const AssignReAssign = (props) => {
  console.log(props);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formValues, setFormValues] = useState({});

  const assignSchema = yup.object().shape({
    assignedOn: yup.string().required("Required")
  });

  const assignInitialValues = {
    assignedOn: new Date().getTime()
  }
  const reAssignSchema = yup.object().shape({
    reAssignedOn: yup.string().required("Required")
  });

  const reAssignInitialValues = {
    reAssignedOn: new Date().getTime()
  }
  const assignformik = useFormik({
    initialValues: {
      assignedOn: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      setFormValues(values);
      props.closeDialog(values);
    }
  });

  const reAssignformik = useFormik({
    initialValues: {
      assignedOn: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      setFormValues(values);
      props.closeDialog(values);
    }
  });

  return (
    <>
      <Box
      // display="grid"
      // paddingTop={1}
      // gap="10px"
      // gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      // sx={{
      //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      // }}
      >
        {
          props.assign ?
            <>
              {/* Assign */}
              <Formik
                initialValues={assignInitialValues}
                validationSchema={assignSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,

                }) => (
                  <Dialog
                    open={props.openDialog}
                    onClose={props.closeDialog}
                  // fullScreen={fullScreen}
                  >
                    <DialogTitle>
                      <h2 style={{ margin: "0px" }}>
                        Asset Assign
                      </h2>
                    </DialogTitle>
                    <Divider />

                    <form onSubmit={assignformik.handleSubmit}>
                      <DialogContent>

                        <Box
                          display="grid"
                          gap="10px"
                          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                          sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                          }}
                        >
                          <TextField
                            fullWidth
                            variant='outlined'
                            type="text"
                            label="Asset ID"
                            name='assetId'
                            disabled
                          />

                          <TextField
                            fullWidth
                            variant='outlined'
                            type="text"
                            label="Asset Name"
                            name='assetName'
                            disabled
                          />


                          <FormControl>
                            <InputLabel>Assign To* </InputLabel>
                            <Select label="AssignTo" >
                              <MenuItem value="john">John Doe</MenuItem>
                              <MenuItem value="alan">Alan Wake</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Assigned On" name="assignedOn"
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Box>

                      </DialogContent>

                      <DialogActions>
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ background: "#30325E", fontSize: "13px" }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E" }}
                          onClick={props.closeDialog}
                        >
                          Cancel</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                )}
              </Formik>
            </>

            :
            <>
              {/* Reassign */}
              <Formik
                initialValues={assignInitialValues}
                validationSchema={assignSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,

                }) => (
                  <Dialog
                    open={props.openDialog}
                    onClose={props.closeDialog}
                  // fullScreen={fullScreen}
                  >
                    <DialogTitle>
                      <h2 style={{ margin: "0px" }}>
                        Asset Re-Assign
                      </h2>
                    </DialogTitle>
                    <Divider />

                    <form onSubmit={assignformik.handleSubmit}>
                      <DialogContent>
                        <Box
                          display="grid"
                          gap="10px"
                          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                          sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                          }}
                        >
                          <TextField
                            fullWidth
                            variant='outlined'
                            type="text"
                            label="Asset ID"
                            name='assetId'
                            disabled
                          />

                          <TextField
                            fullWidth
                            variant='outlined'
                            type="text"
                            label="Asset Name"
                            name='assetName'
                            disabled
                          />

                          <TextField
                            fullWidth
                            variant='outlined'
                            type="text"
                            label="Currently Assigned To"
                            name='assetName'
                            disabled
                          />


                          <FormControl>
                            <InputLabel>Re-Assign To* </InputLabel>
                            <Select label="AssignTo" >
                              <MenuItem value="john">John Doe</MenuItem>
                              <MenuItem value="alan">Alan Wake</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Assigned On" name="assignedOn"
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Box>



                      </DialogContent>
                      <DialogActions>
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ background: "#30325E", fontSize: "13px" }}>
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ border: "1px solid #30325E", fontSize: "13px", color: "#30325E" }}
                          onClick={props.closeDialog}
                        >
                          Cancel</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                )}
              </Formik>
            </>
        }

      </Box >
    </>
  )


}

export default AssignReAssign;