import SampleListItem from '../models/SampleListItem';

export default interface IDataProvider {
  getSampleListData(): Promise<SampleListItem[]>;
}
