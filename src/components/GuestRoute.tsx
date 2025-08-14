import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

type GuestRouteProps = PropsWithChildren;

export default function GuestRoute({ children }: GuestRouteProps) {
  const [isAuth, loading] = useAuth();

  // If we don't use the loading state, this component will always render Navigate, as it will use the default value of isAuth (false) before it's updated.
  if (loading) {
    return null;
  } else {
    return !isAuth ? <> {children} </> : <Navigate to="/" replace />;
  }
}
