import React, { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
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

  const {id} = useParams();


  
  const signOutHandler = async () => {
    dispatch(logout())
    toast.success("Signed out successfully");

  };

  return (
    <ul className="mb-4 flex flex-col gap-1 space-y-3">
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/"
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaHome className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            Dashboard
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/application-form"
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaWpforms className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            আবেদন ফরম
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to={`/data-by-ward/${id || 1}`}
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FcViewDetails className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            এসেসমেন্ট তালিকা
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/holding-check"
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaSearch className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            হোল্ডিং এবং কর যাচাই
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/tax"
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <TbCoinTaka className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            কর আদায়
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/tax-register"
          className={({ isActive, isPending }) =>
            `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaBook className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            আদায় রেজিস্টার
          </p>
        </NavLink>
      </li>


      <li>
        <NavLink
          onClick={signOutHandler}
          className="middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 hover:bg-white/10 active:bg-white/30  flex items-center capitalize  shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
          type="button"
        >
          <FaSignOutAlt className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            Logout
          </p>
        </NavLink>
      </li>
      <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end border rounded-md">
        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full avatar bg-gray-500" />
        <div>
          <h2 className="text-lg font-semibold text-white">{userInfo?.name}</h2>
          <span className="flex items-center space-x-1">
            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</a>
          </span>
        </div>
      </div>
    </ul>
  );
}
