const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
};

export type AuthOrganization = {
  id: string;
  name: string;
  slug: string;
};

export type AuthSession = {
  user: AuthUser;
  organization: AuthOrganization;
  role: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  companyName: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? 'Something went wrong');
  }

  return response.json() as Promise<T>;
}

export function login(input: LoginInput) {
  return request<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function register(input: RegisterInput) {
  return request<AuthSession>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function logout() {
  return request<{ success: true }>('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentSession() {
  try {
    return await request<AuthSession>('/auth/me');
  } catch {
    return null;
  }
}
