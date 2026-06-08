/**
 * Mock Tutors Data for Marketplace
 */

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  bio: string;
  qualifications: string[];
  yearsExperience: number;
  availability: {
    [key: string]: string[];
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  text: string;
  date: string;
}

export const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "SC",
    subjects: ["Mathematics", "Physics", "Computer Science"],
    hourlyRate: 45,
    rating: 4.9,
    reviewCount: 127,
    bio: "I'm a passionate Mathematics and Physics tutor with over 5 years of experience teaching GCSE students. My approach focuses on building strong fundamentals and developing problem-solving skills. I use a mix of traditional methods and interactive tools to keep learning engaging and effective.",
    qualifications: [
      "BSc Mathematics (First Class)",
      "PGCE Secondary Mathematics",
      "OCR A Level Maths Examiner",
    ],
    yearsExperience: 5,
    availability: {
      monday: ["14:00-17:00", "18:00-20:00"],
      tuesday: ["09:00-12:00", "14:00-17:00"],
      wednesday: ["15:00-20:00"],
      thursday: ["09:00-12:00", "14:00-17:00"],
      friday: ["14:00-18:00"],
      saturday: ["10:00-14:00"],
      sunday: ["10:00-14:00"],
    },
    reviews: [
      {
        id: "r1",
        studentName: "Emma Johnson",
        rating: 5,
        text: "Sarah is an amazing tutor! She explains complex concepts in simple terms and always makes sure I understand before moving forward. My maths grade improved from a 6 to an 8 in just 3 months!",
        date: "2 weeks ago",
      },
      {
        id: "r2",
        studentName: "James Park",
        rating: 5,
        text: "Excellent tutor. Very patient and knowledgeable. She tailors the lessons to match my learning style and pace. Highly recommend!",
        date: "1 month ago",
      },
      {
        id: "r3",
        studentName: "Sophia Williams",
        rating: 4,
        text: "Great tutor with a structured approach to teaching. Very organised and professional. Only minor downside is that she's very busy and hard to book.",
        date: "2 months ago",
      },
      {
        id: "r4",
        studentName: "Marcus Davis",
        rating: 5,
        text: "Best decision I made for my exam prep. Sarah helped me go from struggling to confident in Physics. Her mock exam sessions were invaluable.",
        date: "3 months ago",
      },
      {
        id: "r5",
        studentName: "Olivia Brown",
        rating: 5,
        text: "Professional, knowledgeable, and genuinely cares about student success. 100% recommend Sarah to anyone looking for a maths tutor.",
        date: "3 months ago",
      },
    ],
  },
  {
    id: "2",
    name: "Michael Thompson",
    avatar: "MT",
    subjects: ["English Language", "English Literature", "History"],
    hourlyRate: 40,
    rating: 4.8,
    reviewCount: 94,
    bio: "I'm an English and History specialist with a passion for helping students develop critical thinking and analytical skills. I've been tutoring for 6 years and have consistently helped students achieve top grades in both language and literature exams.",
    qualifications: [
      "MA English Literature",
      "PGCE English Secondary",
      "Cambridge English Advanced (CAE)",
    ],
    yearsExperience: 6,
    availability: {
      monday: ["09:00-12:00", "16:00-19:00"],
      tuesday: ["14:00-18:00"],
      wednesday: ["09:00-12:00", "16:00-19:00"],
      thursday: ["14:00-18:00"],
      friday: ["16:00-19:00"],
      saturday: ["11:00-15:00"],
      sunday: ["11:00-15:00"],
    },
    reviews: [
      {
        id: "r6",
        studentName: "Liam Garcia",
        rating: 5,
        text: "Michael made English actually interesting! His essay techniques helped me structure my answers much better. Went from grade 6 to grade 8.",
        date: "1 week ago",
      },
      {
        id: "r7",
        studentName: "Mia Rodriguez",
        rating: 4,
        text: "Great tutor who really understands literature. Very thorough and patient. Definitely helped improve my analysis skills.",
        date: "3 weeks ago",
      },
      {
        id: "r8",
        studentName: "Noah Martinez",
        rating: 5,
        text: "Fantastic tutor. Makes complex texts easy to understand. His teaching methods are engaging and effective.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "PP",
    subjects: ["Biology", "Chemistry", "Physics"],
    hourlyRate: 50,
    rating: 4.7,
    reviewCount: 82,
    bio: "Science tutor specialising in all three sciences for GCSE. I have a background in pharmaceutical sciences and bring real-world applications into my teaching. I believe in making science accessible and exciting for all learners.",
    qualifications: [
      "MSc Pharmaceutical Sciences",
      "BSc Chemistry (First Class)",
      "PGCE Science",
    ],
    yearsExperience: 7,
    availability: {
      monday: ["15:00-19:00"],
      tuesday: ["09:00-13:00", "16:00-19:00"],
      wednesday: ["15:00-19:00"],
      thursday: ["09:00-13:00"],
      friday: ["15:00-19:00"],
      saturday: ["10:00-16:00"],
      sunday: ["10:00-16:00"],
    },
    reviews: [
      {
        id: "r9",
        studentName: "Ava Thompson",
        rating: 5,
        text: "Priya is exceptional! She made chemistry come alive. Her practical demonstrations and explanations were brilliant. Got a 9 in chemistry!",
        date: "2 weeks ago",
      },
      {
        id: "r10",
        studentName: "Lucas Wilson",
        rating: 4,
        text: "Very knowledgeable and explains concepts clearly. Definitely helped with my understanding of biology. Highly recommend.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: "4",
    name: "David Kumar",
    avatar: "DK",
    subjects: ["Mathematics", "Economics", "Business"],
    hourlyRate: 48,
    rating: 4.6,
    reviewCount: 76,
    bio: "Economics and Business specialist with a background in finance. I help students understand real-world economic principles and business concepts. My sessions are interactive and tailored to individual learning needs.",
    qualifications: [
      "BSc Economics with Finance",
      "PGCE Business & Economics",
      "CFA Level I",
    ],
    yearsExperience: 4,
    availability: {
      monday: ["17:00-20:00"],
      tuesday: ["14:00-17:00"],
      wednesday: ["17:00-20:00"],
      thursday: ["14:00-17:00"],
      friday: ["17:00-20:00"],
      saturday: ["13:00-17:00"],
      sunday: ["13:00-17:00"],
    },
    reviews: [
      {
        id: "r11",
        studentName: "Isabella Davis",
        rating: 5,
        text: "David made economics finally make sense! His real-world examples really helped me grasp difficult concepts. Excellent tutor.",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: "5",
    name: "Jessica Lee",
    avatar: "JL",
    subjects: ["Computer Science", "Mathematics"],
    hourlyRate: 55,
    rating: 4.9,
    reviewCount: 64,
    bio: "Computer Science specialist with real coding experience. I teach not just theory but practical programming skills. My approach is project-based and engaging, perfect for students interested in tech careers.",
    qualifications: [
      "BSc Computer Science",
      "PGCE Computing",
      "Google Cloud Certified",
    ],
    yearsExperience: 3,
    availability: {
      monday: ["16:00-19:00"],
      tuesday: ["09:00-12:00", "16:00-19:00"],
      wednesday: ["16:00-19:00"],
      thursday: ["09:00-12:00"],
      friday: ["16:00-19:00"],
      saturday: ["14:00-18:00"],
      sunday: ["14:00-18:00"],
    },
    reviews: [
      {
        id: "r12",
        studentName: "Ethan White",
        rating: 5,
        text: "Amazing tutor! Made programming actually fun and understandable. Jessica's project-based approach really helped me learn. Best investment for my future!",
        date: "1 week ago",
      },
    ],
  },
  {
    id: "6",
    name: "Alexandra Morrison",
    avatar: "AM",
    subjects: ["Geography", "History", "English Language"],
    hourlyRate: 38,
    rating: 4.5,
    reviewCount: 71,
    bio: "Humanities specialist with a focus on essay writing and analytical skills. I've helped many students improve their grades through targeted feedback and structured teaching. Patient and encouraging approach.",
    qualifications: ["MA Geography Education", "PGCE Humanities", "MSc GIS"],
    yearsExperience: 5,
    availability: {
      monday: ["14:00-18:00"],
      tuesday: ["09:00-13:00"],
      wednesday: ["14:00-18:00"],
      thursday: ["09:00-13:00", "16:00-18:00"],
      friday: ["14:00-18:00"],
      saturday: ["10:00-14:00"],
      sunday: ["10:00-14:00"],
    },
    reviews: [
      {
        id: "r13",
        studentName: "Charlotte Green",
        rating: 4,
        text: "Alex is really good at explaining complex geographical concepts. Her essay feedback was detailed and helpful. Very supportive.",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: "7",
    name: "Raj Gupta",
    avatar: "RG",
    subjects: ["Physics", "Mathematics", "Chemistry"],
    hourlyRate: 52,
    rating: 4.8,
    reviewCount: 89,
    bio: "Science and maths tutor with over 8 years of experience. Specialise in helping students who struggle with these subjects. My teaching method breaks down complex ideas into manageable chunks using visual aids and hands-on demonstrations.",
    qualifications: [
      "MEng Physics",
      "PGCE Science",
      "Advanced Level Examiner",
    ],
    yearsExperience: 8,
    availability: {
      monday: ["15:00-20:00"],
      tuesday: ["09:00-13:00", "15:00-20:00"],
      wednesday: ["15:00-20:00"],
      thursday: ["09:00-13:00"],
      friday: ["15:00-20:00"],
      saturday: ["11:00-17:00"],
      sunday: ["11:00-17:00"],
    },
    reviews: [
      {
        id: "r14",
        studentName: "Sophie Turner",
        rating: 5,
        text: "Raj is absolutely brilliant! I was failing maths before, and now I'm getting top grades. He's patient, thorough, and truly cares about his students' success.",
        date: "2 days ago",
      },
    ],
  },
  {
    id: "8",
    name: "Emma Collins",
    avatar: "EC",
    subjects: ["English Literature", "English Language", "Drama"],
    hourlyRate: 42,
    rating: 4.7,
    reviewCount: 78,
    bio: "Passionate English teacher who brings texts to life. I specialise in helping students develop strong essay writing skills and deep textual analysis. Creating confident, articulate communicators is my goal.",
    qualifications: [
      "BA English Studies",
      "PGCE English Secondary",
      "Specialist in Exam Board Marking",
    ],
    yearsExperience: 5,
    availability: {
      monday: ["14:00-18:00"],
      tuesday: ["09:00-13:00", "16:00-19:00"],
      wednesday: ["14:00-18:00"],
      thursday: ["09:00-13:00"],
      friday: ["14:00-18:00"],
      saturday: ["10:00-15:00"],
      sunday: ["10:00-15:00"],
    },
    reviews: [
      {
        id: "r15",
        studentName: "Oliver King",
        rating: 5,
        text: "Emma's approach to literature is engaging and insightful. She really helped me understand Shakespeare. My grades shot up!",
        date: "1 month ago",
      },
    ],
  },
];

export function getTutorById(id: string): Tutor | undefined {
  return mockTutors.find((tutor) => tutor.id === id);
}

export function filterTutors(
  searchQuery: string,
  filters: {
    subjects?: string[];
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    availability?: string;
  }
): Tutor[] {
  return mockTutors.filter((tutor) => {
    // Search query filter (name and subjects)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        tutor.name.toLowerCase().includes(query) ||
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(query)
        );
      if (!matchesSearch) return false;
    }

    // Subject filter
    if (filters.subjects && filters.subjects.length > 0) {
      const hasSubject = tutor.subjects.some((subject) =>
        filters.subjects!.includes(subject)
      );
      if (!hasSubject) return false;
    }

    // Price filter
    if (filters.minPrice && tutor.hourlyRate < filters.minPrice) return false;
    if (filters.maxPrice && tutor.hourlyRate > filters.maxPrice) return false;

    // Rating filter
    if (filters.rating && tutor.rating < filters.rating) return false;

    return true;
  });
}
