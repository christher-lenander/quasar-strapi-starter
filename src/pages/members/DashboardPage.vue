<script setup lang="ts">
import { strapi } from 'boot/strapi';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  strapi.logout();
  router.push({ name: 'login' });
};
</script>
<template>
  <q-page
    class="window-height window-width row justify-center items-center bg-grey-3"
  >
    <div class="column">
      <div class="row">
        <q-card square class="q-pa-md q-ma-none no-shadow" style="width: 320px">
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-grey-6">Member Dashboard</p>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width">
              <div class="col q-gutter-y-sm">
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  label="Edit Username and Email"
                />
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  label="Change Password"
                />
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  label="Logout"
                  @click="logout()"
                />
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
