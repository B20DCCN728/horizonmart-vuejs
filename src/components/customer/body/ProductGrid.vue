<template>
<!-- Product -->
<div class="home-product">
<!--Create 1 - Row  -->
<div class="grid__row">
    <div class="grid__column-2-4">
        <a v-for="(product, index) in products" class="home-product-item" href="#" :key="index">
            <!-- Product img -->
            <div class="home-product-item__img" style="background-image: url(https://i.pinimg.com/originals/bf/fa/cb/bffacb16c45d8efb3e3ed884005ed7d5.jpg)"></div>
            <!-- Title -->
            <h4 class="home-product-item__name">{{ product.name}}</h4>
            <div class="home-product-item__price">
                <span class="home-product-item__price-old">1.200.000đ</span>                        
                <span class="home-product-item__price-current">0.000.000đ</span>
            </div>
            <!-- Like and vote rating and sold -->
            <div class="home-product-item__action">
                <span class="home-product-item__like home-product-item__like--liked">
                    <i class="home-product-item__like-icon--empty fa-regular fa-heart"></i>
                    <i class="home-product-item__like-icon--fill fa-solid fa-heart"></i>
                </span>
                <div class="home-product-item__rating">
                    <i class="home-product-item_star--gold fa-solid fa-star"></i>
                    <i class="home-product-item_star--gold fa-solid fa-star"></i>
                    <i class="home-product-item_star--gold fa-solid fa-star"></i>
                    <i class="home-product-item_star--gold fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <span class="home-product-item__sold">Đã bán</span>
            </div>
            <!-- Branch and Product Source -->
            <div class="home-product-item__origin">
                <span class="home-product-item__branch">Converse</span>
                <span class="home-product-item__source">USA</span>
            </div>
            <!-- Favourite -->
            <div class="home-product-item__favourite">
                <i class="fa-solid fa-check"></i>
                <span>Giảm 10% giá</span>
            </div>
        </a>                   
    </div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

let products = ref([
    {
        "id": 18,
        "name": "AXHJASDFA",
        "purchasePrice": 16000,
        "sellingPrice": 19000,
        "createdDate": "2024-04-15T15:30:00",
        "imagePath": "http://localhost:8762/ps/product/image/Screenshot 2024-03-18 221542.png",
        "description": "Hello dear",
        "category": {
            "id": 1,
            "name": "Rau cu",
            "description": "Khu vực rau trong siêu thị đa dạng với một loạt các loại rau xanh từ cải bắp, cải xoong, bí đỏ cho đến rau cải nội địa và rau sạch từ các trang trại địa phương. Mỗi loại rau được sắp xếp gọn gàng, phản ánh sự tươi mới và sức khỏe."
        },
        "supplier": {
            "id": 1,
            "name": "Viet gap",
            "address": "Ha noi",
            "phoneNumber": "0337176055",
            "taxID": "1200123",
            "description": "Luon cung cap rau ngon bo re cho mn"
        }
    },
]);

const fecthProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8762/ps/product/get');
        products.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fecthProducts();
});

</script>

<style scoped>
/* Home product */
.home-product {
  margin-bottom: 10px;
}

.home-product-item {
  display: block;
  text-decoration: none;
  margin-top: 10px;
  position: relative;
  background-color: var(--white-color);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1); /* Tao bong do */
  transition: transform ease-in 0.1s;
}

.home-product-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.4);
}

.home-product-item__img {
  padding-bottom: 100%; /* Để bức ảnh hiện ra */
  background-repeat: no-repeat; /* Không cho ảnh lặp lại */
  background-size: contain; /* Cho bức ảnh nằm gọn trong thẻ chứa nó */
  background-size: cover; /* Chỉnh khi ảnh quá dài */
  background-position: center; /* Luôn ở trọng tâm bức ảnh */
}

.home-product-item__name {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--text-color);

  line-height: 1.8rem;
  height: 3.6rem;  /* Chỉnh số lượng dòng */
  margin: 10px 10px 6px;
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Chỉnh sửa kích thước dòng và thêm dấy 3 chấm */
  text-overflow: ellipsis;
  /* 
  text-overflow: ellipsis;
  white-space: nowrap; Đây là cách 1 dòng
   */
}

.home-product-item__price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}

.home-product-item__price-old {
  margin-left: 10px;
  font-size: 1.4rem;
  color: #666;
  text-decoration: line-through;
}

.home-product-item__price-current { 
  font-size: 1.7rem;
  color: var(--primary-color);
  margin-left: 10px;
}

.home-product-item__action {
  display: flex;
  justify-content: space-between;
  margin: 6px 10px 0;
}

.home-product-item__like {
  font-size: 1.3rem;
  color: var(--primary-color);
}

.home-product-item__like-icon--empty {
  color: var(--primary-color);
}

i.home-product-item__like-icon--fill {
  color: #F63D30;
  display: none;
}

.home-product-item__like--liked .home-product-item__like-icon--empty {
  display: none;
}

.home-product-item__like--liked i.home-product-item__like-icon--fill {
  display: inline-block;
}

.home-product-item__rating {
  margin-right: 4px;
  /* font-size: 0.8rem; */
  transform: scale(0.8);
  transform-origin: right;
  margin: -1px 0 0 auto;
  /* color: var(--primary-color); */
}

.home-product-item_star--gold {
  color: var(--star-gold-color);
}

.home-product-item__sold {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-left: 4px;
}

.home-product-item__origin {
  display: flex;
  font-size: 1.2rem;
  font-weight: 380;
  justify-content:space-between;
  margin: 3px 10px 0;
  color: #595959;
}

.home-product-item__branch {
  /* margin-right: auto; */   
  color: #f42373;
}

.home-product-item__source {
  /* margin-left: auto; */
  color: #d48610;
}

/* Favourite icon */
.home-product-item__favourite {
  position: absolute;
  top: 10px;
  left: -4px;
  color: var(--primary-color);
  background-color: currentColor;
  font-weight: 500;
  line-height: 1.6rem;
  padding-right: 4px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.home-product-item__favourite::after {
  content: "";
  left: 0;
  bottom: -3px;
  position: absolute;
  border-top: 3px solid currentColor;
  border-left: 3px solid transparent;
  filter: brightness(60%);
}

.home-product-item__favourite i {
  color: var(--white-color);
  font-size: 0.9rem;
  margin: 0 2px 0 5px;
}

.home-product-item__favourite span {
  color: var(--white-color);
}

/* Giam gia */
.home-product-item__sell-off {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 36px;
  padding: 3px 0 0;
  text-align: center;
  color: rgba(255, 216, 64, 0.94);
  background-color: currentColor;
}

.home-product-item__sell-off-percent {
  color: #EE4D2D;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.3rem;
}

.home-product-item__sell-off-label {
  font-size: 1.36rem;
  font-weight: 500;
  color: var(--white-color);
}

.home-product-item__sell-off::after {
  content: "";
  position: absolute;
  left: 0;
  /* bottom: -6px; */
  top: 100%;
  border-width: 0 20px 4px;
  border-style: solid;
  border-color: transparent currentColor transparent currentColor;
}
</style>