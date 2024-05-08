import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import {
  FaAlignJustify,
  FaBook,
  FaBuffer,
  FaCheck,
  FaFileInvoice,
  FaHome,
  FaMoneyBillAlt,
  FaSearch,
  FaSignOutAlt,
  FaUsers,
  FaUsersCog,
  FaWpforms,
} from "react-icons/fa";

import { FcViewDetails } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useGetDetailsQuery } from "../features/api/authApi";
import { logout } from "../features/auth/authSlice";
import { TbCoinTaka } from "react-icons/tb"


export default function SideBar({ handleToggleClick, setMobileMenuOpen }) {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id } = useParams();



  const signOutHandler = async () => {
    dispatch(logout())
    toast.success("Signed out successfully");

  };

  return (

    <ul className="menu menu-sm   text-white   max-w-xs w-full space-y-3">
      <li className="text-white  bg-blue-600 rounded-md">
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/"
          className={({ isActive, isPending }) =>
            `${isActive
              ? "  text-white  bg-blue-600"
              : ""
            }`
          }
          type="button"
        >
          <FaHome className=" h-4 text-white" />
          <p className="text-white">
            ড্যাশবোর্ড 
          </p>
        </NavLink>
      </li>
      {
        userInfo && (userInfo?.role === 'admin' || userInfo?.role === 'user' || userInfo?.role === 'superAdmin') && <>

          <li>
            <details open >
              <summary className=" ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                 এসেসমেন্ট 
              </summary>
              <ul className="mt-2">
                <li>
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to="/application-form"
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass text-white"
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <FaWpforms className=" h-4" />
                    <p className="">
                     আবেদন ফরম 
                    </p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to={`/data-by-ward/${id || 1}`}
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass active:text-white"
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <FcViewDetails className=" h-4" />
                    <p className="">
                     এসেসমেন্ট তালিকা  
                    </p>
                  </NavLink>
                </li>
              </ul>
            </details>

          </li>
          <li>
            <NavLink
              onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
              to="/holding-check"
              className={({ isActive, isPending }) =>
                `${isActive
                  ? " glass text-white"
                  : " "
                }`
              }
              type="button"
            >
              <FaSearch className=" h-4" />
              <p className="">
                হোল্ডিং এবং কর যাচাই  
              </p>
            </NavLink>
          </li>

        </>
      }

      {
        userInfo && userInfo?.role === 'admin' || userInfo?.role === 'superAdmin'   && <>

          <li className="text-white">
            <details open>
              <summary className=" mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                 কর ম্যানেজমেন্ট
              </summary>
              <ul>
                <li className="text-white">
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to="/tax"
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass text-white "
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <TbCoinTaka className=" h-4" />
                    <p className="">
                       কর আদায় 
                    </p>
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to="/tax-register"
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass text-white"
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <FaBook className=" h-4" />
                    <p className="">
                       আদায় রেজিস্টার 
                    </p>
                  </NavLink>
                </li>

                <li className="text-white">
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to="/payment-recipt"
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass text-white"
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <FaBook className=" h-4" />
                    <p className="">
                    পেমেন্ট রিসিপ্ট
                    </p>
                  </NavLink>
                </li>

                {/* 
            <li className="text-white"><a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Project-final-2.psd
            </a></li> */}

              </ul>
            </details>

          </li>
          {
            userInfo&& userInfo?.role === 'superAdmin' && <li className="text-white">
            <details open>
              <summary className=" ">
                <FaUsers className="h-4 w-4" />
                ইউজার ম্যানেজমেন্ট 
              </summary>
              <ul>
                <li className="text-white mt-2">
                  <NavLink
                    onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
                    to="/all-users"
                    className={({ isActive, isPending }) =>
                      `${isActive
                        ? " glass text-white "
                        : ""
                      }`
                    }
                    type="button"
                  >
                    <FaBook className=" h-4 " />
                    <p className="">
                       সকল ইউজার তালিকা 
                    </p>
                  </NavLink>
                </li>


              </ul>
            </details>

          </li>
          }
          


        </>

      }




      <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end border   rounded-md ">
      <div className="relative group">
                    <img className="size-[60px] bg-slate-500 object-cover rounded-full" src={userInfo?.image} alt="avatar navigate ui" />
                    <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 border-[3px] border-white"></span>
                    <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 animate-ping"></span>
                </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{userInfo?.name}</h2>
          <span className="flex items-center space-x-1">
            <Link  to='/profile' rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</Link>
          </span>
        </div>
      </div>
      <li className="">
        <NavLink
          onClick={signOutHandler}
          className="btn bg-red-600 text-white btn-sm text-start hover:bg-red-500 transition-shadow"
          type="button"
        >
          <FaSignOutAlt className="w-4 h-4  font-bold" />
         
            Logout
          
        </NavLink>
      </li>
    </ul>




  );
}


