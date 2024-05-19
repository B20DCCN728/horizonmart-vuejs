<script setup>
import Footer from '@/components/customer/Footer.vue';
import CategorySidebar from '@/components/customer/body/CategorySidebar.vue';
import Toolbar from '@/components/customer/body/Toolbar.vue';
import ProductGrid from '@/components/customer/body/ProductGrid.vue';
</script>
<template>
<!-- container -->
<div class="app__container">
    <div class="grid">
        <!-- Grid row -->
        <div class="grid__row app__content">
            <CategorySidebar></CategorySidebar>
            <!-- Componenet -->
            <div class="grid__column-10">
                <Toolbar></Toolbar>
                <ProductGrid></ProductGrid>
            </div>
        </div>
    </div>
</div>
<Footer></Footer>
</template>

<style>
@import '../../assets/styles/base.css';
</style>