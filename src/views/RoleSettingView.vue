<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { ref } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const url = import.meta.env.VITE_API_BASE_URL;

const mRoleSettingList = ref([]);
const mRoleList = ref([]);

const userId = route.query.userId;
const mRoleSettings = async () => {
  try {
    const { data } = await axios.get(`${url}master/user-roles/`);
    mRoleList.value = data.Data.Roles;
    console.log(`data`, data.Data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  mRoleSettings();
});
</script>

<template>
  <div>RoleSettingView {{ userId }}</div>
</template>