const setItem = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
const getItem = key => window.localStorage.getItem(key)
const removeItem = key => window.localStorage.removeItem(key)

export default {
  setItem,
  getItem,
  removeItem
}