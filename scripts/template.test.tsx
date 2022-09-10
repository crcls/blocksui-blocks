import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '../test-utils/user-event'

import COMP_NAME from './COMP_NAME'

import { createId } from '../utils/id'

const id = createId()

const blockConfig = {
  children: [],
  connections: [],
  connectionMap: [],
  deps: {},
  id,
  props: {},
  state: {
    stateKey: 'value',
  },
  type: 'COMP_NAME',
}

describe('', () => {
  test('', () => {})
})
