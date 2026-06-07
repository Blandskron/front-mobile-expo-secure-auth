import * as React from 'react';
import renderer from 'react-test-renderer';
import { CustomInput } from '../ui/CustomInput';

describe('CustomInput Component', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<CustomInput placeholder="Test input" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with label and error', () => {
    const tree = renderer
      .create(
        <CustomInput
          label="Email"
          placeholder="Enter email"
          error="Email is invalid"
          iconName="mail-outline"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
