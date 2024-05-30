<template>
    <div class="card__header">
      <h1>Giỏ hàng của bạn</h1>
    </div>
    <div class="card__body">
      <ul class="card_list" v-for="(product, index) in myOrder.products" :key="index">
        <li class="card_item">
          <div class="card_item-link">
            <img
              class="card_item-img" 
              :src="product.product.imagePath"
            >
            <div class="card_item-content">
              <h3 class="card_item-title">{{ product.product.name }}</h3>
              <p class="card_item-price">Giá: {{ product.product.sellingPrice }}</p>
              <label class="card_item-quantity">Số lượng: </label>
              <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
            </div>
            <div class="card_item-remove">
              <a-button type="primary" danger>Remove</a-button>
            </div>
          </div>
        </li>
        <!-- <li class="card_item">
          <div class="card_item-link">
            <img
              class="card_item-img" 
              src="https://i.pinimg.com/originals/bf/fa/cb/bffacb16c45d8efb3e3ed884005ed7d5.jpg"
            >
            <div class="card_item-content">
              <h3 class="card_item-title">Tên sản phẩm</h3>
              <p class="card_item-price">Giá: 1.200.000đ</p>
              <label class="card_item-quantity">Số lượng: </label>
              <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
            </div>
            <div class="card_item-remove">
              <a-button type="primary" danger>Remove</a-button>
            </div>
          </div>
        </li>
        <li class="card_item">
          <div class="card_item-link">
            <img
              class="card_item-img" 
              src="https://i.pinimg.com/originals/bf/fa/cb/bffacb16c45d8efb3e3ed884005ed7d5.jpg"
            >
            <div class="card_item-content">
              <h3 class="card_item-title">Tên sản phẩm</h3>
              <p class="card_item-price">Giá: 1.200.000đ</p>
              <label class="card_item-quantity">Số lượng: </label>
              <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
            </div>
            <div class="card_item-remove">
              <a-button type="primary" danger>Remove</a-button>
            </div>
          </div>
        </li> -->
      </ul>
      <div class="card_total">
        <h2 class="card__total-detail">Số lượng sản phẩm: {{ myOrder.quantity }}</h2>
        <h2 class="card__total-detail">Tổng tiền: {{ myOrder.total }}đ</h2>
      </div>
    </div>
    <div class="card__footer">
      <!-- start | end |center |baseline -->
      <a-space warp align="center">
        <a-button size="large" type="primary" danger>Reset giỏ</a-button>
        <a-button size="large" type="primary">Tạo đơn hàng</a-button>
      </a-space>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, reactive } from 'vue';

// Define props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Define order
let myOrder = ref(
  {
    "user": {
        "id": 1
    },
    "products": [
    ],
    "quantity": 0,
    "total": 0,
    "note": "THANH TOÁN THÀNH CÔNG"
  }
);

// Watch props.product to add product to order and calculate total & quantity
watch(() => props.product, async (newVal, oldVal) => {
  console.log('Card', newVal);
    myOrder.value.products.push(
      {
        "product": newVal,
        "quantity": 1,
        "sellingPrice": newVal.sellingPrice
      }
    );
    myOrder.value.quantity += 1;
    myOrder.value.total += newVal.sellingPrice;
    myOrder.value.note = "THANH TOÁN THÀNH CÔNG";
  },
  { deep: true } // To watch object properties
)

</script>

<style scoped>
/* Card header */
.card__header {
  width: 100%;
  text-align: center;
  padding: 18px 16px;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-radius: 4px 4px 0 0;
  background-color: var(--primary-color);
  margin-bottom: 20px;
}

.card__header h1 {
  margin-bottom: 0;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 400;
  color: var(--white-color);
}

/* Card body */
.card_list {
  padding: 0 0 8px 0;
  margin-left: 9px;
  list-style: none;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1); 
  transition: transform ease-in 0.1s;
}

.card_item {
  margin-bottom: 10px;
}

.card_item-link {
  display: flex;
  justify-content:space-between;
  align-items: center;
}

.card_item-img {
  width: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.card_item-content {
  margin-left: 18px;
  width: 60%;
}

.card_item-title {
  padding: 0;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--black-color);
}

.card_item-price {
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--black-color);
  padding-top: 2px;
  margin: 0;
}

.card_item-quantity {
  font-size: 1.6rem;
  font-weight: 400;
  padding-top: 2px;
  color: var(--black-color);
  margin: 0;
}

.card_total {
  margin: 20px 0;
  padding-left: 10px;
}

.card__total-detail {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--text-color);
}

.card__total-detail:first-child {
  padding-bottom: 10px;
}
/* Card footer */
.card__footer {
  display: flex;
  justify-content: end;
  vertical-align: middle;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>