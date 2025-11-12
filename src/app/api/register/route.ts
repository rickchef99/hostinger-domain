import { NextRequest } from 'next/server';

import { hostinger } from '@/services/hostinger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log({
      domain: body.domain,
      item_id: 'hostingercombr-domain-site-brl-1y',
    });
    const response = await hostinger.post('domains/v1/portfolio', {
      json: {
        domain: body.domain,
        item_id: 'hostingercombr-domain-site-brl-1y',
      },
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    });
    return Response.json(await response.json());
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
