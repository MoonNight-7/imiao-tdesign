<template>
  <t-row justify="space-around">
    <t-col :span="5">
      <t-swiper animation="fade" :height="500">
        <t-swiper-item v-for="(item, index) in catInfoDetail.catPictures">
          <t-image :src="item" fit="cover" :style="{ height: '100%' }"/>
        </t-swiper-item>
      </t-swiper>
    </t-col>
    <t-col :span="6">
      <div class="detail-base">
        <t-card :title="catInfoDetail.catName">
          <div class="info-block">
            <div v-for="(item,index) in catInfoDetail" v-if="catInfoMap[index]" class="info-item">
              <h1>{{ catInfoMap[index] }}</h1>
              <span>{{
                  catInfoMap[index] === '是否可租' ? ((catInfoMap[index] === '是否可租' && item === 1) ? '👌' : '🚫') : item
                }}</span>

            </div>
          </div>
          <div class="info-block">
            <div v-for="(item,index) in catSpeciesDetail" v-if="speciesMap[index]" class="info-item">
              <h1>{{ speciesMap[index] }}</h1>
              <span>{{ item }}</span>

            </div>
          </div>
          <div class="info-block">
            <div class="info-item">
              <h1>猫咪描述</h1>
              <div>{{ catInfoDetail.catDescription }}</div>
            </div>
          </div>
          <t-button @click="handleRent">我要租猫</t-button>
        </t-card>
      </div>
    </t-col>
    <t-dialog :visible.sync="visible" header="请选择租用天数" :footer="false">
      <t-form ref="formData" :data="formData" :rules="FORM_RULES" @submit="handleRentCat">
        <t-form-item label="租用天数" name="rentDays">
          <t-date-range-picker
            v-model="rentDays"
            :disable-date="disableDate"
            allow-input
            clearable @pick="onPick" @change="onChange"/>
        </t-form-item>
        <t-form-item label="租用总价" name="totalPrice" style="height: 40px">
          <t-input v-model="formData.totalPrice" placeholder="请选择租用天数" disabled/>
        </t-form-item>
        <t-form-item style="margin-left: 100px">
          <t-button type="submit">确认租用</t-button>
        </t-form-item>
      </t-form>
    </t-dialog>
  </t-row>
</template>

<script>
import dayjs from 'dayjs';
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";
import router from "@/router";
import store from "@/store";

const prefix = import.meta.env.VITE_CAT
const catInfoMap = {
  catName: '猫咪名字',
  catAge: '年龄',
  catWeight: '体重',
  speciesName: '品种',
  ownerTypeName: '猫咪来源',
  color: '颜色',
  catPrice: '日租价格',
  catDescription: '猫咪描述',
  available: '是否可租'
}
const speciesMap = {
  countryOfOrigin: '起源地',
  coatLength: '毛长',
  lifeExpectancy: '平均寿命',
  averageWeight: '平均体重',
  temperament: '性格',
}

export default {
  name: "index",
  components: {},
  data() {
    return {
      dayjs,
      prefix,
      catInfoMap,
      speciesMap,
      FORM_RULES: {
        totalPrice: [
          {required: true, message: '租用天数选择有误'},
          {validator: this.totalPriceValidator},
        ]
      },
      rentDays: [],
      disableDate: {
        before: dayjs().subtract(1, 'day')
      },
      visible: false,
      catInfoDetail: {},
      catSpeciesDetail: {},
      formData: {
        totalPrice: ''
      }
    }
  },
  mounted() {
    this.initCatInfoDetail()
  },
  methods: {
    async initCatInfoDetail() {
      const catId = this.$route.query.id
      catApi.getCatInfoDetail(catId).then(res => {
        this.catInfoDetail = res.data;
        this.catInfoDetail.catPictures = this.catInfoDetail.catPictures.split(',').map(item => {
          return prefix + item
        })
        const id = this.catInfoDetail.speciesId
        catApi.getSpeciesById(id).then(res => {
          this.catSpeciesDetail = res.data
        })
      }).catch(err => {
        router.push('/home/base')
      })
    },
    handleRent() {
      this.visible = true
    },
    onPick(value, context) {
      console.log('onPick:', value, context);
    },
    onChange(value, context) {
      console.log('onChange:', value, context);
      const day = context.dayjsValue.map((d) => d.valueOf())
      const totalPrice = (day[1] - day[0]) / 1000 / 60 / 60 / 24 * this.catInfoDetail.catPrice
      this.formData.totalPrice = totalPrice
      this.formData.startDate = dayjs(day[0]).format('YYYY-MM-DD')
      this.formData.endDate = dayjs(day[1]).format('YYYY-MM-DD')
      this.formData.rentDays = dayjs(day[1]).diff(dayjs(day[0]), 'day')
      console.log(
        'YYYYMMDD:',
        context.dayjsValue.map((d) => d.format('YYYYMMDD')),
      );
    },
    handleRentCat({validateResult}) {
      if (validateResult === true) {
        this.formData.userId = store.getters['user/userData'].userId
        this.formData.catId = this.catInfoDetail.catId
        catApi.createOrder(this.formData).then(res=>{
          this.$message.success('已下单，即将跳转到订单页面')
          router.push('/order/my-order')
        })
        this.visible = false
      }
    },
    totalPriceValidator(val) {
      if (val >= 0) {
        return {result: true, message: '价格合理，快去付款吧！', type: 'success'};
      }
      return {result: false, message: '价格好像不对O.O??！', type: 'error'};

    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
