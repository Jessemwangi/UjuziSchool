import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import TextField from "../../Component/modules/components/TextField";

const StudentDataTable = ({ data }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    dateRegistered: "",
    grade: "",
  });
  const [dialogFormData, setDialogFormData] = useState({
    name: "",
    dateRegistered: "",
    grade: "",
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "studentName", headerName: "student Name", flex: 1 },
    { field: "dateRegistered", headerName: "Date Registered", flex: 1 },
    { field: "studyLevel", headerName: "Study Level", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit Details
          </Button>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleResetPassword(params.row)}
          >
            <SecurityIcon />
          </IconButton>
          <IconButton color="primary" size="small">
            <MessageIcon />
          </IconButton>
          <IconButton color="secondary" size="small">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEdit = (student) => {
    setSelectedStudent({ ...student });
    setEditDialogOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    // Make an API request to update the selected student's details
    // Use the selectedStudent data for the update
    // Close the edit dialog
    // You may also want to refresh the data table
  };

  const handleDeleteStudent = () => {
    // Make an API request to delete the selected student
    // Close the delete dialog
    // You may also want to refresh the data table
  };
  const handleResetPassword = () => {};

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={selectedStudent.studentName}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                studentName: e.target.value,
              })
            }
          />
          <TextField
            label="Name"
            value={selectedStudent.studyLevel}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                studyLevel: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateStudent} color="primary">
            Update
          </Button>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {selectedStudent.name}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteStudent} color="primary">
            Yes
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentDataTable;
