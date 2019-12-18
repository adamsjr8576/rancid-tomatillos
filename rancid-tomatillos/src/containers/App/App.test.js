import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;
   
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it.skip('should match the snapshot with all the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  })
