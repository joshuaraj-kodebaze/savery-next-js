// Import utils
import { ROUTES } from "@/utils/constants";

// Import types
// import { TSidebarNavItems } from "./side-bar.types";

export const SIDEBAR_SECTIONS = {
    MAIN: 'main',
    SETTINGS: 'settings',
    EXTERNAL: 'external'
}

export const SIDEBAR_NAV_ITEMS = {
    [SIDEBAR_SECTIONS.MAIN]: [
        {
            title: 'All Projects',
            path: ROUTES.projects.ALL_PROJECTS,
            isDisabled: false
        },
        {
            title: 'Recent',
            path: ROUTES.projects.RECENT_PROJECTS,
            isDisabled: false
        },
    ],
    [SIDEBAR_SECTIONS.SETTINGS]: [
        {
            title: 'General',
            path: ROUTES.settings.GENERAL,
            section: SIDEBAR_SECTIONS.SETTINGS,
            isSubSection: true,
            isDisabled: false
        },
        {
            title: 'Plans',
            path: ROUTES.settings.PLANS,
            section: SIDEBAR_SECTIONS.SETTINGS,
            isSubSection: true,
            isDisabled: false
        },
        {
            title: 'Billing',
            path: ROUTES.settings.BILLINGS,
            section: SIDEBAR_SECTIONS.SETTINGS,
            isSubSection: true,
            isDisabled: true
        },
        {
            title: 'Apps & Integrations',
            path: ROUTES.settings.APPS_AND_INTEGRATIONS,
            section: SIDEBAR_SECTIONS.SETTINGS,
            isSubSection: true,
            isDisabled: true
        },
    ],
    [SIDEBAR_SECTIONS.EXTERNAL]: [
        {
            title: 'Blog',
            path: '/',
            isDisabled: true,
            isExternalLink: true
        },
        {
            title: 'Support',
            path: '/',
            isDisabled: true,
            isExternalLink: true
        },
        {
            title: 'Forum',
            path: '/',
            isDisabled: true,
            isExternalLink: true
        },
        {
            title: 'Academy',
            path: '/',
            isDisabled: true,
            isExternalLink: true
        },
    ]
}