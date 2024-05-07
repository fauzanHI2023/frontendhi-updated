import { FaUserAlt } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { RiFileList2Fill } from "react-icons/ri";
import { FiDownloadCloud } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import { RiMiniProgramFill } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdFlood } from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import { SiPowerpages } from "react-icons/si";
import { GiDrawbridge } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";

export const menuItems = [
    { 
        id: 1, 
        label: 'Take Action', 
        url: '/takeaction',
        subMenu: [
            { id: 21, label: 'Community Donate', url: '/takeaction/communitydonate' },
            { id: 22, label: 'Self Donate', url: '/takeaction/selfdonate' },
            { id: 23, label: 'CSR Services', url: '/takeaction/csrservices' },
            { id: 24, label: 'NGO/I-NGO Services', url: '/takeaction/ngoservices' },
            { id: 25, label: 'Apply For Beneficiaries', url: '/takeaction/applyforbeneficiaries' },
        ], 
    },
    {
        id: 2,
        label: 'Who We Are',
        url: '/whoweare',
        subMenu: [
            { id: 26, label: 'Vision & Missions', url: '/whoweare/vision&missions' },
            { id: 27, label: 'Meet Our Management', url: '/whoweare/meetourmanagement' },
            { id: 28, label: 'Our Story', url: '/whoweare/ourstory' },
            { id: 29, label: 'Our Award', url: '/whoweare/ouraward' },
            { id: 30, label: 'Our Legality', url: '/whoweare/ourlegality' },
            { id: 31, label: 'See Our Impact', url: '/whoweare/seeourimpact' },
            { id: 32, label: 'Branch', url: '/whoweare/branch' },
            { id: 33, label: 'Contact Us', url: '/whoweare/contactus' },
        ],
    },
    { 
        id: 3, 
        label: 'What We Do', 
        url: '/whatwedo',
        subMenu: [
            { id: 34, label: 'Initiative for Disaster', url: '/whatwedo/initiativefordisaster' },
            { id: 35, label: 'Initiative for Empowerment', url: '/whatwedo/initiativeforempowerment' },
            { id: 36, label: 'Initiative for Children', url: '/whatwedo/initiativeforchildren' },
            { id: 37, label: 'Infrastructure Program', url: '/whatwedo/infrastrukturprogram' },
            { id: 38, label: 'Human Initiative Institute', url: '/whatwedo/humaninitiativeinstitute' },
        ], 
    },
    { 
        id: 4, 
        label: 'Join Our Movement', 
        url: '/joinourmovement',
        subMenu: [
            { id: 39, label: 'Be Program Implementor', url: '/joinourmovement/beprogramimplementor' },
            { id: 40, label: 'Be Volunteer', url: '/joinourmovement/bevolunteer' },
            { id: 41, label: 'Be Humanitarian Worker', url: '/joinourmovement/behumanitarianworker' },
        ],
    },
    { 
        id: 5, 
        label: 'Publication', 
        url: '/publication',
        subMenu: [
            { id: 34, label: 'Public Report', url: '/publication/publicreport' },
            { id: 35, label: 'Situation Report', url: '/publication/situationreport' },
            { id: 36, label: 'Media Release', url: '/publication/mediarelease' },
            { id: 37, label: 'News & Stories', url: '/publication/news&stories' },
            { id: 38, label: 'Event', url: '/publication/event' },
        ], 
    },
];

interface menuDashboard {
    label: string;
    url: string;
    icon: string;
  }
export const menuDashboard = [
    { label: 'Dashboard', url: '/dashboard', icon: <RxDashboard /> },
    { label: 'Akun Saya', url: '/dashboard/myaccount', icon: <FaUserAlt /> },
    { label: 'Donasi', url: '/dashboard/donasi', icon: <TbReportMoney /> },
    { label: 'Riwayat Donasi', url: '/dashboard/riwayatdonasi', icon: <RiFileList2Fill /> },
    { label: 'Beneficeries', url: '/dashboard/beneficeries', icon: <FiDownloadCloud /> },
    { label: 'Volunteer', url: '/dashboard/volunteer', icon: <FaPeopleGroup /> },
    { label: 'Karir', url: '/dashboard/karir', icon: <RiHomeOfficeFill /> },
    { label: 'Library', url: '/dashboard/library', icon: <IoLibrary /> },
    { label: 'Implementator Program', url: '/dashboard/implementorprogram', icon: <RiMiniProgramFill /> },
    { label: 'CSR Services', url: '/dashboard/csrservices', icon: <RiCustomerService2Line /> },
];

interface programCard {
    icon: string;
    label: string;
    text: string;
    url: string;
}

export const programCard = [
    {
        icon: <MdFlood/>,
        label: 'Initiative For Disaster',
        text: 'Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana',
        url: '/whatwedo/initiativefordisaster'
    },
    {
        icon: <FaChildren/>,
        label: 'Initiative For Children',
        text: 'Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana',
        url: '/whatwedo/initiativeforchildren'
    },
    {
        icon: <SiPowerpages/>,
        label: 'Initiative For Empowerment',
        text: 'Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana',
        url: '/whatwedo/initiativeforempowerment'
    },
    {
        icon: <GiDrawbridge/>,
        label: 'Infrastruktur Program',
        text: 'Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana',
        url: '/whatwedo/infrastructureprogram'
    }
]
  