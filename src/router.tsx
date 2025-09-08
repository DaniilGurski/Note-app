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
import AllNotesPageDesktop from "@/pages/AllNotesPageDesktop";
import ArchivedNotesPageDesktop from "@/pages/ArchivedNotesPageDesktop";
import ArchivedNotesPage from "@/pages/ArchivedNotesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),

    children: [
      {
        element: <AllNotesPageDesktop />,
        children: [
          {
            index: true,
            element: <AllNotesPage />,
          },

          {
            path: "notes/:id",
            element: <NoteEditorPage />,
            // children: [{ path: ":id", element: <NoteEditorPage /> }],
          },
        ],
      },

      {
        path: "/archive",
        element: <ArchivedNotesPageDesktop />,

        children: [
          {
            index: true,
            element: <ArchivedNotesPage />,
          },

          {
            path: "notes/:id",
            element: <NoteEditorPage />,
            // children: [{ path: ":id", element: <NoteEditorPage /> }],
          },
        ],
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
