import { NextRequest } from 'next/server';

import { hostinger } from '@/services/hostinger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await hostinger.post('domains/v1/portfolio', {
      json: {
        domain: body.domain,
        item_id: 'hostingercombr-domain-site-brl-1y',
      },
    });
    return new Response(response.body);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
