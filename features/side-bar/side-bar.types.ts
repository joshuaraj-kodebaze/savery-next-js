// Import libraries
import { LinkProps } from "next/link";
import {
    type TypographyProps,
    type DrawerProps,
} from "@mui/material";

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

export type TSectionTitle = {
    isFirst?: boolean;
    isWorspaceActive?: boolean;
} & TypographyProps;

export type TSideBarContainer = {
    isWorkspaceActive?: boolean;
} & DrawerProps