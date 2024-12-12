// Import React for creating the component.
import React from "react";

// Import the reusable component for rendering a priority-based page.
import ReusablePriorityPage from "../reusablePriorityPage";

// Import the Priority enum for specifying the desired priority type.
import { Priority } from "@/state/api";

// Define the Urgent component, which utilizes the reusable page with a specific priority.
const Urgent = () => {
  // Render the ReusablePriorityPage component with the "Backlog" priority.
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

// Export the Urgent component as the default export for use in other parts of the application.
export default Urgent;
