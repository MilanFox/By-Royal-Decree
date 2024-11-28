type IconName = 'play' | 'menu' | 'vision';

export interface IconButtonProps {
  icon: IconName;
  text: string;
  onClick?: (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
