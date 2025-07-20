import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
    const settings = useSelector((state) => state.frontend.settingsData);
    return (
        <div className='bg-[var(--primary)] text-gray-100 p-4 text-center '>
            {settings?.footerDescription ? (
                settings.footerDescription
            ) : (
                <>
                    &copy; Copyright 2025 News Now
                </>
            )}
        </div>
    )
}

export default Footer