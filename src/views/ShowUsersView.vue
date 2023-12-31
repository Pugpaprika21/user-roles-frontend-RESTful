<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { convertToBuddhistEra } from "../util/helpers.js";

const url = import.meta.env.VITE_API_BASE_URL;

const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = ref(0);
// `${url}user?page=${page}&limit=${pageSize.value}`
const getUsers = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `${url}user`
    );
    if (data.rows) {
      users.value = data.users;
      totalPages.value = Math.ceil(data.rows / pageSize.value);
      return;
    }
    users.value = [];
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

onMounted(() => {

  getUsers(currentPage.value);

//   setInterval(() => {
//     getUsers(currentPage.value);
//   }, 5000);
});

const changePage = (page) => {
  currentPage.value = page;
  getUsers(page);
};
</script>

<template>
  <div class="main-table-users mt-4">
    <div class="table-responsive">
      <table
        class="table table-bordered table-sm align-middle text-center"
        id="users-table"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">โปรไฟล์</th>
            <th scope="col">ชื่อผู้ใช้งาน</th>
            <th scope="col">อีเมล</th>
            <th scope="col">สร้างเมื่อ</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="user.profile"
                class="responsive-img"
                :alt="user.profile"
              />
            </td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ convertToBuddhistEra(user.created_at) }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="user-paginat">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(currentPage - 1)"
              >Previous</a
            >
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(currentPage + 1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.responsive-img {
  width: 100%;
  height: auto;
}

@media (min-width: 769px) {
  .responsive-img {
    height: auto;
    width: 50px;
  }
}

@media (max-width: 768px) {
  .responsive-img {
    max-width: 100%;
    height: auto;
  }
}

#users-table th {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: rgb(45, 89, 104);
    color: white;
    font-size: 0.9em;
  }
</style>