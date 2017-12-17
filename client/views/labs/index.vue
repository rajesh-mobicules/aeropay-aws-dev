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
      <!-- <feature-tab
        imageUrl="assets/img/heat_map.png"
        title="Orders Heat Map View"
        description="This awesome heatmap, layering orders visulization per geographical areas per different time ranges."
        link="about:blank"
      /> -->
      <feature-tab
        title="Live Map"
        description="Live Map"
        link="about:blank"
      >
        <figure>
          <img src="~assets/live-map.png" alt="Live Map">
        </figure>
      </feature-tab>
      <feature-tab
        title="Live Business Analytics"
        description="Live Business Analytics"
        link="/labs/analytics"
      >
        <figure>
          <img src="~assets/analytics.png" alt="Live Business Analytics">
        </figure>
      </feature-tab>
      <feature-tab
        title="Leader Board"
        description="Leader Board"
        link="about:blank"
      >
        <figure>
          <img src="~assets/leaderboard.png" alt="Leader Board">
        </figure>
      </feature-tab>
    </div>
  </div>
</template>

<script>
import FeatureTab from './FeatureTab'
// import heapMap from 'assets/heat_map.png'
export default {
  components: {
    FeatureTab
  }
};
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
