<script setup lang="ts">
import { strapi } from 'boot/strapi';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const router = useRouter();

const logout = () => {
  strapi.logout();
  router.push({ name: 'login' });
};

const notImplemented = () => {
  Notify.create({
    message: i18n.t('messages.notImplemented') as string,
    color: 'blue-7',
    icon: 'info',
    position: 'top',
  });
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
              {{ $t('memberDashboardPage.title') }}
            </p>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width">
              <div class="col q-gutter-y-sm">
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  :label="$t('memberDashboardPage.links.editProfile')"
                  @click="notImplemented"
                />
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  :label="$t('memberDashboardPage.links.changePassword')"
                  :to="{ name: 'change-password' }"
                />
                <q-btn
                  rounded
                  size="md"
                  flat
                  class="full-width text-white bg-custom-dark-blue"
                  :label="$t('memberDashboardPage.links.logout')"
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
