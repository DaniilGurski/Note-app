import { createBrowserRouter } from "react-router";
import AuthPage from "@pages/AuthPage";
import LoginForm from "@components/auth/LoginForm";
import SignUpForm from "@components/auth/SignUpForm";
import ForgotPasswordForm from "@components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@components/auth/ResetPasswordForm";
import PrivateRoute from "@/components/PrivateRoute";
import GuestRoute from "@/components/GuestRoute";
import App from "@/App";
import AllNotesPage from "@pages/AllNotesPage";
import NoteEditorPage from "@pages/NoteEditorPage";
import ArchivedNotesPage from "@pages/ArchivedNotesPage";
import SearchedNotesPage from "@pages/SearchedNotesPage";
import TaggedNotesPage from "./pages/TaggedNotesPage";

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
        path: "/notes",
        element: <AllNotesPage />,
        children: [
          {
            path: ":id",
            element: <NoteEditorPage />,
          },

          {
            path: "*",
            element: <h1> Note not found </h1>,
          },
        ],
      },

      {
        path: "/archive",
        element: <ArchivedNotesPage />,
        children: [
          {
            path: ":id",
            element: <NoteEditorPage />,
          },

          {
            path: "*",
            element: <h1> Note not found </h1>,
          },
        ],
      },

      {
        path: "/search",
        element: <SearchedNotesPage />,
        children: [
          {
            path: ":id",
            element: <NoteEditorPage />,
          },

          {
            path: "*",
            element: <h1> Note not found </h1>,
          },
        ],
      },

      {
        path: "/tags",
        element: <TaggedNotesPage />,
        children: [
          {
            path: ":id",
            element: <NoteEditorPage />,
          },

          {
            path: "*",
            element: <h1> Note not found </h1>,
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
