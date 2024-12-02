type IconName = 'center-view' | 'play' | 'reset' | 'zoom-in' | 'zoom-out' | 'validate' | 'menu';

export interface IconButtonProps {
  icon: IconName;
  text: string;
  onClick?: (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
