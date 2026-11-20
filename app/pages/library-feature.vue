<template>
  <v-app class="ocr-feature-app">
    <v-main>
      <v-container class="py-6 py-md-10 px-4">
        <v-card max-width="860" class="mx-auto main-card rounded-xl pa-5 pa-md-8" elevation="2">
          <!-- Header -->
          <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-6">
            <div class="d-flex align-center ga-3">
              <v-avatar color="primary" rounded="lg" size="46">
                <v-icon color="white" size="26">
                  mdi-text-recognition
                </v-icon>
              </v-avatar>
              <div>
                <h1 class="text-h6 text-md-h5 font-weight-bold">
                  Image to Text (OCR) App
                </h1>
                <div class="text-caption text-medium-emphasis">
                  Extract readable text from images using Tesseract.js
                </div>
              </div>
            </div>

            <v-btn
              variant="tonal"
              color="primary"
              rounded="lg"
              prepend-icon="mdi-arrow-left"
              to="/"
            >
              Back to Dashboard
            </v-btn>
          </div>

          <v-divider class="mb-6" />

          <!-- File Input -->
          <v-file-input
            v-model="selectedFile"
            label="Upload Image (PNG, JPG)"
            accept="image/*"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-camera"
            show-size
            class="mb-4"
            @update:model-value="handleImageUpload"
          />

          <!-- Image Preview -->
          <div v-if="imagePreview" class="preview-box rounded-xl pa-4 mb-6 text-center">
            <div class="text-caption text-medium-emphasis mb-2">
              Image Preview
            </div>
            <v-img
              :src="imagePreview"
              max-height="300"
              contain
              class="mx-auto rounded-lg"
            />
          </div>

          <!-- Process Button -->
          <v-btn
            color="primary"
            size="large"
            rounded="lg"
            block
            elevation="2"
            class="mb-6"
            prepend-icon="mdi-text-search"
            :loading="loading"
            :disabled="!hasSelectedFile || loading"
            @click="extractText"
          >
            {{ loading ? 'Extracting Text...' : 'Extract Text from Image' }}
          </v-btn>

          <!-- Results Section -->
          <v-card variant="tonal" color="blue-grey" class="results-card rounded-xl pa-4 pa-md-5">
            <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-3">
              <div class="d-flex align-center ga-2">
                <v-icon color="primary" size="20">mdi-file-document-outline</v-icon>
                <span class="text-subtitle-1 font-weight-bold">Results</span>
                <v-chip v-if="extractedText" size="x-small" variant="flat" color="primary">
                  {{ extractedText.length }} chars
                </v-chip>
              </div>

              <div class="d-flex ga-2">
                <v-btn
                  size="small"
                  variant="text"
                  color="primary"
                  prepend-icon="mdi-content-copy"
                  :disabled="!extractedText || loading"
                  @click="copyText"
                >
                  {{ copied ? 'Copied!' : 'Copy' }}
                </v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  color="error"
                  prepend-icon="mdi-delete-outline"
                  :disabled="!extractedText || loading"
                  @click="clearResult"
                >
                  Clear
                </v-btn>
              </div>
            </div>

            <v-textarea
              v-model="extractedText"
              readonly
              variant="outlined"
              bg-color="surface"
              rounded="lg"
              rows="6"
              auto-grow
              placeholder="The text seen from the image will appear here..."
            />
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
// @ts-ignore
import { createWorker } from 'tesseract.js'

const selectedFile = ref<File | File[] | null>(null)
const imagePreview = ref<string | null>(null)
const extractedText = ref('')
const loading = ref(false)
const copied = ref(false)

const hasSelectedFile = computed(() => {
  if (!selectedFile.value) return false
  return Array.isArray(selectedFile.value) ? selectedFile.value.length > 0 : true
})

const revokePreviewUrl = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
    imagePreview.value = null
  }
}

const handleImageUpload = (file: File | File[] | null) => {
  revokePreviewUrl()
  const actualFile = Array.isArray(file) ? file[0] : file

  if (actualFile) {
    imagePreview.value = URL.createObjectURL(actualFile)
    extractedText.value = ''
    copied.value = false
  }
}

const extractText = async () => {
  if (!selectedFile.value) return
  const file = Array.isArray(selectedFile.value) ? selectedFile.value[0] : selectedFile.value
  if (!file) return

  loading.value = true
  copied.value = false
  extractedText.value = 'Reading the image, please wait...'

  try {
    const worker = await createWorker('eng')
    const ret = await worker.recognize(file)
    extractedText.value = ret.data.text.trim() || 'No text detected in the image.'
    await worker.terminate()
  } catch (error) {
    console.error(error)
    extractedText.value = 'There was an error extracting the text. Try again.'
  } finally {
    loading.value = false
  }
}

const copyText = async () => {
  if (!extractedText.value || !navigator.clipboard) return
  try {
    await navigator.clipboard.writeText(extractedText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy text:', error)
  }
}

const clearResult = () => {
  extractedText.value = ''
  copied.value = false
}

onBeforeUnmount(() => {
  revokePreviewUrl()
})
</script>

<style scoped>
.ocr-feature-app {
  background: #f5f7fc;
  min-height: 100vh;
}

.main-card {
  border: 1px solid #edf0f5;
}

.preview-box {
  background: #f8faff;
  border: 1px dashed #c8d7ee;
}

.results-card {
  border: 1px solid #e4eaf2;
}
</style>