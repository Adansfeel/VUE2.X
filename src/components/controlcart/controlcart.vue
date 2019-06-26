<template>
  <div class="constrolcart">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <transition name="inner">
          <span class="inner glyphicon glyphicon-minus-sign"></span>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add glyphicon glyphicon-plus-sign" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export  default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if(!event._constructed) { /*取消click PC端点击默认2次*/
          return;
        }
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if(!event._constructed) { /*取消click PC端点击默认2次*/
          return;
        }
        if(this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  .constrolcart {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 4px;
      .inner {
        display: inline-block;
        line-height: 20px;
        font-size: 20px;
        color: rgb(0, 160, 220);
      }
      &.move-enter-active, &.move-leave-active {
        transition: all 0.5s linear;
        opacity: 1;
        transform: translate3D(0, 0, 0);
        .inner {
          transition: all 0.4s;
          opacity: 1;
          transform: rotate(0deg);
        }
      }
      &.move-enter, &.move-leave-active {
        transform: translate3D(24px, 0, 0);
        .inner {
          opacity: 0;
          transform: rotate(180deg);
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 20px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 20px;
      font-size: 20px;
      color: rgb(0, 160, 220);
    }
  }

</style>
