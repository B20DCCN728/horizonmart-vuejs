<template>
    <a-select
      v-model:value="state.value"
      show-search
      placeholder="Chọn danh mục"
      label-in-value
      style="width: 100%"
      :filter-option="false"
      :not-found-content="state.fetching ? undefined : null"
      :options="state.data"
      @search="fetchUser"
      @change="fetchUser"
      @click="fetchUser('')"
    >
        <template v-if="state.fetching" #notFoundContent>
            <a-spin size="small" />
        </template>
    </a-select>
</template>
<script setup>
    import { reactive, watch } from 'vue';
    import { debounce } from 'lodash-es';

    let lastFetchId = 0;

    // Update 
    const state = reactive({
        data: [],
        value: [],
        fetching: false,
    });

    const fetchUser = debounce(value => {
        console.log('fetching category', value);
        lastFetchId += 1;
        const fetchId = lastFetchId;
        state.data = [];
        state.fetching = true;
        let path = '';
        switch (value) {
            case '': {
                path = `http://localhost:8762/ps/product/category/get-all`;
                break;
            }
            default: {
                path = `http://localhost:8762/ps/product/category/search/${value}`;
                break;
            }
        }
        fetch(path)
            .then(response => response.json())
            .then(body => {
                if (fetchId !== lastFetchId) {
                    // for fetch callback order
                    return;
                }
                console.log('fetching category success', body);
                const data = body.map(category => ({
                    label: `${category.name}`,
                    value: category.id,
                }));
                state.data = data;
                state.fetching = false;
            });
    }, 300);

    watch(state.value, () => {
        state.data = [];
        state.fetching = false;
    });
</script>