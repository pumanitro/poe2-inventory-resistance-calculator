interface TradeQuery {
  query: {
    status: {
      option: string;
    };
    stats: {
      type: string;
      filters: {
        id: string;
        value?: {
          weight: number;
        };
        disabled: boolean;
      }[];
      disabled: boolean;
    }[];
    filters: {
      req_filters: {
        disabled: boolean;
        filters: {
          lvl: {
            max: number;
          };
        };
      };
    };
  };
  sort: {
    price?: string;
    "statgroup.0": string;
  };
}

interface ResistanceWeight {
  fire: number;
  cold: number;
  lightning: number;
  chaos: number;
}

interface TradeResult {
  id: string;
  result: string[];
  total: number;
}

interface TradeItem {
  id: string;
  // Add more specific item properties as needed
}

interface TradeResponse {
  error?: {
    code: string;
    message: string;
    details: string;
  };
  items?: TradeItem[];
}

export async function findItem(missingResistances: ResistanceWeight, level: number): Promise<TradeResponse | null> {
  const query: TradeQuery = {
    query: {
      status: { option: "online" },
      stats: [
        {
          type: "weight",
          filters: [
            // Individual resistances
            {
              id: "explicit.stat_3372524247", // Fire resistance
              value: { weight: missingResistances.fire },
              disabled: missingResistances.fire === 0
            },
            {
              id: "explicit.stat_4220027924", // Cold resistance
              value: { weight: missingResistances.cold },
              disabled: missingResistances.cold === 0
            },
            {
              id: "explicit.stat_1671376347", // Lightning resistance
              value: { weight: missingResistances.lightning },
              disabled: missingResistances.lightning === 0
            },
            {
              id: "explicit.stat_2923486259", // Chaos resistance
              value: { weight: missingResistances.chaos },
              disabled: missingResistances.chaos === 0
            },
            // All elemental resistances
            {
              id: "explicit.stat_2901986750",
              value: { 
                weight: Math.max(
                  missingResistances.fire, 
                  missingResistances.cold, 
                  missingResistances.lightning
                ) * 3 
              },
              disabled: (missingResistances.fire + missingResistances.cold + missingResistances.lightning) === 0
            }
          ],
          disabled: false
        }
      ],
      filters: {
        req_filters: {
          disabled: false,
          filters: {
            lvl: { max: level }
          }
        }
      }
    },
    sort: { 
      "statgroup.0": "desc"  // Sort by highest weighted stat group
    }
  };

  try {
    // First request - search for items
    const searchResponse = await fetch('/api/trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    });

    const searchResult = await searchResponse.json();
    
    if (searchResult.error) {
      return searchResult;
    }

    // Check if we have a valid response with results
    if (!searchResult?.result || !Array.isArray(searchResult.result) || searchResult.result.length === 0) {
      console.log('No items found matching criteria');
      return null;
    }

    // Second request - fetch item details
    const itemIds = searchResult.result.slice(0, 10).join(',');
    const fetchResponse = await fetch(`/api/trade/fetch/${itemIds}?query=${searchResult.id}`);
    const items = await fetchResponse.json() as TradeItem[];

    return { items };
  } catch (error) {
    console.error('Error searching for items:', error);
    return null;
  }
} 