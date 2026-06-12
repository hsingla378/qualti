import type { OrganizationContext } from '../decorators/current-organization.decorator';

declare global {
  namespace Express {
    interface Request {
      organization: OrganizationContext;
    }
  }
}

export {};
