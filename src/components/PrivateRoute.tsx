import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuth, loading] = useAuth();

  // If we don't use the loading state, this component will always render Navigate, as it will use the default value of isAuth (false) before it's updated.
  if (loading) {
    return null;
  } else {
    return isAuth ? <> {children} </> : <Navigate to="/auth/login" replace />;
  }
}
