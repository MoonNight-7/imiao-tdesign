<template>
  <t-card theme="poster2" hoverShadow @click.native="showDetail(catInfo)" class="card-outbox">
    <template #cover>
      <t-image :src="prefix + catInfo.catPictures.split(',')[0]" fit="cover" class="card-img" alt="猫猫"/>
    </template>
    <div class="card-content">
      <p class="card-title">{{ catInfo.catName }}</p>
      <p class="card-subtitle">{{ catInfo.speciesName }}</p>
      <div class="third-box">
        <span class="card-text">{{ truncatedDescription }}</span>
        <span class="card-weight">{{ catInfo.catWeight }}kg</span>
      </div>
      <div class="card-footer">
        <span class="card-price">{{ catInfo.catPrice }}元/天</span>
        <span class="card-age">{{ catInfo.catAge }}岁</span>
      </div>
    </div>
  </t-card>
</template>

<script>
import router from "@/router";

const prefix = import.meta.env.VITE_CAT
export default {
  name: "index",
  props: {
    catInfo: {
      type: Object,
    },
  },
  data() {
    return {
      prefix,
      maxDescriptionLength: 10,
    }
  },
  computed: {
    catAge() {
      const age = this.catInfo.catAge;
      return age ? `${age}岁` : "";
    },
    truncatedDescription() {
      if (this.catInfo.catDescription.length > this.maxDescriptionLength) {
        return `${this.catInfo.catDescription.slice(
          0,
          this.maxDescriptionLength
        )}...`;
      } else {
        return this.catInfo.catDescription;
      }
    },
  },
  mounted() {
  },
  methods: {
    showDetail(catInfo) {
      router.push({
        path: '/cat-info/detail',
        query: {
          id: catInfo.catId
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>

.card-img {
  height: 300px;
}

.card-title {
  font-size: 18px;
  margin-bottom: 6px;
}

.card-subtitle {
  font-size: 14px;
  margin-bottom: 12px;
  color: #999;
}

.card-text {
  font-size: 14px;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.third-box {
  position: relative;
}

.card-price {
  color: #f60;
  font-weight: bold; /* 加粗 */
  font-size: 16px; /* 增加字体大小 */
}

.card-weight {
  position: absolute;
  right: 0;
  color: #666;
  font-weight: bold; /* 加粗 */
  font-size: 16px; /* 增加字体大小 */
}

.card-age {
  color: #fff;
  font-size: 14px;
  background-color: #f60;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-outbox {
  cursor: pointer;
}

</style>
