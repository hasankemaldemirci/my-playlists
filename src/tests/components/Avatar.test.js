import React from 'react'
import { shallow } from 'enzyme'

import Avatar from '../../components/Avatar'

let wrapper

beforeEach(() => {
  wrapper = shallow(<Avatar name="test" />)
})

test('Should render Avatar correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should set figure text correctly', () => {
  const figure = wrapper.find('figure').at(0)
  expect(figure.text()).toBe('T')
})
