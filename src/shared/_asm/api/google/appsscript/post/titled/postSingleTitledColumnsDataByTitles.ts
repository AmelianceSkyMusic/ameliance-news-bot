import { returnError } from '../../../../../scripts/return-error';
import { doPost } from '../../base/doPost';
import type { DataTitledResponse } from '../../types/types';

export interface PostSingleTitledColumnsDataByTitles {
   spreadsheetId: string;
   sheetIndex?: number;
   sheetName?: string;
   titlesParams: Record<string, unknown>;
}

export interface PostSingleTitledColumnsDataByTitlesResponse {
   status: 'success' | 'partial' | 'error';
   data: DataTitledResponse;
   info: {
      spreadsheetId: string;
      sheetName?: string;
      sheetIndex?: number;
      titles: string[];
      rowsCount: number;
      columnsCount: number;
      type: 'TITLED_SINGLE';

      columnTitles: string[];

      found?: string[];
      missed?: string[];
   };
   error?: string;
}

export async function postSingleTitledColumnsDataByTitles({
   spreadsheetId,
   sheetIndex,
   sheetName,
   titlesParams,
}: PostSingleTitledColumnsDataByTitles): Promise<PostSingleTitledColumnsDataByTitlesResponse> {
   try {
      const response = await doPost({
         spreadsheetId,
         sheetIndex,
         sheetName,
         titlesParams,
         type: 'TITLED_SINGLE',
      });
      return response as PostSingleTitledColumnsDataByTitlesResponse;
   } catch (error) {
      const err = returnError(error);
      throw new Error(`${err.code} | ${err.message}`);
   }
}
