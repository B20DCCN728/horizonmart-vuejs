<template>
  <Header />
  <a-layout style="min-height: 100vh">
    <Sidebar :selected-keys="selectedKeys" :collapsed="collapsed" @prop-changed="updateProp"/>
    <a-layout :style="{ marginLeft: marginLeft }">
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>{{ toUpperCaseFirtLetter($route.name) }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <!-- Nguyen Hoang Viet is B20DCCN728 - PTIT -->
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        SuperMarket ©2023 Created by B20DCCN728 - PTIT
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import  Sidebar  from '../../components/admin/Sidebar.vue';
import Header from '../../components/admin/Header.vue';
import { useRouter } from 'vue-router';

// Define variables
const router = useRouter();
const collapsed = ref(false);
const selectedKeys = ref(['1']);

const marginLeft = ref('200px');

const updateProp = (val) => {
  collapsed.value = val;
  if(val) {
    marginLeft.value = '56px';
  } else {
    marginLeft.value = '200px';
  }
}
// Determine the current toolbar
if(router.currentRoute.value.name === "dashboard") {
  selectedKeys.value = ['1'];
} else if(router.currentRoute.value.name === "creator") {
  selectedKeys.value = ['12'];
} else if(router.currentRoute.value.name === "product") {
  selectedKeys.value = ['9'];
} else if(router.currentRoute.value.name === "category") {
  selectedKeys.value = ['10'];
}


// Upper case first letter    
const toUpperCaseFirtLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

</script>

<style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
</style>