import { useEffect, useState } from 'react';
import bannerimg from '../../../assets/images/opinio-cover.jpg'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Banner = ({searchValue, setCurrentPage}) => {

    // const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        const searchText = e.target.search.value
        // setSearch(searchText)
        searchValue(searchText)
        setCurrentPage(1)


    }
    // console.log(search);

  

    return (
        <div>
            <div className="hero min-h-[600px]" style={{ backgroundImage: `url(${bannerimg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Discover, Discuss, Connect</h1>
                        <p className="mb-5">Dive into our forum community to explore various topics, share your thoughts, and connect with people worldwide.</p>
                        <form onSubmit={handleSearch}>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" name='search' className="text-black grow" placeholder="Search a tag" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                            <div className="form-control mt-6">
                                <button className="btn">Search</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Banner;