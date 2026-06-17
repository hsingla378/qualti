import type { AuthenticatedUser } from '../../modules/auth/types';
import type { OrganizationContext } from '../decorators/current-organization.decorator';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}

    interface Request {
      organization: OrganizationContext;
    }
  }
}

export {};
