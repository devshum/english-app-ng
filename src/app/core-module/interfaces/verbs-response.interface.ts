import { Verb } from './verb.interface';

export interface VerbsResponse {
  data: Verb[];
  status: number;
  total_results: number;
}
