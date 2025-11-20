import axios from 'axios'
import { BASE_URL, STATIC_TOKEN } from '../config/config' // Import config
import type { RoomStatus } from '../types/api.RoomStatus' // Import types
import type { RoomDetail } from '../types/api.RoomDetail' // Import types

export const callApiRoomStatus = async (): Promise<RoomStatus> => {
  const token = STATIC_TOKEN
  // Using BASE_URL from config which will be configured for proxy
  const apiUrl = `${BASE_URL}/ra-status`

  try {
    console.log('Making request to:', apiUrl, 'with params:', { token })
    const response = await axios.get(apiUrl, {
      params: {
        token,
      },
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Atau value lain, seperti 'true'
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    })

    // Check if response is HTML (error page) instead of JSON
    if (typeof response.data === 'string' && response.data.includes('HTML')) {
      console.error('Received HTML response instead of JSON:', response.data)
      throw new Error('API returned error page instead of data')
    }

    console.log('API Response:', response.data)
    return response.data
  } catch (error: any) {
    console.error('Error calling /room status API:', error.message || error)
    console.error('Error details:', error.response || error.request || error.message)
    throw error
  }
}

export const callApiDetailRoom = async (
  Sroom: string,
  Eroom: string,
): Promise<RoomDetail> => {
  const token = STATIC_TOKEN
  // Using BASE_URL from config which will be configured for proxy
  const apiUrl = `${BASE_URL}room-detail`

  try {
    console.log('Making request to:', apiUrl, 'with params:', { token, Sroom, Eroom })
    const response = await axios.get(apiUrl, {
      params: {
        token,
        Sroom,
        Eroom,
      },
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Atau value lain, seperti 'true'
        'Content-Type': 'application/json',
      },
      // Add timeout and withCredentials if needed
      timeout: 10000, // 10 second timeout
    })

    // Check if response is HTML (error page) instead of JSON
    if (typeof response.data === 'string' && response.data.includes('HTML')) {
      console.error('Received HTML response instead of JSON:', response.data)
      throw new Error('API returned error page instead of data')
    }

    console.log('API Response:', response.data)
    return response.data
  } catch (error: any) {
    console.error('Error calling /detail room API:', error.message || error)
    console.error('Error details:', error.response || error.request || error.message)
    throw error
  }
}
