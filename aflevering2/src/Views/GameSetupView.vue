<template>
  <div class="game-setup-view">
    <GameSetup />
  </div>
</template>

<script>
import GameSetup from "@/components/GameSetup.vue";

export default {
  name: "GameSetupView",
  components: {
    GameSetup, // Render the setup component
  },
};
</script>

<style>
.game-setup-view {
  text-align: center;
  margin-top: 20px;
}
</style>
