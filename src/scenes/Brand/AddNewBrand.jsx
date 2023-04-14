import React,{useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

export default function AddNewBrand(props) {
  

  const handleAddSubmit = async (values, actions) => {
    try {

      const newRow = {
  
        brand: values.newBrand.toLocaleUpperCase(),
      };

      const response = await axios.post(`${apiUrl}`, newRow);
      props.postData([...props.tableRowData, response.data]);
      props.handleAddClose();
      actions.resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={props.openAddDialog}>
      <DialogTitle style={{ height: "70px" }}>
        <h2 style={{ marginBottom: "-10px" }}>Add New Brand</h2>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ newBrand: "" }}
          onSubmit={handleAddSubmit}
          validate={(values) => {
            const errors = {};
            
            if (!values.newBrand.trim()) {
              errors.newBrand = "Brand is required";
            } else if (
              props.tableRowData.find(
                (p) =>
                  p.brand.trim().toLocaleLowerCase() ===
                  values.newBrand.trim().toLocaleLowerCase()
              )
            ) {
              errors.newBrand =
                "This Brand Name is already taken.";
            }
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <Form>
              <Field
                as={TextField}
                margin="dense"
                label="ID"
                type="text"
                value="Auto Generated"
                fullWidth
                disabled
              />
              <Field
                as={TextField}
                margin="dense"
                label="Brand"
                type="text"
                fullWidth
                name="newBrand"
                value={values.newBrand}
                onChange={handleChange}
                error={Boolean(errors.newBrand)}
                helperText={errors.newBrand}
              />
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ background: "#30325E",fontSize: "14px" }}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Button onClick={props.handleAddClose}
                variant='outlined'
                style={{ border: "1px solid #30325E", fontSize: "14px", color:"#30325E" }}
                >Cancel</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}