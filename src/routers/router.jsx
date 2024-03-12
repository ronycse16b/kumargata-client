import {createBrowserRouter} from 'react-router-dom'
import Root from '../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

import User from '../pages/User';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import AddDataFrom from '../pages/AddDataFrom';
import AssesmentTable from '../pages/AssesmentTable';
import PerHoldingDetails from '../components/PerHoldingDetails';
import UpdateData from '../components/UpdateData';
import HoldingAndTaxCheck from '../pages/HoldingAndTaxCheck';
import Tax from '../pages/Tax';
import PaymentPrint from '../pages/PaymentPrint';
import TaxRegister from '../pages/TaxRegister';
import Table from '../components/Table';
import PaymentHistory from '../components/PaymentHistory';




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
        name:"home",
        path: "/home",
        element: <Home />,
        
      },
      {
        name:"application-form",
        path: "/application-form",
        element: <AddDataFrom />,
        
      },
      {
        name:"data-by-ward",
        path: "/data-by-ward/:id",
        element: <AssesmentTable />,
        
      },
      {
        name:"per-holding-details",
        path: "/details/:id",
        element: <PerHoldingDetails />,
        
      },
      {
        name:"update",
        path: "/update/:id",
        element: <UpdateData />,
        
      },
      {
        name:"Holding ",
        path: "/holding-check",
        element: <HoldingAndTaxCheck />,
        
      },
      {
        name:"Tax ",
        path: "/tax",
        element: <Tax />,
        
      },
      {
        name:"Payment",
        path: "/payment-print",
        element: <PaymentPrint />,
        
      },
      {
        name:"Payment Register",
        path: "/tax-register",
        element: <TaxRegister />,
        
      },
      {
        name:"Payment Register",
        path: "/payment-recipt",
        element: <PaymentHistory />,
        
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
       