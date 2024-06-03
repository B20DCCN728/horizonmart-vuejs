<script setup>
import { ref } from 'vue';
import Footer from '@/components/customer/Footer.vue';
import CategorySidebar from '@/components/customer/body/CategorySidebar.vue';
import Toolbar from '@/components/customer/body/Toolbar.vue';
import ProductGrid from '@/components/customer/body/ProductGrid.vue';
import Header from '@/components/customer/Header.vue';
import Card from '@/components/customer/body/Card.vue';
import SelectCustomer from '@/components/admin/utils/customer/SelectCustomer.vue';

// 
const open = ref(false);

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
};

// Open modal
const handleOpenModal = async () => {
    open.value = true;
};

</script>
<template>
<!-- header -->
<Header></Header>
<!-- container -->
<div class="app__container">
    <a-modal v-model:open="open" title="Chi tiết đơn hàng" :confirm-loading="confirmLoading" @ok="handleOk">
        <a-divider>Khách hàng</a-divider>
        <select-customer></select-customer>
        <a-space style="display: none">
            <a-input placeholder="Nhập tên khách hàng"></a-input>
            <a-input placeholder="Nhập số điện thoại"></a-input>
        </a-space>
        <a-divider>Giỏ hàng</a-divider>
        <div class="card__body">
            <ul class="card_list" >
                <li class="card_item">
                    <div class="card_item-link">
                        <img 
                            style="width: 12%;"
                            class="card_item-img" 
                            src="https://hcm.fstorage.vn/images/2023/06/f2b28fb31b2669af86a406bf0d7c4db3-20230628013145.png"
                        >
                        <div class="card_item-content">
                            <h3 class="card_item-title"></h3>
                            <p class="card_item-price">Giá: 100.000</p>
                            <label class="card_item-quantity">Số lượng: 100</label>
                        </div>
                    </div>
                </li>
                <li class="card_item">
                    <div class="card_item-link">
                        <img 
                            style="width: 12%;"
                            class="card_item-img" 
                            src="https://hcm.fstorage.vn/images/2023/06/f2b28fb31b2669af86a406bf0d7c4db3-20230628013145.png"
                        >
                        <div class="card_item-content">
                            <h3 class="card_item-title"></h3>
                            <p class="card_item-price">Giá: 100.000</p>
                            <label class="card_item-quantity">Số lượng: 100</label>
                        </div>
                    </div>
                </li>
                <li class="card_item">
                    <div class="card_item-link">
                        <img 
                            style="width: 12%;"
                            class="card_item-img" 
                            src="https://hcm.fstorage.vn/images/2023/06/f2b28fb31b2669af86a406bf0d7c4db3-20230628013145.png"
                        >
                        <div class="card_item-content">
                            <h3 class="card_item-title"></h3>
                            <p class="card_item-price">Giá: 100.000</p>
                            <label class="card_item-quantity">Số lượng: 100</label>
                        </div>
                    </div>
                </li>
                <li class="card_item">
                    <div class="card_item-link">
                        <img 
                            style="width: 12%;"
                            class="card_item-img" 
                            src="https://hcm.fstorage.vn/images/2023/06/f2b28fb31b2669af86a406bf0d7c4db3-20230628013145.png"
                        >
                        <div class="card_item-content">
                            <h3 class="card_item-title"></h3>
                            <p class="card_item-price">Giá: 100.000</p>
                            <label class="card_item-quantity">Số lượng: 100</label>
                        </div>
                    </div>
                </li>
                <li class="card_item">
                    <div class="card_item-link">
                        <img 
                            style="width: 12%;"
                            class="card_item-img" 
                            src="https://hcm.fstorage.vn/images/2023/06/f2b28fb31b2669af86a406bf0d7c4db3-20230628013145.png"
                        >
                        <div class="card_item-content">
                            <h3 class="card_item-title"></h3>
                            <p class="card_item-price">Giá: 100.000</p>
                            <label class="card_item-quantity">Số lượng: 100</label>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="card_total">
                <h2 class="card__total-detail">Số lượng sản phẩm: 1000</h2>
                <h2 class="card__total-detail">Tổng tiền: 1.000.000đ</h2>
            </div>
        </div>
    </a-modal>
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
        <Card :product="cart" @open-modal="handleOpenModal"></Card>
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