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
        <li v-for="(x, index) in categories" class="category-item category-link--active">
          <a href="" class="category-link">{{ x.name }}</a>
        </li>
    </ul>
    </nav>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';



let categories = ref([]);
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8762/ps/product/category/get-all');
    categories.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

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