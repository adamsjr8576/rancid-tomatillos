import React from 'react';
import {shallow} from 'enzyme';
import Loading from './Loading.js'
 
describe('Loading', () => {
  let wrapper;
 
  beforeEach(() => {
    wrapper = shallow(<Loading />)
  })
 
  it('should match the snapshot with all the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
 
});