import { NextResponse } from 'next/server';

const makeTradeRequest = async (body: Record<string, unknown>) => {
    const headers = {
        'accept': '*/*',
        'content-type': 'application/json',
        'cookie': 'POESESSID=e4a60421ff35d8ce2d27b07f2184c3b0; cf_clearance=Ne7CYNfCYPrcF4p9j5Nc5LDVuEcPedT9qRIkXppsbVI-1737754789-1.2.1.1-ffggrhqvWL54FNImC1j65Wd0WtMb0SM.OapuHLFA9JatlEyqfh8Lm3dHARcEUxVptu.lRoBJXjFXrieKtsRBXiGRLhQ7IeAn6OSpETS6VJTjUEh6j9SI4jm2_oeNO4cF0i3brzeFFxEySXENmOaTBkaBro73WB9ofah8MUNcH6sBT6Wsx4vz7nU0qV44hw3W37mBGOzOHh9E4I2ePu7cv174vkw3hwOjbIAlIwbmNsdV5._kTx_DQObLOOBv1x1261Mg1AJAQZ.u2DIkhkZDOzeyEJ7JCjpUb6QtkEhrA_6jtMH3N5zK44qKARyDUg8AbggLtV6jzrvhwekPZLnG0g',
        'origin': 'https://www.pathofexile.com',
        'referer': 'https://www.pathofexile.com/trade2/search/poe2/Hardcore/O0vO4brfE',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    };

    try {
        const response = await fetch('https://www.pathofexile.com/api/trade2/search/poe2/Hardcore', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log curl format for debugging
        console.log(`curl 'https://www.pathofexile.com/api/trade2/search/poe2/Hardcore' \\
  -H 'accept: */*' \\
  -H 'content-type: application/json' \\
  --data-raw '${JSON.stringify(body)}'`);

        const data = await makeTradeRequest(body);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Trade API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch from POE Trade API' }, 
            { status: 500 }
        );
    }
}