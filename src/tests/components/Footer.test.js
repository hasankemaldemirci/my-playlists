import React from 'react'
import { shallow } from 'enzyme'

import Footer from '../../components/Footer/index'

test('Should render Footer correctly', () => {
  const wrapper = shallow(<Footer />)

  expect(wrapper).toMatchSnapshot()
})