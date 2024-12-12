"use client";

import { useAppSelector } from "@/app/redux"; // Custom Redux hook to access global state.
import Header from "@/components/Header"; // Reusable header component.
import { useGetProjectsQuery } from "@/state/api"; // API hook to fetch project data.
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react"; // Gantt chart library for task visualization.
import "gantt-task-react/dist/index.css"; // Import Gantt chart styles.
import React, { useMemo, useState } from "react"; // React library and hooks for state and memoization.

// Define task types for the Gantt chart.
type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  // Fetch project data using the API hook.
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  // State for managing Gantt chart display options.
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month, // Default view mode is "Month".
    locale: "en-US", // Default locale for the Gantt chart.
  });

  // Transform projects into a format compatible with the Gantt chart.
  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => {
        let startDate = project?.startDate ? new Date(project.startDate) : null;
        let endDate = project?.endDate ? new Date(project.endDate) : null;
  
        // Check if dates are valid
        if (startDate && isNaN(startDate.getTime())) {
          console.warn(`Invalid startDate for project: ${project.name}`, project);
          startDate = null;
        }
        if (endDate && isNaN(endDate.getTime())) {
          console.warn(`Invalid endDate for project: ${project.name}`, project);
          endDate = null;
        }
  
        // Provide fallback values
        startDate = startDate || new Date();
        endDate = endDate || new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week after startDate
  
        return {
          start: startDate,
          end: endDate,
          name: project.name,
          id: `Project-${project.id}`,
          type: "project" as TaskTypeItems,
          progress: 50,
          isDisabled: false,
        };
      }) || []
    );
  }, [projects]); // Recalculate only when `projects` changes.
  

  // Handle changes to the Gantt chart view mode.
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;