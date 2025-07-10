import suburbsData from '../data/generatedSuburbs.json';
import { Suburb } from '../types';

export const getSuburbs = (): Suburb[] => {
  return suburbsData as Suburb[];
};

export const getSuburbBySlug = (slug: string): Suburb | undefined => {
  return suburbsData.find((suburb: Suburb) => suburb.slug === slug);
};

export const getSuburbsByRegion = (region: string): Suburb[] => {
  return suburbsData.filter((suburb: Suburb) => suburb.region === region);
};

export const searchSuburbs = (query: string): Suburb[] => {
  const lowercaseQuery = query.toLowerCase();
  return suburbsData.filter((suburb: Suburb) =>
    suburb.name.toLowerCase().includes(lowercaseQuery) ||
    suburb.description.toLowerCase().includes(lowercaseQuery)
  );
}; 