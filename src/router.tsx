import { createBrowserRouter } from "react-router";
import AuthPage from "@pages/AuthPage";
import AllNotesPage from "@pages/AllNotesPage";
import NoteEditorPage from "@/pages/NoteEditorPage";
import LoginForm from "@components/auth/LoginForm";
import SignUpForm from "@components/auth/SignUpForm";
import ForgotPasswordForm from "@components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@components/auth/ResetPasswordForm";
import PrivateRoute from "@/components/PrivateRoute";
import GuestRoute from "@/components/GuestRoute";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),

    children: [
      { index: true, element: <AllNotesPage /> },
      {
        path: "archive",
        element: <h1> Archived Notes </h1>,
        children: [{ path: ":id", element: <NoteEditorPage /> }],
      },
      {
        path: "notes",
        children: [{ path: ":id", element: <NoteEditorPage /> }],
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <GuestRoute>
        <AuthPage />
      </GuestRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      { path: "sign-up", element: <SignUpForm /> },
      { path: "forgot-password", element: <ForgotPasswordForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
    ],
  },
]);
