// Import necessary libraries and components.
import React from "react"; // React library for component creation.
import { Authenticator } from "@aws-amplify/ui-react"; // Authenticator component for handling authentication flows.
import { Amplify } from "aws-amplify"; // AWS Amplify library for configuration and integration.
import "@aws-amplify/ui-react/styles.css"; // Default styles for AWS Amplify UI components.

// Configure AWS Amplify with Cognito authentication details.
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "", // Cognito User Pool ID from environment variables.
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "", // Cognito User Pool Client ID from environment variables.
    },
  },
});

// Define custom form fields for the Amplify Authenticator.
const formFields = {
  signUp: {
    username: {
      order: 1, // Display order of the field.
      placeholder: "Choose a username", // Placeholder text for the input field.
      label: "Username", // Label for the field.
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
    },
  },
};

// Authentication provider component to wrap the application.
const AuthProvider = ({ children }: any) => {
  // Inline styles for the background.
  const backgroundStyle = {
    backgroundImage: `url("/background.jpeg")`, // Set a background image.
    backgroundSize: "cover", // Ensure the image covers the entire background.
    backgroundRepeat: "no-repeat", // Prevent image repetition.
    backgroundPosition: "center", // Center the background image.
    height: "100vh", // Full viewport height.
    width: "100vw", // Full viewport width.
    display: "flex", // Flexbox for centering content.
    justifyContent: "center", // Center content horizontally.
    alignItems: "center", // Center content vertically.
  };

  return (
    <div style={backgroundStyle}>
      {/* Amplify Authenticator component for authentication */}
      <Authenticator formFields={formFields}>
        {({ user }: any) =>
          user ? (
            // If a user is signed in, render the children components.
            <div>{children}</div>
          ) : (
            // If no user is signed in, show a sign-in prompt.
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

// Export the AuthProvider component for use in other parts of the application.
export default AuthProvider;
