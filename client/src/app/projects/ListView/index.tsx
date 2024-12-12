// Import required components and hooks.
import Header from "@/components/Header"; // Header component for displaying the page title and buttons.
import TaskCard from "@/components/TaskCard"; // TaskCard component for rendering individual task details.
import { Task, useGetTasksQuery } from "@/state/api"; // API hooks and types for fetching tasks.
import React from "react"; // React library for component creation.

type Props = {
    id: string; // Project ID used to fetch tasks.
    setIsModalNewTaskOpen: (isOpen: boolean) => void; // Function to open or close the "Add Task" modal.
  };

// Functional component for the list view of tasks.
const ListView = ({ id, setIsModalNewTaskOpen } : Props) => {
    // Fetch tasks for a specific project using the project ID.
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });

    // Display a loading message while the tasks are being fetched.
    if (isLoading) return <div>Loading...</div>;
    // Display an error message if there was an issue fetching the tasks.
    if (error) return <div>An error occurred while fetching tasks</div>;

    return (
        <div className="px-4 pb-8 xl:px-6">
            <div className="pt-5">
                <Header name="List" buttonComponent={ 
                    <button className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600" onClick={() => setIsModalNewTaskOpen(true)}>
                        Add Task
                    </button>}
                    isSmallText
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {tasks?.map((task: Task) => <TaskCard key={task.id} task={task}/>)}
            </div>

        </div>
    )
}

export default ListView