import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoaderSpinner from '../components/LoaderSpinner';
import Forbidden from '../components/Forbidden';

const RiderRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, isLoading} = useRole();

    if (loading || isLoading) {
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role !== "rider"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default RiderRoute;