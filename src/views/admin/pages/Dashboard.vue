<template>
  <PageHeader 
    title="Thống kê" 
    sub-title="Theo doanh thu sản phẩm"
    style="padding: 10px 20px"
  />
  <div class="content">
        <div class="main">
          <a-row
              :gutter="24" 
              style="margin: 20px 0 20px 0"
           >
            <a-col :span="6">
              <StatisticRectangle 
                title="Doanh thu"
                :value="9.3"
                :precision="2"
                suffix="%"
              />
            </a-col>
            <a-col :span="6">
              <StatisticRectangle 
                title="Đã bán"
                :value="9.4"
                :precision="2"
                suffix="%"
              />
            </a-col>
            <a-col :span="6">
              <StatisticRectangle 
                title="Lợi nhuận"
                :value="9.4"
                :precision="2"
                suffix="%"
              />
            </a-col>
            <a-col :span="6">
              <StatisticRectangle 
                title="Bán chạy"
                :value="9.3"
                :precision="2"
                suffix="%"
              />
            </a-col>
          </a-row>
          <a-row gutter="16" style="margin-bottom: 20px;">
            <a-col :span="24">
                <div class="table-operations">
                  <a-button @click="setAgeSort">Sort age</a-button>
                  <a-button @click="clearFilters">Clear filters</a-button>
                  <a-button @click="clearAll">Clear filters and sorters</a-button>
                </div>
            </a-col> 
          </a-row>
          <a-row :gutter="16" style="margin-bottom: 20px">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
                <template #bodyCell="{ column }">
                  <template v-if="column.key === 'operation'">
                    <a>action</a>
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/admin/utils/PageHeader.vue'
import StatisticRectangle from '@/components/admin/utils/StatisticRectangle.vue'

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];

</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>