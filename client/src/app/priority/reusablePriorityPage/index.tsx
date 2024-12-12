"use client"; // Ensures this component runs on the client side.

import { useAppSelector } from "@/app/redux"; // Custom Redux hook to access the global state.
import Header from "@/components/Header"; // Reusable header component.
import ModalNewTask from "@/components/ModalNewTask"; // Modal for creating a new task.
import TaskCard from "@/components/TaskCard"; // Component to display individual tasks in card format.
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils"; // Utility classes and styles for the DataGrid.
import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api"; // API hooks and types for fetching tasks and user information.
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // DataGrid for displaying tabular data.
import React, { useState } from "react"; // React and state management.

type Props = {
  priority: Priority; // Prop type defining the task priority for filtering.
};

// Define the column structure for the DataGrid.
const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 }, // Task title column.
  { field: "description", headerName: "Description", width: 200 }, // Task description column.
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      // Render task status with custom styling.
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 }, // Task priority column.
  { field: "tags", headerName: "Tags", width: 130 }, // Task tags column.
  { field: "startDate", headerName: "Start Date", width: 130 }, // Task start date column.
  { field: "dueDate", headerName: "Due Date", width: 130 }, // Task due date column.
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown", // Display the author's username or "Unknown" if unavailable.
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned", // Display the assignee's username or "Unassigned" if unavailable.
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list"); // State to toggle between "list" and "table" views.
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false); // State to control the visibility of the new task modal.

  const { data: currentUser } = useGetAuthUserQuery({}); // Fetch the authenticated user data.
  const userId = currentUser?.userDetails?.userId ?? null; // Extract the user ID or set to null if unavailable.

  // Fetch tasks assigned to the user.
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null, // Skip the query if the user ID is not available.
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode); // Get the dark mode setting from global state.

  // Filter tasks based on the provided priority.
  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  // Handle error state.
  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      {/* Modal for adding a new task */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />

      {/* Page header with an "Add Task" button */}
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />

      {/* View toggle buttons */}
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")} // Set view to "list".
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")} // Set view to "table".
        >
          Table
        </button>
      </div>

      {/* Conditional rendering for task display */}
      {isLoading ? (
        // Display loading state.
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        // Render tasks as cards in a grid format for "list" view.
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          // Render tasks in a DataGrid for "table" view.
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks} // Provide filtered tasks as rows.
              columns={columns} // Use predefined columns.
              checkboxSelection // Enable checkbox selection.
              getRowId={(row) => row.id} // Use the "id" field as the row identifier.
              className={dataGridClassNames} // Apply custom class names.
              sx={dataGridSxStyles(isDarkMode)} // Apply styles based on theme mode.
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage; // Export the component for use in other parts of the application.
