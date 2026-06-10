<template>
  <div class="catalog">
    <div class="header">
      <router-link to="/" class="back-btn">← 返回首页</router-link>
      <h1>目录</h1>
    </div>
    <div class="volume" v-for="vol in volumeGroups" :key="vol.name">
      <h2 class="volume-title">{{ vol.name }}</h2>
      <div class="chapter-grid">
        <router-link 
          v-for="ch in vol.chapters" 
          :key="ch.id" 
          :to="`/chapter/${ch.id}`"
          class="chapter-item"
          :class="{ active: currentChapter === ch.id }"
        >
          <span class="chapter-num">{{ String(ch.id).padStart(3, '0') }}</span>
          <span class="chapter-name">{{ ch.title.replace(/第\d+章\s*/, '') }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { chapterList } from '../data/chapters.js'

const currentChapter = ref(1)

const volumeGroups = computed(() => {
  const groups = {}
  for (const ch of chapterList) {
    if (!groups[ch.volume]) {
      groups[ch.volume] = { name: ch.volume, chapters: [] }
    }
    groups[ch.volume].chapters.push(ch)
  }
  return Object.values(groups)
})

onMounted(() => {
  const saved = localStorage.getItem('novel-last-chapter')
  if (saved) {
    currentChapter.value = parseInt(saved)
  }
})
</script>

<style scoped>
.catalog {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.back-btn {
  text-decoration: none;
  color: #8B4513;
  font-size: 14px;
}

.back-btn:hover {
  text-decoration: underline;
}

.header h1 {
  font-size: 24px;
  color: #333;
}

.volume {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  margin-bottom: 24px;
}

.volume:last-child {
  margin-bottom: 0;
}

.volume-title {
  font-size: 18px;
  color: #8B4513;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0e6d8;
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

.chapter-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  transition: all 0.2s;
}

.chapter-item:hover {
  background: #f5f0e8;
  color: #8B4513;
}

.chapter-item.active {
  background: #8B4513;
  color: white;
}

.chapter-num {
  font-size: 12px;
  opacity: 0.6;
  min-width: 32px;
}

.chapter-name {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .chapter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
