export const Routes = {
  home: "/",
  settings: {
    profile: "/settings/profile",
    appearance: "/settings/appearance",
  },
  teams: {
    home: "/teams",
    id: (teamId: string) => `/teams/${teamId}`,
  },
} as const;
