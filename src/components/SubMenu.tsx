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
    <ul className="hidden group-hover:block absolute">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.url} className="block px-4 py-2 text-sm text-gray-100 bg-slate-950 hover:text-slate-950 hover:bg-gray-100">{item.label}</Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
