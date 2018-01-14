import IDataProvider from './IDataProvider';
import SampleListItem from '../models/SampleListItem';
import MockData from './MockData';

export default class MockDataProvider implements IDataProvider {
  public getSampleListData(): Promise<SampleListItem[]> {
    return new Promise<SampleListItem[]>((resolve) => {
      resolve(MockData);
    });
  }
}
