<template>
  <div>
    <shopping-page></shopping-page>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ShoppingPage from '@/pages/shopping/index.vue'

@Component({
  components: {
    ShoppingPage,
  },
})
export default class AppPage extends Vue {}
</script>
