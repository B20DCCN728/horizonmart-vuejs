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
                :value="productStat.totalRevenue"
                :precision="2"
                suffix="%"
              />
            </a-col>
            <a-col :span="6">
              <StatisticRectangle 
                title="Đã bán"
                :value="productStat.quantitySold"
                :precision="2"
                suffix="%"
              />
            </a-col>
            <a-col :span="6">
              <StatisticRectangle 
                title="Lợi nhuận"
                :value="productStat.totalProfit"
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
                  <a-button @click="clearFilters">Clear filters</a-button>
                  <a-button @click="clearAll">Clear filters and sorters</a-button>
                  <a-range-picker
                    v-model:value="datePicker"
                    style="width: 400px"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                    }"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                  <div><h1>{{ datePicker }}</h1></div>
                  <a-button type="primary" danger :loading="loadingButton" @click="onFilterTime()">Filter</a-button>
                </div>
            </a-col> 
          </a-row>
          <a-row :gutter="16" style="margin-bottom: 20px">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="productStatDetailData" :scroll="{ x: 1300, y: 1000 }">
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.key === 'operation'">
                    <a>action</a>
                  </template>
                  <template v-if="column.dataIndex === 'imagePath'">
                    <div class="image-cell">
                      <img :src="record.imagePath" alt="Doraemon" class="image-cell__element">
                    </div>
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/admin/utils/PageHeader.vue'
import StatisticRectangle from '@/components/admin/utils/StatisticRectangle.vue'
import dayjs from 'dayjs';

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = current => {
  // Can not select days before today and today
  // B20DCCN728 - PTIT
  return current && current > dayjs().endOf('day');
};

const disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const datePicker = ref();
const loadingButton = ref(false);

const onFilterTime = async () => {
  loadingButton.value = true;
   fetchProductStat(datePicker.value[0].format("YYYY-MM-DD HH:mm:ss"), datePicker.value[1].format("YYYY-MM-DD HH:mm:ss"));
  loadingButton.value = false;
};

const columns = [
  {
    title: 'Mã định danh',
    width: 100,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: 'Tên sản phẩm',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'imagePath',
    key: 'imagePath',
  },
  {
    title: 'Giá nhập',
    dataIndex: 'purchasePrice',
    key: 'purchasePrice',
  },
  {
    title: 'Giá bán',
    dataIndex: 'sellingPrice',
    key: 'sellingPrice',
  },
  {
    title: 'Phân loại',
    dataIndex: ['category', 'name'],
    key: 'category',
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: ['supplier', 'name'],
    key: 'supplier',
  },
  {
    title: 'Tồn kho',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Đã bán',
    dataIndex: 'quantitySold',
    key: 'quantitySold',
  },
  {
    title: 'Doanh thu (VND)',
    dataIndex: 'totalRevenue',
    key: 'totalRevenue',
  },
  {
    title: 'Tiền lời (VND)',
    dataIndex: 'totalProfit',
    key: 'totalProfit',
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

const productStat = ref({
  "totalRevenue": 0,
  "totalProfit": -406000,
  "quantitySold": 5,
});

const productStatDetailData = ref([]);

const fetchProductStat = async (from, to) => {
  const encodedFrom = encodeURIComponent(from);
  const encodedTo = encodeURIComponent(to);
  try {
    const res = await axios.get(`http://localhost:8762/ps/product/get-stat/${encodedFrom}/${encodedTo}`);
    console.log(res.data);
    productStat.value.totalRevenue = res.data.totalRevenue;
    productStat.value.totalProfit = res.data.totalProfit;
    productStat.value.quantitySold = res.data.quantitySold;
    productStatDetailData.value = res.data.productStatDetails;
    console.log(productStat.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchProductStat("2024-06-03 16:38:13", "2024-06-03 23:09:48");
});

</script>

<style lang="less" scoped>
.image-cell {
  position: relative;
  display: flex;

  justify-content: center;
  .image-cell__element {
    padding-right: 0px;
  }
  .image-cell__element {
    width: 50%;  
  }
}

.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>