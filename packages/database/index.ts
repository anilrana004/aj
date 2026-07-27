import type { Database } from '../types';

// Re-export all Prisma model types
export * from './generated/types';

// Export the full Prisma client type for type safety
export { Prisma } from '@prisma/client';