import axios from 'axios';
import { getCompaniesFromLocalDb, getCompanyByIdFromLocalDb } from '@/api/localApiFallback';
import type { Company, CompanyFilters } from '@/types/company';
import type { ApiResponse } from '@/types/api';

const remoteBaseUrl = import.meta.env.VITE_BASE_URL?.trim();
const api = remoteBaseUrl
  ? axios.create({
      baseURL: `${remoteBaseUrl}/mockData`,
      timeout: 10000,
    })
  : null;

const applyCompanyFilters = (list: Company[], filters?: CompanyFilters): Company[] => {
  let companies = [...list];

  if (filters?.search?.trim()) {
    const q = filters.search.trim().toLocaleLowerCase('tr');
    companies = companies.filter((item) => item.name.toLocaleLowerCase('tr').includes(q));
  }

  if (filters?.city) {
    const selectedCity = filters.city;
    companies = companies.filter((item) => item.city.localeCompare(selectedCity, 'tr', { sensitivity: 'base' }) === 0);
  }

  if (filters?.category) {
    companies = companies.filter((item) => item.category === filters.category);
  }

  if (filters?.minScore != null && filters.minScore > 0) {
    const minScore = filters.minScore;
    companies = companies.filter((item) => item.score >= minScore);
  }

  if (filters?.leadTimeMax != null) {
    const maxLeadTime = filters.leadTimeMax;
    companies = companies.filter((item) => {
      const parts = item.leadTime.split('-');
      const maxDay = Number(parts[1]);
      return !Number.isNaN(maxDay) && maxDay <= maxLeadTime;
    });
  }

  return companies;
};

export const getAllCompanies = async (filters?: CompanyFilters): Promise<ApiResponse<Company[]>> => {
  const toResponse = (raw: Company[]) => ({
    success: true,
    data: applyCompanyFilters(raw, filters),
  });

  try {
    if (!api) throw new Error('VITE_BASE_URL is not configured');

    const params: Record<string, string | number> = {};
    if (filters?.city) params.city = filters.city;
    if (filters?.category) params.category = filters.category;

    const response = await api.get<Company[]>('/', { params });
    return toResponse(response.data ?? []);
  } catch (error) {
    console.warn('getAllCompanies remote failed, using local db fallback:', error);
    try {
      const localData = await getCompaniesFromLocalDb();
      return toResponse(localData);
    } catch (fallbackError) {
      console.error('getAllCompanies fallback failed:', fallbackError);
      return {
        success: false,
        data: null,
      };
    }
  }
};

export const getCompanyById = async (id: string): Promise<ApiResponse<Company>> => {
  try {
    if (!api) throw new Error('VITE_BASE_URL is not configured');

    const response = await api.get<Company>(`/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.warn('getCompanyById remote failed, using local db fallback:', error);
    try {
      const company = await getCompanyByIdFromLocalDb(id);
      return {
        success: company != null,
        data: company,
      };
    } catch (fallbackError) {
      console.error('getCompanyById fallback failed:', fallbackError);
      return {
        success: false,
        data: null,
      };
    }
  }
};
