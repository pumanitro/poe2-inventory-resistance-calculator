export interface ItemFlag {
  unique?: boolean;
}

export interface Item {
  type: string;
  text?: string;
  name?: string;
  flags?: ItemFlag;
}

export interface ItemCategory {
  id: string;
  label: string;
  entries: Item[];
}

export interface ItemsData {
  result: ItemCategory[];
} 