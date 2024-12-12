
// Import necessary components and hooks.
import Modal from "@/components/Modal"; // Reusable modal component for displaying the form.
import { useCreateProjectMutation } from "@/state/api"; // API hook for creating a new project.
import React, { useState } from "react"; // React library and hooks for managing state.
import { formatISO } from "date-fns"; // Utility for formatting dates in ISO format.



type Props = {
  isOpen: boolean; // Indicates whether the modal is open.
  onClose: () => void; // Function to close the modal.
};

// Component for creating a new project inside a modal.
const ModalNewProject = ({ isOpen, onClose }: Props) => {
  // Hook for triggering the API mutation to create a project.
  const [createProject, { isLoading }] = useCreateProjectMutation();
  // State variables for managing form inputs.
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle form submission.
  const handleSubmit = async () => {
    // Prevent submission if required fields are missing.
    if (!projectName || !startDate || !endDate) return;

    // Format the start and end dates to ISO format.
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    // Call the API to create a new project with the provided details.
    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  // Function to validate the form fields.
  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  // Common styles for form inputs.
  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
