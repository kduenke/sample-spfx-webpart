import * as React from 'react';
import styles from './Sample.module.scss';
import { ISampleProps } from './ISampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

import ISampleState from './ISampleState';
import SampleListItem from '../models/SampleListItem';

export default class Sample extends React.Component<ISampleProps, ISampleState> {
  constructor() {
    super();

    this.state = {
      listItems: null,
    };
  }

  public componentDidMount() {
    this.props.dataProvider.getSampleListData().then((results: SampleListItem[]) => {
      const listItems: JSX.Element[] = results.map((item: SampleListItem) => {
        return (
          <li>
            {item.ID} - {item.Title} : {item.Color}
          </li>
        );
      });

      this.setState({
        listItems: listItems,
      });
    });
  }

  public render(): React.ReactElement<ISampleProps> {
    return (
      <div className={styles.sample}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>

              <ul>
                {this.state.listItems}
              </ul>

              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
