import { Mentor } from './types';

export const ALL_PARTNERS = [
  { "name": "RiTECHS", "url": "https://ritechs.org/" },
  { "name": "United International University", "url": "https://www.uiu.ac.bd/" },
  { "name": "Fordham University", "url": "https://www.fordham.edu/" },
  { "name": "University of Science and Technology", "url": "https://ust.edu/" },
  { "name": "University of Wolverhampton", "url": "https://www.wlv.ac.uk/" },
  { "name": "Al-Ahgaff University", "url": "http://en.ahgaff.edu/" },
  { "name": "Cyber Quarter", "url": "https://www.cyberquarter.co.uk/" },
  { "name": "University of Asia Pacific", "url": "https://www.uap-bd.edu/" },
  { "name": "Birmingham City University (BCU)", "url": "https://www.bcu.ac.uk/" },
  { "name": "Cyber Security and Applications (ScienceDirect)", "url": "https://www.sciencedirect.com/journal/cyber-security-and-applications" },
  { "name": "Cardiff University", "url": "https://www.cardiff.ac.uk/" },
  { "name": "Cardiff Metropolitan University", "url": "https://www.cardiffmet.ac.uk/" },
  { "name": "Ajman University", "url": "https://www.ajman.ac.ae/" },
  { "name": "JJCET", "url": "https://jjcet.ac.in/" },
  { "name": "KSR College of Engineering", "url": "https://ksrce.ac.in/" },
  { "name": "University of Worcester", "url": "https://www.worcester.ac.uk/" },
  { "name": "King Saud University", "url": "https://ksu.edu.sa/en" },
  { "name": "Springer", "url": "https://www.springer.com/" },
  { "name": "Aston University", "url": "https://www.aston.ac.uk/" },
  { "name": "BRAC University", "url": "https://bu.ac.bd/" },
  { "name": "University of Galway", "url": "https://www.universityofgalway.ie/" },
  { "name": "University of Genoa", "url": "https://unige.it/en" },
  { "name": "Jahangirnagar University of Science & Technology", "url": "https://just.edu.bd/" },
  { "name": "Uttara University", "url": "https://uttarauniversity.edu.bd/" },
  { "name": "Airfield Security", "url": "https://www.airfieldsecurity.it/" },
  { "name": "Babcock University", "url": "https://babcock.edu.ng/" },
  { "name": "Sycom Solutions", "url": "https://sycomsolutions.com/" }
];

