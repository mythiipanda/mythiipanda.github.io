// Prefix a public/ path with the deploy base (empty at a domain root).
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + path;
