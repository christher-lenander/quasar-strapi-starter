<script setup lang="ts">
import { reactive } from 'vue';

import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { strapi } from 'src/boot/strapi';
import { StrapiError } from 'strapi-sdk-js';

const router = useRouter();

const user = reactive({
  email: '',
  password: '',
});

const login = async () => {
  try {
    await strapi.login({
      identifier: user.email,
      password: user.password,
    });
    router.push({ name: 'dashboard' });
  } catch (e) {
    const { error } = e as StrapiError;
    Notify.create({
      message: e.message || error.message,
      color: 'negative',
      icon: 'warning',
      position: 'top',
    });
  }
};
</script>

<template>
  <q-page
    class="window-height window-width row justify-center items-center bg-grey-2"
  >
    <div class="column">
      <div class="row">
        <q-card class="q-pa-md q-ma-none no-shadow" style="width: 320px">
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-grey">Login to your account</p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="login()">
              <q-input
                dense
                square
                filled
                clearable
                v-model="user.email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                dense
                square
                filled
                clearable
                v-model="user.password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width">
              <div class="col-6">
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-green-7"
                  label="Sign In"
                  type="submit"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-caption text-right">
                  <router-link
                    :to="{ name: 'sign-up' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Sign up</router-link
                  >
                </div>
              </div>
            </div>
          </q-card-actions>
          <q-card-section>
            <p class="text-caption text-weight-light text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              semper laoreet placerat. Nullam semper auctor justo, rutrum
              posuere odio vulputate nec.
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
