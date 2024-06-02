<script setup>
import { computed, ref, unref, reactive, h, onMounted } from 'vue';
import { Table } from 'ant-design-vue';
import ClockCircleOutlined from '@ant-design/icons-vue/ClockCircleOutlined';
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined';
import DownloadOutlined from '@ant-design/icons-vue/DownloadOutlined';
import EditOutlined from '@ant-design/icons-vue/EditOutlined';
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined';
import axios from 'axios';
import { message } from 'ant-design-vue';
import SelectSupplier from '@/components/admin/utils/supplier/SelectSupplier.vue';
import SelectCategory from '@/components/admin/utils/product/SelectCategory.vue';

// Define upload image
const fileList = ref([]);

// Define columns
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',  
  },
  {
    title: 'Mặt hàng',
    dataIndex: 'name',
    width: '13%',
  },
  {
    title: 'Danh mục',
    dataIndex: ['category', 'name'],
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'imagePath',
    width: '15%',
    padding: 0,
  },
  {
    title: 'Giá nhập',
    dataIndex: 'purchasePrice',
  },
  {
    title: 'Giá bán',
    dataIndex: 'sellingPrice',
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: ['supplier', 'name'],
  },
  {
    title: 'Ngày thêm',
    dataIndex: 'createdDate',
    width: '8%',
  },
  {
    title: "Delete",
    dataIndex: "delete",
  }
];

const dataSource = ref([
  {
    "supplier": {
      "id": 1,
      "name": "Viet gap",
      "address": "Ha noi",
      "phoneNumber": "0337176055",
      "taxID": "1200123",
      "description": "Luon cung cap rau ngon bo re cho mn"
    },
    "id": 4,
    "categoryId": 1,
    "supplierId": 1,
    "name": "Rau cai",
    "purchasePrice": 16000,
    "sellingPrice": 19000,
    "createdDate": "2024-04-15T15:30:00",
    "imagePath": "https://tmp.phongvu.vn/wp-content/uploads/2020/08/10617348-1.jpg",
    "description": "Hello dear",
    "category": {
      "id": 1,
      "name": "Rau cu",
      "description": "Chu de ve rau qua thuc pham "
    }
  },
]);


const selectedRowKeys = ref([]); // Check here to configure the default column

const onSelectChange = changableRowKeys => {
  console.log('selectedRowKeys changed: ', changableRowKeys);
  selectedRowKeys.value = changableRowKeys;
};
const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
    ],
  };
});

// Setting drawer
const form = reactive({
  "supplier": {
    "id": null,
  },
  "category": {
    "id": null,
  }, // "category": { "id": 1, "name": "Rau cu", "description": "Chu de ve rau qua thuc pham " },
  "name": "",
  "purchasePrice": "",
  "sellingPrice": "",
  "createdDate": "",
  "imagePath": "",
  "description": "",
});

// const rules = {
//   name: [
//     {
//       required: true,
//       message: 'Please enter user name',
//     },
//   ],
//   url: [
//     {
//       required: true,
//       message: 'please enter url',
//     },
//   ],
//   owner: [
//     {
//       required: true,
//       message: 'Please select an owner',
//     },
//   ],
//   type: [
//     {
//       required: true,
//       message: 'Please choose the type',
//     },
//   ],
//   approver: [
//     {
//       required: true,
//       message: 'Please choose the approver',
//     },
//   ],
//   dateTime: [
//     {
//       required: true,
//       message: 'Please choose the dateTime',
//       type: 'object',
//     },
//   ],
//   description: [
//     {
//       required: true,
//       message: 'Please enter url description',
//     },
//   ],
// };
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

// const form = reactive({
//   name: '',
//   price: '',
//   quantity: '',
//   description: '',
//   imagePath: '',
//   brand: '',
// });

const resetForm = () => {
  form.name = '';
  form.purchasePrice = '';
  form.sellingPrice = '';
  form.supplier.id = '';
  form.category.id = '';
  form.description = '';
  form.quantity = '';
  form.imagePath = '';
  fileList.value = [];
};

const handleSelectedCategory = async (value) => {
  form.category.id = value;
};

const handleSelectedSupplier = async (value) => {
  form.supplier.id = value;
}

