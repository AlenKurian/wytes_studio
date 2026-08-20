export type Project = {
  label: string;
  colorClass: string;
  navTheme: "light" | "dark";
};

export const PROJECTS: Project[] = [
  { label: "Project 1", colorClass: "bg-[#7a3232]", navTheme: "dark" },
  { label: "Project 2", colorClass: "bg-[#e3a8a8]", navTheme: "light" },
  { label: "Project 3", colorClass: "bg-[#d97a6e]", navTheme: "light" },
];
