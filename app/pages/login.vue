
<template>
  <v-container fluid class="login-page fill-height pa-0">
    <v-row no-gutters class="fill-height">

      <!-- LEFT SIDE: BRANDING -->
      <v-col
        cols="12"
        md="7"
        class="brand-section d-none d-md-flex"
      >
        <div class="brand-content">

          <div class="d-flex align-center ga-3 mb-12">
            <v-avatar color="white" rounded="lg" size="48">
              <v-icon color="primary" size="30">
                mdi-text-recognition
              </v-icon>
            </v-avatar>

            <div>
              <div class="text-h6 font-weight-bold text-white">
                OCR Workspace
              </div>
              <div class="text-caption text-white">
                Image to Text Application
              </div>
            </div>
          </div>

          <div class="hero-text">
            <div class="text-overline text-white mb-3">
              SMART TEXT RECOGNITION
            </div>

            <h1 class="text-h3 font-weight-bold text-white mb-5">
              Turn Your Images<br />
              Into Digital Text.
            </h1>

            <p class="text-body-1 text-white hero-description">
              Extract text from your images quickly and easily.
              Make your documents searchable and your workflow
              more productive with OCR technology.
            </p>
          </div>

          <!-- Illustration -->
          <div class="illustration-wrapper">
            <v-card
              class="document-card pa-5 rounded-xl"
              elevation="0"
            >
              <div class="d-flex align-center ga-3 mb-5">
                <v-avatar color="blue-lighten-5" size="42">
                  <v-icon color="primary">
                    mdi-file-document-outline
                  </v-icon>
                </v-avatar>

                <div>
                  <div class="font-weight-bold text-grey-darken-3">
                    Document Scanner
                  </div>
                  <div class="text-caption text-grey">
                    Image recognition
                  </div>
                </div>
              </div>

              <div class="scan-area pa-4 rounded-lg">
                <v-icon color="primary" size="48">
                  mdi-image-outline
                </v-icon>

                <div class="scan-line mt-3"></div>
                <div class="scan-line short mt-2"></div>
                <div class="scan-line mt-2"></div>
              </div>

              <div class="d-flex align-center mt-4 ga-2">
                <v-icon color="success" size="small">
                  mdi-check-circle
                </v-icon>
                <span class="text-caption text-grey-darken-1">
                  Ready to extract text
                </span>
              </div>
            </v-card>
          </div>

          <div class="text-caption text-white footer-left">
            © 2026 OCR Workspace. All rights reserved.
          </div>
        </div>
      </v-col>

      <!-- RIGHT SIDE: LOGIN -->
      <v-col
        cols="12"
        md="5"
        class="login-section d-flex align-center justify-center"
      >
        <div class="login-wrapper">

          <!-- Mobile Logo -->
          <div class="d-flex d-md-none align-center justify-center ga-3 mb-10">
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

          <div class="text-center mb-8">
            <v-avatar
              color="blue-lighten-5"
              size="76"
              class="mb-5"
            >
              <v-icon color="primary" size="38">
                mdi-account-circle-outline
              </v-icon>
            </v-avatar>

            <h2 class="text-h4 font-weight-bold mb-3">
              Welcome Back!
            </h2>

            <p class="text-body-2 text-medium-emphasis">
              Sign in with your Google account to access
              your OCR Workspace.
            </p>
          </div>

          <v-alert
            v-if="errorMsg"
            type="error"
            variant="tonal"
            density="comfortable"
            rounded="lg"
            class="mb-5"
          >
            {{ errorMsg }}
          </v-alert>

          <div class="login-form">

            <div class="mb-5">
              <div class="text-subtitle-2 font-weight-bold mb-2">
                Sign in to your account
              </div>

              <div class="text-caption text-medium-emphasis">
                Use your Google account to continue.
              </div>
            </div>

            <v-btn
              block
              color="primary"
              size="x-large"
              rounded="lg"
              class="google-button"
              :loading="loadingGoogle"
              :disabled="loadingGoogle"
              @click="handleGoogleSignIn"
            >
              <template #prepend>
                <v-icon>mdi-google</v-icon>
              </template>

              Continue with Google
            </v-btn>

            <div class="d-flex align-center my-7">
              <v-divider />
              <span class="mx-3 text-caption text-medium-emphasis">
                SECURE ACCESS
              </span>
              <v-divider />
            </div>

            <div class="security-info pa-4 rounded-lg">
              <div class="d-flex align-center ga-3">
                <v-avatar color="green-lighten-5" size="40">
                  <v-icon color="success">
                    mdi-shield-check-outline
                  </v-icon>
                </v-avatar>

                <div>
                  <div class="text-subtitle-2 font-weight-bold">
                    Secure Google Sign-In
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    Your account is authenticated through Google.
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="text-center mt-10">
            <p class="text-caption text-medium-emphasis">
              Powered by Tesseract.js OCR Technology
            </p>
          </div>

        </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const errorMsg = ref('')
const loadingGoogle = ref(false)

useHead({
  script: [
    {
      src: 'https://accounts.google.com/gsi/client',
      async: true,
      defer: true
    }
  ]
})

const handleGoogleSignIn = () => {
  errorMsg.value = ''

  const clientId =
    (config.public.googleClientId as string | undefined) ||
    '287415882924-rjhl4ugdfmqgam7lq3e3m4jjguj70a1l.apps.googleusercontent.com'

  const googleObj = (window as any).google

  if (!clientId) {
    errorMsg.value = 'Walang Google Client ID na naka-set.'
    return
  }

  if (!googleObj?.accounts?.oauth2) {
    errorMsg.value =
      'Hindi pa na-load ang Google Sign-In. I-refresh ang page at subukan muli.'
    return
  }

  loadingGoogle.value = true

  const tokenClient = googleObj.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'openid profile email',

    callback: async (tokenResponse: any) => {
      if (tokenResponse?.error || !tokenResponse?.access_token) {
        loadingGoogle.value = false
        errorMsg.value =
          'Kinansela o hindi natuloy ang pag-login sa Google.'
        return
      }

      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`
            }
          }
        )

        if (!res.ok) {
          throw new Error('Failed to fetch Google user info')
        }

        const profile = await res.json()

        const userInfo = {
          name: profile.name || 'Google User',
          email: profile.email || '',
          picture: profile.picture || ''
        }

        localStorage.setItem(
          'google_user',
          JSON.stringify(userInfo)
        )

        localStorage.setItem(
          'google_token',
          tokenResponse.access_token
        )

        loadingGoogle.value = false

        await navigateTo('/')

      } catch {
        loadingGoogle.value = false
        errorMsg.value =
          'Nagkaproblema sa pagkuha ng Gmail account details.'
      }
    }
  })

  tokenClient.requestAccessToken({
    prompt: 'select_account'
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f7f9fd;
}

/* LEFT BRANDING SECTION */
.brand-section {
  background: linear-gradient(
    145deg,
    #0d47a1 0%,
    #1565c0 50%,
    #42a5f5 100%
  );
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.brand-content {
  width: 100%;
  padding: 55px 9%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.hero-text {
  max-width: 570px;
}

.hero-description {
  line-height: 1.9;
  max-width: 490px;
  opacity: 0.9;
}

/* DOCUMENT ILLUSTRATION */
.illustration-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 45px;
  max-width: 420px;
  width: 100%;
  align-self: center;
}

.document-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.97);
  transform: rotate(-2deg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.scan-area {
  background: #f0f6ff;
  border: 1px dashed #90caf9;
  text-align: center;
}

.scan-line {
  height: 7px;
  width: 100%;
  background: #bbd8f8;
  border-radius: 10px;
}

.scan-line.short {
  width: 65%;
}

.footer-left {
  margin-top: auto;
  padding-top: 35px;
  opacity: 0.8;
}

/* RIGHT LOGIN SECTION */
.login-section {
  min-height: 100vh;
  padding: 40px;
  background: #ffffff;
}

.login-wrapper {
  width: 100%;
  max-width: 410px;
}

.login-form {
  width: 100%;
}

.google-button {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  box-shadow: 0 5px 14px rgba(25, 118, 210, 0.2);
}

.security-info {
  background: #f6f9fd;
  border: 1px solid #edf1f7;
}

/* MOBILE RESPONSIVENESS */
@media (max-width: 960px) {
  .login-section {
    padding: 30px 24px;
  }

  .login-wrapper {
    max-width: 430px;
  }
}

@media (max-width: 600px) {
  .login-section {
    min-height: 100vh;
    padding: 30px 22px;
  }

  .login-wrapper {
    max-width: 100%;
  }
}
</style>
