<template>
  <div class="chapter-page" :class="theme">
    <!-- 顶部导航 -->
    <div class="top-bar" v-show="showUI">
      <router-link to="/" class="nav-btn">首页</router-link>
      <router-link to="/catalog" class="nav-btn">目录</router-link>
      <span class="chapter-title">{{ chapterData.title }}</span>
      <button class="nav-btn" @click="showSettings = true">设置</button>
    </div>

    <!-- 设置面板 -->
    <div class="settings-panel" v-if="showSettings" @click.self="showSettings = false">
      <div class="settings-content">
        <h3>阅读设置</h3>
        <div class="setting-item">
          <label>字体大小</label>
          <div class="font-size-controls">
            <button @click="fontSize--">A-</button>
            <span>{{ fontSize }}px</span>
            <button @click="fontSize++">A+</button>
          </div>
        </div>
        <div class="setting-item">
          <label>主题</label>
          <div class="theme-options">
            <button 
              v-for="t in themes" 
              :key="t.value"
              :class="['theme-btn', t.value, { active: theme === t.value }]"
              @click="theme = t.value"
            >
              {{ t.label }}
            </button>
          </div>
        </div>
        <button class="close-btn" @click="showSettings = false">关闭</button>
      </div>
    </div>

    <!-- 章节内容 -->
    <div class="content-wrapper" @click="toggleUI">
      <div class="chapter-content" :style="contentStyle">
        <h1 class="title">{{ chapterData.title }}</h1>
        <div class="body" v-html="chapterData.content"></div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="bottom-bar" v-show="showUI">
      <button 
        class="nav-btn" 
        :disabled="chapterId <= 1"
        @click="goChapter(chapterId - 1)"
      >
        ← 上一章
      </button>
      <span class="progress">{{ chapterId }} / {{ totalChapters }}</span>
      <button 
        class="nav-btn" 
        :disabled="chapterId >= totalChapters"
        @click="goChapter(chapterId + 1)"
      >
        下一章 →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chapterList, loadChapterContent } from '../data/chapters.js'

const route = useRoute()
const router = useRouter()

const chapterId = computed(() => parseInt(route.params.id) || 1)
const totalChapters = chapterList.length

const chapterData = ref({ title: '', content: '' })
const showUI = ref(true)
const showSettings = ref(false)
const fontSize = ref(18)
const theme = ref('light')

const themes = [
  { value: 'light', label: '白天' },
  { value: 'dark', label: '夜间' },
  { value: 'sepia', label: '护眼' }
]

const contentStyle = computed(() => ({
  fontSize: fontSize.value + 'px',
  lineHeight: (fontSize.value * 1.8) + 'px'
}))

async function loadContent() {
  const data = await loadChapterContent(chapterId.value)
  chapterData.value = data
  localStorage.setItem('novel-last-chapter', chapterId.value)
  window.scrollTo(0, 0)
}

function goChapter(id) {
  if (id >= 1 && id <= totalChapters) {
    router.push(`/chapter/${id}`)
  }
}

function toggleUI() {
  showUI.value = !showUI.value
}

watch(chapterId, loadContent)

onMounted(() => {
  const savedFontSize = localStorage.getItem('novel-font-size')
  const savedTheme = localStorage.getItem('novel-theme')
  if (savedFontSize) fontSize.value = parseInt(savedFontSize)
  if (savedTheme) theme.value = savedTheme
  loadContent()
})

watch(fontSize, (v) => localStorage.setItem('novel-font-size', v))
watch(theme, (v) => localStorage.setItem('novel-theme', v))
</script>

<style scoped>
.chapter-page {
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}

/* 主题 */
.chapter-page.light {
  background: #fafaf8;
  color: #333;
}

.chapter-page.dark {
  background: #1a1a2e;
  color: #c0c0c0;
}

.chapter-page.sepia {
  background: #f4ecd8;
  color: #5b4636;
}

/* 顶部导航 */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #eee;
  z-index: 100;
  transition: opacity 0.3s;
}

.dark .top-bar {
  background: rgba(26,26,46,0.95);
  border-bottom-color: #333;
}

.sepia .top-bar {
  background: rgba(244,236,216,0.95);
  border-bottom-color: #d4c9b0;
}

.nav-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: inherit;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(0,0,0,0.05);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.chapter-title {
  font-size: 14px;
  opacity: 0.8;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 设置面板 */
.settings-panel {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.settings-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
}

.dark .settings-content {
  background: #2a2a3e;
}

.sepia .settings-content {
  background: #faf3e0;
}

.settings-content h3 {
  margin-bottom: 20px;
  font-size: 18px;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-item label {
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
  opacity: 0.7;
}

.font-size-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.font-size-controls button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}

.theme-options {
  display: flex;
  gap: 10px;
}

.theme-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
}

.theme-btn.light {
  background: #fafaf8;
  color: #333;
  border-color: #ddd;
}

.theme-btn.dark {
  background: #1a1a2e;
  color: #c0c0c0;
  border-color: #333;
}

.theme-btn.sepia {
  background: #f4ecd8;
  color: #5b4636;
  border-color: #d4c9b0;
}

.theme-btn.active {
  border-color: #8B4513;
  box-shadow: 0 0 0 2px #8B4513;
}

.close-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #8B4513;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

/* 内容区 */
.content-wrapper {
  padding: 70px 20px 80px;
  max-width: 720px;
  margin: 0 auto;
  min-height: 100vh;
  cursor: pointer;
}

.chapter-content {
  transition: font-size 0.2s;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5em;
  color: inherit;
}

.body :deep(p) {
  margin-bottom: 1.5em;
  text-indent: 2em;
  text-align: justify;
}

.body :deep(h2), .body :deep(h3) {
  margin: 1.5em 0 1em;
  font-weight: bold;
}

.body :deep(hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2em 0;
}

/* 底部导航 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid #eee;
  z-index: 100;
  transition: opacity 0.3s;
}

.dark .bottom-bar {
  background: rgba(26,26,46,0.95);
  border-top-color: #333;
}

.sepia .bottom-bar {
  background: rgba(244,236,216,0.95);
  border-top-color: #d4c9b0;
}

.progress {
  font-size: 14px;
  opacity: 0.6;
}
</style>
