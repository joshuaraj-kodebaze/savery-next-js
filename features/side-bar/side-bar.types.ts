// Import libraries
import { LinkProps } from "next/link";

export type TSidebarNavItems = {
    title: string;
    path: string;
    section?: string;
    isSubSection?: boolean;
    isDisabled: boolean;
    isExternalLink?: boolean;
}[];

export type TNavLink = {
    isactivelink?: number;
    disabled?: boolean;
} & LinkProps;