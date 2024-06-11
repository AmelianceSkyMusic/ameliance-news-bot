import { returnError } from '../../../../../scripts/return-error';
import { doPost } from '../../base/doPost';
import type { DataUntitledResponse } from '../../types/types';

export interface PostTitledUpdate {
   spreadsheetId: string;
   sheetIndex?: number;
   sheetName?: string;
   col: number;
   row: number;
   value: number | string;
}

export interface PostTitledUpdateResponse {
   status: 'success' | 'partial' | 'error';
   data: DataUntitledResponse;
   info: {
      spreadsheetId: string;
      sheetName?: string;
      sheetIndex?: number;
      type: 'TITLED_UPDATE';
      indexesParams: Record<number, unknown>;
      length: string[];
      columnsCount: number;
   };
   error?: string;
}

export async function postTitledUpdate({
   spreadsheetId,
   sheetIndex,
   sheetName,
   col,
   row,
   value,
}: PostTitledUpdate): Promise<PostTitledUpdateResponse> {
   try {
      const response = await doPost({
         spreadsheetId,
         sheetIndex,
         sheetName,
         col,
         row,
         value,
         type: 'TITLED_UPDATE',
      });
      return response as PostTitledUpdateResponse;
   } catch (error) {
      const err = returnError(error);
      throw new Error(`${err.code} | ${err.message}`);
   }
}
