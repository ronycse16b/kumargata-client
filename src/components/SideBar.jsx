import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaAlignJustify,
  FaBook,
  FaBuffer,
  FaCheck,
  FaFileInvoice,
  FaHome,
  FaMoneyBillAlt,
  FaSignOutAlt,
  FaUsersCog,
  FaWpforms,
} from "react-icons/fa";

import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";

export default function SideBar({ handleToggleClick, setMobileMenuOpen }) {
  const dispatch = useDispatch();
  const signOutHandler = async () => {

  };

  return (
    <ul className="mb-4 flex flex-col gap-1">
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
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
          to="/add-data"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaWpforms className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            এসেসমেন্ট আবেদন
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/all-data/ward/6532e5314740e8f7ba17e093"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaAlignJustify className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            এসেসমেন্ট তালিকা
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/all-ward-data"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaAlignJustify className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            সকল ওয়ার্ড তথ্য তালিকা
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tax"
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaMoneyBillAlt className="w-12 h-4" />
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
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaBook className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            কর আদায় রেজিস্টার
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/register-levied-taxes"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaBuffer className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            ধার্যকৃত ট্যাক্স রেজিস্টার
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/holding-check"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaCheck className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            হোল্ডিং যাচাই
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/register-due"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaBuffer className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            ট্যাক্স বকেয়া রেজিস্টার
          </p>
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/report"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaFileInvoice className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            রিপোর্ট কালেকশন
          </p>
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/manage-user"
          className={({ isActive, isPending }) =>
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg shadow-blue-500/20 text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
              ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
              : ""
            }`
          }
          type="button"
        >
          <FaUsersCog className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            ইউজার ম্যানেজমেন্ট
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={signOutHandler}
          className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 hover:bg-white/10 active:bg-white/30  flex items-center capitalize  shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
          type="button"
        >
          <FaSignOutAlt className="w-12 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
            সাইন আউট
          </p>
        </NavLink>
      </li>
      <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-lg bg-gray-500" />
        <div>
          <h2 className="text-lg font-semibold text-white">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</a>
          </span>
        </div>
      </div>
    </ul>
  );
}
