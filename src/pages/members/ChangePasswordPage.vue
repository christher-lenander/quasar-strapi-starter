<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { strapi } from 'src/boot/strapi';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs, minLength, helpers } from '@vuelidate/validators';

const i18n = useI18n();
const router = useRouter();

i18n.locale.value = 'sv-SE';

const state = reactive({
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
});

const rules = computed(() => {
  return {
    currentPassword: {
      required: helpers.withMessage(
        () => i18n.t('vuelidate.required'),
        required
      ),
    },
    password: {
      required: helpers.withMessage(
        () => i18n.t('vuelidate.required'),
        required
      ),
      minLength: helpers.withMessage(
        ({ $params }) => i18n.t('vuelidate.minLength', [$params.min]),
        minLength(6)
      ),
    },
    passwordConfirmation: {
      required: helpers.withMessage(
        () => i18n.t('vuelidate.required'),
        required
      ),
      minLength: helpers.withMessage(
        ({ $params }) => i18n.t('vuelidate.minLength', [$params.min]),
        minLength(6)
      ),
      sameAsPassword: helpers.withMessage(
        ({ $params }) => i18n.t('vuelidate.sameAs', [$params.otherName]),
        sameAs(state.password, i18n.t('formFields.password.label'))
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);

const error = (field: string) => {
  if (!field) {
    return;
  }

  return v$.value[field].$error ? v$.value[field].$errors[0].$message : '';
};

const changePassword = async () => {
  v$.value.$touch();
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

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
              {{ $t('changePasswordPage.title') }}
            </p>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                dense
                square
                filled
                hide-bottom-space
                v-model="state.currentPassword"
                type="password"
                @focus="v$.currentPassword.$reset()"
                @blur="v$.currentPassword.$touch()"
                :label="$t('formFields.currentPassword.label')"
                :placeholder="$t('formFields.currentPassword.placeholder')"
                :error="v$.currentPassword.$error"
                :error-message="error('currentPassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                dense
                square
                filled
                hide-bottom-space
                v-model="state.password"
                type="password"
                @focus="v$.password.$reset()"
                @blur="v$.password.$touch()"
                :label="$t('formFields.password.label')"
                :placeholder="$t('formFields.password.placeholder')"
                :error="v$.password.$error"
                :error-message="error('password')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                dense
                square
                filled
                hide-bottom-space
                v-model="state.passwordConfirmation"
                type="password"
                @focus="v$.passwordConfirmation.$reset()"
                @blur="v$.passwordConfirmation.$touch()"
                :label="$t('formFields.passwordConfirmation.label')"
                :placeholder="$t('formFields.passwordConfirmation.placeholder')"
                :error="v$.passwordConfirmation.$error"
                :error-message="error('passwordConfirmation')"
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
                  :label="$t('formButtons.submit')"
                  @click="changePassword"
                />
              </div>
              <div class="col-6">
                <div class="text-no-wrap text-caption text-right">
                  <router-link
                    :to="{ name: 'member-dashboard' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >{{ $t('links.back') }}</router-link
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
