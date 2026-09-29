import {
  BookOpen,
  BookOpenText,
  Scale,
  Clock,
  Languages,
  Mic,
  HeartHandshake,
  Building2,
  Zap,
  Speaker,
  PlugZap,
  Droplets,
  GraduationCap,
  Presentation,
  BrickWall,
  Coins,
  HandHeart,
  PhoneCall,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  book: BookOpen,
  reading: BookOpenText,
  scale: Scale,
  clock: Clock,
  languages: Languages,
  mic: Mic,
  heart: HeartHandshake,
  building: Building2,
  zap: Zap,
  speaker: Speaker,
  power: PlugZap,
  droplet: Droplets,
  graduation: GraduationCap,
  teacher: Presentation,
  bricks: BrickWall,
  coins: Coins,
  hands: HandHeart,
  phone: PhoneCall,
};

export function Icon({ name, className, strokeWidth = 1.6 }: { name: string; className?: string; strokeWidth?: number }) {
  const Cmp = icons[name] ?? BookOpen;
  return <Cmp aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43zm8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.33 11.33 0 0 0 5.77 1.47h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.34-8.04z" />
    </svg>
  );
}
