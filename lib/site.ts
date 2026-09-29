import data from '@/content/site.json';
import type { Locale } from '@/i18n/routing';

export type NeedId = 'floor' | 'wiring' | 'sound' | 'generator' | 'borewell';
export type DepartmentId = 'hifz' | 'nazira' | 'diniyat' | 'parttime' | 'arabic' | 'oratory' | 'tazkiyah';
export type GalleryCategory = 'classes' | 'events' | 'dastarbandi' | 'campus' | 'girls';
export type StatId = 'founded' | 'students' | 'teachers' | 'huffaz' | 'nazira';

export interface Need { id: NeedId; icon: string; goal: number; raised: number }
export interface Department { id: DepartmentId; icon: string; names: Record<Locale, string> }
export interface GalleryImage { src: string; category: GalleryCategory; width: number; height: number }
export interface Stat { id: StatId; value: number | null; suffix?: string; plain?: boolean }

export const site = {
  names: data.names as Record<Locale, string>,
  ticker: data.ticker as Record<Locale, string>,
  hadith: data.hadith,
  /** Only phones marked `confirmed: true` in site.json are shown. */
  phones: data.phones.filter((p) => p.confirmed && p.tel),
  whatsapp: data.whatsapp,
  whatsappUrl: `https://wa.me/${data.whatsapp}`,
  email: data.email,
  map: data.map,
  social: data.social as { facebook: string; instagram: string; youtube: string },
  bank: data.bank,
  stats: data.stats as Stat[],
  needs: data.needs as Need[],
  departments: data.departments as Department[],
  heroImages: data.heroImages.map((h) => h.src),
  gallery: data.gallery as GalleryImage[],
  videos: data.videos.map((v) => v.youtubeId),
};

export const galleryCategories: GalleryCategory[] = ['classes', 'events', 'dastarbandi', 'campus', 'girls'];

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.org').replace(/\/$/, '');
