import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import AdminDashboardCard from '../components/AdminDashboardCard';
import Chart from '../components/Chart';



export default function Home() {
  return (
    <>

    <AdminDashboardCard/>
    <div className='mt-10'>

    <Chart/>
    </div>
     
    </>

  );
}