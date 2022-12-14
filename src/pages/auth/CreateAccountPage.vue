<script setup lang="ts">
import { reactive } from 'vue';

import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import { strapi } from 'src/boot/strapi';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
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

const register = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    Notify.create({
      message: i18n.t('validation.formInvalidMessage') as string,
      color: 'negative',
      position: 'top',
    });

    return;
  }

  try {
    await strapi.register({
      username: state.email,
      email: state.email,
      password: state.password,
    });

    router.push({ name: 'member-dashboard' });
  } catch (e) {
    Notify.create({
      message: i18n.t('createAccountPage.error') as string,
      color: 'negative',
      icon: 'warning',
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
              {{ $t('createAccountPage.title') }}
            </p>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                dense
                square
                filled
                hide-bottom-space
                @focus="v$.email.$reset()"
                @blur="v$.email.$touch()"
                :error="v$.email.$error"
                v-model="state.email"
                type="email"
                :label="$t('formFields.email.label')"
                :placeholder="$t('formFields.email.placeholder')"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                dense
                square
                filled
                hide-bottom-space
                @focus="v$.password.$reset()"
                @blur="v$.password.$touch()"
                :error="v$.password.$error"
                v-model="state.password"
                type="password"
                :label="$t('formFields.password.label')"
                :placeholder="$t('formFields.password.placeholder')"
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
                  flat
                  size="md"
                  class="full-width text-white bg-blue-grey-9"
                  :label="$t('formButtons.createAccount')"
                  @click="register"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-grey text-caption text-right">
                  <router-link
                    :to="{ name: 'login' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >{{ $t('links.login') }}</router-link
                  ><br />
                  <router-link
                    :to="{ name: 'forgot-password' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >{{ $t('links.forgotPassword') }}</router-link
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
