import axios from 'axios';
import type { Company, CompanyFilters } from '@/types/company';
import type { ApiResponse } from '@/types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/mockData',
  timeout: 10000,
});

export const getAllCompanies = async (filters?: CompanyFilters): Promise<ApiResponse<Company[]>> => {
  try {
    const params: Record<string, string | number> = {};

    if (filters?.search) params.q = filters.search;
    if (filters?.city) params.city = filters.city;
    if (filters?.category) params.category = filters.category;

    const response = await api.get<Company[]>('/', { params });

    let companies = response.data;

    if (filters?.minScore) {
      companies = companies.filter((item) => item.score >= filters.minScore!);
    }

    if (filters?.leadTimeMax) {
      companies = companies.filter((item) => {
        const maxDay = Number(item.leadTime.split('-')[1]);
        return maxDay <= filters.leadTimeMax!;
      });
    }

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
