<template>
    <div class="page">
        center

        <bottom-nav :active="buttonNavActive"></bottom-nav>
    </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
export default {
    data(){
        return {
            buttonNavActive:1,
        }
    },
	components:{
		'bottom-nav':BottomNav
	}
}
</script>