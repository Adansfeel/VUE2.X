<template>
  <div>
    <v-header :seller="seller">

    </v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue'

  const ERR_OK=0;

  export default{
    data () {
      return{
        seller:{}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if(response.errno===ERR_OK){
          this.seller=response.data;
        }
      });
    },
    components:{
      'v-header':header
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import './common/less/index.less';

    .tab{
      z-index: 100;
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex: 1;
        text-align: center;
        a{
          display: block;
          font-size: 14px;
          font-weight: bold;
          color: rgb(77,85,93);
        }
        a.active{
          color: rgb(240,20,20);
          font-weight: bold;
          font-size: large;
          text-decoration: none;
          background: rgba(0,0,0,0.1);
        }
      }
    }

</style>