const handleSubmit = async () => {
  // POST request using axios with async/await to create a new product
  await axios.post(
    'http://localhost:8762/ps/product/create', 
    form
  ).then(response => {
    const isSuccess = response.data;
    if (isSuccess) {
      message.success('create product success');
    } else {
      message.error('create product failed');
    }
  }).catch(error => {
    // Handle any errors that occur during the request
    console.error('There was an error creating the product:', error);
  });

  // GET request using axios with async/await to get all products
  await axios.get('http://localhost:8762/ps/product/get')
    .then(response => {
      open.value = false;
      resetForm();
      dataSource.value = response.data;
    }).catch(error => {
      // Handle any errors that occur during the request
      console.error('There was an error getting the product:', error);
    });
};

const updateProduct = async (id) => {
  const request = await axios.put(`http://localhost:8762/home/product/update`, form);
  const response = await axios.get('http://localhost:8200/product/get');
  console.log(response.data);
  dataSource.value = response.data;
};

// Setting search bar
const checked = ref(false);

const size = ref(8);

const loading = ref(true);

const searchValue = ref('');

// Fetch data
const fetchData = async () => {
  const response = await axios.get('http://localhost:8762/ps/product/get');
  console.log(response.data);
  dataSource.value = response.data;
};

const deleteProduct = async (product) => {
  console.log(product);
  const request = await axios.delete(`http://localhost:8200/product/delete`, { data: product });
  const response = await axios.get('http://localhost:8762/ps/product/get');
  message.success('delete success');
  console.log(response.data);
  dataSource.value = response.data;
};

const detail = async (id) => {
  const request = await axios.get(`http://localhost:8762/ps/product/get/${id}`);
  console.log(request.data);
  form.id = request.data.id;
  form.name = request.data.name;
  form.purchasePrice = request.data.purchasePrice;
  form.sellingPrice = request.data.sellingPrice;
  form.supplierId = request.data.supplierId;
  form.categoryId = request.data.categoryId;
  form.description = request.data.description;
  form.imagePath = request.data.imagePath;
  form.quantity = request.data.quantity;
  fileList.value = [];
  open.value = true;
  form = request.data;
};

const searchProducts = async () => {
  const response = await axios.get(`http://localhost:8762/ps/product/search?key=${searchValue.value}`);
  console.log(response.data);
  dataSource.value = response.data;
};

// const addProduct = async () => {
//   const request = await axios.post('http://localhost:8080/api/products/add', form);
//   const response = await axios.get('http://localhost:8080/api/products/getAllProducts');
//   console.log(response.data);
//   dataSource.value = response.data;
// };

onMounted(() => {
  fetchData();
});

const handleChange = info => {
  switch (info.file.status) {
    case 'uploading':
      loading.value = true;
      return;
    case 'done':
      // Get this url from response in real world.
      form.imagePath = "http://localhost:8762/ps/product/image/" + fileList.value[0].name;
      message.success('upload success');
      break;
    case 'error':
      loading.value = false;
      message.error('upload error');
      break;
  }
};

</script>

