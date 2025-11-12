import { NextRequest } from 'next/server';

import { hostinger } from '@/services/hostinger';

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain');
  const token = request.nextUrl.searchParams.get('token');
  if (!domain || !token) {
    return Response.json(
      { error: 'Domain is required and token is required' },
      { status: 400 }
    );
  }
  const [tld, hostname] = domain.split('.').reverse();
  const response = await hostinger.post('domains/v1/availability', {
    json: {
      domain: hostname,
      tlds: [tld],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return Response.json({ data });
}
