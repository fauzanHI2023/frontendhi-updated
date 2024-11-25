"use client"
import Link from 'next/link';

interface SubMenuItem {
  id: number;
  label: string;
  url: string;
}

interface MenuItem {
  id: number;
  label: string;
  url: string;
  subMenu?: SubMenuItem[];
}

interface SubMenuProps {
  items: MenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  return (
    <ul className="hidden group-hover:block fixed bg-white drop-shadow-2xl rounded-lg transition duration-500 ease-in">
      {items.map((item) => (
        <li key={item.id} className="w-full">
          <Link href={item.url} className="block px-4 py-2 text-sm text-sky-700 font-semibold hover:transition hover:ease-in hover:duration-300 break-normal hover:text-white hover:bg-sky-500 w-full">{item.label}</Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
