<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { strapi } from 'src/boot/strapi';

const i18n = useI18n();

const email = ref('');

const forgotPassword = async () => {
  try {
    await strapi.forgotPassword({ email: email.value });
    Notify.create({
      type: 'positive',
      message: i18n.t('forgotPasswordPage.messages.success') as string,
      position: 'top',
    });
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: i18n.t('forgotPasswordPage.messages.error') as string,
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
              {{ $t('forgotPasswordPage.title') }}
            </p>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                dense
                square
                filled
                clearable
                v-model="email"
                type="email"
                :label="$t('formFields.email.label')"
                :placeholder="$t('formFields.email.label')"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
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
                  class="full-width text-white bg-blue-grey-9"
                  :label="$t('formButtons.submit')"
                  @click="forgotPassword"
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
                    :to="{ name: 'create-account' }"
                    style="text-decoration: none"
                    class="text-grey-6 text-caption"
                    >{{ $t('links.createAccount') }}</router-link
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
