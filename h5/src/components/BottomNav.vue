<!-- 底部导航功能 -->
<template>
    <div class="button-nav">
        <van-tabbar v-model="bnActive" safe-area-inset-bottom>
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/center" icon="search">中心</van-tabbar-item>
        </van-tabbar>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            bnActive: this.active
        }
    },
    props:{
        active:{
            type:Number,
            default:0
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>