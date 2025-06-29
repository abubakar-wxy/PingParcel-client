import React from 'react';
import logo from "../../assets/logo.png"

const PingParcelLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-1' src={logo} />
            <p className='text-3xl -ml-3'>PingParcel</p>
        </div>
    );
};

export default PingParcelLogo;