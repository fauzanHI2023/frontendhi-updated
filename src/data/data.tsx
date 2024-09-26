import { FaUserAlt, FaDonate } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { RiFileList2Fill } from "react-icons/ri";
import { FiDownloadCloud } from "react-icons/fi";
import { FaPeopleGroup, FaSwatchbook } from "react-icons/fa6";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import { RiMiniProgramFill } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import {
  MdFlood,
  MdHistory,
  MdModelTraining,
  MdWorkHistory,
} from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import { SiPowerpages } from "react-icons/si";
import { GiDrawbridge } from "react-icons/gi";
import { RxDashboard, RxActivityLog } from "react-icons/rx";
import { FaPeopleCarryBox } from "react-icons/fa6";
import imageJoin1 from "/public/imagejoin1.png";
import imageJoin2 from "/public/imagejoin2.png";
import imageJoin3 from "/public/imagejoin3.png";
import imageJoin4 from "/public/imagejoin4.png";

export const menuItems = [
  // {
  //     id: 1,
  //     label: 'Take Action',
  //     url: '/takeaction',
  //     subMenu: [
  //         { id: 21, label: 'Donate', url: '/takeaction/donate' },
  //         { id: 23, label: 'Program Sponsor', url: '/takeaction/collaborationimpact' },
  //     ],
  // },
  {
    id: 2,
    label: "Who We Are",
    url: "/whoweare",
    subMenu: [
      { id: 26, label: "Vision & Missions", url: "/whoweare" },
      { id: 27, label: "Meet Our Management", url: "/whoweare" },
      { id: 28, label: "Our Story", url: "/whoweare" },
      { id: 29, label: "Our Award", url: "/whoweare" },
      { id: 30, label: "Our Legality", url: "/whoweare" },
      { id: 31, label: "See Our Impact", url: "/whoweare" },
      { id: 32, label: "Branch", url: "/whoweare" },
      { id: 33, label: "Contact Us", url: "/whoweare" },
    ],
  },
  {
    id: 3,
    label: "What We Do",
    url: "/whatwedo",
    subMenu: [
      {
        id: 34,
        label: "Initiative for Disaster",
        url: "/whatwedo/initiativefordisaster",
      },
      {
        id: 35,
        label: "Initiative for Empowerment",
        url: "/whatwedo/initiativeforempowerment",
      },
      {
        id: 36,
        label: "Initiative for Children",
        url: "/whatwedo/initiativeforchildren",
      },
      {
        id: 37,
        label: "Infrastructure Program",
        url: "/whatwedo/infrastrukturprogram",
      },
      {
        id: 38,
        label: "Human Initiative Institute",
        url: "https://hiinstitute.or.id/",
      },
    ],
  },
  {
    id: 4,
    label: "Join Our Movement",
    url: "/joinourmovement",
    subMenu: [
      { id: 21, label: "Donate", url: "/takeaction/donate" },
      {
        id: 23,
        label: "Program Sponsor",
        url: "/takeaction/collaborationimpact",
      },
      {
        id: 39,
        label: "Be Program Implementor",
        url: "/joinourmovement/beprogramimplementor",
      },
      { id: 40, label: "Be Volunteer", url: "/joinourmovement/bevolunteer" },
      {
        id: 41,
        label: "Be Humanitarian Worker",
        url: "/joinourmovement/behumanitarianworker",
      },
      {
        id: 42,
        label: "Be Rightholders",
        url: "/joinourmovement/rightholders",
      },
    ],
  },
  {
    id: 5,
    label: "Publication",
    url: "/publication",
    subMenu: [
      { id: 34, label: "Public Report", url: "/publication/publicreport" },
      {
        id: 35,
        label: "Situation Report",
        url: "/publication/situationreport",
      },
      { id: 36, label: "Media Release", url: "/publication/mediarelease" },
      { id: 37, label: "News & Stories", url: "/publication/news&stories" },
      { id: 38, label: "Event", url: "/publication/event" },
      { id: 39, label: "Library", url: "/publication/library" },
      { id: 40, label: "Petition", url: "/publication/petition" },
      { id: 41, label: "Gallery", url: "/publication/gallery" },
      { id: 42, label: "Document", url: "/publication/document" },
    ],
  },
];

interface SubMenu {
  label: string;
  url: string;
}

