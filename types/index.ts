import { Icons } from "@/components/icons";
import { StaticImageData } from "next/image";


export interface NavItem {
  menuID: number;
  title: string;
  path?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
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
  roles: string[];
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
  isMore?: boolean;
  overrideClass?: string | null;
  title: string;
  categories?: any[];
  novels: Novel[];
  loading: boolean;
}

export type Novel = {
  novelID: number;
  img: StaticImageData;
  img_des?: string | null;
  title: string;
  otherName?: string;
  mappings?: Genre[];
  genres?: string[];
  coverImage?: string | null;
  review_score?: number;
  description: string | null;
  published_year?: number;
  publishedDate: Date;
  status?: number;
  viewCount: number;
  favoriteCount: number;
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

export type Role = {
  roleID: number;
  name: string;
  roleCode: number;
  isActive: boolean;
  permissions: string[] | null;
  menus: string[] | null;
}

export type Comment = {
  commentID: number;
  content: string;
  userID: string;
  novelID: number;
  chapterID: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
  name?: string;
  avatar?: string;
  novel?: string;
  chapter?: string;
}

export type Permission = {
  permissionID: number;
  permissionCode: number;
  title: string;
  titleEN: string;
  parent: number;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
  parentTitle: string;
}

export type Node = {
  value: number;
  label: string;
  children?: Node[]
}

export type PermissionStates = {
  canView: boolean | null;
  canEdit: boolean;
  canCreate?: boolean;
  canDelete: boolean;
}