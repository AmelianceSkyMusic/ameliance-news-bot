import { returnError } from '../../../../scripts/return-error';
import type { DoGet, Response } from '../types/types';
import { baseURL } from './baseURL';

export async function doGet({
   spreadsheetId,
   sheetName,
   sheetIndex,
   columnTitles,
   columnIndexes,
   type,
}: DoGet): Promise<Response> {
   const URLParams = new URLSearchParams();
   if (spreadsheetId) URLParams.append('spreadsheetId', spreadsheetId);
   if (sheetName) URLParams.append('sheetName', sheetName);
   if (sheetIndex) URLParams.append('sheetIndex', sheetIndex.toString());
   if (columnTitles) URLParams.append('columnTitles', JSON.stringify(columnTitles));
   if (columnIndexes) URLParams.append('columnIndexes', JSON.stringify(columnIndexes));
   if (type) URLParams.append('type', type);

   try {
      const response = await fetch(`${baseURL}?${URLParams}`);
      const textData = await response.text();
      const data = await JSON.parse(textData);
      if (data.status !== 'success') throw new Error(data.error);
      return data;
   } catch (error) {
      const err = returnError(error);
      throw new Error(`${err.code} | ${err.message}`);
   }
}
