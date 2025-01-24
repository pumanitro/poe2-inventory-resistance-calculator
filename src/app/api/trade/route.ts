import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api/config';

interface TradeError {
  error: {
    code: number;
    message: string;
  };
}

const makeTradeRequest = async (body: Record<string, unknown>) => {
    const headers = {
        ...API_CONFIG.headers,
        'referer': `${API_CONFIG.BASE_URL}/trade2/search/${API_CONFIG.REALM}/${API_CONFIG.LEAGUE}`,
    };

    try {
        const response = await fetch('https://www.pathofexile.com/api/trade2/search/poe2/Hardcore', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log('Response data:', data);
        
        // Check for authentication error
        if ((data as TradeError)?.error?.code === 2) {
            return {
                error: {
                    code: 'AUTH_REQUIRED',
                    message: 'Authentication required. Please update your POE session cookie.',
                    details: 'Visit pathofexile.com, log in, and copy your POESESSID cookie value.'
                }
            };
        }
        
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = await makeTradeRequest(body);
        
        if (data.error?.code === 'AUTH_REQUIRED') {
            return NextResponse.json(data, { status: 401 });
        }
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Trade API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch from POE Trade API' }, 
            { status: 500 }
        );
    }
}