interface menuDashboard {
  label: string;
  url: string;
  icon: string;
  subMenu?: SubMenu[];
}
export const menuDashboard = [
  { label: "Dashboard", url: "/dashboard", icon: <RxDashboard /> },
  { label: "Akun Saya", url: "/dashboard/myaccount", icon: <FaUserAlt /> },
  {
    label: "Donasi",
    url: "/dashboard/donasi",
    icon: <TbReportMoney />,
    subMenu: [
      { label: "Donasi Individu", url: "/dashboard/donasi/donasiindividu" },
      { label: "Riwayat Donasi", url: "/dashboard/riwayatdonasi" },
    ],
  },
  {
    label: "Proyek",
    url: "/dashboard/csrservices",
    icon: <RiCustomerService2Line />,
    subMenu: [
      { label: "Sponsori Program", url: "/dashboard/csrservices/beliprogram" },
      { label: "Ajukan Proposal", url: "/dashboard/csrservices/ajukankonsep" },
    ],
  },
  {
    label: "Pengajuan Bantuan (CPHP)",
    url: "/dashboard/beneficeries",
    icon: <FiDownloadCloud />,
  },
  { label: "Relawan", url: "/dashboard/volunteer", icon: <FaPeopleGroup /> },
  { label: "Karir", url: "/dashboard/karir", icon: <RiHomeOfficeFill /> },
  { label: "Perpustakaan", url: "/dashboard/library", icon: <IoLibrary /> },
  {
    label: "Implementator Program",
    url: "/dashboard/implementorprogram",
    icon: <RiMiniProgramFill />,
  },
];

interface programCard {
  icon: string;
  label: string;
  text: string;
  url: string;
}

export const programCard = [
  {
    icon: <MdFlood />,
    label: "Initiative For Disaster",
    text: "Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana",
    url: "/whatwedo/initiativefordisaster",
  },
  {
    icon: <FaChildren />,
    label: "Initiative For Children",
    text: "Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana",
    url: "/whatwedo/initiativeforchildren",
  },
  {
    icon: <SiPowerpages />,
    label: "Initiative For Empowerment",
    text: "Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana",
    url: "/whatwedo/initiativeforempowerment",
  },
  {
    icon: <GiDrawbridge />,
    label: "Infrastruktur Program",
    text: "Initiative for Disaster merupakan kumpulan dari berbagai program yang bertujuan mengurangi dampak bencana",
    url: "/whatwedo/infrastructureprogram",
  },
];

interface summaryDashboard {
  icon: string;
  label: string;
  angka: string;
}

export const summaryDashboard = [
  {
    icon: (
      <MdHistory className="w-full text-sky-300 dark:text-sky-400" size={60} />
    ),
    label: "Akses Masuk",
    angka: "100",
  },
  {
    icon: (
      <TbReportMoney
        className="w-full text-sky-300 dark:text-sky-400"
        size={60}
      />
    ),
    label: "Transaksi",
    angka: "100",
  },
  {
    icon: (
      <FaDonate className="w-full text-sky-300 dark:text-sky-400" size={60} />
    ),
    label: "Donasi",
    angka: "Rp 8.000.000",
  },
  {
    icon: (
      <FaPeopleCarryBox
        className="w-full text-sky-300 dark:text-sky-400"
        size={60}
      />
    ),
    label: "CSR, GMO, Vendor",
    angka: "100",
  },
  {
    icon: (
      <MdModelTraining
        className="w-full text-sky-300 dark:text-sky-400"
        size={60}
      />
    ),
    label: "HII Pelatihan",
    angka: "100",
  },
  {
    icon: (
      <RxActivityLog
        className="w-full text-sky-300 dark:text-sky-400"
        size={60}
      />
    ),
    label: "Kerelawanan",
    angka: "100",
  },
  {
    icon: <FaSwatchbook className="w-full text-sky-300" size={60} />,
    label: "Buku",
    angka: "100",
  },
  {
    icon: (
      <MdWorkHistory
        className="w-full text-sky-300 dark:text-sky-400"
        size={60}
      />
    ),
    label: "Pengajuan Bantuan",
    angka: "100",
  },
];

interface joinProject {
  image: string;
  nama: string;
  tipe: string;
  deskripsi: string;
  donasi: number;
  goals: number;
  dukungan: string;
}

