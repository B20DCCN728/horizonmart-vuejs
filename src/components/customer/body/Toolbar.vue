<template>
<!-- Home filter -->
<div class="home-filter">
    <span class="home-filter__label">Sắp xếp theo</span>
    <button class="home-filter__btn btn">Tồn kho</button>
    <button class="home-filter__btn btn btn--primary">Mới nhất</button>
    <button class="home-filter__btn btn">Bán chạy</button>
    <div class="select-input">  
    <span class="select-input__label">Price</span>
    <i class="select-input__icon fa-sharp fa-solid fa-chevron-down"></i>
    <!-- List option -->
    <ul class="select-input__list">
        <li class="select-input__item">
            <a href="#" class="select-input__link">Giá: Thấp đến cao</a>
        </li>
        <li class="select-input__item">
            <a href="#" class="select-input__link">Giá: Cao đến thấp</a>
        </li>
    </ul> 
    </div>
    <div class="home-filter__page">
        <span class="home-filter__page-num">
            <span class="home-filter__page-current">1</span>/14
        </span>
        <div class="home-filter__page-control">
            <a href="" class="home-filter__page-btn home-filter__page-btn--disable">
            <i class="home-filter__page-icon fa-sharp fa-solid fa-chevron-left"></i>
            </a>
            <a href="" class="home-filter__page-btn">
            <i class="home-filter__page-icon fa-sharp fa-solid fa-chevron-right"></i>
            </a>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Home sort + filter*/

.home-filter {
  background-color: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  padding: 12px 22px;
  border-radius: 2px;
}

.home-filter__label {
  font-size: 1.4rem;
  color: #555555;
  margin-right: 16px;
}

.home-filter__btn {
  min-width: 90px;
  margin-right: 12px;
}

/* Home filter page */
.home-filter__page {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.home-filter__page-num {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-right: 22px;
}

.home-filter__page-current {
  color: var(--primary-color);
}

.home-filter__page-control {
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  width: 72px;
  height: 36px;
}

.home-filter__page-btn {
  flex: 1;
  display: flex;
  background-color: var(--white-color);
  text-decoration: none;
}

.home-filter__page-icon {
  margin: auto;
  font-size: 1.2rem;
  color: #555;
}

.home-filter__page-btn:first-child {
  border-right: 1px solid #dedede;
}

.home-filter__page-btn--disable {
  background-color: #f6f0f0;
  cursor: default;
}

.home-filter__page-btn--disable .home-filter__page-icon {
  color: #286822;
}
</style>