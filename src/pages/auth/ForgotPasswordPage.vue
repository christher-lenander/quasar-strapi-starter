<script setup lang="ts">
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import { strapi } from 'src/boot/strapi';
import { StrapiError } from 'strapi-sdk-js';

// const router = useRouter();

const email = ref('');

const resetPassword = async () => {
  try {
    await strapi.forgotPassword({ email: email.value });
    Notify.create({
      type: 'positive',
      message: 'Check your email for a link to reset your password.',
      position: 'top',
    });
  } catch (e) {
    const { error } = e as StrapiError;
    Notify.create({
      type: 'negative',
      message: e.message || error.message,
      position: 'top',
    });
  }
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
            <p class="text-weight-bolder text-grey-6">Forgot password</p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="resetPassword">
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
            </q-form>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width">
              <div class="col-6">
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  label="Submit"
                  type="submit"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-grey text-caption text-right">
                  <router-link
                    :to="{ name: 'login' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Sign in</router-link
                  ><br />
                  <router-link
                    :to="{ name: 'create-account' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Create account</router-link
                  >
                </div>
              </div>
            </div>
          </q-card-actions>
          <q-card-section>
            <p class="text-caption text-weight-light text-grey">
              If a user with the email exists, a link to reset the password will
              be sent to the email.
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
