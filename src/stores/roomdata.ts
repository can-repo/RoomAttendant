import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RoomDetail } from '../types/api.RoomDetail'

export const useRoomStore = defineStore('Room Data', () => {
  const RoomData = ref<RoomDetail | null>(null)

  const setRoomData = (data: RoomDetail) => {
    RoomData.value = data
  }

  const clearRoomData = () => {
    RoomData.value = null
  }

  return { RoomData, setRoomData, clearRoomData }
})
