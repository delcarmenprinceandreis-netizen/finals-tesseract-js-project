<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6 rounded-xl" elevation="4">
      <v-card-title class="text-center text-h5 font-weight-bold mb-2">
        Login
      </v-card-title>
      <v-card-subtitle class="text-center mb-6">
        Sign in to access the OCR App
      </v-card-subtitle>
      
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Pangalan (e.g. Juan Dela Cruz)"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          class="mb-3"
        />
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-4"
        />

        <v-btn
          block
          color="primary"
          size="large"
          prepend-icon="mdi-google"
          @click="mockGoogleLogin"
        >
          Sign in with Google
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const name = ref('Juan Dela Cruz')
const email = ref('juandela@gmail.com')

const mockGoogleLogin = () => {
  // Gumawa ng fake user data para sa demo
  const userInfo = {
    name: name.value,
    email: email.value,
    picture: 'https://cdn.vuetifyjs.com/images/john.jpg'
  }

  // I-save sa browser para basahin ng Dashboard
  localStorage.setItem('google_user', JSON.stringify(userInfo))
  localStorage.setItem('google_token', 'mock_token_12345')

  // Diretsong dalhin sa Dashboard
  navigateTo('/')
}
</script> 