<template>
<!-- Side bar -->
<div class="grid__column-2">
    <!-- Navbar item -->
    <nav class="category">
    <!-- Heading navbar -->
    <h3 class="category__heading">
        <i class="category__heading-icon fa-solid fa-list"></i>
        Danh Mục
    </h3>
    <!-- List item -->
    <ul class="category-list">
        <li class="category-item category-link--active">
        <a href="#" class="category-link">Adidas</a>
        </li>
        <li class="category-item">
        <a href="#" class="category-link">Nike</a>
        </li>
        <li class="category-item">
        <a href="#" class="category-link">Converse</a>
        </li>
        <li class="category-item">
        <a href="#" class="category-link">Vans</a>
        </li>
    </ul>
    </nav>
</div>
</template>

<style scoped>
@import '../../../assets/styles/base.css';
.category {
  background-color: var(--white-color);
  border-radius: 2px;
}

.category__heading {
  font-size: 1.7rem;
  color: var(--text-color);
  margin-top: 0;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.category__heading-icon {
  font-size: 1.4rem;
  margin-right: 4px;
  position: relative;
  top: -1px;
}

.category-list {
  padding: 0 0 8px 0;
  list-style: none;
  margin-left: 9px;
}

.category-link--active .category-link {
  color: var(--primary-color);
}

.category-link--active .category-link::before {
  content: "";
  top: 50%;
  left: 7px;
  position: absolute;
  border: 4px solid;
  transform: translateY(calc(-50% - 1px));
  border-color: transparent transparent transparent var(--primary-color);
}

.category-link {
  position: relative;
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--text-color);
  padding: 6px 16px;
  display: block;
  transition: right linear 0.1s;
  right: 0;
}

.category-link:hover {
  right: -4px;
  color: var(--primary-color);
  background-color: rgba(233, 99, 99, 0.1);
}
</style>