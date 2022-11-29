<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Notify } from 'quasar';

import { strapi } from 'src/boot/strapi';
import { StrapiError } from 'strapi-sdk-js';

const route = useRoute();
const router = useRouter();

const password = ref('');
const passwordConfirmation = ref('');
const code = route.query.code as string;

const resetPassword = async () => {
  try {
    await strapi.resetPassword({
      code: code,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    });
    Notify.create({
      message: 'Password reset successfully',
      color: 'positive',
      position: 'top',
    });
  } catch (e) {
    const { error } = e as StrapiError;
    Notify.create({
      message: e.message || error.message,
      color: 'negative',
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
            <p class="text-weight-bolder text-grey-6">
              {{ $t('resetPasswordPage.title') }}
            </p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                dense
                square
                filled
                clearable
                v-model="password"
                type="password"
                :label="$t('formFields.password.label')"
                :placeholder="$t('formFields.password.placeholder')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                dense
                square
                filled
                clearable
                v-model="passwordConfirmation"
                type="password"
                :label="$t('formFields.passwordConfirmation.label')"
                :placeholder="$t('formFields.passwordConfirmation.placeholder')"
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
                  class="full-width text-white bg-custom-dark-blue"
                  :label="$t('formButtons.reset')"
                  @click="resetPassword"
                />
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
