import React from 'react';
import Lottie from 'lottie-react';
import pageNotFound from "../assets/pageNotFoundAnim.json";
import { Link } from 'react-router';

const PageNotFound = () => {
    return (
        <div>
            <div className="text-center py-20">
                <div className="">
                    <Lottie
                        className="lg:max-w-180 mx-auto mt-0 mb-0"
                        animationData={pageNotFound}
                        loop={true}
                    ></Lottie>
                </div>
                <Link
                    to="/"
                    className="btn inline-block bg-[#CAEB66] text-[#003e3d] px-4 py-2 rounded font-bold"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;