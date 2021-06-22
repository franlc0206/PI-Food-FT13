import React from 'react';
import { configure, mount, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import LandingPage from './LandingPage.js';
import { Link, NavLink} from 'react-router-dom';

configure({adapter: new Adapter()});

describe('LandingPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  shallow(<LandingPage />)
  })

  it('should render a button', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1)
  })
  it('this button it has to contains the text "Start searching" and change the route to "/home"', () => {
    expect(wrapper.find(NavLink).text()).toEqual('Start searching')
    expect(wrapper.find(NavLink).prop('to')).toEqual('/home')
  })
  
});