// Import utils
import { ROUTES } from "@/utils/constants";

// Import types
// import { TSidebarNavItems } from "./side-bar.types";

export const SIDEBAR_SECTIONS = {
    MAIN: 'main',
    SETTINGS: 'settings',
    EXTERNAL: 'external',
    WORKSPACES: 'workspaces',
    PROJECTS: 'projects',
}

export const SIDEBAR_NAV_ITEMS = {
    [SIDEBAR_SECTIONS.WORKSPACES]: [
        {
            title: 'All workspace',
            path: ROUTES.workspaces.ALL_WORKSPACES,
            isDisabled: false,
            isHidden: false
        },
    ],
    [SIDEBAR_SECTIONS.PROJECTS]: [
        {
            title: 'All Projects',
            path: ROUTES.projects.ALL_PROJECTS,
            isDisabled: false,
            isHidden: false
        },
        {
            title: 'Recent',
            path: ROUTES.projects.RECENT_PROJECTS,
            isDisabled: true,
            isHidden: true
        },
    ],
    // [SIDEBAR_SECTIONS.SETTINGS]: [
    //     {
    //         title: 'General',
    //         path: ROUTES.settings.GENERAL,
    //         section: SIDEBAR_SECTIONS.SETTINGS,
    //         isSubSection: true,
    //         isDisabled: true,
    //         isHidden: false
    //     },
    //     {
    //         title: 'Plans',
    //         path: ROUTES.settings.PLANS,
    //         section: SIDEBAR_SECTIONS.SETTINGS,
    //         isSubSection: true,
    //         isDisabled: true,
    //         isHidden: false
    //     },
    //     {
    //         title: 'Billing',
    //         path: ROUTES.settings.BILLINGS,
    //         section: SIDEBAR_SECTIONS.SETTINGS,
    //         isSubSection: true,
    //         isDisabled: true,
    //         isHidden: false
    //     },
    //     {
    //         title: 'Apps & Integrations',
    //         path: ROUTES.settings.APPS_AND_INTEGRATIONS,
    //         section: SIDEBAR_SECTIONS.SETTINGS,
    //         isSubSection: true,
    //         isDisabled: true,
    //         isHidden: false
    //     },
    // ],
    [SIDEBAR_SECTIONS.EXTERNAL]: [
        {
            title: 'Blog',
            path: '/',
            isDisabled: true,
            isExternalLink: true,
            isHidden: false
        },
        {
            title: 'Support',
            path: '/',
            isDisabled: true,
            isExternalLink: true,
            isHidden: false
        },
        {
            title: 'Forum',
            path: '/',
            isDisabled: true,
            isExternalLink: true,
            isHidden: false
        },
        {
            title: 'Academy',
            path: '/',
            isDisabled: true,
            isExternalLink: true,
            isHidden: false
        },
    ]
}