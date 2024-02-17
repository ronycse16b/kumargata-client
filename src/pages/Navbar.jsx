

const Navbar = ({handleToggleClick,
    setMobileMenuOpen}) => {
    return (
        <div className="navbar bg-primary sticky top-0  shadow-sm rounded-md z-40  ">
            <div className="flex-1">
            
                <button  onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}  className="p-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-100">
                        <rect width="352" height="32" x="80" y="96"></rect>
                        <rect width="352" height="32" x="80" y="240"></rect>
                        <rect width="352" height="32" x="80" y="384"></rect>
                    </svg>
                </button>
            </div>
            <div className="flex-none">
              
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://i.gifer.com/YzDM.gif" />
                        </div>
                    </div>
                    {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;