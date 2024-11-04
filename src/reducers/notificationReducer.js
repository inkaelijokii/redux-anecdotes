import { createSlice } from '@reduxjs/toolkit'

let timeoutId

export const setNotification = (message, duration) => (dispatch) => {
  dispatch(showNotification(message))
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    dispatch(clearNotification())
  }, duration * 1000)
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer