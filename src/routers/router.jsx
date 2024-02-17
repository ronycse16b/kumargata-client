import {createBrowserRouter} from 'react-router-dom'
import Root from '../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

import User from '../pages/User';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <Root /></ProtectedRoute>,
    errorElement:<NotFound/>,
    children: [
      {
        index:true,
        element: <ProtectedRoute><Home /></ProtectedRoute>,
        
      },
      {
        name:"content",
        path: "/user",
        element: <User />,
        
      },
    ],
  },

  {
    path: "/login",
    element:<Login />,
  },
  {
    path: "/register",
    element:<Register />,
  },
 
 
]);
       