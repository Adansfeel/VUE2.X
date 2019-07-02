<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightLight':totalCount>0}">
            <i class="glyphicon glyphicon-shopping-cart" :class="{'hightLight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightLight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费&nbsp;￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay"> <!--.stop.prevent：阻止冒泡及默认事件-->
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="title glyphicon glyphicon-tags"></span>
            <span class="empty glyphicon glyphicon-trash" @click="empty"></span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="controlcart-wrapper">
                  <controlcart :food="food"></controlcart>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import controlcart from '../controlcart/controlcart.vue';

  export default {
    props: {
      selectFoods:{
        type: Array,
        default() {
          return [
            {
              price:0,
              count:0
            }
          ];
        }
      },
      deliveryPrice:{
        type:Number,
        default: 0
      },
      minPrice:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true    // 控制购物车折叠效果的标志,默认是true代表折叠
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if(this.totalPrice === 0) {
          return `￥${this.minPrice} 起送`;
        }else if (this.totalPrice<this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff} 起送`;
        }else {
          return '去结算';
        }
      },
      payClass() {
        if(this.totalPrice<this.minPrice){
          return 'not-enough';
        }else {
          return 'enough';
        }
      },
      listShow() {
        if(!this.totalCount) {  //判断没有数量的情况
          this.fold = true;   //折叠属性设置为true,即折叠起来,主要是更新fold的状态
          return false;   //返回false是给v-show使用,false会display none
        }
        let show = !this.fold;    //使用fold的状态取反来实现常用的切换状态处理逻辑
        if(show) {
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent,{
                click: true
              });
            }else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods:{
      drop(el) {
        for (let i=0;i<this.balls.length;i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      pay() {
        if(this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`请支付￥${this.totalPrice + 4}`);
      }
    },
    components: {
      controlcart
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../common/less/mixin.less";

  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255,255,255,0.4);
      .content-left{
        flex: 1;
        .logo-wrapper{
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10%;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.hightLight{
              background: rgb(0,160,220);
             }
            .glyphicon-shopping-cart{
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.hightLight{
                color: #ffffff;
               }
            }
          }
          .num{
            position: absolute;
            top:0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1);
          font-size: 16px;
          font-weight: 700;
          &.hightLight{
            color: #ffffff;
          }
        }
        .desc{
          display: inline-block;
          vertical-align: top;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 10px;
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        .pay{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          background: #2b333b;
          &.not-enough{
            background: #2b333b;
          }
          &.enough{
            background: #00b43c;
            color: #ffffff;
          }
        }
      }
      .shopcart-list{
        position: absolute;
        left: 0;
        top:0;
        z-index: -1;
        width: 100%;
        transform: translate3D(0,-100%,0);    /*整个列表相对于当前自身的高度做一个偏移*/
        &.fade-enter-active,&.fade-leave-active{
          transition: all 0.5s linear;
          transform: translate3D(0,-100%,0);    /*每个表项相对于当前自身的高度做一个偏移*/
        }
        &.fade-enter,&.fade-leave-active{
          transform: translate3D(0,0,0);
        }
        .list-header{
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background: #f3f5f7;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .title{
            float: left;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            color: rgb(7,17,27);
            margin-top: 12px;
          }
          .empty{
            float: right;
            font-size: 12px;
            font-weight: bold;
            color: rgb(0,160,220);
            margin-top: 12px;
          }
        }
        .list-content{
          width: 100%;
          padding: 0 18px;
          max-height: 217px;
          overflow: hidden;
          background: #ffffff;
          .food{
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;
            .border-1px(rgba(7,17,27,0.1));
            .name{
              line-height: 24px;
              font-size: 14px;
              color: rgb(7,17,27);
            }
            .price{
              position: absolute;
              right: 90px;
              bottom: 12px;
              line-height: 24px;
              font-weight: 700;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .controlcart-wrapper{
              position: absolute;
              right: 0;
              bottom: 6px;
            }
          }
        }
      }
    }
    .list-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      backdrop-filter: blur(10px);
      opacity: 1;
      background: rgba(7, 17, 27, 0.6);
      &.fade-enter-active, &.fade-leave-active{
        opacity: 1;
        transition: all 0.5s;
        background: rgba(7, 17, 27, 0.6);
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background: rgba(7,17,27,0);
      }
    }
  }
</style>
