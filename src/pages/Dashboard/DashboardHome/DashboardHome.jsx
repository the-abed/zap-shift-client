import React from 'react';
import useRole from '../../../hooks/useRole';
import LoaderSpinner from '../../../components/LoaderSpinner';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const { role, isLoading } = useRole();
    if(isLoading){
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>;
    }
    else if(role === 'rider'){
        return <RiderDashboardHome></RiderDashboardHome>;
    }
    else{
        return <UserDashboardHome></UserDashboardHome>
    }
   
};

export default DashboardHome;