<template>
    <div>
        <h1>Sản phẩm</h1>

        <div>
          <a-slider v-model:value="size"/>
          <br />
          <br />
          <a-space :size="size">
            <a-input-search v-model:value.lazy="searchValue" autofocus placeholder="Type something in here" @search="searchProducts">
            </a-input-search>
            <a-button type="primary" @click="showDrawer">
              <template #icon><PlusOutlined /></template>
              Thêm sản phẩm
            </a-button>
          </a-space>
        </div>
        
        <!-- Button add new product
        <a-button type="primary" @click="showDrawer" style="margin: 12px 12px 0 0">
          <template #icon><PlusOutlined /></template>
          Thêm sản phẩm
        </a-button> -->
        <a-drawer
          title="Thêm mặt hàng mới"
          :width="850"
          :open="open"
          :body-style="{ paddingBottom: '80px' }"
          :footer-style="{ textAlign: 'right' }"
          @close="onClose"
        >
          <a-form :model="form" layout="vertical">
            <!-- <a-form :model="form" :rules="rules" layout="vertical"></a-form> -->
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="Tên mặt hàng" name="name">
                  <a-input v-model:value="form.name" placeholder="Vui lòng nhập tên!" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Giá nhập" name="purchasePrice">
                  <a-input-number 
                    v-model:value="form.purchasePrice" 
                    style="width: 100%"
                    addon-before="+" 
                    addon-after="$" 
                    placeholder="Vui lòng nhập giá nhập!"
                  />
                  <!-- <a-input
                    v-model:value="form.url"
                    style="width: 100%"
                    addon-before="http://"
                    addon-after=".com"
                    placeholder="please enter url"
                  /> -->
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="Giá bán" name="sellingPrice">
                  <a-input-number 
                    v-model:value="form.sellingPrice" 
                    style="width: 100%"
                    addon-before="+" 
                    addon-after="$" 
                    placeholder="Vui lòng nhập giá bán!"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Nhập số lượng" name="quantity">
                  <a-input-number 
                    v-model:value="form.quantity" 
                    style="width: 100%"
                    addon-before="-"
                    addon-after="+" 
                    placeholder="Vui lòng nhập số lượng!"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="Danh mục" name="category">
                  <SelectCategory @category-selected="handleSelectedCategory" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Nhà cung cấp" name="supplier">
                  <SelectSupplier @supplier-selected="handleSelectedSupplier" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item label="Mô tả" name="description">
                  <a-textarea
                    v-model:value="form.description"
                    :rows="4"
                    placeholder="Vui lòng nhập mô tả!"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item label="Ảnh" name="imagePath">
                  <a-textarea
                    v-model:value="form.imagePath"
                    placeholder="Vui lòng nhập ảnh!"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-upload
                  v-model:file-list="fileList"
                  name="file"
                  :headers="headers"
                  @change="handleChange"
                  :action="`http://localhost:8762/ps/product/image/upload`" 
                  list-type="picture-card" 
                >
                  <div>
                    <PlusOutlined />
                    <div style="margin-top: 8px">Upload</div>
                  </div>
                </a-upload>
                </a-col>
            </a-row>
          </a-form>
          <template #extra>
            <a-space>
              <a-button @click="onClose">Cancel</a-button>
              <a-button type="primary" @click="handleSubmit">Submit</a-button>
            </a-space>
          </template>
        </a-drawer>
        
        <a-checkbox v-model:checked="checked">Reset</a-checkbox>

        <!-- Table of content -->
        <div class="product-table">
          <a-table :row-selection="rowSelection" :columns="columns" :data-source="dataSource" bordered >
            <template #bodyCell="{ column,  text, record }">
              <template v-if="column.dataIndex === 'imagePath'">
                <div class="image-cell">
                  <img :src="record.imagePath" alt="Doraemon" class="image-cell__element">
                </div>
              </template>
              <template v-if="column.dataIndex === 'name'">
                <div class="image-cell" @click="detail( record.id )">
                  <div class="hover-div" style="">{{ record.name }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'delete'">
                <div class="image-cell">
                  <DeleteOutlined style="font-size: x-large; color: red;" @click="deleteProduct(record)"/>
                </div>
                <div class="image-cell">
                  <EditOutlined style="font-size: x-large; color: blue;" @click="detail(record.id)"/>
                </div>
              </template>
            </template>
          </a-table>   
        </div>

    </div>
</template>

<style lang="less" scoped>

.product-table {
  margin: 20px 0 0 0;
}

::v-deep .ant-table .ant-table-thead tr .ant-table-cell {
  background-color: #e8eff5;
  padding: 6px 16px !important; /* Adjust as needed */
}

::v-deep .ant-table .ant-table-thead tr .ant-table-cell {
  background-color: #e8eff5;
  padding: 6px 16px !important; /* Adjust as needed */
}

::v-deep .ant-table .ant-table-tbody tr .ant-table-cell {
  padding: 10px 16px !important; /* Adjust as needed */
}

// ::v-deep .ant-table .ant-table-tbody tr .ant-table-cell:nth-child(2) {
//   padding: 0 16px !important; /* Adjust as needed */
// }

::v-deep .ant-table .ant-table-tbody tr .ant-table-cell:nth-child(4) {
  padding: 0 12px !important; /* Adjust as needed */
}

.image-cell {
  position: relative;
  display: flex;

  justify-content: center;
  .image-cell__element {
    padding-right: 0px;
  }
  .image-cell__element {
    width: 40%;  
  }
}

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>