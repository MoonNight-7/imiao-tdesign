<template>
  <t-swiper type="card" :height="280" :duration="300" :interval="2000">
    <t-swiper-item size="small" v-for="(item, index) in BannerArr" :key="index">
      <t-image :src="item" fit="cover"/>
    </t-swiper-item>
  </t-swiper>
</template>

<script>
import BannerImg1 from "@/assets/banner/banner1.webp";
import BannerImg2 from "@/assets/banner/banner2.jpg";
import BannerImg3 from "@/assets/banner/banner3.png";
import BannerImg4 from "@/assets/banner/banner4.jpg";
import BannerImg5 from "@/assets/banner/banner5.webp";
import BannerImg6 from "@/assets/banner/banner6.webp";

export default {
  name: "index",
  components: {},
  data(){
    return{
      BannerArr: [
        BannerImg1,
        BannerImg2,
        BannerImg3,
        BannerImg4,
        BannerImg5,
        BannerImg6,
      ],
    }
  }
}
</script>

<style scoped>

</style>
