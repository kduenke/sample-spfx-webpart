import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SampleWebPartStrings';
import Sample from './components/Sample';
import { ISampleProps } from './components/ISampleProps';

import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import IDataProvider from './dataProviders/IDataProvider';
import MockDataProvider from './dataProviders/MockDataProvider';
import SpDataProvider from './dataProviders/SpDataProvider';

export interface ISampleWebPartProps {
  description: string;
}

export default class SampleWebPart extends BaseClientSideWebPart<ISampleWebPartProps> {
  public render(): void {
    let dataProvider: IDataProvider;
    switch (Environment.type) {
      case EnvironmentType.Local:
      case EnvironmentType.Test:
        dataProvider = new MockDataProvider();
        break;

      case EnvironmentType.ClassicSharePoint:
      case EnvironmentType.SharePoint:
      default:
        dataProvider = new SpDataProvider(this.context);
        break;
    }

    const element: React.ReactElement<ISampleProps > = React.createElement(
      Sample,
      {
        dataProvider: dataProvider,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
