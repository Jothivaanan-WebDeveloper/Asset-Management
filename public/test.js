import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const EditBrand = ({
  openUpdateDialog,
  handleAddClose,
  editingRow,
  editData,
  tableRowsData,
}) => {
  console.log("Edit Brand")
  const initialValues = {
    id: editingRow.id,
    brand: editingRow.brand,
  };

  const handleEditSubmit = async (values, actions) => {
    try {
      values.brand = values.brand.toUpperCase();
      await axios.put(`${apiUrl}/${editingRow.id}`, values);
      editData((prevRows) =>
        prevRows.map((row) => (row.id === editingRow.id ? values : row))
      );
      alert("Updated Successfully");
      handleAddClose();
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Dialog open={openUpdateDialog}>
      <DialogTitle>
        <h2 style={{ marginBottom: "-10px" }}>Update Brand</h2>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};

            if (!values.brand.trim()) {
              errors.brand = "Brand is required";
            } else {
              // perform your custom validation here
              // check if the brand already exists in the database
              const existingBrand = tableRowsData.find(
                (brand) =>
                  brand.brand.trim().toLowerCase() === values.brand.trim().toLowerCase()
              );
              if (existingBrand) {
                errors.brand = "This Brand Name is already taken.";
              }
            }

            return errors;
          }}
          onSubmit={handleEditSubmit}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <Form>
              <TextField
                margin="dense"
                label="ID Auto Generated"
                type="text"
                name="id"
                fullWidth
                disabled
                value={editingRow.id}
              />
             
              <TextField
                autofocus
                margin="dense"
                label="Brand"
                type="text"
                fullWidth
                name="brand"
              value={values.brand}
                onChange={handleChange}
                error={Boolean(errors.brand)}
                helperText={errors.brand}
                required
              />

              <DialogActions>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
                <Button onClick={handleAddClose}>Cancel</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditBrand;
