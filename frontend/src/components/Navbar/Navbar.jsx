import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Navbar() {
    const links = [
        { title: "Home", links: "/" },
        { title: "All Games", links: "/all-games" },
        { title: "Profile", links: "/profile" },
        { title: "Admin Profile", links: "/profile" },
    ]
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(isLoggedIn);

    const role = useSelector((state) => state.auth.role);

    if (isLoggedIn === false) {
        links.splice(2, 3)
    }

    if(isLoggedIn === true && role === "user"){
        links.splice(3, 1)
    }
    if(isLoggedIn === true && role === "admin"){
        
        links.splice(2, 1)
    }
    const [mobileNav, setMobileNav] = useState("hidden");
    return (
        <>
            <nav className='z-50 relative flex justify-between items-center bg-zinc-800 text-white px-8 py-2'>
                <Link to="/" className='flex items-center'>
                    <img className='h-10 me-4'
                        src="./logo.png" alt="logo" />
                    <h1 className='text-2xl font-semibold'>Web For Games</h1>
                </Link>
                <div className='nav-links-wfg block md:flex items-center gap-4'>
                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) =>(
                                <div className='flex items-center justify-center'>
                                {items.title === "Profile" ||
                                items.title === "Admin Profile"
                                ? (
                                    <Link to={items.links} className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                                key={i}>{items.title}
                                </Link>
                                ):                                   
                                    <Link to={items.links} className='hover:text-blue-500 transition-all duration-300'
                                    key={i}>{items.title}{" "}</Link>
                                    }
                                
                                </div>
                            )
                        )}
                    </div>
                    {isLoggedIn === false && (
                        <div className='hidden md:flex gap-4'>
                            <Link to="/Login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
                            <Link to="/SignUp" className='px-4 py-1 bg-blue-500 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
                        </div>
                    )}
                    <button className='block md:hidden text-white text-2xl hover:text-zinc-400'
                        onClick={() => (mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) =>
                    <Link to={items.links} className={`${mobileNav} text-white mb-4 text-4xl font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => (mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                    >{items.title}
                    </Link>
                )};

                {isLoggedIn === false && (
                    <>
                        <Link to="/Login" className={`${mobileNav}px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300`}>
                            Login</Link>
                        <Link to="/SignUp" className={`${mobileNav}px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                            SignUp</Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Navbar
