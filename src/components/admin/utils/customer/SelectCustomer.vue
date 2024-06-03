<template>
    <a-select
      v-model:value="state.value"
      show-search
      placeholder="Tìm khách hàng"
      label-in-value
      style="width: 300px"
      :filter-option="false"
      :not-found-content="state.fetching ? undefined : null"
      :options="state.data"
      @search="fetchUser"
      @change="handleChange"
      @click="fetchUser('')"
    >
        <template v-if="state.fetching" #notFoundContent>
            <a-spin size="small" />
        </template>
    </a-select>
</template>
<script setup>
    import { reactive, watch, defineEmits } from 'vue';
    import { debounce } from 'lodash-es';

    let lastFetchId = 0;

    // Update 
    const state = reactive({
        data: [],
        value: [],
        fetching: false,
    });
    
    // Create emit to pass data to parent
    const emit = defineEmits(['customer-selected']);

    const fetchUser = debounce(value => {
        console.log('fetching category', value);
        lastFetchId += 1;
        const fetchId = lastFetchId;
        state.data = [];
        state.fetching = true;
        let path = '';
        switch (value) {
            case '': {
                path = `http://localhost:8762/us/user/all`;
                break;
            }
            default: {
                path = `http://localhost:8762/us/user/search/${value}`;
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
                console.log('fetching customer success', body);
                const data = body.map(customer => ({
                    label: `${customer.fullName}`,
                    value: customer.id
                }));
                state.data = data;
                state.fetching = false;
            });
    }, 300);

    const handleChange = async value => {
        state.value = value; 
        emit('customer-selected', {
            id: value.value,
            fullName: value.label
        });
    };

    watch(state.value, () => {
        state.data = [];
        state.fetching = false;
    });
</script>