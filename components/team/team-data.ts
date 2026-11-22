export type Tone = "violet" | "ink" | "lime" | "coral";
export type Person = { name: string; role: string; tone: Tone };

export const management: Person[] = [
  { name: "Santosh Rajbanshi", role: "Chief Executive Officer", tone: "violet" },
  { name: "Sujan Adhikari", role: "Chairman", tone: "ink" },
  { name: "Binaya Neupane", role: "Chief Operating Officer", tone: "lime" },
  { name: "Krishna Prasad Khanal", role: "Business Development Officer", tone: "coral" },
];

export const team: Person[] = [
  { name: "Anup Kasula", role: "Technical Director | Senior FullStack Developer", tone: "violet" },
  { name: "Aabishkar Shrestha", role: "Technical Director | Senior FullStack Developer", tone: "ink" },
  { name: "Aryan Miya Mansoor", role: "Technical Director | SEO Expert", tone: "lime" },
  { name: "Rhythem Phuyal", role: "Project Manager", tone: "coral" },
  { name: "Jenish Prajapati", role: "Junior Web Developer", tone: "ink" },
  { name: "Dhiraj Kumar Sarraf", role: "Junior Web Developer", tone: "violet" },
  { name: "Kushal Poudel", role: "Junior Web Developer", tone: "lime" },
  { name: "Alok Kharel", role: "Junior Web Developer", tone: "coral" },
  { name: "Urmila K.c", role: "Content Writer & Creator", tone: "violet" },
  { name: "Smriti Sanjyal", role: "Junior Web Developer", tone: "ink" },
  { name: "Naresh Dhakal", role: "Digital Marketing Expert", tone: "lime" },
  { name: "Shreejan Shrestha", role: "UI/UX & Graphic Designer", tone: "coral" },
  { name: "Shriya Shakya", role: "UI/UX & Digital Marketing", tone: "ink" },
  { name: "Aaditya Shah", role: "Digital Marketing Intern", tone: "violet" },
  { name: "Sokim Rana", role: "Video Editor", tone: "lime" },
  { name: "Dil Maya Kafle", role: "Sales Manager", tone: "coral" },
  { name: "Anjali Kumari", role: "Digital Marketing Intern", tone: "ink" },
];

export const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();