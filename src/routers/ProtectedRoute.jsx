import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader';

export default function ProtectedRoute({ children }) {
    const { user, setUserLoading, } = useSelector((state) => state.auth);



    return (
        <div className=''>
            {setUserLoading ? <Loader/>: user ? children : <Navigate to='/login' replace={true} />}

        </div>
    );
}
