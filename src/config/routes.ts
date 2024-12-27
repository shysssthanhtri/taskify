export const Routes = {
  home: "/",
  settings: {
    profile: "/settings/profile",
    appearance: "/settings/appearance",
  },
  teams: {
    id: (teamId: string) => `/teams/${teamId}`,
  },
  projects: {
    id: (teamId: string, projectId: string) =>
      `/teams/${teamId}/projects/${projectId}`,
  },
} as const;
