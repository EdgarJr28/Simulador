import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'App',
        path: '/',
        icon: <Icon icon="lucide:gamepad-2" width="24" height="24" />,
    },
   /*  {
        title: 'Projects',
        path: '/',
        icon: <Icon icon="lucide:folder" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
            { title: 'All', path: '/projects' },
            { title: 'Web Design', path: '/projects/web-design' },
            { title: 'Graphic Design', path: '/projects/graphic-design' },
        ],
    },
    {
        title: 'Messages',
        path: '/',
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
    },
    {
        title: 'Settings',
        path: '/',
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
            { title: 'Account', path: '/settings/account' },
            { title: 'Privacy', path: '/settings/privacy' },
        ],
    },
    {
        title: 'Help',
        path: '/',
        icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
    }, */
];