"use client"; // Ensures this component is rendered on the client side.

import Header from "@/components/Header"; // Reusable header component.
import ProjectCard from "@/components/ProjectCard"; // Component to display individual project details.
import TaskCard from "@/components/TaskCard"; // Component to display individual task details.
import UserCard from "@/components/UserCard"; // Component to display individual user details.
import { useSearchQuery } from "@/state/api"; // API hook for executing search queries.
import { debounce } from "lodash"; // Utility to debounce the search input.
import React, { useEffect, useState } from "react"; // React library for component creation and state management.

// Functional component for the search page.
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // API hook to fetch search results based on the current search term.
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3, // Skip the query if the search term has fewer than 3 characters.
  });

  // Debounced function to handle search input changes.
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);  // Update the search term after a delay.
    },
    500, // Delay of 500ms.
  );

  // Cleanup the debounce function on component unmount.
  useEffect(() => {
    return handleSearch.cancel; // Cancel any pending debounced calls.
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;