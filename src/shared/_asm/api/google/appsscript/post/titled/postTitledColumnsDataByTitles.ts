import { returnError } from '../../../../../scripts/return-error';
import { doPost } from '../../base/doPost';
import type { DataTitledResponse } from '../../types/types';

export interface PostTitledColumnsDataByTitles {
   spreadsheetId: string;
   sheetIndex?: number;
   sheetName?: string;
   titlesParams: Record<string, unknown>;
}

export interface PostTitledColumnsDataByTitlesResponse {
   status: 'success' | 'partial' | 'error';
   data: DataTitledResponse;
   info: {
      spreadsheetId: string;
      sheetName?: string;
      sheetIndex?: number;
      titles: string[];
      rowsCount: number;
      columnsCount: number;
      type: 'TITLED';

      columnTitles: string[];

      found?: string[];
      missed?: string[];
   };
   error?: string;
}

export async function postTitledColumnsDataByTitles({
   spreadsheetId,
   sheetIndex,
   sheetName,
   titlesParams,
}: PostTitledColumnsDataByTitles): Promise<PostTitledColumnsDataByTitlesResponse> {
   try {
      const response = await doPost({
         spreadsheetId,
         sheetIndex,
         sheetName,
         titlesParams,
         type: 'TITLED',
      });
      return response as PostTitledColumnsDataByTitlesResponse;
   } catch (error) {
      const err = returnError(error);
      throw new Error(`${err.code} | ${err.message}`);
   }
}
