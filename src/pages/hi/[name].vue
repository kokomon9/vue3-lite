<script setup lang="ts">
const props = defineProps({ name: String })
const router = useRouter()
const date = ref(localDate('20002-10-03'))
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ props.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route! {{ date }}</em>
    </p>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
