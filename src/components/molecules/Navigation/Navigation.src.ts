import type { NavigationItemProps } from '@atoms/NavigationItem/NavigationItem.types';

export const navItems: Array<NavigationItemProps> = [
  { href: '#', text: 'Wiki' },
  { href: '#', text: 'Contribute' },
  { href: '#', text: 'Level Select' },
  { href: '#', text: 'Settings' },
  {
    href: 'https://github.com/MilanFox/By-Royal-Decree',
    isImage: true,
    src: '/images/socials/github.png',
    text: 'Github Repo',
  },
  { href: '#', text: 'Login', isPill: true },
];
