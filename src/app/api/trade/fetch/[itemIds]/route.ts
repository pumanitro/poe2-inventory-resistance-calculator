import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api/config';

export async function GET(
  request: Request,
  context: { params: { itemIds: string } }
) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const itemIds = decodeURIComponent(url.pathname.split('/').pop() || '');

    if (!query || !itemIds) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/api/trade2/fetch/${itemIds}?query=${query}&realm=${API_CONFIG.REALM}`, 
      {
        headers: {
          ...API_CONFIG.headers,
          'referer': `${API_CONFIG.BASE_URL}/trade2/search/${API_CONFIG.REALM}/${API_CONFIG.LEAGUE}/${query}`,
        }
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Trade Fetch API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item details' }, 
      { status: 500 }
    );
  }
} 