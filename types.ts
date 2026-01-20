export interface NavItem {
  label: string;
  path: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string[]; // Array de parágrafos
  author: string;
  image: string;
}

export interface ClassSchedule {
  day: string;
  times: string[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  link?: string;
}