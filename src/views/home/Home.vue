<template>
  <div id="home-component" class="home">
    <div class="container-spin" v-if="loading">
      <a-spin tip="Loading..." size="large" />
    </div>

    <audio id="audio-element" src='../../assets/sound/Avengers.mp3' loop autoPlay @loadedmetadata="onLoadedDataAudio()"></audio>
    <video id="video-element" src='../../assets/video/video.mp4'  muted autoPlay @loadedmetadata="onLoadedData()" @timeupdate="onTimeUpdate()" @click="handlerClickStart()"></video>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>

<style lang="scss">
@import './home.scss';
</style>
