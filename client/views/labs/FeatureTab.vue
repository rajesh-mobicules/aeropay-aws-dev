<template>
  <div>
    <div class="columns">
        <div class="column is-one-quarter">
          <slot />
        </div>
        <div class="column auto">
          <div class="card">
            <header class="card-header">
              <a class="card-header-title" :href="link" target="_blank">
                {{title}}
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{description}}
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'link']
}
</script>

<style>

</style>
