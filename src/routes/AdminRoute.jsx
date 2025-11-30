import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';
import LoaderSpinner from '../components/LoaderSpinner';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, isLoading} = useRole();

    if (loading || isLoading) {
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role !== "admin"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;