export const joinProject = [
  {
    image: "/donate1.jpeg",
    nama: "Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia",
    tipe: "Children",
    deskrispi:
      "Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.",
    donasi: "500000",
    goals: "15.000.000",
    dukungan: "48",
  },
  {
    image: "/donate2.jpeg",
    nama: "Donasi Peduli Yatim & Duafa",
    tipe: "Empowerment",
    deskrispi:
      "Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.",
    donasi: "500000",
    goals: "15.000.000",
    dukungan: "48",
  },
  {
    image: "/donate3.jpeg",
    nama: "Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia",
    tipe: "Disaster",
    deskrispi:
      "Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.",
    donasi: "500000",
    goals: "15.000.000",
    dukungan: "48",
  },
  {
    image: "/donate4.jpeg",
    nama: "Bangun Jembatan Desa untuk Wilayah Pelosok Negeri",
    tipe: "Infrastruktur",
    deskrispi:
      "Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.",
    donasi: "500000",
    goals: "15.000.000",
    dukungan: "48",
  },
];

interface collectionPublic {
  image: string;
  name: string;
  deskripsi: string;
  price: string;
  bintang: string;
  views: string;
  diskon: string;
  type: string;
}

export const collectionPublic = [
  {
    image: "/cover-arab-2022 (2).png",
    name: "2022 (Arab)",
    deskripsi: "2022 (Arab)",
    price: "0",
    bintang: "5",
    view: "297",
    diskon: "0",
    type: "annual",
  },
  {
    image: "/3315-WhatsApp Image 2024-03-18 at 13.01.07.jpeg",
    name: "HI 2022 - Audited",
    deskripsi: "HI 2022 - Audited",
    price: "0",
    bintang: "5",
    view: "297",
    diskon: "35.000",
    type: "financial",
  },
  {
    image: "/cover-arab-2022 (1).png",
    name: "2022 (English)",
    deskripsi: "2022 (English)",
    price: "0",
    bintang: "5",
    view: "297",
    diskon: "35.000",
    type: "annual",
  },
  {
    image: "/3315-WhatsApp Image 2024-03-18 at 13.01.07.jpeg",
    name: "HI 2021 - Audited",
    deskripsi: "HI 2021 - Audited",
    price: "0",
    bintang: "5",
    view: "90",
    diskon: "0",
    type: "financial",
  },
  {
    image: "/cover-arab-2022 (1).png",
    name: "2022 (Indonesia)",
    deskripsi: "2022 (Indonesia)",
    price: "0",
    bintang: "5",
    view: "71",
    diskon: "0",
    type: "annual",
  },
  {
    image: "/3327-COVER.png",
    name: "HI 2020 - Audited",
    deskripsi: "HI 2020 - Audited",
    price: "0",
    bintang: "5",
    view: "71",
    diskon: "0",
    type: "financial",
  },
  {
    image: "/cover-arab-2022 (1).jpg",
    name: "2021 (English)",
    deskripsi: "2021 (English)",
    price: "0",
    bintang: "5",
    view: "71",
    diskon: "0",
    type: "annual",
  },
  {
    image: "/cover-arab-2022 (3).png",
    name: "Humanitarian Report 2019",
    deskripsi: "Humanitarian Report 2019",
    price: "0",
    bintang: "5",
    view: "71",
    diskon: "0",
    type: "learning",
  },
];

interface publicDonate {
  image: string;
  name: string;
  price: string;
  urldonate: string;
}

export const publicDonate = [
  {
    image: "/donate1.jpeg",
    name: "Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia",
    price: "323.942.800",
    urldonate: "donate",
  },
  {
    image: "/donate2.jpeg",
    name: "Donasi Peduli Yatim & Duafa",
    price: "254.746.463",
    urldonate: "donate",
  },
  {
    image: "/donate3.jpeg",
    name: "Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia",
    price: "19.853.371",
    urldonate: "donate",
  },
  {
    image: "/donate4.jpeg",
    name: "Bangun Jembatan Desa untuk Wilayah Pelosok Negeri",
    price: "245.004.691",
    urldonate: "donate",
  },
];

interface rightHolders {
  name: string;
  url: string;
  description: string;
  tanggal: string;
}

