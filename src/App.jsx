
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/router';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCredentials, toggleLoading, } from './features/auth/authSlice';
import { useGetDetailsQuery } from './features/api/authApi';
import Loader from './components/Loader';
import { ward } from './features/ward/ward.slice';
import InvoiceGenerator from './components/InvoiceGenerator';




function App() {
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })

 
  useEffect(() => {
    dispatch(ward());
    if (data) {
      dispatch(setCredentials(data));

    }
     
    if (isFetching === false) {
      dispatch(toggleLoading());
    }

  }, [data, dispatch, isFetching])


  return (
    <div >
      <div>
        <RouterProvider router={router}>
        </RouterProvider>
      </div>


    </div>

  );
}

export default App;
