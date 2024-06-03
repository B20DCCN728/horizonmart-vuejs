<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Footer from '@/components/customer/Footer.vue';
import CategorySidebar from '@/components/customer/body/CategorySidebar.vue';
import Toolbar from '@/components/customer/body/Toolbar.vue';
import ProductGrid from '@/components/customer/body/ProductGrid.vue';
import Header from '@/components/customer/Header.vue';
import Card from '@/components/customer/body/Card.vue';
import SelectCustomer from '@/components/admin/utils/customer/SelectCustomer.vue';
import { notification } from 'ant-design-vue';

// open modal
const open = ref(false);

// spin
const spinning = ref(false);

// customer datam
const customer = ref({
    fullName: '',
    phoneNumber: '',
    note: ''
});

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
const myOrder = ref({
});
const handleOpenModal = async (order) => {
    open.value = true;
    myOrder.value = order;
};

// add new customer
const showAddNewCustomerForm = ref("none");
const addNewCustomerForm = async () => {
    showCustomerInfoForm.value = "none";
    if (showAddNewCustomerForm.value === "none") {
        showAddNewCustomerForm.value = "";
    } else {
        showAddNewCustomerForm.value = "none";
    }
};

// create new customer
const confirmLoading = ref(false);
const createNewCustomer = async () => {
    confirmLoading.value = true;
    axios.post('http://localhost:8762/us/user/create', customer.value)
    .then(response => {
        console.log(response.data);
        confirmLoading.value = false;
        if (response.data == true) {
            notification.success({
                message: 'Thông báo',
                description: 'Tạo mới khách hàng thành công!!'
            });       
        } else {
            notification.error({
                message: 'Thông báo',
                description: 'Khách hàng đã tồn tại vui lòng thêm số điện thoại mới!!'
            });
        }
    }).catch(error => {
        console.error(error);
        notification.error({
            message: 'Thông báo',
            description: 'Tạo mới khách hàng không thành công!!'
        }); 
        confirmLoading.value = false;
    });
};

// handle customer selected
const showCustomerInfoForm = ref("none");
const handleCustomerSelected = async (customerSelected) => {
    showCustomerInfoForm.value = "";
    customer.value.id = customerSelected.id;
    spinning.value = true;
    axios.get(`http://localhost:8762/us/user/get/${customerSelected.id}`)
    .then(response => {
        console.log(response.data);
        customer.value.fullName = response.data.fullName;
        customer.value.phoneNumber = response.data.phoneNumber;
        showCustomerInfoForm.value = "";
        console.log('Customer', customer.value);
        spinning.value = false;
    }).catch(error => {
        console.error(error);
        spinning.value = false;
    });

};

</script>
<template>
<!-- header -->
<Header></Header>
<!-- container -->
<div class="app__container">
    <a-modal v-model:open="open" title="Chi tiết đơn hàng" :confirm-loading="confirmLoading" @ok="handleOk">
        <a-divider>Khách hàng</a-divider>
        <a-space :size="10" align="center" style="margin-bottom: 20px;">
            <a-button type="primary" @click="addNewCustomerForm" danger style="margin-left: 10px;">Thêm Khách Hàng</a-button>
            <select-customer @customer-selected="handleCustomerSelected"></select-customer>
        </a-space>
        <a-typography-title :level="5" :style="{ display: `${ showAddNewCustomerForm }`}">Vui lòng nhập đầy đủ thông tin!!</a-typography-title>
        <a-space direction="horizontal" align="center" :style="{ display: `${ showAddNewCustomerForm }`}">
            <a-input size="100%" placeholder="Nhập tên khách hàng" v-model:value="customer.fullName"></a-input>
            <a-input placeholder="Nhập số điện thoại" v-model:value="customer.phoneNumber"></a-input>
            <a-button danger block @click="createNewCustomer" :loading="confirmLoading">
                Tạo mới
            </a-button>
        </a-space>
        <a-spin :spinning="spinning">
            <a-typography-title :level="5" :style="{ display: `${ showCustomerInfoForm }`}">Thông tin khách hàng</a-typography-title>
            <a-space class="customer_info" direction="vertical" :style="{ display: `${ showCustomerInfoForm }`}">
                <div class="customer_info-value fullname">
                    <p>Tên khách hàng: {{ customer.fullName }}</p>
                </div>
                <div class="customer_info-value phone-number">
                    <p>Số điện thoại: {{ customer.phoneNumber }}</p>
                </div>
            </a-space>
        </a-spin>
        <a-divider>Giỏ hàng</a-divider>
        <div class="card__body scroll-container">
            <ul class="card_list" v-for="(product, index) in myOrder.products" :key="index">
                <li class="card_item">
                    <h3 class="card_item-title">{{ index }} -> {{ product.product.name }}</h3>
                    <div class="card_item-link" style="display: flex; justify-content:flex-start;">
                        <img 
                            style="width: 20%;"
                            class="card_item-img" 
                            :src="product.product.imagePath"
                        >
                        <div class="card_item-content" style="margin-left: 40px;">
                            <p class="card_item-price">Giá: {{ product.product.sellingPrice }}</p>
                            <label class="card_item-quantity">Số lượng: {{ product.quantity }}</label>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="card_total">
                <h2 class="card__total-detail">Số lượng sản phẩm: {{ myOrder.quantity }}</h2>
                <h2 class="card__total-detail">Tổng tiền: {{ myOrder.total }}VND</h2>
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

.customer_info-value {
    font-size: 1.5rem;
    color: var(--text-color);
    font-weight: 450;
}

.scroll-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 0;
  margin: 0 0 0 20px;
}

.card_list {
    list-style: none;
}

.column__card {
    width: 400px;
    padding-left: 20px;
    padding-right: 5px;
}

.card_item-content p {
    font-size: 1.6rem;
    font-weight: 450;
    color: var(--text-color);
}

.card_item-content label {
    font-size: 1.6rem;
    font-weight: 450;
    color: var(--text-color);
}

</style>