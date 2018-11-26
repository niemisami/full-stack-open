import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => savedItems = {}
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

jest.mock('./services/blogs')
