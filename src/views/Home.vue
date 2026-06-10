<template>
  <div class="home">
    <div class="hero">
      <div class="book-cover">
        <div class="cover-inner">
          <h1 class="book-title">山海异兽美食录</h1>
          <p class="book-subtitle">第一卷 · 破产酒楼与山海初宴 / 第二卷 · 归途暗影与战术初猎</p>
          <div class="cover-decoration"></div>
        </div>
      </div>
      <div class="book-info">
        <p class="description">
          破产酒楼老板李云意外发现通往山海界的通道，
          从此开启了一段用异兽食材征服味蕾的传奇之旅。
        </p>
        <div class="stats">
          <div class="stat">
            <span class="stat-num">{{ chapterList.length }}</span>
            <span class="stat-label">章节</span>
          </div>
          <div class="stat">
            <span class="stat-num">{{ new Set(chapterList.map(c => c.volume)).size }}</span>
            <span class="stat-label">卷</span>
          </div>
        </div>
        <div class="actions">
          <router-link to="/chapter/1" class="btn btn-primary">开始阅读</router-link>
          <router-link to="/catalog" class="btn btn-secondary">查看目录</router-link>
        </div>
      </div>
    </div>
    <div class="recent-chapters">
      <h3>最近更新</h3>
      <div class="chapter-tags">
        <router-link 
          v-for="ch in recentChapters" 
          :key="ch.id" 
          :to="`/chapter/${ch.id}`"
          class="chapter-tag"
        >
          {{ ch.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { chapterList } from '../data/chapters.js'

const recentChapters = chapterList.slice(-10).reverse()
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 60px;
}

.book-cover {
  flex-shrink: 0;
  width: 200px;
  height: 280px;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #8B4513 100%);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cover-inner {
  text-align: center;
  color: #FFF8DC;
}

.book-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 8px;
}

.book-subtitle {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 16px;
}

.cover-decoration {
  width: 40px;
  height: 2px;
  background: #FFF8DC;
  margin: 20px auto;
  opacity: 0.5;
}

.book-info {
  flex: 1;
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 24px;
}

.stats {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.stat {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #8B4513;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.actions {
  display: flex;
  gap: 16px;
}

.btn {
  padding: 12px 32px;
  border-radius: 24px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #8B4513;
  color: white;
}

.btn-primary:hover {
  background: #A0522D;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f0f0f0;
  color: #555;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.recent-chapters {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.recent-chapters h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
}

.chapter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chapter-tag {
  padding: 8px 16px;
  background: #f5f5f0;
  border-radius: 16px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  transition: all 0.2s;
}

.chapter-tag:hover {
  background: #8B4513;
  color: white;
}

@media (max-width: 600px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }
  
  .book-cover {
    width: 160px;
    height: 220px;
  }
  
  .book-title {
    font-size: 20px;
  }
  
  .actions {
    justify-content: center;
  }
}
</style>
