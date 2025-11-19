<template>
  <div class="app-container stack-sans-text-regular">
    <!-- Header -->
    <div class="header-bar">
      <div class="header-title stack-sans-text-medium">Room Attendant</div>
      <div class="menu-icon">
        <!-- 3 Dots Icon -->
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

    <div class="content-area">
      <!-- Input Section -->
      <div class="input-row">
        <div class="input-label stack-sans-text-semibold">Room No.</div>
        <input v-model="searchInput" type="text" class="room-input stack-sans-text-regular" readonly />
      </div>

      <!-- Keypad Grid -->
      <div class="keypad-grid">
        <!-- Row 1 -->
        <div class="keypad-btn stack-sans-text-semibold" @click="append('7')">7</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('8')">8</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('9')">9</div>

        <!-- List spans 2 rows -->
        <div class="keypad-btn btn-list stack-sans-text-medium" @click="action('List')">List</div>

        <!-- Row 2 -->
        <div class="keypad-btn stack-sans-text-semibold" @click="append('4')">4</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('5')">5</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('6')">6</div>

        <!-- Row 3 -->
        <div class="keypad-btn stack-sans-text-semibold" @click="append('1')">1</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('2')">2</div>
        <div class="keypad-btn stack-sans-text-semibold" @click="append('3')">3</div>
        <div class="keypad-btn stack-sans-text-medium" @click="action('Clear')">Clear</div>

        <!-- Row 4 -->
        <div class="keypad-btn stack-sans-text-semibold" @click="append('0')">0</div>
        <div class="keypad-btn btn-ok stack-sans-text-medium" @click="action('OK')">OK</div>
        <div class="keypad-btn stack-sans-text-medium" @click="action('Del')">Del</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div class="footer-item" @click="goToStatus">
        <span class="footer-text stack-sans-text-medium">Status</span>
      </div>
      <div class="footer-item" @click="goToRoomSearch">
        <span class="footer-text stack-sans-text-medium">Room</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchInput = ref('')

// Logic untuk input angka
const append = (num: string) => {
  searchInput.value += num
}

// Logic untuk tombol aksi
const action = (type: string) => {
  switch (type) {
    case 'Clear':
      searchInput.value = ''
      break
    case 'Del':
      searchInput.value = searchInput.value.slice(0, -1)
      break
    case 'OK':
      if (searchInput.value) {
        console.log('Searching:', searchInput.value)
        router.push(`/room-detail/${searchInput.value}`)
      }
      break
    case 'List':
      console.log('Open List')
      break
  }
}

const goToRoomSearch = () => {
  // Current page
}

const goToStatus = () => {
  router.push('/')
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
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.header-title {
  color: white;
  font-size: 20px;
  font-weight: 500;
}

.menu-icon {
  position: absolute;
  right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Content Area */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
}

/* Input Row */
.input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.input-label {
  font-size: 22px;
  font-weight: 700;
  color: black;
}

.room-input {
  width: 160px;
  height: 50px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 24px;
  text-align: left;
  outline: none;
  color: #333;
}

/* Keypad Grid */
.keypad-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 75px; /* Tinggi baris tombol */
  gap: 2px; /* Garis putih pemisah */
  background-color: white;
}

.keypad-btn {
  background-color: #4698ca;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.keypad-btn:active {
  opacity: 0.8;
}

/* Tombol List tinggi 2 baris */
.btn-list {
  grid-row: span 2;
}

/* Tombol OK lebar 2 kolom */
.btn-ok {
  grid-column: span 2;
}

/* Footer */
.footer-bar {
  background-color: #4fa4d8;
  height: 60px;
  display: flex;
  flex-shrink: 0;
}

.footer-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  position: relative;
}

/* Garis pemisah vertikal di footer (opsional, agar mirip tab) */
.footer-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  height: 60%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
}

.footer-text {
  font-size: 18px;
  font-weight: 400;
}

/* Responsive Adjustments */
@media (max-width: 360px) {
  .keypad-grid {
    grid-auto-rows: 60px;
  }
  .room-input {
    width: 120px;
  }
}
</style>
