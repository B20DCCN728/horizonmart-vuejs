<script setup>
import Footer from '@/components/customer/Footer.vue';
import CategorySidebar from '@/components/customer/body/CategorySidebar.vue';
import Toolbar from '@/components/customer/body/Toolbar.vue';
import ProductGrid from '@/components/customer/body/ProductGrid.vue';
import Header from '@/components/customer/Header.vue';
</script>
<template>
<!-- header -->
<Header></Header>
<!-- container -->
<div class="app__container">
    <div class="grid">
        <!-- Grid row -->
        <div class="grid__row app__content">
            <CategorySidebar></CategorySidebar>
            <!-- Components -->
            <div class="grid__column-10">
                <Toolbar></Toolbar>
                <ProductGrid></ProductGrid>
            </div>
        </div>
    </div>
    <div class="">   Hello word</div>
</div>
<Footer></Footer>
</template>

<style>
@import '../../assets/styles/base.css';/* App container */
.app__container {
  background-color: #F5F5F5;
  display: flex;
}

.app__content {
  padding-top: 36px;
}
</style>