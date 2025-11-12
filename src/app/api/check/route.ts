import { NextRequest } from 'next/server';

import { hostinger } from '@/services/hostinger';

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain');
  if (!domain) {
    return Response.json({ error: 'Domain is required' }, { status: 400 });
  }
  console.log(domain);
  const [tld, hostname] = domain.split('.').reverse();
  console.log(tld, hostname);
  const response = await hostinger.post('domains/v1/availability', {
    json: {
      domain: hostname,
      tlds: [tld],
    },
  });
  const data = await response.json();
  return Response.json({ data });
}
