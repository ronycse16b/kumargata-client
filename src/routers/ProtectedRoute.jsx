import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

export default function ProtectedRoute({ children }) {
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  // If user is not logged in, redirect to login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the children components
  return children;
}
