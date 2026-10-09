export interface Data {
  date: string;
  value: number;
}

export interface Point { 
  ts: number;
  value: number;
}

export interface DateFilters {
  startDate: string;
  endDate: string;
}