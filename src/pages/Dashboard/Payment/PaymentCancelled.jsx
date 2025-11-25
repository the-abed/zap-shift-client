import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className="text-3xl">Payment Cancelled</h2>
            <Link to="/dashboard/myParcel" className="myBtn"> Try Again </Link>
        </div>
    );
};

export default PaymentCancelled;