<template>
  <v-app class="ocr-app">
    <v-main>
      <v-container fluid class="dashboard-container pa-4 pa-md-8">

        <!-- Header -->
        <div class="d-flex align-center justify-space-between mb-8">
          <div class="d-flex align-center ga-3">
            <v-avatar color="primary" rounded="lg" size="46">
              <v-icon color="white" size="28">
                mdi-text-recognition
              </v-icon>
            </v-avatar>

            <div>
              <div class="text-h6 font-weight-bold">
                OCR Workspace
              </div>
              <div class="text-caption text-medium-emphasis">
                Image to Text Application
              </div>
            </div>
          </div>

          <v-btn
            variant="tonal"
            color="error"
            prepend-icon="mdi-logout"
            rounded="lg"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>

        <!-- Welcome Banner -->
        <v-card class="welcome-banner rounded-xl mb-8" elevation="0">
          <v-row align="center" no-gutters>
            <v-col cols="12" md="8">
              <div class="pa-6 pa-md-10">
                <div class="text-overline text-white">
                  YOUR PERSONAL OCR WORKSPACE
                </div>

                <h1 class="text-h4 text-md-h3 font-weight-bold text-white mb-3">
                  Welcome back,<br />
                  {{ user?.name || 'User' }}!
                </h1>

                <p class="text-body-1 text-white welcome-description">
                  Extract text from your images quickly and easily
                  using our Image-to-Text recognition system.
                </p>

                <v-btn
                  color="white"
                  class="mt-5 text-primary"
                  size="large"
                  rounded="lg"
                  prepend-icon="mdi-text-recognition"
                  to="/library-feature"
                  elevation="2"
                >
                  Start Extracting Text
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="4" class="d-none d-md-flex justify-center">
              <v-icon
                icon="mdi-file-document-multiple-outline"
                size="180"
                color="white"
                class="hero-icon"
              />
            </v-col>
          </v-row>
        </v-card>

        <!-- Main Content -->
        <v-row>
          <!-- OCR Feature -->
          <v-col cols="12" md="8">
            <v-card
              class="feature-card rounded-xl pa-5 pa-md-7 h-100"
              elevation="2"
            >
              <div class="d-flex align-center ga-3 mb-5">
                <v-avatar color="blue-lighten-5" size="54">
                  <v-icon color="primary" size="30">
                    mdi-image-text
                  </v-icon>
                </v-avatar>

                <div>
                  <div class="text-h6 font-weight-bold">
                    Image-to-Text Recognition
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    Convert images into readable text
                  </div>
                </div>
              </div>

              <p class="text-body-2 text-medium-emphasis mb-6">
                Upload an image and let Tesseract.js recognize
                and extract the text. Save time by converting
                printed or photographed text into digital text.
              </p>

              <v-btn
                color="primary"
                block
                size="large"
                rounded="lg"
                prepend-icon="mdi-arrow-right"
                to="/library-feature"
              >
                Open OCR Feature
              </v-btn>
            </v-card>
          </v-col>

          <!-- User Profile -->
          <v-col cols="12" md="4">
            <v-card
              class="profile-card rounded-xl pa-5 pa-md-7 h-100"
              elevation="2"
            >
              <div class="text-subtitle-1 font-weight-bold mb-5">
                Your Account
              </div>

              <div class="d-flex flex-column align-center text-center">
                <v-avatar
                  size="88"
                  color="primary"
                  class="mb-4"
                >
                  <span class="text-h4 text-white font-weight-bold">
                    {{ userInitials }}
                  </span>
                </v-avatar>

                <div class="text-h6 font-weight-bold">
                  {{ user?.name || 'User' }}
                </div>

                <div class="text-body-2 text-medium-emphasis mt-1">
                  {{ user?.email || 'No email available' }}
                </div>

                <v-chip
                  color="success"
                  variant="tonal"
                  size="small"
                  class="mt-4"
                  prepend-icon="mdi-check-circle"
                >
                  Logged In
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Footer -->
        <div class="text-center mt-10 pb-4">
          <p class="text-caption text-medium-emphasis">
            OCR Workspace · Powered by Tesseract.js
          </p>
        </div>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const user = ref<{
  name?: string
  email?: string
  picture?: string
} | null>(null)

const userInitials = computed(() => {
  const name = user.value?.name?.trim()
  if (!name) return 'U'

  const parts = name.split(/\s+/)
  const firstInitial = parts[0]?.charAt(0) ?? ''
  const lastInitial = parts.at(-1)?.charAt(0) ?? ''

  if (parts.length === 1) {
    return firstInitial.toUpperCase() || 'U'
  }

  return `${firstInitial}${lastInitial}`.toUpperCase() || 'U'
})

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')

  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch {
      localStorage.removeItem('google_user')
      user.value = null
    }
  }
})

const logout = async () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')

  await navigateTo('/login')
}
</script>

<style scoped>
.ocr-app {
  background: #f5f7fc;
  min-height: 100vh;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-banner {
  background: linear-gradient(
    120deg,
    #1565c0 0%,
    #1976d2 55%,
    #42a5f5 100%
  );
  overflow: hidden;
}

.welcome-description {
  max-width: 540px;
  line-height: 1.8;
  opacity: 0.95;
}

.hero-icon {
  opacity: 0.25;
}

.feature-card,
.profile-card {
  border: 1px solid #edf0f5;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover,
.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(25, 60, 100, 0.10) !important;
}

@media (max-width: 600px) {
  .welcome-description {
    font-size: 14px !important;
  }
}
</style>
