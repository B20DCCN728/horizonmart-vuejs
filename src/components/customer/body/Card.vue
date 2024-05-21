<template>
    <div class="card__header">
      <h1>Giỏ hàng của bạn</h1>
    </div>
    <div class="card__body">
      <ul class="card_list">
        <li class="card_item">
          <a href="#" class="card_item-link">
            <img
              class="card_item-img" 
              src="https://i.pinimg.com/originals/bf/fa/cb/bffacb16c45d8efb3e3ed884005ed7d5.jpg"
            >
            <div class="card_item-content">
              <h3 class="card_item-title">Tên sản phẩm</h3>
              <p class="card_item-price">Giá: 1.200.000đ</p>
              <p class="card_item-quantity">Số lượng: 1</p>
            </div>
          </a>
        </li>
      </ul>
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
  
}

.card_item-link {
  display: flex;
  justify-content: first baseline;
}

.card_item-img {
  width: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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