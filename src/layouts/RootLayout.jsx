import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col '>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className='w-11/12 mx-auto flex-1  min-h-[calc(100vh-100px)]'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;