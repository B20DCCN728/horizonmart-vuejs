<template>
    <div class="static-rectangle__base">
        <a-statistic
            :title="props.title"
            :value="props.value"
            :precision="props.precision"
            :suffix="props.suffix"
            class="demo-class"
            :value-style="{ 
                color: '#cf1322',
            }"
        >
            <template #prefix>
                <arrow-down-outlined />
            </template>
        </a-statistic>
    </div>
  </template>

  <script setup>
  import { defineProps } from 'vue';
  import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    title: String,
    value: Number,
    precision: Number,
    suffix: String,
  })

  </script>
  
  <style scoped>
    .static-rectangle__base {
        padding: 10px;
        border: 1px solid #e5a8a8;
        border-radius: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        -webkit-box-shadow:0px 0px 172px 0px rgba(45,255,196,0.77);
        -moz-box-shadow: 0px 0px 172px 0px rgba(45,255,196,0.77);
        box-shadow: 0px 0px 172px 0px rgba(45,255,196,0.77);
    }

  </style>

  