export const rightHolders = [
  {
    name: "Form Pendaftaran Bantuan Sarana Usaha - Semarang",
    url: "/joinourmovement/rightholders",
    description:
      "Bantuan sarana usaha oleh Human Initiative adalah program yang bertujuan untuk meningkatkan perekonomian masyarakat melalui dukungan terhadap usaha kecil dan menengah (UKM).",
  },
  {
    name: "Form Pendaftaran Masjid",
    url: "/joinourmovement/rightholders",
    description: "",
  },
  {
    name: "Form Pendaftaran Kelas",
    url: "/joinourmevement/rightholders",
    description: "",
  },
  {
    name: "Form Pengajuan Program Bangun Industri Desa",
    url: "/rightholders",
    description:
      "Program Bangun Industri Desa (BID) Human Initiative bertujuan untuk meningkatkan kesejahteraan masyarakat desa melalui pengembangan dan pemberdayaan potensi ekonomi lokal.",
  },
];

interface programCSR {
  image: string;
  name: string;
  price: string;
  urldonate: string;
}

export const programCSR = [
  {
    image: "/donate1.jpeg",
    name: "Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia",
    price: "323.942.800",
    urldonate: "donate",
  },
  {
    image: "/donate2.jpeg",
    name: "Donasi Peduli Yatim & Duafa",
    price: "254.746.463",
    urldonate: "donate",
  },
  {
    image: "/donate3.jpeg",
    name: "Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia",
    price: "19.853.371",
    urldonate: "donate",
  },
  {
    image: "/donate4.jpeg",
    name: "Bangun Jembatan Desa untuk Wilayah Pelosok Negeri",
    price: "245.004.691",
    urldonate: "donate",
  },
];

interface newsHome {
  image: string;
  name: string;
  price: string;
  urlnews: string;
}

export const newsHome = [
  {
    image: "/imagejoin1.png",
    tanggal: "6 Januari 2024",
    name: "Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia",
    deskripsi: "Berbagi al-quran ke pelosok indonesia",
    urlnews: "/newsandstories",
  },
  {
    image: "/imagejoin2.png",
    tanggal: "4 Februari 2024",
    name: "Donasi Peduli Yatim & Duafa",
    deskripsi: "Donasi kepada yatim dan dhuafa",
    urlnews: "/newsandstories",
  },
  {
    image: "/imagejoin3.png",
    tanggal: "11 Februari 2024",
    name: "Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia",
    deskripsi:
      "Bantuan renovasi sekolah untuk wilayah wilayah terpencil di indonesia ",
    urlnews: "/newsandstories",
  },
  {
    image: "/imagejoin4.png",
    tanggal: "21 April 2024",
    name: "Bangun Jembatan Desa untuk Wilayah Pelosok Negeri",
    deskripsi: "Bangun Jembatan desa",
    urlnews: "/newsandstories",
  },
];

interface projectNewCSR {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
}

