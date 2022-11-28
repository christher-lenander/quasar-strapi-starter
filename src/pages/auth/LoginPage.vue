<script setup lang="ts">
import { reactive } from 'vue';

import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { strapi } from 'src/boot/strapi';
import { StrapiError } from 'strapi-sdk-js';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const router = useRouter();

const state = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const login = async () => {
  const isValid = await v$.value.$validate();

  console.log('test', isValid);

  if (!isValid) {
    Notify.create({
      message: 'Please fill in all fields',
      color: 'negative',
      position: 'top',
    });
    return;
  }

  try {
    await strapi.login({
      identifier: state.email,
      password: state.password,
    });

    v$.value.$reset();

    router.push({ name: 'member-dashboard' });
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
        <q-card square class="q-pa-md q-ma-none no-shadow" style="width: 320px">
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-grey-6">Login to your account</p>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                dense
                hide-bottom-space
                square
                filled
                v-model="state.email"
                type="email"
                label="Email"
                @focus="v$.email.$reset()"
                @blur="v$.email.$touch()"
                :error="v$.email.$error"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                dense
                hide-bottom-space
                square
                filled
                v-model="state.password"
                type="password"
                label="Password"
                @focus="v$.password.$reset()"
                @blur="v$.password.$touch()"
                :error="v$.password.$error"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width">
              <div class="col-6">
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  label="Sign In"
                  @click="login()"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-caption text-right">
                  <router-link
                    :to="{ name: 'create-account' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Create account</router-link
                  ><br />
                  <router-link
                    :to="{ name: 'forgot-password' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >Forgot password</router-link
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
