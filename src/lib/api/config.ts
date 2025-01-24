export const API_CONFIG = {
  COOKIE: process.env.POE_COOKIE || '',
  USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  BASE_URL: 'https://www.pathofexile.com',
  REALM: 'poe2',
  LEAGUE: 'Hardcore',
  
  headers: {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'cookie': process.env.POE_COOKIE || '',
    'origin': 'https://www.pathofexile.com',
    'priority': 'u=1, i',
    'referer': 'https://www.pathofexile.com/trade2/search/poe2/Hardcore',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  }
}; 