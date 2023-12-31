<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const url = import.meta.env.VITE_API_BASE_URL;

const users = ref([]);
const getUsers = async () => {
  Swal.fire({
    title: "กำลังโหลด...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const { data } = await axios.get(`${url}user/`);
    if (data.Data && data.Data.Rows) {
      users.value = data.Data.Users;
      Swal.close();
    } else {
      users.value = [];
      Swal.close();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถโหลดข้อมูลผู้ใช้",
    });
  }
};

const btnAction = (actionObj) => {
  if (actionObj.type == "roles-setting") {
    router.push({
      path: "/roles-setting",
      query: {
        userId: actionObj.userId,
      },
    });
    console.log(`actionObj`, actionObj);
    return;
  }
};

onMounted(() => {
  getUsers();
});
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
          <tr v-for="(user, index) in users" :key="user.Id">
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="user.Profile"
                class="responsive-img"
                :alt="user.Profile"
              />
            </td>
            <td>{{ user.Username }}</td>
            <td>{{ user.Email }}</td>
            <td>{{ user.CreatedAt }}</td>
            <td>
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  :id="user.Id"
                  @click.prevent="
                    btnAction({ userId: user.Id, type: 'roles-setting' })
                  "
                >
                  ตั้งค่าสิทธิ์
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  :id="user.Id"
                  @click.prevent="btnAction({ userId: user.Id, type: 'edit' })"
                >
                  เเก้ไข
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  :id="user.Id"
                  @click.prevent="
                    btnAction({ userId: user.Id, type: 'delete' })
                  "
                >
                  ลบ
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  background-color: #34495e;
  color: white;
  font-size: 0.9em;
}

.button {
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
</style>