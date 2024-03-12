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

  const { id } = useParams();



  const signOutHandler = async () => {
    dispatch(logout())
    toast.success("Signed out successfully");

  };

  return (

    <ul className="menu menu-sm  text-white rounded-lg max-w-xs w-full space-y-3">
      <li>
        <NavLink
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          to="/"
          className={({ isActive, isPending }) =>
            `${isActive
              ? " glass text-white active:text-white"
              : ""
            }`
          }
          type="button"
        >
          <FaHome className=" h-4" />
          <p className="">
            ড্যাশবোর্ড
          </p>
        </NavLink>
      </li>
      <li>
        <details open>
          <summary>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
            এসেসমেন্ট
          </summary>
          <ul>
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
                    ? " glass text-white"
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
              : ""
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
      <li>
        <details open>
          <summary>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
            কর
          </summary>
          <ul>
            <li>
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
            <li>
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

            <li>
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
                  পেমেন্ট রিসিট
                </p>
              </NavLink>
            </li>

            {/* 
            <li><a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Project-final-2.psd
            </a></li> */}

          </ul>
        </details>

      </li>



   
      <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end border rounded-md glass">
        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full avatar bg-gray-500" />
        <div>
          <h2 className="text-lg font-semibold text-white">{userInfo?.name}</h2>
          <span className="flex items-center space-x-1">
            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">View profile</a>
          </span>
        </div>
      </div>
      <li>
        <NavLink
          onClick={signOutHandler}
          className="middle none border glass font-sans font-bold center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 hover:bg-white/10 active:bg-white/30  flex items-center capitalize  shadow-md  hover:shadow-lg shadow-blue-500/40 active:opacity-[0.85] w-full "
          type="button"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit   capitalize">
            Logout
          </p>
        </NavLink>
      </li>
    </ul>

 


  );
}



// < className="mb-4 flex flex-col gap-1 space-y-3">
//   <li>
// <NavLink
//   onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//   to="/"
//   className={({ isActive, isPending }) =>
//     `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//       ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//       : ""
//     }`
//   }
//   type="button"
// >
//   <FaHome className="w-12 h-4" />
//   <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//     Dashboard
//   </p>
// </NavLink>
//   </li>
//   <li>
//     <NavLink
//       onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//       to="/application-form"
//       className={({ isActive, isPending }) =>
//         `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//           ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//           : ""
//         }`
//       }
//       type="button"
//     >
//       <FaWpforms className="w-12 h-4" />
//       <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//         আবেদন ফরম
//       </p>
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//       to={`/data-by-ward/${id || 1}`}
//       className={({ isActive, isPending }) =>
//         `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//           ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//           : ""
//         }`
//       }
//       type="button"
//     >
//       <FcViewDetails className="w-12 h-4" />
//       <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//         এসেসমেন্ট তালিকা
//       </p>
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//       to="/holding-check"
//       className={({ isActive, isPending }) =>
//         `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//           ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//           : ""
//         }`
//       }
//       type="button"
//     >
//       <FaSearch className="w-12 h-4" />
//       <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//         হোল্ডিং এবং কর যাচাই
//       </p>
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//       to="/tax"
//       className={({ isActive, isPending }) =>
//         `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//           ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//           : ""
//         }`
//       }
//       type="button"
//     >
//       <TbCoinTaka className="w-12 h-4" />
//       <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//         কর আদায়
//       </p>
//     </NavLink>
//   </li>
//   <li>
//     <NavLink
//       onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
//       to="/tax-register"
//       className={({ isActive, isPending }) =>
//         `middle none border font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center capitalize ${isActive
//           ? "rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full "
//           : ""
//         }`
//       }
//       type="button"
//     >
//       <FaBook className="w-12 h-4" />
//       <p className="block antialiased font-sans text-[12px] leading-relaxed text-inherit  capitalize">
//         আদায় রেজিস্টার
//       </p>
//     </NavLink>
//   </li>