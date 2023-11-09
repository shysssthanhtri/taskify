export function isLocalEnv(): boolean {
  return process.env.NODE_ENV === 'local';
}
