import { Icons } from "@/components/icons";
import { StaticImageData } from "next/image";


export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type User = {
  userID: string;
  email: string;
  passwordHash: string;
  registrationDate: Date;
  avatar: string;
  firstName: string;
  lastName: string;
  gender: string;
  isActive: number;
}

export type Response = {
  data: any;
  erros: string[];
  message: string;
  succeeded: boolean;
}

export type Hero = {
  img: StaticImageData;
  img_des: string;
  chap_num: number;
  title: string;
  types: string[];
  des: string | null;
}

export type HeroList = {
  title: string;
  img: string;
  img_des: string;
  view_num: number;
  favor_num: number;
}

export type HomeSectionProps = {
  isCategory?: boolean;
  isCarousel?: boolean;
  overrideClass?: string | null;
  title: string;
  categories?: string[];
  novels: Novel[];
}

export type Novel = {
  novelID: number;
  img: StaticImageData;
  img_des?: string | null;
  title: string;
  other_name?: string;
  genre?: string;
  coverImage?: string | null;
  review_score?: number;
  description: string | null;
  published_year?: number;
  publishedDate?: Date | string;
  status?: number;
  view_num?: number;
  favor_num?: number;
  totalPages?: number;
  chapters?: string[];
}

export type Chapter = {
  chapterID: number;
  title: string;
  content: string;
  chapterNumber: number;
  publishDate: Date | string;
  novelID: number;
  updatedDate: Date | string;
  novelTitle?: string;
}

export type Genre = {
  genreID: number;
  name: string;
  parentID: number;
}