<template>
  <t-card hoverShadow>
    <img :src="prefix + catInfo.catPictures.split(',')[0]" class="card-img" alt="">
    <div class="card-content">
      <p class="card-title">{{catInfo.catName}}</p>
      <p class="card-subtitle">{{catInfo.speciesName}}</p>
      <p class="card-text">{{catInfo.catDescription}}</p>
      <div class="card-footer">
        <span class="card-price">{{catInfo.catPrice}}元/天</span>
        <span class="card-weight">{{catInfo.catWeight}}kg</span>
      </div>
    </div>
  </t-card>
</template>

<script>
const prefix = import.meta.env.VITE_CAT
export default {
  name: "index",
  props: {
    catInfo: {
      type: Object,
    },
  },
  data(){
    return{
      prefix
    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.card-img{
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title{
  font-size: 18px;
  margin-bottom: 6px;
}

.card-subtitle{
  font-size: 14px;
  margin-bottom: 12px;
  color: #999;
}

.card-text{
  font-size: 14px;
  margin-bottom: 12px;
}

.card-footer{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.card-price{
  color: #f60;
}

.card-weight{
  color: #666;
}
</style>
