import React from 'react'
import banner from '../Assests/Banner.jpg'
import banner1 from '../Assests/banner1.jpg'
import banner2 from '../Assests/banner2.jpg'
import banner3 from '../Assests/banner3.jpg'

const About = () => {
    return (
        
        <div>
            <div>

            </div>
            <div>
                <img src={banner} />
            </div>
            <div>
                {/* Introduction */}
                <section className=" mt-8 mb-11 w-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-4xl font-bold text-center ">About Our OOH Advertising Platform</h1>
                    <p className="mt-4 text-lg text-center">
                        We connect advertisers with outdoor advertising spaces to create impactful ad campaigns.
                    </p>
                </section>

                {/* Mission and Vision */}


                <section className="mt-8 mb-11 mx-auto bg-white rounded-lg shadow-lg p-6 max-w-screen-lg">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        {/* Content Column */}
                        <div className="w-full lg:w-1/2 lg:pr-8 text-center mb-6 lg:mb-0">
                            <div>
                                <h2 className="text-3xl font-bold font-serif-display">Our Mission and Vision</h2>
                                <p className="mt-4 text-lg ">
                                    Our mission is to revolutionize the outdoor advertising industry by providing a seamless platform for advertisers and ad space owners. Our vision is to become the leading platform for OOH advertising, delivering exceptional value and results for our users.
                                </p>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img src={banner1} className="w-659 h-377 object-cover rounded-lg" alt="Banner 1" />
                        </div>
                    </div>
                </section>

                {/* Features and Benefits */}
                <section className="mt-8 mb-11 mx-auto bg-white rounded-lg shadow-lg p-6 max-w-screen-lg">
                    <div className='flex flex-col lg:flex-row items-center justify-center'>
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img src={banner2} className="w-659 h-377 object-cover rounded-lg" alt="Banner 1"></img>
                        </div>
                        <div className="w-full lg:w-1/2 lg:pr-8 text-center mb-6 lg:mb-0">
                            <h2 className="text-3xl font-bold font-serif-display">Features and Benefits</h2>
                            <ul className="list-disc list-inside mt-4 text-lg">
                                <li>User-friendly interface for easy navigation and use.</li>
                                <li>Comprehensive ad space listings with detailed information.</li>
                                <li>Advanced ad campaign management tools.</li>
                                <li>Real-time booking and availability updates.</li>
                                <li>Secure online payments and invoicing.</li>
                            </ul>
                        </div>

                    </div>

                </section>

                {/* How It Works */}
                <section className="mt-8 mb-11 mx-auto bg-white rounded-lg shadow-lg p-6 max-w-screen-lg">
                    <div className='flex flex-col lg:flex-row items-center justify-center'>
                        <div className='w-full lg:w-1/2 lg:pr-8 text-center mb-6 lg:mb-0'>
                            <h2 className="text-3xl font-bold text-center">How It Works</h2>
                            <p className="mt-4 text-lg">Our platform simplifies the process of OOH advertising:</p>
                            <ol className="list-decimal list-inside mt-4 text-lg">
                                <li>Register and create your profile.</li>
                                <li>Search and filter available ad spaces.</li>
                                <li>Book ad spaces in real-time.</li>
                                <li>Create and manage your ad campaigns.</li>
                                <li>Make secure online payments.</li>
                            </ol>

                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img src={banner3} className="w-659 h-377 object-cover rounded-lg" alt="Banner 1"></img>
                        </div>
                    </div>

                </section>

                {/* Team */}
                   

            </div>

        </div>
    )
}

export default About