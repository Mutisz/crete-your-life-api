declare module "fixer-node" {
  class Fixer {
    public constructor(accessKey: string);
    public symbols(): Fixer.SymbolsResponse;
    public latest(options?: Fixer.RequestOptions): Fixer.RatesResponse;
    public historical(options: Fixer.HistoricalOptions): Fixer.RatesResponse;
    public timeseries(
      options: Fixer.TimeframeOptions
    ): Fixer.TimeseriesResponse;
    public fluctuation(
      options: Fixer.TimeframeOptions
    ): Fixer.FluctuationResponse;
    public convert(options: Fixer.ConvertOptions): Fixer.ConvertResponse;
  }

  namespace Fixer {
    export interface ConstructorOptions {
      https?: string;
    }

    export interface RequestOptions {
      base?: string;
      symbols?: string | string[];
    }

    export interface HistoricalOptions extends RequestOptions {
      date: string;
    }

    export interface TimeframeOptions extends RequestOptions {
      start_date: string;
      end_date: string;
    }

    export interface ConvertOptions {
      from: string;
      to: string;
      amount: number;
      date?: string;
    }

    export interface Response {
      success: boolean;
    }

    export interface SymbolsResponse extends Response {
      symbols: { [code: string]: string };
    }

    export interface RatesResponse extends Response {
      timestamp: number;
      base: string;
      date: string;
      rates: { [code: string]: number };
    }

    export interface TimeframeResponse extends Response {
      base: string;
      start_date: string;
      end_date: string;
    }

    export interface TimeseriesResponse extends TimeframeResponse {
      rates: { [date: string]: { [code: string]: number } };
    }

    export interface FluctuationResponse extends TimeframeResponse {
      rates: {
        [code: string]: {
          start_rate: number;
          end_rate: number;
          change: number;
          change_pct: number;
        };
      };
    }

    export interface ConvertResponse extends Response {
      query: { from: string; to: string; amount: number };
      info: { timestamp: number; rate: number };
      historical: boolean;
      date: string;
      result: number;
    }
  }

  export = Fixer;
}