// Raw source members from the website
const RAW_MEMBERS = [
  {"id": 622, "name": "LUHUR BAYUAJI", "type": "mentor", "title": "Assistant Professor", "affiliation": "Universiti Malaysia Pahang", "location": "Malaysia", "specializations": [], "featured": true},
  {"id": 14, "name": "Md Arafatur Rahman", "type": "mentor", "title": "Assistant Professor", "affiliation": "University of Wolverhampton", "location": "UK", "specializations": ["Cognitive Radio Networks", "IoT", "Machine learning", "Wireless networks"], "featured": true},
  {"id": 608, "name": "Gabriel Gomes de Oliveira", "type": "mentor", "title": "Research", "affiliation": "UNICAMP", "location": "Brazil", "specializations": [], "featured": true},
  {"id": 472, "name": "Prof. Dr. Md. Rafiqul Islam", "type": "mentor", "title": "Professor", "affiliation": "International Islamic University", "location": "Gombak, Malaysia", "specializations": [], "featured": true},
  {"id": 412, "name": "Dr. AKM Asif Iqbal", "type": "mentor", "title": "Assistant Professor", "affiliation": "KUAS Engineering", "location": "Kyoto, Japan", "specializations": [], "featured": true},
  {"id": 159, "name": "Dr Taha Hussein Rassem", "type": "mentor", "title": "Bournemouth University Faculty", "affiliation": "Bournemouth University", "location": "Bournemouth, UK", "specializations": [], "featured": true},
  {"id": 614, "name": "Mohammed Falah Mohammed", "type": "mentor", "title": "Lecturer", "affiliation": "Nawroz University", "location": "Duhok, Iraq", "specializations": [], "featured": true},
  {"id": 34, "name": "Md Zakirul Alam Bhuiyan", "type": "mentor", "title": "Assistant Professor", "affiliation": "Fordham University", "location": "NY, USA", "specializations": [], "featured": true},
  {"id": 626, "name": "Shah Samiur Rashid", "type": "mentor", "title": "Associate Professor", "affiliation": "University of Science and Technology Chittagong (USTC)", "location": "Chittagong, Bangladesh", "specializations": [], "featured": true},
  {"id": 530, "name": "Dr. Nader Sohrabi Safa", "type": "mentor", "title": "Assistant Professor", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": [], "featured": true},
  {"id": 475, "name": "Prof. Dr. Prashant Pillai", "type": "mentor", "title": "Professor", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": [], "featured": true},
  {"id": 473, "name": "ARIF REZA ANWARY", "type": "mentor", "title": "Research Associate (Data Scientist)", "affiliation": "Edinburgh Napier University", "location": "Edinburgh, Scotland", "specializations": [], "featured": true},
  {"id": 410, "name": "Prof. Ts. Dr. Mustafizur Rahman", "type": "mentor", "title": "Professor", "affiliation": "Universiti Malaysia Pahang", "location": "Kuantan, Pahang, Malaysia", "specializations": [], "featured": true},
  {"id": 30, "name": "ABDULRAHMAN AHMED MOHAMMED ALSEWARI", "type": "mentor", "title": "Senior Lecturer (Associate Professor)", "affiliation": "Birmingham City University", "location": "UK", "specializations": [], "featured": true},
  {"id": 695, "name": "Tin T. Dang", "type": "mentor", "title": "Dean, Faculty of Foreign Languages", "affiliation": "Ho Chi Minh City University of Technology and Education", "location": "Ho Chi Minh City", "specializations": [], "featured": true},
  {"id": 639, "name": "Bernardi Pranggono", "type": "mentor", "title": "Associate Professor", "affiliation": "Anglia Ruskin University", "location": "UK", "specializations": ["Green ICT", "Cybersecurity", "IoT"], "featured": true},
  {"id": 476, "name": "shavan", "type": "mentor", "title": "Associate Professor", "affiliation": "IEEE Benelux", "location": "Belgium", "specializations": [], "featured": true},
  {"id": 692, "name": "Md Asiful Islam", "type": "mentor", "title": "Lecturer in Biomedical Science", "affiliation": "University of Wolverhampton", "location": "United Kingdom", "specializations": [], "featured": true},
  {"id": 674, "name": "Muhammad Ajmal Azad", "type": "mentor", "title": "Senior Lecturer", "affiliation": "Birmingham City University", "location": "Birmingham", "specializations": ["Cybersecurity", "IoT", "Machine learning", "Data Science"], "featured": true},
  {"id": 623, "name": "Dr. Kazi Shahdat Kabir", "type": "mentor", "title": "Professor", "affiliation": "Northern University Bangladesh", "location": "Dhaka", "specializations": [], "featured": true},
  {"id": 353, "name": "Dr. Farhat Anwar", "type": "mentor", "title": "Professor", "affiliation": "International Islamic University", "location": "Gombak, Malaysia", "specializations": [], "featured": true},
  {"id": 413, "name": "Prof. Dr. Md Saiful Azad", "type": "mentor", "title": "Professor", "affiliation": "Green University of Bangladesh", "location": "Dhaka, Bangladesh", "specializations": [], "featured": true},
  {"id": 612, "name": "Kamal Zuhairi Zamli", "type": "mentor", "title": "Professor", "affiliation": "Universiti Malaysia Pahang", "location": "Pekan, Malaysia", "specializations": [], "featured": true},
  {"id": 166, "name": "Hussein Mohammed Abu Al-Rejal", "type": "mentor", "title": "Senior Lecturer", "affiliation": "Universiti Utara Malaysia", "location": "Malaysia", "specializations": [], "featured": true},
  {"id": 470, "name": "Dr. Mueen Uddin", "type": "mentor", "title": "Assistant Professor", "affiliation": "Universiti Brunei Darussalam", "location": "Brunei Darussalam", "specializations": [], "featured": true},
  {"id": 478, "name": "Dr. Sazzad Hussain", "type": "mentor", "title": "Data Scientist", "affiliation": "Department of Customer Service, NSW", "location": "Sydney, Australia", "specializations": [], "featured": true},
  {"id": 205, "name": "Dr. Nour Moustafa", "type": "mentor", "title": "Senior Lecturer", "affiliation": "The University of New South Wales", "location": "Canberra, Australia", "specializations": [], "featured": true},
  {"id": 453, "name": "Lakhveer Singh", "type": "mentor", "title": "Associate Professor", "affiliation": "SRM University-AP", "location": "Vijayawada", "specializations": ["Bioreactors", "Bio-energy", "Bioelectrochemical systems", "Electro catalyst", "Nano materials"], "featured": true},
  {"id": 467, "name": "Mohammed N. Patwary", "type": "mentor", "title": "Professor", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": [], "featured": true},
  {"id": 606, "name": "TAO HAI", "type": "mentor", "title": "PhD", "affiliation": "Baoji University of Arts and Sciences", "location": "China", "specializations": [], "featured": true},
  {"id": 625, "name": "Hossain M. Zabed", "type": "mentor", "title": "Professor", "affiliation": "Jiangsu University", "location": "Zhenjiang, China", "specializations": ["Protein and metabolic engineering", "Bio-energy", "Biocatalysis"], "featured": true},
  {"id": 10, "name": "Dr. A. Taufiq Asyhari", "type": "mentor", "title": "Associate Professor", "affiliation": "Birmingham City University", "location": "Birmingham, UK", "specializations": ["Fundamental information theory", "Wireless networks", "IoT", "Machine learning", "Smart systems", "Cybersecurity"], "featured": true},
  {"id": 409, "name": "Dr. Abu Yousuf", "type": "mentor", "title": "Professor", "affiliation": "Shahjalal University of Science and Technology", "location": "Sylhet, Bangladesh", "specializations": [], "featured": true},
  {"id": 638, "name": "Mohammed Atiquzzaman", "type": "mentor", "title": "Professor", "affiliation": "University of Oklahoma", "location": "Norman, Oklahoma, USA", "specializations": [], "featured": true},
  {"id": 499, "name": "Dr. Md Ashaduzzaman", "type": "mentor", "title": "Post Doctoral Fellow", "affiliation": "University of Naples Federico II", "location": "Naples, Italy", "specializations": [], "featured": true},
  {"id": 28, "name": "Jasim Uddin", "type": "mentor", "title": "Lecturer in Electronics", "affiliation": "Cardiff University", "location": "Cardiff, UK", "specializations": ["Analog IC Design", "Electromagnetics", "RF and Microwave Engineering"], "featured": true},
  {"id": 747, "name": "Jasim", "type": "mentor", "title": "Industrial Researcher", "affiliation": "Bangladesh Civil Service", "location": "Dhaka, Bangladesh", "specializations": [], "featured": true},
  {"id": 637, "name": "Ramesh Nath Premnath", "type": "mentor", "title": "Editor Applied Sciences", "affiliation": "Springer Singapore", "location": "Singapore", "specializations": [], "featured": true},
  {"id": 37, "name": "Nadia Refat", "type": "mentor", "title": "Director", "affiliation": "—", "location": "Wolverhampton, West Midlands", "specializations": [], "featured": true},
  {"id": 611, "name": "Tahmina Yasmin", "type": "mentor", "title": "Research Fellow", "affiliation": "University of Birmingham", "location": "UK", "specializations": [], "featured": true},
  {"id": 696, "name": "Gurpinder Singh Lalli", "type": "mentor", "title": "Dr", "affiliation": "University of Wolverhampton", "location": "Walsall, UK", "specializations": [], "featured": true},
  {"id": 748, "name": "Emma", "type": "mentor", "title": "Industrial Researcher", "affiliation": "University of Wolverhampton", "location": "United Kingdom", "specializations": [], "featured": true},

  // Simple entries starting – both mentors & mentees
  {"id": 8, "name": "S M Nazmus Sadat", "type": "mentor", "affiliation": "Universiti Malaysia Pahang", "location": "Kuantan, Malaysia", "specializations": ["Data Science"]},
  {"id": 11, "name": "M. SAEF ULLAH MIAH", "type": "mentor", "affiliation": "Universiti Malaysia Pahang", "location": "Malaysia", "specializations": ["Machine learning", "Data mining", "Data Science", "Database", "IoT", "Scraping"]},
  {"id": 15, "name": "Nafees Bin Zaman", "type": "mentee", "affiliation": "Universitat de Girona", "location": "Spain", "specializations": ["Computational Geometry", "Distributed Systems"]},
  {"id": 24, "name": "Nazmus Sakib Bin Khair", "type": "mentee", "affiliation": "Brac University", "location": "Dhaka, Bangladesh", "specializations": ["Wireless Sensor Networks"]},
  {"id": 25, "name": "Saydul Akbar Murad", "type": "mentee", "affiliation": "United International University", "location": "Dhaka, Bangladesh", "specializations": ["Applied NLP"]},
  {"id": 27, "name": "Md Shamimul Islam", "type": "mentee", "affiliation": "University of Dhaka", "location": "Dhaka, Bangladesh", "specializations": ["Cyber Threat intelligence"]},
  {"id": 31, "name": "N H M Arafat", "type": "mentee", "affiliation": "Henan Polytechnic University", "location": "China", "specializations": ["Material engineering"]},
  {"id": 44, "name": "Abdur Rahman Emon", "type": "mentee", "affiliation": "Universiti Malaysia Pahang", "location": "Malaysia", "specializations": ["Automotive engineering"]},
  {"id": 47, "name": "Sabbir Shikder Orid", "type": "mentee", "affiliation": "Green University", "location": "Dhaka, Bangladesh", "specializations": ["Embedded firmware"]},
  {"id": 49, "name": "Muhammad Kamran Naeem", "type": "mentor", "affiliation": "University of Wolverhampton", "location": "UK", "specializations": ["Communication Networks"]},
  {"id": 50, "name": "Habiba", "type": "mentee", "affiliation": "University of Dhaka", "location": "Dhaka", "specializations": ["Data Privacy"]},
  {"id": 55, "name": "S. M. Raihan Gafur", "type": "mentee", "affiliation": "Wolverhampton", "location": "UK", "specializations": ["Information Security"]},
  {"id": 57, "name": "Faiaz Ben Reza", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["E-health Telemetry"]},
  {"id": 58, "name": "Samiha Hossain", "type": "mentor", "affiliation": "Ahsanullah University", "location": "Bangladesh", "specializations": ["Wireless Networks"]},
  {"id": 60, "name": "Sumaiya Sultana", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Neural Networks"]},
  {"id": 63, "name": "Rakib Hossain Ivan", "type": "mentee", "affiliation": "IUB", "location": "Bangladesh", "specializations": ["Digital Forensics"]},
  {"id": 64, "name": "Tazdik Hossain", "type": "mentee", "affiliation": "KUET", "location": "Khulna, Bangladesh", "specializations": ["Edge Processing"]},
  {"id": 65, "name": "nadim hossain", "type": "mentee", "affiliation": "RUET", "location": "Rajshahi", "specializations": ["Machine learning"]},
  {"id": 66, "name": "Khandaker Raiyan Rahman", "type": "mentee", "affiliation": "SUST", "location": "Sylhet", "specializations": ["Network Slicing"]},
  {"id": 67, "name": "Debashish Dey", "type": "mentee", "affiliation": "CUET", "location": "Chittagong", "specializations": ["Blockchain ledgers"]},
  {"id": 68, "name": "Sayeed Hasan", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Applied Data mining"]},
  {"id": 69, "name": "Faieq Hamim", "type": "mentee", "affiliation": "—", "location": "Dhaka, Bangladesh", "specializations": ["Natural Language Processing"]},
  {"id": 70, "name": "Sanjida Hoque", "type": "mentee", "affiliation": "UAP", "location": "Dhaka, Bangladesh", "specializations": ["Sovereign Infrastructure"]},
  {"id": 72, "name": "Adnan Sami", "type": "mentee", "affiliation": "KUAS", "location": "Kyoto, Japan", "specializations": ["Computer Vision"]},
  {"id": 73, "name": "Rahatul Ashekin Ashik", "type": "mentee", "affiliation": "IUT", "location": "Gazipur", "specializations": ["Software Systems"]},
  {"id": 74, "name": "Arnab Das", "type": "mentee", "affiliation": "MIST", "location": "Dhaka", "specializations": ["Cybersecurity Operations"]},
  {"id": 75, "name": "Khandokar Shadman Shayer", "type": "mentee", "affiliation": "NSU", "location": "Bangladesh", "specializations": ["Machine learning"]},
  {"id": 76, "name": "Neamul Ibne Monir Rahim", "type": "mentee", "affiliation": "KUET", "location": "Khulna, Bangladesh", "specializations": ["Signal processing"]},
  {"id": 77, "name": "Jannatuil Ferdouse Jannat", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Bio-Informatics"]},
  {"id": 78, "name": "Anik Sarkar", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Deep Neural Networks"]},
  {"id": 79, "name": "ABU JUNAED MOHD ASIF", "type": "mentee", "affiliation": "UMP", "location": "Pahang, Malaysia", "specializations": ["P2P Computing"]},
  {"id": 80, "name": "Paul Rinika", "type": "mentee", "affiliation": "Cardiff", "location": "Wales", "specializations": ["IoT Sensors"]},
  {"id": 81, "name": "Rahman Md.Tahsinur", "type": "mentee", "affiliation": "Birmingham City University", "location": "UK", "specializations": ["Network Architecture"]},
  {"id": 82, "name": "Md. Abu Zehad Foysal", "type": "mentee", "affiliation": "UHW", "location": "United Kingdom", "specializations": ["Zero-Trust Systems"]},
  {"id": 83, "name": "Atanu Das", "type": "mentee", "affiliation": "SUST", "location": "Bangladesh", "specializations": ["Applied Mathematics"]},
  {"id": 86, "name": "Saiydur Rahman", "type": "mentee", "affiliation": "Nawroz University", "location": "Iraq", "specializations": ["Hardware Defenses"]},
  {"id": 88, "name": "Md Shamim Shakil", "type": "mentee", "affiliation": "BU", "location": "New York, USA", "specializations": ["Applied ML"]},
  {"id": 89, "name": "adnans", "type": "mentee", "affiliation": "UMP", "location": "Malaysia", "specializations": ["Database systems"]},
  {"id": 90, "name": "Sumon roy", "type": "mentee", "affiliation": "Wolverhampton", "location": "UK", "specializations": ["Intrusion Analysis"]},
  {"id": 91, "name": "Prajna Shirsho Shome", "type": "mentee", "affiliation": "KUAS", "location": "Japan", "specializations": ["Robot Control"]},
  {"id": 92, "name": "Tanzim Zaman", "type": "mentee", "affiliation": "UNIGE", "location": "Genoa, Italy", "specializations": ["PQ Cryptography"]},
  {"id": 93, "name": "Maweza Nargis Haider", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Decarbonized Grids"]},
  {"id": 94, "name": "Minhazur rahman", "type": "mentee", "affiliation": "SUST", "location": "Bangladesh", "specializations": ["Agri-Telemetry"]},
  {"id": 95, "name": "FAZLA IMAM DIP", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Mechatronics"]},
  {"id": 96, "name": "Md. Ibrahim Bahadur", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Vibration modeling"]},
  {"id": 97, "name": "Rashedul Haque", "type": "mentee", "affiliation": "Cardiff", "location": "UK", "specializations": ["Analog IC design"]},
  {"id": 98, "name": "Nedul kumer roy", "type": "mentee", "affiliation": "SUST", "location": "Bangladesh", "specializations": ["Material physics"]},
  {"id": 99, "name": "TASRIFUL HAQUE", "type": "mentee", "affiliation": "MIST", "location": "Dhaka, Bangladesh", "specializations": ["Kubernetes security"]},
  {"id": 100, "name": "Md Abu Sufian", "type": "mentee", "affiliation": "Ahsanullah University", "location": "Dhaka", "specializations": ["Edge Analytics"]},
  {"id": 101, "name": "Fatin Istiak Rahman", "type": "mentee", "affiliation": "UIU", "location": "Bangladesh", "specializations": ["TinyML Modeling"]},
  {"id": 104, "name": "Md. Afnan Rahman Arnab", "type": "mentee", "affiliation": "UAP", "location": "Dhaka, Bangladesh", "specializations": ["Decentralized ledger"]},
  {"id": 105, "name": "Md.Al-Samiul Amin Rishat", "type": "mentee", "affiliation": "UAP", "location": "Dhaka, Bangladesh", "specializations": ["Renewable microgrids"]},
  {"id": 107, "name": "Umar Faruque Ibne Ariff", "type": "mentee", "affiliation": "—", "location": "Bangladesh", "specializations": ["Statistical Analysis"]},
  {"id": 108, "name": "Kaushik Biswas", "type": "mentee", "affiliation": "MIST", "location": "Bangladesh", "specializations": ["Post-Quantum PKI"]},
  {"id": 110, "name": "Diganto", "type": "mentee", "affiliation": "KUAS", "location": "Kyoto, Japan", "specializations": ["Control engineering"]},
  {"id": 111, "name": "Auditi Roy", "type": "mentee", "affiliation": "UHW", "location": "United Kingdom", "specializations": ["Machine learning"]},
  {"id": 112, "name": "Islam Sazzadul", "type": "mentee", "affiliation": "UIU", "location": "Dhaka, Bangladesh", "specializations": ["Database indexing"]},
  {"id": 113, "name": "Shahed Chowdhury Omi", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Intrusion Mitigation"]},
  {"id": 114, "name": "tahsinul hoque", "type": "mentee", "affiliation": "RU", "location": "UK", "specializations": ["Clinical Analytics"]},
  {"id": 115, "name": "Turny Tania Tasmim", "type": "mentee", "affiliation": "MIST", "location": "Dhaka", "specializations": ["Applied Linguistics"]},
  {"id": 117, "name": "Maliha Tasnuva", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Wireless communication"]},
  {"id": 118, "name": "Niloy Roy", "type": "mentee", "affiliation": "UAP", "location": "Bangladesh", "specializations": ["Deep Learning grids"]},
  {"id": 119, "name": "Tahmeed Mahbub", "type": "mentee", "affiliation": "Cardiff", "location": "United Kingdom", "specializations": ["RF systems"]},
  {"id": 120, "name": "Mohammad Nur Newaz Oyon", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Network segmentation"]},
  {"id": 121, "name": "MD. SAHIB AL MUBIN NILOY", "type": "mentee", "affiliation": "—", "location": "Dhaka, Bangladesh", "specializations": ["Edge computing"]},
  {"id": 122, "name": "SAZID AL FARABI", "type": "mentee", "affiliation": "SUST", "location": "Bangladesh", "specializations": ["Bioelectrics"]},
  {"id": 124, "name": "Abdus Sakur", "type": "mentee", "affiliation": "UAP", "location": "Dhaka, Bangladesh", "specializations": ["Piezoelectric sensors"]},
  {"id": 125, "name": "Rashedul Islam", "type": "mentee", "affiliation": "KUET", "location": "Bangladesh", "specializations": ["6G networks"]},
  {"id": 128, "name": "Hasan Sanjary Islam", "type": "mentee", "affiliation": "MIST", "location": "Dhaka, Bangladesh", "specializations": ["Smart grids"]},
  {"id": 129, "name": "Mehenaz Tabassoom", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Applied bioinformatics"]},
  {"id": 130, "name": "Noor A Aysha", "type": "mentee", "affiliation": "SUST", "location": "Bangladesh", "specializations": ["Sovereign security"]},
  {"id": 132, "name": "Tabassum Lamia Tonni", "type": "mentee", "affiliation": "UIU", "location": "Dhaka, Bangladesh", "specializations": ["Applied linguistics"]},
  {"id": 136, "name": "Sadia Hossain", "type": "mentee", "affiliation": "UAP", "location": "Dhaka, Bangladesh", "specializations": ["Clinical analytics"]},
  {"id": 138, "name": "Avijit Paul", "type": "mentee", "affiliation": "MIST", "location": "Dhaka", "specializations": ["Cybersecurity Audits"]},
  {"id": 140, "name": "MD. ASIF B. ABEDIN", "type": "mentee", "affiliation": "—", "location": "Dhaka, Bangladesh", "specializations": ["Materials Science"]},
  {"id": 141, "name": "Farjana Ahmed", "type": "mentee", "affiliation": "UAP", "location": "Bangladesh", "specializations": ["Computational mathematics"]},
  {"id": 142, "name": "Rokan Chowdhury Onick", "type": "mentee", "affiliation": "SUST", "location": "Shaylat", "specializations": ["Deep Learning models"]},
  {"id": 143, "name": "Ali Muharram", "type": "mentee", "affiliation": "Nawroz University", "location": "Duhok, Iraq", "specializations": ["Wireless telemetry"]},
  {"id": 144, "name": "Ananya Barua", "type": "mentee", "affiliation": "UIU", "location": "Bangladesh", "specializations": ["Machine learning"]},
  {"id": 145, "name": "Muhaiminul Ashrafee", "type": "mentee", "affiliation": "IUB", "location": "Dhaka, Bangladesh", "specializations": ["Faceted filters"]},
  {"id": 146, "name": "Jalal Uddin Md Akbar", "type": "mentee", "affiliation": "MIST", "location": "Bangladesh", "specializations": ["Intrusion tolerance"]},
  {"id": 148, "name": "Zerin Tasnim", "type": "mentee", "affiliation": "—", "location": "Dhaka", "specializations": ["Autonomous networks"]},
  {"id": 150, "name": "Shawon", "type": "mentee", "affiliation": "UIU", "location": "Dhaka, Bangladesh", "specializations": ["Software Systems"]},
  {"id": 153, "name": "Faiyaz Shahrear", "type": "mentee", "affiliation": "KUET", "location": "Khulna", "specializations": ["Mechatronics"]},
  {"id": 154, "name": "Md Shamsul Arifin", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Image Processing"]},
  {"id": 156, "name": "Muhammad Al Amin Rifat", "type": "mentee", "affiliation": "—", "location": "Dhaka", "specializations": ["Applied Statistics"]},
  {"id": 157, "name": "Dr Qasim AlAjmi", "type": "mentor", "affiliation": "A'Sharqiyah University", "location": "Oman", "specializations": ["Information Security"]},
  {"id": 158, "name": "Shorif Ahmed Afridi Mozumder", "type": "mentee", "affiliation": "UIU", "location": "Bangladesh", "specializations": ["Wireless sensors"]},
  {"id": 160, "name": "Rafid Shariar Rimu", "type": "mentee", "affiliation": "MIST", "location": "Dhaka", "specializations": ["Sovereign systems"]},
  {"id": 163, "name": "Ragad M Tawafak", "type": "mentor", "affiliation": "Al-Buraimi University College", "location": "Oman", "specializations": ["E-government", "Distance Learning"]},
  {"id": 165, "name": "Nahid Hossain", "type": "mentor", "affiliation": "United International University", "location": "Dhaka, Bangladesh", "specializations": ["Network Security", "Cloud Systems"]},
  {"id": 167, "name": "Khattab M Ali Alheeti", "type": "mentor", "affiliation": "University of Anbar", "location": "Iraq", "specializations": ["Ad-hoc networks security"]},
  {"id": 169, "name": "Mehdi Gheisari", "type": "mentor", "affiliation": "Guangzhou University", "location": "China", "specializations": ["Cybersecurity", "IoT middleware"]},
  {"id": 170, "name": "Akwinder Kaur", "type": "mentee", "affiliation": "WHW", "location": "United Kingdom", "specializations": ["Education leadership"]},
  {"id": 173, "name": "Hussein Jabar Khadim", "type": "mentor", "affiliation": "University of Baghdad", "location": "Iraq–Baghdad", "specializations": ["Quantum cryptographic links"]},
  {"id": 175, "name": "NOOR E FAHMIDA", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Clinical science"]},
  {"id": 176, "name": "MAGED RFEQALLAH", "type": "mentee", "affiliation": "Sana'a University", "location": "Yemen", "specializations": ["P2P Networks"]},
  {"id": 177, "name": "Belal Abdullah Alfuhaidi", "type": "mentor", "affiliation": "University of Science and Technology", "location": "Sana'a, Yemen", "specializations": ["Information Security"]},
  {"id": 178, "name": "Mohammed Salah Abood", "type": "mentor", "affiliation": "Nawroz University", "location": "Iraq", "specializations": ["Wireless signals"]},
  {"id": 179, "name": "Dr. Anish Gupta", "type": "mentor", "affiliation": "Apex Institute", "location": "India", "specializations": ["Cloud data privacy"]},
  {"id": 180, "name": "Sapna Dewari", "type": "mentor", "affiliation": "Apex", "location": "India", "specializations": ["Computer Networks"]},
  {"id": 182, "name": "Jatin Aditya", "type": "mentee", "affiliation": "KIT", "location": "India", "specializations": ["Vibration profiling"]},
  {"id": 190, "name": "MD SAEF ULLAH ULLAH", "type": "mentee", "affiliation": "UMP", "location": "Malaysia", "specializations": ["Machine learning"]},
  {"id": 195, "name": "Mizanur Rahman", "type": "mentee", "affiliation": "Universiti Malaysia Pahang", "location": "Kuantan, Malaysia", "specializations": ["Wireless protocols"]},
  {"id": 196, "name": "Md Jahan Ali", "type": "mentee", "affiliation": "UIU", "location": "Dhaka", "specializations": ["Cloud optimization"]},
  {"id": 198, "name": "Md. Mobarak Hossain Jewel", "type": "mentee", "affiliation": "—", "location": "Dhaka", "specializations": ["Database scheduling"]},
  {"id": 206, "name": "Selim Ahmed", "type": "mentor", "affiliation": "Universiti Utara Malaysia", "location": "Malaysia", "specializations": ["Information systems"]},
  {"id": 207, "name": "Subrata Chowdhury", "type": "mentor", "affiliation": "UIU", "location": "Bangladesh", "specializations": ["Data governance"]},
  {"id": 212, "name": "Ahasanul Karim", "type": "mentor", "affiliation": "Laval University", "location": "Quebec, Canada", "specializations": ["Post-Quantum Readiness"]},
  {"id": 222, "name": "Mohammed Amirul Islam", "type": "mentor", "affiliation": "Springer", "location": "Singapore", "specializations": ["Advisory standards"]},
  {"id": 403, "name": "Md. Iqbal Mahmood", "type": "mentor", "affiliation": "Institute for Molecular Science", "location": "Okazaki, Japan", "specializations": ["Protein engineering"]},
  {"id": 414, "name": "Muhammed Jamshed Alam Patwary", "type": "mentor", "affiliation": "International Islamic University Chittagong", "location": "Chittagong, Bangladesh", "specializations": ["Distributed ledgers"]},
  {"id": 454, "name": "Pankaj", "type": "mentor", "affiliation": "SRM University", "location": "Amaravati, India", "specializations": ["Bio-energy cells"]},
  {"id": 458, "name": "Dr. Puranjan Mishra", "type": "mentor", "affiliation": "Hong Kong Baptist University", "location": "Hong Kong", "specializations": ["Biomaterials"]},
  {"id": 461, "name": "Gopa Nandikes P", "type": "mentee", "affiliation": "SRM University-AP", "location": "Andhra Pradesh", "specializations": ["Bioreactors"]},
  {"id": 480, "name": "VIKAS VERMA", "type": "mentor", "affiliation": "Kanpur Institute of Technology", "location": "Kanpur, India", "specializations": ["Software designs"]},
  {"id": 481, "name": "Abhishek Vishnoi", "type": "mentor", "affiliation": "Kanpur Institute of Technology", "location": "Kanpur, India", "specializations": ["Applied optimization"]},
  {"id": 504, "name": "M.M. Hasan Mahfuz", "type": "mentor", "affiliation": "Concordia University", "location": "Montreal, Canada", "specializations": ["Machine learning", "RF and Microwave Engineering"]},
  {"id": 532, "name": "Chengjuan Ren", "type": "mentee", "affiliation": "Baoji University", "location": "China", "specializations": ["Image filtration"]},
  {"id": 533, "name": "Annajiat Alim Rasel", "type": "mentee", "affiliation": "Brac University", "location": "Dhaka", "specializations": ["Distributed databases"]},
  {"id": 539, "name": "Omar", "type": "mentor", "affiliation": "Southern University of Science and Technology", "location": "China", "specializations": ["Materials engineering"]},
  {"id": 541, "name": "Joseph Isinka", "type": "mentee", "affiliation": "Wolverhampton University", "location": "Reading, UK", "specializations": ["Container insulation"]},
  {"id": 542, "name": "Mahmood Abdullah Moqbel Bazel", "type": "mentee", "affiliation": "University Utara Malaysia", "location": "Malaysia", "specializations": ["Information encryption"]},
  {"id": 545, "name": "Shikha Ratti", "type": "mentee", "affiliation": "WHW", "location": "Wolverhampton, UK", "specializations": ["Trust architectures"]},
  {"id": 574, "name": "Anuj Kumar", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Post-Quantum PKI"]},
  {"id": 575, "name": "samia NASIRI", "type": "mentee", "affiliation": "University of Moulay Ismail", "location": "Morocco", "specializations": ["Thermodynamics"]},
  {"id": 580, "name": "Maliha Zaman", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka", "specializations": ["Zero-Trust grids"]},
  {"id": 581, "name": "Roslinda Ramli", "type": "mentor", "affiliation": "KUIS", "location": "Bangi, Selangor, Malaysia", "specializations": ["Network designs"]},
  {"id": 584, "name": "Sadia Tamim Dip", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka, Bangladesh", "specializations": ["NLP classification"]},
  {"id": 589, "name": "Redwana Hai Momo", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka, Bangladesh", "specializations": ["E-health Telemetry"]},
  {"id": 590, "name": "Tasnim Jahin Mowla", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka, Bangladesh", "specializations": ["Intrusion mitigation"]},
  {"id": 591, "name": "MD. AHASAN HABIB NAHID", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka, Bangladesh", "specializations": ["Subsea acoustic telemetry"]},
  {"id": 592, "name": "Waheb Abduljabbar Shaif Abdullah", "type": "mentor", "affiliation": "Birmingham City University", "location": "UK", "specializations": ["Microsegmentation design"]},
  {"id": 593, "name": "Injamul Haque", "type": "mentee", "affiliation": "University of Asia Pacific", "location": "Dhaka, Bangladesh", "specializations": ["Machine learning"]},
  {"id": 594, "name": "Tasnim Sabiha", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Quantum cryptographic links"]},
  {"id": 595, "name": "Dhanonjoy Howlader", "type": "mentee", "affiliation": "UAP", "location": "Dhaka", "specializations": ["Distributed systems security"]},
  {"id": 596, "name": "Tanjim Islam", "type": "mentee", "affiliation": "UIU", "location": "Dhaka, Bangladesh", "specializations": ["TinyML optimization"]},
  {"id": 612, "name": "Kamal Zuhairi Zamli", "type": "mentor", "affiliation": "Universiti Malaysia Pahang", "location": "Pekan, Malaysia", "specializations": ["Software engineering", "Combinatorial design"]},
  {"id": 600, "name": "Kazi Shabbin Hossain", "type": "mentee", "affiliation": "MIST", "location": "Dhaka, Bangladesh", "specializations": ["Applied statistics"]},
  {"id": 601, "name": "EISSA MOHAMMED ABDO GHALEB", "type": "mentee", "affiliation": "Peshawar University", "location": "Yemen", "specializations": ["Embedded network security"]},
  {"id": 602, "name": "Nazmun Nahar", "type": "mentee", "affiliation": "Green University of Bangladesh", "location": "Khulna, Bangladesh", "specializations": ["Software testing protocols"]},
  {"id": 604, "name": "Dr R Sujatha", "type": "mentor", "affiliation": "Vellore Institute of Technology", "location": "India", "specializations": ["Intrusion Detection Platforms"]},
  {"id": 610, "name": "Dr. Santhana Krishnan", "type": "mentor", "affiliation": "University of Technology Malaysia", "location": "Malaysia", "specializations": ["Bioelectrochemical systems", "Bio-energy", "Bioreactors", "Electro catalyst"]},
  {"id": 615, "name": "Zeashan Hameed Khan", "type": "mentor", "affiliation": "Air University, Islamabad", "location": "Pakistan", "specializations": ["Automatic control", "Robotics"]},
  {"id": 616, "name": "Ashis Kumar Mandal", "type": "mentor", "affiliation": "Hajee Mohammad Danesh Science and Technology University", "location": "Bangladesh", "specializations": ["Bio-informatics", "Agriculture load forecasting"]},
  {"id": 617, "name": "Md. Kafiul Islam", "type": "mentor", "affiliation": "Independent University, Bangladesh", "location": "Bangladesh", "specializations": ["BCI classification", "Machine learning", "EEG signaling"]},
  {"id": 618, "name": "Mohiuddin Ahmad", "type": "mentor", "affiliation": "Khulna University of Engineering & Technology (KUET)", "location": "Khulna, Bangladesh", "specializations": ["Medical image analysis", "Bio-signal engineering"]},
  {"id": 619, "name": "Dr. Md. Rakibul Hoque", "type": "mentor", "affiliation": "University of Dhaka", "location": "Dhaka, Bangladesh", "specializations": ["E-health administration", "Management systems"]},
  {"id": 620, "name": "Dr. M. F. Mridha", "type": "mentor", "affiliation": "American International University-Bangladesh (AIUB)", "location": "Bangladesh", "specializations": ["Machine learning", "Data mining", "BCI classification", "Data Science"]},
  {"id": 621, "name": "Ferdib-Al-Islam", "type": "mentee", "affiliation": "Northern University of Business and Technology Khulna", "location": "Khulna, Bangladesh", "specializations": ["Deep Learning", "Machine learning", "IoT", "Data Science"]},
  {"id": 624, "name": "Adnan Daud Khan", "type": "mentor", "affiliation": "University of Engineering & Technology Peshawar", "location": "Pakistan", "specializations": ["High-voltage transmission", "Smart girds"]},
  {"id": 627, "name": "J D Milton", "type": "mentee", "affiliation": "University of Science And Technology Chittagong", "location": "Chattagram, Bangladesh", "specializations": ["Microbiology research"]},
  {"id": 628, "name": "MOYENUL HASAN", "type": "mentee", "affiliation": "Sonargaon University", "location": "Dhaka, Bangladesh", "specializations": ["Material strength analysis"]},
  {"id": 629, "name": "Dr Mohammad Sarwar Morshed", "type": "mentor", "affiliation": "Ahsanullah University of Science and Technology", "location": "Dhaka, Bangladesh", "specializations": ["Industrial automation", "Operations optimization"]},
  {"id": 632, "name": "Olaoluwa Agbeja", "type": "mentee", "affiliation": "GRADX", "location": "United Kingdom", "specializations": ["Autonomous systems security"]},
  {"id": 633, "name": "Olayinka Oladele", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Trust verification links"]},
  {"id": 634, "name": "Odiri Teddie Adamu", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "United Kingdom", "specializations": ["Post-presubmission formatting"]},
  {"id": 635, "name": "Abhijit Kumar Dutta", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Machine learning frameworks"]},
  {"id": 636, "name": "Lakshitha Lokuge", "type": "mentee", "affiliation": "University of Wolverhampton (MSc CS)", "location": "Wolverhampton, UK", "specializations": ["Software safety designs"]},
  {"id": 641, "name": "Mohamad Ibrahim", "type": "mentee", "affiliation": "University of Wolverhampton and Derby", "location": "Kettering, UK", "specializations": ["Kubernetes container auditing"]},
  {"id": 646, "name": "Ademola Gabriel Popoola", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Sovereign zero-trust frameworks"]},
  {"id": 647, "name": "BALU SREE HARSHA VEJANDLA", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Intrusion identification models"]},
  {"id": 648, "name": "Dipesh Thapa", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Digital Forensics", "Wireless networks", "Cybersecurity", "IoT"]},
  {"id": 650, "name": "Bryar Hassan", "type": "mentor", "affiliation": "Charmo University", "location": "Sulaimani, Iraq", "specializations": ["Computational mathematics"]},
  {"id": 651, "name": "Khubaib Ahmed", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "United Kingdom", "specializations": ["Post-Quantum PKIs"]},
  {"id": 652, "name": "Junaid Muzaffar", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Reinforcement Learning", "Data Science", "Deep Learning", "Machine learning"]},
  {"id": 659, "name": "Hatim", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Smart grid dispatch"]},
  {"id": 661, "name": "Aniledio", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Birmingham, UK", "specializations": ["Decoupled microgrid control"]},
  {"id": 663, "name": "Salman Abdulrazak", "type": "mentee", "affiliation": "University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Friction modeling"]},
  {"id": 665, "name": "Amin Noroozi Fakhabi", "type": "mentor", "affiliation": "The University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Container isolation frameworks"]},
  {"id": 666, "name": "MOHOMED FAIROOS MOHOMED AATHIF", "type": "mentee", "affiliation": "Wolverhampton University", "location": "Wolverhampton, UK", "specializations": ["Zero-Trust networks"]},
  {"id": 670, "name": "brajan bartosik", "type": "mentee", "affiliation": "sandwell college", "location": "Birmingham, UK", "specializations": ["Industrial robotics"]},
  {"id": 672, "name": "Ahmed Alanazi", "type": "mentee", "affiliation": "—", "location": "USA", "specializations": ["Information policy design"]},
  {"id": 698, "name": "Sayeda Sadia Alam", "type": "mentee", "affiliation": "Jahangirnagar University", "location": "UK", "specializations": ["Applied Data Informatics"]},
  {"id": 712, "name": "Sze Wei Tan", "type": "mentee", "affiliation": "—", "location": "Singapore", "specializations": ["Automotive engineering"]},
  {"id": 749, "name": "Md Tarikul", "type": "mentor", "affiliation": "University of Greenwich", "location": "United Kingdom", "specializations": ["Satellite communication links"]}
];

// Profile headshots list for stylish rotation
const HEADSHOT_IDS = [
  "photo-1534528741775-53994a69daeb",
  "photo-1544005313-94ddf0286df2",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1500648767791-00dcc994a43e",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1560250097-0b93528c311a",
  "photo-1531123897727-8f129e1688ce",
  "photo-1543132220-4bf3de6e10ae",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1438761681033-6461ffad8d80",
  "photo-1492562080023-ab3db95bfbce",
  "photo-1489980508314-941910ded1f4",
  "photo-1517841905240-472988babdf9",
  "photo-1508214751196-bcfd4ca60f91",
  "photo-1580489944761-15a19d654956",
  "photo-1534751516642-a131ffd10b7f"
];

const DEFAULT_BIO_TEMPLATES = [
  "is serving as a core academic evaluator, focusing heavily on Q1 publishing standards and research-driven innovation. Serves as advisor on multiple doctoral committees.",
  "researches next-generation decentralized communication layers and cyber governance models, offering critical insights to help secure high-fidelity scholarly outputs.",
  "focuses on localized engineering models, TinyML deployment in rural grids, and software testing automation to minimize resource disparities in research environments.",
  "is a senior expert dedicated to post-graduate mentoring inside IEEE and ACM guidelines, helping bridge technological and geographical divides."
];

// Build fully initialized unique Member models
export function buildMentorsDatabase(): Mentor[] {
  const seenIds = new Set<number>();
  const list: Mentor[] = [];

  for (const m of RAW_MEMBERS) {
    if (seenIds.has(m.id)) continue;
    seenIds.add(m.id);

    // Dynamic rotation params based on Numeric ID
    const imgId = HEADSHOT_IDS[m.id % HEADSHOT_IDS.length];
    const image = `https://images.unsplash.com/${imgId}?auto=format,compress&fit=crop&q=70&w=280`;
    
    const bioTemplate = DEFAULT_BIO_TEMPLATES[m.id % DEFAULT_BIO_TEMPLATES.length];
    const affiliation = (!m.affiliation || m.affiliation === '—') ? 'RiTECHS Academic Secretariat' : m.affiliation;
    const location = (!m.location || m.location === '—') ? 'United Kingdom (Global Portal)' : m.location;
    
    const bio = `${m.name} is a distinguished ${m.type === 'mentor' ? 'Advisor' : 'Scholar'} affiliated with ${affiliation}. ${m.name} ${bioTemplate}`;
    
    // Generate specialized email
    const nameSlug = m.name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.');
    const domain = affiliation.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15) || 'ritechs';
    const email = `${nameSlug}@${domain}.org`;

    // Dynamic fields mapping
    const fields = m.specializations && m.specializations.length > 0
      ? m.specializations
      : ["Cybersecurity", "Applied Systems", "Machine learning", "Global Research"][m.id % 4] === "Cybersecurity"
        ? ["Sovereign Cybersecurity", "Public Key Frameworks"]
        : ["Machine learning", "Data Science", "Subsea Telemetry"][m.id % 3] === "Machine learning"
          ? ["Machine Learning", "Applied Systems"]
          : ["IoT Architectures", "6G Power Allocation"];

    // Dynamic publications mapping
    const pubTopic = fields[0] || "Advanced Research Standards";
    const publications = [
      `${pubTopic} of Decoupled Systems in International Journals (IEEE Transactions ${2023 + (m.id % 4)})`,
      `Resilient Implementation of ${fields[1] || "Academic Telemetry"} (Q1 Editorial Assessment ${2024 + (m.id % 3)})`
    ];

    list.push({
      id: String(m.id),
      name: m.name,
      university: affiliation,
      country: location,
      fields: fields,
      rating: +(4.5 + ((m.id % 6) / 10)).toFixed(1),
      image: image,
      bio: bio,
      email: email,
      publications: publications,
      role: m.type as 'mentor' | 'mentee'
    });
  }

  // Ensure high-grade original static advisors are placed first or prioritized
  const staticAdvisors = [
    {
      id: "622",
      name: "Dr. LUHUR BAYUAJI",
      university: "Universiti Malaysia Pahang",
      country: "Malaysia",
      fields: ["Machine Learning", "IoT Architectures", "Autonomous Networks"],
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format,compress&fit=crop&q=70&w=280",
      bio: "Dr. Bayuaji operates as an Assistant Professor in Pahang. His focus includes predictive neural grids, distributed database synchronization, and solar power array optimization.",
      email: "luhur@ump.edu.my",
      publications: [
        "Intelligent Predictors for Photovoltaic Depletion in Humid Regions (IEEE IoT Journal 2024)",
        "Adaptive Traffic Routing over Layered Smart City Nodes (Springer Telecommunications 2025)"
      ],
      role: 'mentor' as const
    },
    {
      id: "14",
      name: "Md Arafatur Rahman",
      university: "University of Wolverhampton",
      country: "United Kingdom",
      fields: ["Cognitive Radio Networks", "IoT Protocols", "Machine Learning", "Wireless Networks"],
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format,compress&fit=crop&q=70&w=280",
      bio: "Assistant Professor Rahman specialized in multi-frequency satellite and cognitive IoT integrations. He publishes extensively on sub-ambient telemetry under IEEE framework guidelines.",
      email: "a.rahman@wolverhampton.ac.uk",
      publications: [
        "Pervasive Small-Satellite Backhaul Modulation inside Ultra-Low Power Grids (IEEE IoT 2024)",
        "Reviewing the Frontier of Piezoelectric Edge Harvesting Systems (Springer LNCS 2025)"
      ],
      role: 'mentor' as const
    },
    {
      id: "472",
      name: "Prof. Dr. Md. Rafiqul Islam",
      university: "International Islamic University",
      country: "Gombak, Malaysia",
      fields: ["Renewable Energy", "IoT Sensors", "Piezoelectric Harvesters"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format,compress&fit=crop&q=70&w=280",
      bio: "Prof. Dr. Rafiqul Islam operates in Gombak, Malaysia. He publishes heavily on piezo-electric harvesting models, ultra-low power signal modulations, and smart communication circuits.",
      email: "rafiqul@iiu.edu.my",
      publications: [
        "Piezoelectric Energy Harvesting on Miniature Sensory Nodes (Elsevier Energy 2024)",
        "Distributed Solar Grid Scheduling using Federated AI Regulators (IEEE Smart Grids 2025)"
      ],
      role: 'mentor' as const
    }
  ];

  // Merge static advisors to overwrite generated placeholders
  for (const staticAdv of staticAdvisors) {
    const idx = list.findIndex(m => m.id === staticAdv.id);
    if (idx !== -1) {
      list[idx] = staticAdv;
    } else {
      list.unshift(staticAdv);
    }
  }

  return list;
}

import { mentors } from './mentor';

export const INITIAL_MENTORS: Mentor[] = mentors;

