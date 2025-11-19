<template>
  <div class="app-container stack-sans-text-regular">
    <!-- Header Bar -->
    <div class="header-bar">
      <div class="back-button" @click="goToRoomSearch">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="white" />
        </svg>
      </div>
      <div class="header-title">{{ roomNumber }}</div>
      <div class="header-spacer"></div>
      <!-- Spacer for centering -->
    </div>

    <div class="content-scrollable">
      <!-- Status Buttons Row -->
      <div class="status-buttons-row">
        <div class="status-badge occupied" v-if="roomData && roomData.status_fo === 'Occupied'">
          <span class="stack-sans-text-medium">Occupied</span>
        </div>
        <div class="status-badge vacant" v-else-if="roomData && roomData.status_fo === 'Vacant'">
          <span class="stack-sans-text-medium">Vacant</span>
        </div>
        <div class="status-badge dirty" v-if="roomData && roomData.status_hk === 'Dirty'">
          <span class="stack-sans-text-medium">Dirty</span>
        </div>
        <div class="status-badge clean" v-else-if="roomData && roomData.status_hk === 'Clean'">
          <span class="stack-sans-text-medium">Clean</span>
        </div>
      </div>

      <!-- Guest Info Section -->
      <div class="guest-info-section" v-if="roomData">
        <div class="guest-name stack-sans-text-semibold">{{ roomData.guestname }}</div>

        <div class="dates-row">
          <div class="date-group left">
            <div class="date-label stack-sans-text-medium">Arrival</div>
            <div class="date-value stack-sans-text-semibold">
              {{
                formatDate(
                  typeof roomData.arrivaldate === 'string'
                    ? roomData.arrivaldate
                    : roomData.arrivaldate?.toString(),
                )
              }}
            </div>
          </div>
          <div class="date-group right">
            <div class="date-label stack-sans-text-medium">Departure</div>
            <div class="date-value stack-sans-text-semibold">
              {{
                formatDate(
                  typeof roomData.departuredate === 'string'
                    ? roomData.departuredate
                    : roomData.departuredate?.toString(),
                )
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- Room Flags (Checkboxes) -->
      <div class="room-flags-container">
        <div class="flags-column">
          <div v-for="(flag, index) in leftFlags" :key="'left-' + index" class="flag-item">
            <div class="custom-checkbox"></div>
            <span class="flag-label stack-sans-text-regular">{{ flag }}</span>
          </div>
        </div>
        <div class="flags-column">
          <div v-for="(flag, index) in rightFlags" :key="'right-' + index" class="flag-item">
            <div class="custom-checkbox"></div>
            <span class="flag-label stack-sans-text-regular">{{ flag }}</span>
          </div>
        </div>
      </div>

      <!-- Room Message -->
      <div class="input-section">
        <div class="section-label stack-sans-text-semibold">Room Message</div>
        <div class="text-area-box">{{ roomData?.noteroommessage || 'No message' }}</div>
      </div>

      <!-- Guest Preference -->
      <div class="input-section">
        <div class="section-label stack-sans-text-semibold">Guest Preference</div>
        <div class="text-area-box">{{ roomData?.noteprefer || 'No preference' }}</div>
      </div>

      <!-- Footer Buttons -->
      <div class="footer-buttons">
        <button class="action-btn stack-sans-text-medium">Amenities</button>
        <button class="action-btn stack-sans-text-medium">Mini Bar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoomStore } from '../stores/roomdata'
import { callApiDetailRoom } from '../api/api'
import type { RoomDetail } from '../types/api.RoomDetail'

const router = useRouter()
const route = useRoute()

// Get the room number from the route parameter
const roomNumber = computed(() => route.params.roomNumber as string)

// Get room data from the store
const store = useRoomStore()
const roomData = computed(() => store.RoomData as RoomDetail | null)

// Fetch room data when component mounts or room number changes
onMounted(async () => {
  if (roomNumber.value) {
    await fetchRoomData(roomNumber.value)
  }
})

// Watch for room number changes and fetch new data
watch(roomNumber, async (newRoomNumber) => {
  if (newRoomNumber) {
    await fetchRoomData(newRoomNumber)
  }
})

const fetchRoomData = async (roomNum: string) => {
  try {
    // Fetch room data from API
    const roomDetailData = await callApiDetailRoom(roomNum, roomNum)

    // Store the data in the pinia store
    store.setRoomData(roomDetailData)
  } catch (error) {
    console.error('Error fetching room detail:', error)
  }
}

// Data Checkbox Kiri
const leftFlags = [
  'Reject For Cleaning',
  'Double Lock',
  'No Luggage',
  'Sleep Out',
  'Sick Guest',
  'VIP',
  'Complained',
  'Transaction Close',
]

// Data Checkbox Kanan
const rightFlags = [
  'DND Hanger',
  'Borrowed Item',
  'Repeater Guest',
  'Handicap/ Disable',
  'Honeymoon',
  'Request',
  'Locked Minibar',
]

const goToRoomSearch = () => {
  router.push('/room-search')
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  // Format date string to DD-MMM-YY format
  try {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString().slice(-2)
    return `${day}-${month}-${year}`
  } catch {
    return dateString // Return original if parsing fails
  }
}
</script>

<style scoped>
/* Global Font Import sebaiknya di index.html, tapi diasumsikan sudah ada */
.font-lexend {
  font-family: 'Lexend', sans-serif;
}

.app-container {
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  max-width: 480px; /* Mobile size simulation */
  margin: 0 auto;
  position: relative;
}

/* --- Header --- */
.header-bar {
  background-color: #4fa4d8; /* Warna biru header */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  flex-shrink: 0;
}

.header-title {
  color: white;
  font-size: 22px;
  font-weight: 500;
}

.back-button {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.header-spacer {
  width: 28px; /* Balance the back button width */
}

/* --- Content Scroll Area --- */
.content-scrollable {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* --- Status Buttons --- */
.status-buttons-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.status-badge {
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-badge.occupied {
  background-color: #f2e8a5; /* Kuning Occupied */
}

.status-badge.vacant {
  background-color: #d4edda; /* Hijau Vacant */
}

.status-badge.dirty {
  background-color: #4cb5f5; /* Biru Dirty */
}

.status-badge.clean {
  background-color: #c3e6cb; /* Hijau Clean */
}

/* --- Guest Info --- */
.guest-info-section {
  text-align: center;
  margin-bottom: 25px;
}

.guest-name {
  font-size: 24px;
  font-weight: 700;
  color: black;
  margin-bottom: 15px;
}

.dates-row {
  display: flex;
  justify-content: space-between;
  padding: 0 20px; /* Indent agar tidak terlalu mepet pinggir */
}

.date-group {
  display: flex;
  flex-direction: column;
}

.date-group.left {
  align-items: flex-start;
}

.date-group.right {
  align-items: flex-end;
}

.date-label {
  font-size: 14px;
  color: #c0c0c0; /* Abu-abu label */
  margin-bottom: 4px;
}

.date-value {
  font-size: 18px;
  font-weight: 700;
  color: black;
}

/* --- Flags / Checkboxes --- */
.room-flags-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.flags-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

/* Memberi sedikit jarak antar kolom agar tidak bertabrakan */
.flags-column:first-child {
  padding-right: 5px;
}
.flags-column:last-child {
  padding-left: 5px;
}

.flag-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-checkbox {
  width: 22px;
  height: 22px;
  border: 1.5px solid black;
  background: white;
  flex-shrink: 0;
}

.flag-label {
  font-size: 14px;
  color: #333;
  line-height: 1.2;
}

/* --- Input Sections --- */
.input-section {
  margin-bottom: 20px;
}

.section-label {
  font-size: 15px;
  font-weight: 600;
  color: black;
  margin-bottom: 5px;
}

.text-area-box {
  width: 100%;
  height: 120px; /* Sesuaikan tinggi kotak */
  border: 1.5px solid black;
  background: white;
}

/* --- Footer Buttons --- */
.footer-buttons {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.action-btn {
  flex: 1;
  background-color: #4fa4d8;
  color: white;
  border: none;
  padding: 15px 0;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
