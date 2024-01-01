<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { ref, watch } from "vue";
import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;
const route = useRoute();
const router = useRouter();
const userId = route.query.userId;

const mRoleList = ref([]);
const doGetRoleSetting = async () => {
  try {
    const { data } = await axios.get(`${url}master/user-roles/`);
    mRoleList.value = data.Data.Roles;
  } catch (error) {
    console.log(error);
  }
};

const checkboxMRoles = ref([]);
const doCheck = ref([]);
const unCheck = ref([]);
const previousValues = ref([]);

watch(checkboxMRoles, (newValues, oldValues) => {
  newValues.forEach((value) => {
    if (!oldValues.includes(value)) {
      doCheck.value.push(value);
      const index = unCheck.value.indexOf(value);
      if (index > -1) unCheck.value.splice(index, 1);
    }
  });

  oldValues.forEach((value) => {
    if (!newValues.includes(value)) {
      unCheck.value.push(value);
      const index = doCheck.value.indexOf(value);
      if (index > -1) doCheck.value.splice(index, 1);
    }
  });
  previousValues.value = [...newValues];
});

const onSaveRoleSettings = async () => {
  console.log(doCheck.value, unCheck.value);
  try {
    const { data } = await axios.post(`${url}master/user-roles-setting/create`,
      {
        userId: parseInt(userId),
        roleSettings: {
          doCheck: doCheck.value,
          unCheck: unCheck.value,
        },
      }
    );

    console.log(`data`, data);
  } catch (error) {
    console.log(error);
  }
};

const user = ref({});
const doGetUserDetail = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user/show/${userId}`);
    user.value = data.data.Data.User;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  doGetUserDetail();
  doGetRoleSetting();
});
</script>

<template>
  <div class="card-main mt-4">
    <form
      action=""
      method="post"
      id="create-roles"
      @submit.prevent="onSaveRoleSettings()"
    >
      <div class="card card-main">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <span class="badge text-bg-primary">ข้อมูลผู้ใช้งาน</span>
              
                <div class="row input-row mt-2 g-2">
                  <div class="col-md-6">
                    <div class="input-group input-group-sm mb-2">
                      <span class="input-group-text" id="inputGroup-sizing-sm">ชื่อผู้ใช้งาน</span>
                      <input type="text" class="form-control" :value="user.Username">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group input-group-sm mb-2">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                      <input type="text" class="form-control" :value="user.Username">
                    </div>
                  </div>
                </div>
                <div class="row input-row g-2">
                  <div class="col-md-6">
                    <div class="input-group input-group-sm mb-2">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                      <input type="text" class="form-control" :value="user.Username">
                    </div>
                  </div>
                  <!-- <div class="col-md-6">
                    <div class="input-group input-group-sm mb-2">
                      <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                      <input type="text" class="form-control" :value="user.Username">
                    </div>
                  </div> -->
                </div>
            </div>
            <div class="col-md-4">
              <span class="badge text-bg-primary">ตั้งค่าสิทธิ์</span>
              <div class="card mt-2">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="mRole in mRoleList"
                    :key="mRole.Id"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="mRole.Id"
                        v-model="checkboxMRoles"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        {{ mRole.RoleName }}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <span class="badge text-bg-primary"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <button
          type="submit"
          class="btn"
          style="
            border-radius: 0px;
            background-color: #1bae53;
            color: white;
            --bs-btn-padding-y: 0.25rem;
            --bs-btn-padding-x: 0.5rem;
            --bs-btn-font-size: 0.75rem;
          "
        >
          บันทึก
        </button>
      </div>
    </form>
  </div>
</template>