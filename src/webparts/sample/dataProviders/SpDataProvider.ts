import IDataProvider from './IDataProvider';
import SampleListItem from '../models/SampleListItem';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export default class SpDataProvider implements IDataProvider {
  private static LIST_ITEMS_URL = `/_api/web/lists/getbytitle('Sample List')/items`;
  private static QUERY_STRING_PARAMETERS = '?$select=ID,Title,Color&$orderby=ID desc';
  private _context: WebPartContext;

  constructor(context: WebPartContext) {
    this._context = context;
  }

  public getSampleListData(): Promise<SampleListItem[]> {
    return this._context.spHttpClient.get(
      `${this._context.pageContext.web.absoluteUrl}${SpDataProvider.LIST_ITEMS_URL}${SpDataProvider.QUERY_STRING_PARAMETERS}`,
      SPHttpClient.configurations.v1
    ).then((response: SPHttpClientResponse) => {
      return response.json();
      }).then((results: { value: SampleListItem[] }) => {
      return results.value;
    });
  }
}
