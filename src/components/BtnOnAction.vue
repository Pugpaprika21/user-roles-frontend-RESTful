<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { defineProps } from "vue";

const props = defineProps({
    userId: {
      type: [String, Number],
      required: true
    }
});

const router = useRouter();
const url = import.meta.env.VITE_API_BASE_URL;

const onBtnAction = (action) => {
  if (action.type == "roles-setting") {
    router.push({
      path: "/roles-setting",
      query: {
        userId: action.userId,
        type: action.type,
      },
    });
    return;
  }
};
</script>

<template>
  <div class="btn-group" role="group" aria-label="Basic outlined example">
    <button
      type="button"
      class="btn btn-outline-primary"
      :id="props.userId"
      @click.prevent="onBtnAction({ userId: props.userId, type: 'roles-setting' })"
    >
      ตั้งค่าสิทธิ์
    </button>
    <button
      type="button"
      class="btn btn-outline-primary"
      :id="props.userId"
      @click.prevent="onBtnAction({ userId: props.userId, type: 'edit' })"
    >
      เเก้ไข
    </button>
    <button
      type="button"
      class="btn btn-outline-primary"
      :id="props.userId"
      @click.prevent="onBtnAction({ userId: props.userId, type: 'delete' })"
    >
      ลบ
    </button>
  </div>
</template>