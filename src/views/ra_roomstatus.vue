<template>
  <div class="app-container stack-sans-text-regular">
    <!-- Header -->
    <div class="header-bar">
      <div class="header-icon left">
        <!-- Back Arrow Icon -->
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="header-title stack-sans-text-medium">Room Attendant</div>
      <div class="header-icon right">
        <!-- Menu Dots Icon -->
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="5" r="2" fill="white" />
          <circle cx="12" cy="12" r="2" fill="white" />
          <circle cx="12" cy="19" r="2" fill="white" />
        </svg>
      </div>
    </div>

    <!-- Table Header -->
    <div class="table-header-row">
      <div class="th-cell section-col stack-sans-text-semibold">Section</div>
      <div class="th-cell desc-col stack-sans-text-semibold">Description</div>
      <div class="th-cell total-col stack-sans-text-semibold">Total</div>
    </div>

    <!-- Scrollable Content -->
    <div class="content-area">
      <div
        v-for="(row, index) in tableData"
        :key="index"
        class="data-row"
        :class="{ 'row-gap': row.hasGap, 'stripe-bg': index % 2 !== 0 }"
      >
        <div class="td-cell section-col stack-sans-text-regular">{{ row.section }}</div>
        <div class="td-cell desc-col stack-sans-text-medium">{{ row.description }}</div>
        <div class="td-cell total-col stack-sans-text-semibold">{{ row.total }}</div>
      </div>

      <!-- Floating Refresh Icon (Bottom Left) -->
      <div class="refresh-icon-container">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.133 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86699 18 5.29168L21 8"
            stroke="#4FA4D8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 3V8H16M3 21V16H8"
            stroke="#4FA4D8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div class="footer-btn stack-sans-text-medium" @click="goToStatus">Status</div>
      <div class="footer-btn stack-sans-text-medium" @click="goToRoomSearch">Room</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Data tabel dengan properti 'hasGap' untuk memberikan jarak antar grup
const tableData = ref([
  { section: '0', description: 'Rush Room (CIQ)', total: 1, hasGap: false },
  { section: '1', description: 'Dirty', total: 45, hasGap: false },
  { section: '1', description: 'Clean', total: 78, hasGap: false },
  { section: '5', description: 'Ready', total: 120, hasGap: true }, // Gap after this
  { section: '2', description: 'Occupied Dirty', total: 28, hasGap: false },
  { section: '0', description: 'Expected Arrival', total: 3, hasGap: false },
  { section: '2', description: 'Expected Departure', total: 61, hasGap: true }, // Gap after this
  { section: '0', description: 'Vacant', total: 63, hasGap: false },
  { section: '8', description: 'Occupied', total: 180, hasGap: true }, // Gap after this
  { section: '0', description: 'Out Of Order', total: 0, hasGap: false },
  { section: '0', description: 'Out Of Inventory', total: 0, hasGap: false },
])

const goToRoomSearch = () => {
  router.push('/room-search')
}

const goToStatus = () => {
  // Already on the status page, no navigation needed
}
</script>

<style scoped>
/* Global Font */
.font-lexend {
  font-family: 'Lexend', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}

/* Header */
.header-bar {
  background-color: #4fa4d8;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  flex-shrink: 0;
}

.header-title {
  color: white;
  font-size: 20px;
  font-weight: 500;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  cursor: pointer;
}

/* Table Header */
.table-header-row {
  background-color: #bfd6e7; /* Warna abu-biru header tabel */
  display: flex;
  height: 45px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.th-cell {
  font-weight: 600;
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Pemisah putih antar kolom header */
.th-cell:not(:last-child) {
  border-right: 2px solid white;
}

/* Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
  position: relative; /* Untuk floating icon */
  background-color: white;
}

/* Data Rows */
.data-row {
  display: flex;
  min-height: 45px;
  align-items: center;
  font-size: 18px;
  color: black;
}

/* Efek belang-belang (Zebra striping) */
.stripe-bg {
  background-color: #f9f9f9;
}

/* Margin bawah untuk pemisah grup */
.row-gap {
  margin-bottom: 25px;
}

/* Cells Styling */
.td-cell {
  padding: 5px;
}

.section-col {
  width: 20%;
  text-align: center;
  justify-content: center;
}

.desc-col {
  flex: 1;
  text-align: left;
  padding-left: 15px; /* Indentasi deskripsi */
  font-weight: 500;
}

.total-col {
  width: 20%;
  text-align: center;
  justify-content: center;
  font-weight: 600;
}

/* Floating Refresh Icon */
.refresh-icon-container {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: transparent;
  z-index: 10;
}

/* Footer */
.footer-bar {
  background-color: #4fa4d8;
  height: 60px;
  display: flex;
  flex-shrink: 0;
}

.footer-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
