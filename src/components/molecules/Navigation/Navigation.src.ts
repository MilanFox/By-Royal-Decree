import type { NavigationItemProps } from '@atoms/NavigationItem/NavigationItem.types';

export const navItems: Array<NavigationItemProps> = [
  { text: 'Home', href: '/' },
  { text: 'Settings', href: '/settings' },
  { text: 'Wiki', href: 'https://github.com/MilanFox/By-Royal-Decree/wiki' },
  { text: 'Contribute', href: 'https://github.com/MilanFox/By-Royal-Decree/blob/main/CONTRIBUTING.md' },
  {
    text: 'Github Repo',
    href: 'https://github.com/MilanFox/By-Royal-Decree',
    isImage: true,
    src: '/images/socials/github.png',
  },
  { text: 'Login', href: '#', isPill: true },
];
