import axios from 'axios';
import type { Company, CompanyFilters } from '@/types/company';
import type { ApiResponse } from '@/types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/mockData',
  timeout: 10000,
});

const applyCompanyFilters = (list: Company[], filters?: CompanyFilters): Company[] => {
  let companies = [...list];

  if (filters?.search?.trim()) {
    const q = filters.search.trim().toLocaleLowerCase('tr');
    companies = companies.filter((item) => item.name.toLocaleLowerCase('tr').includes(q));
  }

  if (filters?.city) {
    companies = companies.filter(
      (item) => item.city.localeCompare(filters.city!, 'tr', { sensitivity: 'base' }) === 0,
    );
  }

  if (filters?.category) {
    companies = companies.filter((item) => item.category === filters.category);
  }

  if (filters?.minScore != null && filters.minScore > 0) {
    companies = companies.filter((item) => item.score >= filters.minScore);
  }

  if (filters?.leadTimeMax != null) {
    companies = companies.filter((item) => {
      const parts = item.leadTime.split('-');
      const maxDay = Number(parts[1]);
      return !Number.isNaN(maxDay) && maxDay <= filters.leadTimeMax!;
    });
  }

  return companies;
};

export const getAllCompanies = async (filters?: CompanyFilters): Promise<ApiResponse<Company[]>> => {
  try {
    const params: Record<string, string | number> = {};
    if (filters?.city) params.city = filters.city;
    if (filters?.category) params.category = filters.category;

    const response = await api.get<Company[]>('/', { params });

    const raw = response.data ?? [];
    const companies = applyCompanyFilters(raw, filters);

    return {
      success: true,
      data: companies,
    };
  } catch (error) {
    console.error('getAllCompanies error:', error);

    return {
      success: false,
      data: null,
    };
  }
};

export const getCompanyById = async (id: string): Promise<ApiResponse<Company>> => {
  try {
    const response = await api.get<Company>(`/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('getCompanyById error:', error);

    return {
      success: false,
      data: null,
    };
  }
};
