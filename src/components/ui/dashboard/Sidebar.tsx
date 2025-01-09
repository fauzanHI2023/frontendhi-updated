"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuDashboard } from '@/data/data'; // Sesuaikan path sesuai dengan struktur folder Anda
import { FiChevronDown } from 'react-icons/fi'; // Import ikon caret

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    menuDashboard.forEach((menuItem) => {
      if (menuItem.subMenu) {
        menuItem.subMenu.forEach((subMenuItem) => {
          if (pathname === subMenuItem.url) {
            setOpenMenu(menuItem.url);
          }
        });
      }
    });
  }, [pathname]);

  const toggleSubMenu = (menuUrl: string) => {
    if (openMenu === menuUrl) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuUrl);
    }
  };

  const isMenuItemActive = (menuItemUrl: string) => {
    return pathname === menuItemUrl || menuDashboard.some(menuItem => menuItem.url === menuItemUrl && menuItem.subMenu && openMenu === menuItemUrl);
  };

  return (
    <aside className={`h-full sticky top-32 dark:bg-slate-900 border bg-white h-96 w-1/5 py-4 rounded-3xl mt-12`}>
      <ul className="h-full text-sm">
        {menuDashboard.map((menuItem, index) => (
          <li key={index} className={`py-3 px-8 ${isMenuItemActive(menuItem.url) ? 'text-gray-950 dark:text-white font-bold' : 'text-gray-500 dark:text-slate-400 font-normal hover:bg-gray-100 hover:text-gray-500 transition ease-in duration-300'}`}>
            {menuItem.subMenu ? (
              <div 
                onClick={() => toggleSubMenu(menuItem.url)}
                className={`flex flex-row items-center cursor-pointer transitions duration-300 ease-in`}>
                <span className={`${isMenuItemActive(menuItem.url) ? 'dark:bg-white text-slate-950 rounded-lg' : 'dark:bg-slate-900 dark:text-slate-400'} p-2 mr-2`}>
                  {menuItem.icon}
                </span>
                {menuItem.label}
                <FiChevronDown className={`ml-auto text-xl ${openMenu === menuItem.url ? 'rotate-180' : 'rotate-0'} transitions-transform duration-300`} />
              </div>
            ) : (
              <Link href={menuItem.url} className={`flex flex-row items-center transitions duration-300 ease-in`}>
                <span className={`${isMenuItemActive(menuItem.url) ? 'dark:bg-white text-slate-950 rounded-lg' : 'dark:bg-slate-900 dark:text-slate-400'} p-2 mr-2`}>
                  {menuItem.icon}
                </span>
                {menuItem.label}
              </Link>
            )}
            {menuItem.subMenu && openMenu === menuItem.url && (
              <ul className="pl-6 mt-2">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <li key={subIndex} className={`py-2 ${pathname === subMenuItem.url ? 'text-slate-950 dark:text-white font-bold' : 'text-zinc-500 dark:text-slate-400 font-semibold'}`}>
                    <Link href={subMenuItem.url} className={`flex flex-row items-center transitions duration-300 ease-in `}>
                      {subMenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
