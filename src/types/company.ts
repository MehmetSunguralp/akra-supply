import type { LocaleName } from '@/types/locale';

export type LocalizedShortDescriptions = Partial<Record<LocaleName, string>>;

export interface Company {
  id: string;
  name: string;
  city: string;
  category: string;
  minimumOrder: string;
  leadTime: string;
  score: number;
  shortDescription: string;
  shortDescriptions?: LocalizedShortDescriptions;
  coverImage: string;
  logo: string;
  gallery: string[];
  certifications: string[];
  address: string;
  email: string;
  phone: string;
  establishedYear: number;
  employeeCount: number;
}

export interface CompanyFilters {
  search?: string;
  city?: string;
  category?: string;
  minScore?: number;
  leadTimeMax?: number;
}
