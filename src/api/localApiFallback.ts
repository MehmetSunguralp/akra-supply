import type { Company } from '@/types/company';

type LocalDbPayload = {
  mockData?: Company[];
};

const SIMULATED_DELAY_MS = 750;

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const getCompaniesFromLocalDb = async (): Promise<Company[]> => {
  const response = await fetch('/db.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Local fallback request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as LocalDbPayload;
  const data = Array.isArray(payload.mockData) ? payload.mockData : [];

  await wait(SIMULATED_DELAY_MS);

  return data;
};

export const getCompanyByIdFromLocalDb = async (id: string): Promise<Company | null> => {
  const companies = await getCompaniesFromLocalDb();
  const company = companies.find((item) => item.id === id) ?? null;

  return company;
};
