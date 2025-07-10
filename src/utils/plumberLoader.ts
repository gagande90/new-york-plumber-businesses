import plumbersData from '../data/generatedPlumbers.json';
import { Plumber } from '../types';

export const getPlumbers = (): Plumber[] => {
  return plumbersData as Plumber[];
};

export const getPlumberById = (id: string): Plumber | undefined => {
  return plumbersData.find((plumber: Plumber) => plumber.id === id);
};

export const getPlumbersBySuburb = (suburbId: string): Plumber[] => {
  return plumbersData.filter((plumber: Plumber) => 
    plumber.areasServiced.includes(suburbId)
  );
};

export const searchPlumbers = (query: string): Plumber[] => {
  const lowercaseQuery = query.toLowerCase();
  return plumbersData.filter((plumber: Plumber) =>
    plumber.businessName.toLowerCase().includes(lowercaseQuery) ||
    plumber.description.toLowerCase().includes(lowercaseQuery) ||
    plumber.services.some(service => service.toLowerCase().includes(lowercaseQuery))
  );
};

export const getPlumbersByService = (service: string): Plumber[] => {
  return plumbersData.filter((plumber: Plumber) =>
    plumber.services.includes(service)
  );
}; 