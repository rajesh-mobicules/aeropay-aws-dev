<template>
  <div>
    <h1>
      Beta Features
    </h1>
    <p>
      Aeropay beta is a testing ground for experimental features.
    </p>
    <br>
    <div>
      <div class="columns">
        <div class="column is-one-quarter">
          <figure class="heat-map">
            <img src="~assets/heat_map.png" alt="heat-map image">
          </figure>
        </div>
        <div class="column auto">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Orders Heat Map View
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                This awesome heatmap, layering orders visulization per geographical areas per different time ranges.
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="columns">
        <div class="column is-one-quarter">
          <figure class="analytics-img">
            <img src="~assets/analytics.png" alt="analytics image">
          </figure>
        </div>
        <div class="column is-auto">
          <div class="card">
            <header class="card-header">
              <router-link class="card-header-title" to="/labs/analytics">
                Live Business Analytics
              </router-link>
            </header>
            <div class="card-content">
              <div class="content">
                Live Business Analytics
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.heat-map {
  width: 250px;
  height: 128px;
}
.analytics-img {
  width: 250px;
  height: 128px;
}
</style>
