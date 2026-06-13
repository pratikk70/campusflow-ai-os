// Vite uses import.meta.env instead of process.env
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';