"use client"; // Ensures the component is rendered on the client side.

// Import necessary libraries and components.
import React, { useEffect } from "react"; // React library and hook for side effects.
import Navbar from "@/components/Navbar"; // Navbar component for the dashboard.
import Sidebar from "@/components/Sidebar"; // Sidebar component for navigation.
import AuthProvider from "./authProvider"; // Authentication provider for managing user authentication.
import StoreProvider, { useAppSelector } from "./redux"; // Redux provider and custom hook for accessing global state.

// Layout component for the dashboard.
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Access global state values using Redux hooks.
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed, // Check if the sidebar is collapsed.
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode); // Check if dark mode is enabled.

  // Side effect to toggle the "dark" class on the HTML element based on dark mode state.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); // Enable dark mode.
    } else {
      document.documentElement.classList.remove("dark"); // Disable dark mode.
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar for navigation */}
      <Sidebar />
      {/* Main content area */}
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "md:pl-64" // Adjust padding if the sidebar is expanded.
        }`}
      >
        {/* Navbar at the top of the dashboard */}
        <Navbar />
        {/* Render children components (dashboard content) */}
        {children}
      </main>
    </div>
  );
};

// Wrapper component to include providers for state management and authentication.
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* Redux provider for global state management */}
      <AuthProvider>
        {/* Authentication provider for user authentication */}
        <DashboardLayout>{children}</DashboardLayout>
        {/* Dashboard layout including sidebar, navbar, and children content */}
      </AuthProvider>
    </StoreProvider>
  );
};

// Export the DashboardWrapper component for use in other parts of the application.
export default DashboardWrapper;
