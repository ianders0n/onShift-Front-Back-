"use client"; // Ensures the component runs on the client side.

import React, { useState } from 'react'; // React and state management hooks.
import ProjectHeader from "@/app/projects/ProjectHeader"; // Component to display the project header and tab navigation.
import Board from "../BoardView"; // Component for the board view of tasks.
import List from "../ListView"; // Component for the list view of tasks.
import Timeline from "../TImelineView"; // Component for the timeline view of tasks.
import Table from "../TableView"; // Component for the table view of tasks.
import ModalNewTask from '@/components/ModalNewTask'; // Modal for creating a new task.

type Props = {
  params: Promise<{ id: string }>; // Props type defining a promise that resolves to an object containing the project ID.
};

const Project = ({ params }: Props) => {
  const resolvedParams = React.use(params); // Unwrap the promise to access the project ID.
  const { id } = resolvedParams; // Destructure the project ID from the resolved parameters.

  const [activeTab, setActiveTab] = useState("Board"); // State to manage the active tab view (default is "Board").
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false); // State to control the visibility of the new task modal.

  return (
    <div>
      {/* Modal for adding a new task */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen} // Show the modal if true.
        onClose={() => setIsModalNewTaskOpen(false)} // Close the modal when triggered.
      />

      {/* Project header with tabs for switching views */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional rendering of views based on the active tab */}
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} /> // Render the Board view.
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} /> // Render the List view.
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} /> // Render the Timeline view.
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} /> // Render the Table view.
      )}
    </div>
  );
};

export default Project; // Export the component for use in other parts of the application.
