"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuDashboard } from '@/data/data'; // Sesuaikan path sesuai dengan struktur folder Anda
import ButtonLogout from '@/components/ButtonLogout';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={`h-full bg-white h-96 w-1/5 py-4 rounded-xl mt-12`}>
      <ul className="h-full">
        {menuDashboard.map((menuItem, index) => (
          <li key={index} className={`py-3 pl-8 ${pathname === menuItem.url ? 'bgtext-zinc-600 font-bold' : 'text-zinc-400 font-semibold'}`}>
            <Link href={menuItem.url} className={`flex flex-row items-center transitions duration-300 ease-in `}>
               <span className={`${pathname === menuItem.url ? 'text-white bg-sky-500 rounded-lg' : 'text-zinc-700 bg-white'}  p-2 mr-2`}>{menuItem.icon}</span>
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
