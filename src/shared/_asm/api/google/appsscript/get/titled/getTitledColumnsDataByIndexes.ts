import { returnError } from '../../../../../scripts/return-error';
import { doGet } from '../../base/doGet';
import type { DataTitledResponse } from '../../types/types';

export interface GetTitledColumnsDataByIndexes {
   spreadsheetId: string;
   sheetIndex?: number;
   sheetName?: string;
   columnIndexes: number[];
}

export interface GetTitledColumnsDataByIndexesResponse {
   status: 'success' | 'partial' | 'error';
   data: DataTitledResponse;
   info: {
      spreadsheetId: string;
      sheetName?: string;
      sheetIndex?: number;
      titles: string[];
      rowsCount: number;
      columnsCount: number;
      columns: string[];
      type: 'TITLED';

      columnIndexes: number[];

      found?: string[];
      missed?: string[];
   };
   error?: string;
}

export async function getTitledColumnsDataByIndexes({
   spreadsheetId,
   sheetIndex,
   sheetName,
   columnIndexes,
}: GetTitledColumnsDataByIndexes): Promise<GetTitledColumnsDataByIndexesResponse> {
   try {
      const response = await doGet({
         spreadsheetId,
         sheetIndex,
         sheetName,
         columnIndexes,
         type: 'TITLED',
      });
      return response as GetTitledColumnsDataByIndexesResponse;
   } catch (error) {
      const err = returnError(error);
      throw new Error(`${err.code} | ${err.message}`);
   }
}
