<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { strapi } from 'src/boot/strapi';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const i18n = useI18n();
const router = useRouter();

const state = reactive({
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
});

const rules = {
  currentPassword: { required },
  password: { required },
  passwordConfirmation: { required },
};

const v$ = useVuelidate(rules, state);

const resetPassword = async () => {
  try {
    await strapi.request('POST', '/auth/change-password', {
      data: state,
    });

    Notify.create({
      message: i18n.t('changePasswordPage.messages.success') as string,
      color: 'positive',
      position: 'top',
    });
    router.push({ name: 'member-dashboard' });
  } catch (e) {
    Notify.create({
      message: i18n.t('changePasswordPage.messages.error') as string,
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
                v-model="state.password"
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
                v-model="state.passwordConfirmation"
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
                  class="full-width text-white bg-blue-grey-9"
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
