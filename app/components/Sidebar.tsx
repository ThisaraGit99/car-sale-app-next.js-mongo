"use client"; // 👈 Add this at the top

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCar, FaClipboardList, FaPlus, FaSignOutAlt, FaThLarge } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <ul className="mt-6 space-y-4">
        <li>
          <Link href="/admin" className="flex items-center gap-2 hover:text-gray-400">
            <FaThLarge /> Dashboard
          </Link>
        </li>

        {/* Dropdown Example: My Inventory */}
        <li>
          <button
            className="flex items-center justify-between w-full text-left hover:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2">
              <FaClipboardList /> My Inventory
            </span>
            <FiChevronDown className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {isOpen && (
            <ul className="ml-6 mt-2 space-y-2">
                <li>
                <Link href="/admin/all" className="flex items-center gap-2 hover:text-gray-400">
                    <FaCar /> All Vehicles
                </Link>
              </li>
              <li>
                <Link href="/admin/add" className="flex items-center gap-2 hover:text-gray-400">
                  <FaPlus /> Add Vehicle
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/admin/category" className="flex items-center gap-2 hover:text-gray-400">
            <FaCar /> Category Management
          </Link>
        </li>

        <li>
          <Link href="/admin/testimonials" className="flex items-center gap-2 hover:text-gray-400">
            <FaCar /> Testimonials
          </Link>
        </li>

        <li>
          <button
            className="flex items-center gap-2 text-red-500 hover:text-red-400"
            onClick={() => router.push("/api/auth/signout")}
          >
            <FaSignOutAlt /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
