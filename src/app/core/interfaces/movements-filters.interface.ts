import { MovementsRangeType } from '@enums/movements-range-type.enum';

export interface MovementsFilters {
  rangeType: MovementsRangeType;
  yearSelected: number;
  senderClientsRfcs: string[];
  senderProvidersRfcs: string[];
}
