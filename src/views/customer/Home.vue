<script setup>
import { ref } from 'vue';
import Footer from '@/components/customer/Footer.vue';
import CategorySidebar from '@/components/customer/body/CategorySidebar.vue';
import Toolbar from '@/components/customer/body/Toolbar.vue';
import ProductGrid from '@/components/customer/body/ProductGrid.vue';
import Header from '@/components/customer/Header.vue';
import Card from '@/components/customer/body/Card.vue';

// 
const cart = ref({
    "id": 1,
    "name": "Product",
    "description": "Description",
    "sellingPrice": 100,
    "discount": 10,
    "quantity": 10,
    "category": {
        "id": 1,
        "name": "Category"
    },
    "image": "https://via.placeholder.com/150",
    "status": "ACTIVE"
});

// Receive product data from ProductGrid component and pass it to Card component
const handleProduct = async (product) => {
    console.log('Home', product);
    cart.value = product;
    console.log('Home', cart.value);
}

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
                <ProductGrid @add-to-cart="handleProduct"></ProductGrid>
            </div>
        </div>
    </div>
    <!-- Card component -->
    <div class="app__content column__card">
        <Card :product="cart"></Card>
    </div>
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

.column__card {
    width: 400px;
    padding-left: 20px;
    padding-right: 5px;
}
</style>