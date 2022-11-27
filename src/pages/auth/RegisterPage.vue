<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import { strapi } from 'src/boot/strapi';
import { StrapiError } from 'strapi-sdk-js';

const router = useRouter();

const email = ref('');
const password = ref('');

const register = async () => {
  try {
    await strapi.register({
      username: email.value,
      email: email.value,
      password: password.value,
    });

    try {
      await strapi.create('user-profiles', {
        user: strapi.user?.id,
      });

      router.push({ name: 'home' });
    } catch (e) {
      const { error } = e as StrapiError;
      Notify.create({
        message: e.message || error.message,
        color: 'negative',
        position: 'top',
      });
    }
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
        <q-card
          squarex
          class="q-pa-md q-ma-none no-shadow"
          style="width: 320px"
        >
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-grey">Create new account</p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                dense
                square
                filled
                clearable
                v-model="email"
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
                v-model="password"
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
                  flat
                  size="md"
                  class="full-width text-white bg-green-7"
                  label="Sign up"
                  @click="register()"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-grey text-caption text-right">
                  <router-link
                    :to="{ name: 'login' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Sign in</router-link
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
