export const gdgCollegeRegions = [
  "Kolkata Metropolitan Area",
  "Howrah & Hooghly",
  "Kalyani & Nadia",
  "Paschim Bardhaman",
  "North Bengal",
] as const;

export type GdgCollegeRegion = (typeof gdgCollegeRegions)[number];

export type GdgCollege = {
  name: string;
  shortName: string;
  region: GdgCollegeRegion;
  location: string;
  gdgUrl: string;
  verification: string;
};

export const gdgColleges = [
  {
    "name": "B. P. Poddar Institute of Management and Technology",
    "shortName": "BPPIMT",
    "region": "Kolkata Metropolitan Area",
    "location": "Kolkata, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-b-p-poddar-institute-of-management-and-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Budge Budge Institute of Technology",
    "shortName": "BBIT",
    "region": "Kolkata Metropolitan Area",
    "location": "Nischintapur, Budge Budge, Kolkata, West Bengal 700137",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-budge-budge-institute-of-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Future Institute of Engineering & Management",
    "shortName": "FIEM",
    "region": "Kolkata Metropolitan Area",
    "location": "Sonarpur Station Road, Rajpur Sonarpur, West Bengal 700150",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-future-institute-of-engineering-management-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Government College of Engineering and Ceramic Technology",
    "shortName": "GCECT",
    "region": "Kolkata Metropolitan Area",
    "location": "73 Abinash Chandra Banerjee Lane, Beleghata, Kolkata, West Bengal 700010",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-government-college-of-engineering-and-ceramic-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Government College of Engineering and Leather Technology",
    "shortName": "GCELT",
    "region": "Kolkata Metropolitan Area",
    "location": "Eastern Metropolitan Bypass, Kolkata, West Bengal 700106",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-government-college-of-engineering-and-leather-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Guru Nanak Institute of Technology",
    "shortName": "GNIT",
    "region": "Kolkata Metropolitan Area",
    "location": "Kolkata Metropolitan Area, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-guru-nanak-institute-of-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Heritage Institute of Technology",
    "shortName": "HITK",
    "region": "Kolkata Metropolitan Area",
    "location": "Anandapur Road, Kolkata, West Bengal 700107",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-heritage-institute-of-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Institute of Engineering & Management",
    "shortName": "IEM",
    "region": "Kolkata Metropolitan Area",
    "location": "College More, Salt Lake Sector V, Kolkata, West Bengal 700091",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-institute-of-engineering-management-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "JIS University",
    "shortName": "JISU",
    "region": "Kolkata Metropolitan Area",
    "location": "81 Nilgunj Road, Kolkata, West Bengal 700109",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-jis-university-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Meghnad Saha Institute of Technology",
    "shortName": "MSIT",
    "region": "Kolkata Metropolitan Area",
    "location": "Anandapur Road, Kolkata, West Bengal 700150",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-meghnad-saha-institute-of-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Narula Institute of Technology",
    "shortName": "NiT",
    "region": "Kolkata Metropolitan Area",
    "location": "81 Nilgunj Road, Agarpara, West Bengal 700109",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-narula-institute-of-technology-agarpara-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Netaji Subhash Engineering College",
    "shortName": "NSEC",
    "region": "Kolkata Metropolitan Area",
    "location": "Kolkata, West Bengal",
    "gdgUrl": "https://gdg.community.dev/v0/gdg-on-campus-netaji-subhash-engineering-college-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "RCC Institute of Information Technology",
    "shortName": "RCCIIT",
    "region": "Kolkata Metropolitan Area",
    "location": "Canal South Road, Kolkata, West Bengal 700015",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-rcc-institute-of-information-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Sister Nivedita University",
    "shortName": "SNU",
    "region": "Kolkata Metropolitan Area",
    "location": "New Town, Kolkata, West Bengal 700156",
    "gdgUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-sister-nivedita-university-kolkata-india-presents-welcome-to-gdg-on-campus-freshers-tech-orientation/",
    "verification": "Recent official GDG on Campus event page"
  },
  {
    "name": "St. Thomas' College of Engineering & Technology",
    "shortName": "STCET",
    "region": "Kolkata Metropolitan Area",
    "location": "4 Diamond Harbour Road, Kolkata, West Bengal 700023",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-st-thomas-college-of-engineering-technology-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Techno India University",
    "shortName": "TIU",
    "region": "Kolkata Metropolitan Area",
    "location": "EM-4, Sector V, Salt Lake, Kolkata, West Bengal 700091",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-techno-india-university-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Techno Main Salt Lake",
    "shortName": "TMSL",
    "region": "Kolkata Metropolitan Area",
    "location": "EM-4/1, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-techno-main-salt-lake-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "University of Engineering & Management, Kolkata",
    "shortName": "UEM Kolkata",
    "region": "Kolkata Metropolitan Area",
    "location": "B/5 New Town Road, New Town, West Bengal 743502",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-university-of-engineering-management-kolkata-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Indian Institute of Engineering Science and Technology, Shibpur",
    "shortName": "IIEST Shibpur",
    "region": "Howrah & Hooghly",
    "location": "Shibpur, Howrah, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-indian-institute-of-engineering-science-and-technology-shibpur-howrah-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "MCKV Institute of Engineering",
    "shortName": "MCKVIE",
    "region": "Howrah & Hooghly",
    "location": "243 G. T. Road North, Liluah, Howrah, West Bengal 711204",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-mckv-institute-of-engineering-howrah-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Academy of Technology",
    "shortName": "AOT",
    "region": "Howrah & Hooghly",
    "location": "Grand Trunk Road, Adisaptagram, Hooghly, West Bengal 712121",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-academy-of-technology-hooghly-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Hooghly Engineering & Technology College",
    "shortName": "HETC",
    "region": "Howrah & Hooghly",
    "location": "Vivekananda Road, Chinsurah, Hooghly, West Bengal 712103",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-hooghly-engineering-technology-college-chinsurah-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Indian Institute of Information Technology Kalyani",
    "shortName": "IIIT Kalyani",
    "region": "Kalyani & Nadia",
    "location": "Kalyani, Nadia, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-kalyani-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Kalyani Government Engineering College",
    "shortName": "KGEC",
    "region": "Kalyani & Nadia",
    "location": "Kalyani, Nadia, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-kalyani-government-engineering-college-kalyani-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Maulana Abul Kalam Azad University of Technology, West Bengal",
    "shortName": "MAKAUT",
    "region": "Kalyani & Nadia",
    "location": "NH-12, Haringhata Farm, Nadia, West Bengal 741249",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-maulana-abul-kalam-azad-university-of-technology-kalyani-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Asansol Engineering College",
    "shortName": "AEC",
    "region": "Paschim Bardhaman",
    "location": "Asansol, West Bengal 713305",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-asansol-engineering-college-asansol-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Bengal College of Engineering and Technology",
    "shortName": "BCET",
    "region": "Paschim Bardhaman",
    "location": "Sahid Sukumar Banerjee Sarani, Bidhannagar, Durgapur, West Bengal 713212",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-bengal-college-of-engineering-and-technology-durgapur-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Dr. B. C. Roy Engineering College",
    "shortName": "BCREC",
    "region": "Paschim Bardhaman",
    "location": "Durgapur, West Bengal",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-dr-bc-roy-engineering-college-durgapur-india/",
    "verification": "Official GDG chapter page"
  },
  {
    "name": "Jalpaiguri Government Engineering College",
    "shortName": "JGEC",
    "region": "North Bengal",
    "location": "Jalpaiguri, West Bengal 735102",
    "gdgUrl": "https://gdg.community.dev/gdg-on-campus-jalpaiguri-government-engineering-college-jalpaiguri-india/",
    "verification": "Official GDG chapter page"
  }
] as const satisfies readonly GdgCollege[];

export const gdgDirectoryVerifiedOn = "29 September 2026";

export function getCollegeMapsUrl(college: GdgCollege) {
  const query = encodeURIComponent(`${college.name}, ${college.location}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
