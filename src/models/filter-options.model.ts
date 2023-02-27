export default interface FilterOptionsModel {
  offset?: number;
  limit?: number;
  selects: string[];
  equals?: string[];
  sort?: string[];
}
