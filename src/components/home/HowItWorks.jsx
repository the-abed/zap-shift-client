import React from 'react';
import bookingIcon from '../../assets/bookingIcon.png'

const HowItWorks = () => {
    const info = [
        {title: 'Booking Pick & Drop', description: 'From personal packages to business shipments — we deliver on time, every time.'}, 
        {title: "Cash On Delivery", description: "From personal packages to business shipments — we deliver on time, every time."},
        {title: "Delivery Hub", description: "From personal packages to business shipments — we deliver on time, every time."},
        {title: "Booking SME & Corporate", description: "From personal packages to business shipments — we deliver on time, every time."}
    ]
    return (
        <div>
            <h2 className='text-2xl font-bold text-secondary'>How It Works</h2>

            <section>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
                   
                    {
                        info.map((info,index) => <div key={index} className='bg-base-100 shadow-lg rounded-lg p-5'>
                            <img src={bookingIcon} alt="" />
                            <div>
                                <h2 className='text-xl font-bold'>{info.title}</h2>
                                <p>{info.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </section>

        </div>
    );
};

export default HowItWorks;