// components/Auth/RequireAuth.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../../services/auth";

type Props = {
  children: React.ReactNode;
  roles?: string[]; // permitido
};

export default function RequireAuth({ children, roles }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some(r => hasRole(r))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
