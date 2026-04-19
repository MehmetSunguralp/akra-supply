export interface CompanyCardData {
  id: string;
  name: string;
  city: string;
  category: string;
  minimumOrder: string;
  leadTime: string;
  score: number;
  logo: string;
  coverImage: string;
  certifications: string[];
}

export interface CompanyCardProps {
  cardData: CompanyCardData;
}
