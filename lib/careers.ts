export type Vacancy = {
  id: string;
  title: string;
  department: string;
  type: string; // e.g. "Full-time"
  location: string;
  experience: string;
  description: string;
  requirements?: string[];
};

/** Add open roles here. Leave the array empty to show the "nothing open" state. */
export const vacancies: Vacancy[] = [];

export const GENERAL = "General application";