<template>
    <div class="card__header">
      <h1>Giỏ hàng của bạn</h1>
    </div>
    <div class="card__body">
      <img :src="asda" alt="Product Image" class="card__image"/>
      <div class="card__details">
        <h2 class="card__title">Hello world</h2>
        <!-- <p class="card__description">{{ product.description }}</p>
        <p class="card__price">${{ product.price }}</p> -->
        <button @click="createOrder" class="card__button">Order Now</button>
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

</script>

<style scoped>
/* Card header */
.card__header {
  width: 100%;
  text-align: center;
  padding: 18px 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
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