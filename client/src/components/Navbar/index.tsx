// Import necessary libraries and components.
import React from "react"; // React library for component creation.
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react"; // Icons for UI elements.
import Link from "next/link"; // Next.js link component for navigation.
import { useAppDispatch, useAppSelector } from "@/app/redux"; // Redux hooks for state management.
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state"; // Redux actions to toggle dark mode and sidebar state.
import { useGetAuthUserQuery } from "@/state/api"; // API hook to fetch authenticated user data.
import { signOut } from "aws-amplify/auth"; // AWS Amplify method for signing out.
import Image from "next/image"; // Next.js optimized image component.

// Functional component for the Navbar.
const Navbar = () => {
  const dispatch = useAppDispatch(); // Hook to dispatch Redux actions.
  
  // Access global state using Redux selectors.
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed, // Check if the sidebar is collapsed.
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode); // Check if dark mode is enabled.

  // Fetch the authenticated user's data.
  const { data: currentUser } = useGetAuthUserQuery({});

  // Function to handle user sign-out.
  const handleSignOut = async () => {
    try {
      await signOut(); // Call AWS Amplify's sign-out method.
    } catch (error) {
      console.error("Error signing out: ", error); // Log any errors during sign-out.
    }
  };

  // If the user is not authenticated, render nothing.
  if (!currentUser) return null;

  // Extract user details from the fetched data.
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search Bar Section */}
      <div className="flex items-center gap-8">
        {/* Sidebar toggle button (only visible when the sidebar is collapsed) */}
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        {/* Search input field */}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center">
        {/* Dark mode toggle button */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {/* Toggle between Sun and Moon icons based on dark mode state */}
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        {/* Settings link */}
        <Link
          href="/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/* Divider */}
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

        {/* User Section */}
        <div className="hidden items-center justify-between md:flex">
          {/* User profile picture or default icon */}
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://capstone-bucket2024.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>

          {/* Username display */}
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>

          {/* Sign-out button */}
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the Navbar component for use in other parts of the application.
export default Navbar;