export const projectNewCSR = [
  {
    description: "Berbagi Al-Quran",
    title: "Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia",
    src: "/donate1.jpeg",
    ctaText: "Lihat",
    ctaLink: "/collaborationimpact",
    content: () => {
      return (
        <p>
          Hadiahkan Al-Quran untuk para Tahfidz di Pelosok Sebagai negara dengan
          mayoritas muslim pertama di dunia, kebutuhan Alquran layak menjadi
          sangat penting. Karena kita tahu bahwa Alquran merupakan pedoman hidup
          bagi seorang muslim. Akan tetapi banyak warga di daerah pelosok
          Indonesia belum terfasilitasi Alquran layak. Salah satu faktornya
          adalah keterbatasan ekonomi yang dihadapi warga di daerah pelosok
          sehingga mereka sering kali harus memprioritaskan kebutuhan pokoknya
          lebih dulu, dan terpaksa menahannya untuk membeli Alquran.
        </p>
      );
    },
  },
  {
    description: "Donasi Peduli",
    title: "Donasi Peduli Yatim & Duafa",
    src: "/donate2.jpeg",
    ctaText: "Lihat",
    ctaLink: "/collaborationimpact",
    content: () => {
      return (
        <p>
          Donasi Peduli Yatim dan Duafa Anak-anak yatim dan duafa di Indonesia
          yang hidup dalam keterbatasan sosial ekonomi masih sangat membutuhkan
          bantuan kita. Bukan hanya bantuan tunai, tetapi mereka membutuhkan
          bantuan penghidupan dan pendidikan yang layak Bagaimana pun mereka
          berhak mendapatkan hak-haknya sebagai seorang anak. Meskipun orang
          tuanya mempunyai keterbatas dan tidak dapat memberikan hak sepenuhnya.
          Maka kita yang memiliki keluasan finansial berkewajiban membantu
          mereka.
        </p>
      );
    },
  },

  {
    description: "Bantu Renovasi Sekolah",
    title: "Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia",
    src: "/donate3.jpeg",
    ctaText: "Lihat",
    ctaLink: "/collaborationimpact",
    content: () => {
      return (
        <p>
          Wujudkan Sekolah Layak di Desa Pelosok Indonesia Bersekolah di tempat
          yang layak adalah impian semua siswa, termasuk mereka yang tinggal di
          wilayah Pelosok Indonesia. Karena ketersediaan sekolah layak dan
          fasilitas yang lengkap dapat membantu meningkatkan kualitas
          Pendidikan. Namun sayangnya, masih banyak siswa di pelosok Indonesia
          yang harus menimba ilmu di tempat yang hanya terbangun dari papan
          kayu, serta fasilitas belajarnya sudah rapuh dan lapuk. Seperti salah
          satu kisah sekolah di wilayah Takengon, Kabupaten Aceh Tengah yang
          hanya terbangun dari papan kayu dan bangunannya hanya setengah badan.
          Sekolah ini memiliki enam kelas dan satu ruang guru yang beratap seng.
          Sehingga ketika siang hari para siswa kepanasan, dan bila hujan mereka
          juga kebahasan.
        </p>
      );
    },
  },
  {
    description: "Bangun Jembatan",
    title: "Bangun Jembatan Desa untuk Wilayah Pelosok Negeri",
    src: "/donate4.jpeg",
    ctaText: "Lihat",
    ctaLink: "/collaborationimpact",
    content: () => {
      return (
        <p>
          Bangun Jembatan Desa untuk Wilayah Pelosok Negeri Hujan deras yang
          melanda Desa Lengkong, Kabupaten Sukabumi, Indonesia menyebabkan
          sungai meluap dan arusnya deras sehingga mengakibatkan jembatan putus.
          Jembatan ini merupakan akses utama masyarakat untuk melakukan
          aktivitas sosial ekonomi. Jembatan yang putus tersebut memiliki
          panjang 80 meter, dan merupakan satu-satunya akses yang menghubungkan
          empat desa, yaitu Desa Bantarsari, Desa Bantarpanjang, Desa Sirnasari,
          dan Desa Lengkong. Meskipun jembatan putus, warga terpaksa tetap
          melewati jembatan ini meskipun sangat berbahaya bagi nyawa mereka.
        </p>
      );
    },
  },
];

interface career {
  title: string;
  negara: string;
  kota: string;
  tipe: string;
  jobdescription: string;
  requirements: string;
}

export const career = [
  {
    title: "Institutional & Program Officer",
    negara: "Indonesia",
    kota: "Daerah Istimewa Yogyakarta",
    tipe: "Kontrak",
    jobdescription:
      "Menjalankan aktivitas partnership sesuai arahan organisasi,Melaksanakan sosialisasi brand Human Initiative,Mencapai target penghimpunan institusional yang ditetapkan,Melakukan profiling pada perusahaan,Melakukan evaluasi dan maintenance kepada donator institusional,Melakukan mapping dan kunjungan,Menyampaikan laporan implementasi program ke Donor,Aktif dalam berkomunikasi dengan donor,Melakukan ekspansi donor dan terdapat retensi donasi dari donor,Terlibat dalam event CSR,Menginput donasi dan membuat IPP di system",
    requirements: 
      "Pendidikan minimal S1 semua jurusan,Memiliki pengalaman minimal 1 tahun sebagai marketer di dunia NGO,Memiliki kemampuan menggunakan Ms. Office dan presentasi yang baik.,Memiliki pengetahuan teknik marketing yang baik.,Memahami isu dunia kemanusian dan terampil dalam membuat proposal program.,Mampu mengendarai motor lebih disukai,Memiliki semangat untuk memberdayakan, berkolaborasi dan amanah.",
  },
];

// data/data.tsx

// Tempat untuk menyimpan data
export const savedData: { [key: string]: string }[] = [];

// Fungsi untuk menyimpan data baru
export const saveFormData = (newData: { [key: string]: string }) => {
  savedData.push(newData);
  console.log('Data saved successfully:', savedData);
};
