import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  loading = true;
  finishedVideo = false;

  handlerClickStart () {
    if (this.finishedVideo) { this.$router.push('/characters') }
  }

  onLoadedData (): void {
    this.loading = false
    const video: any = document.getElementById('video-element')
    video && video.play()
  }

  onLoadedDataAudio (): void {
    const audio: any = document.getElementById('audio-element')
    audio && audio.play()
  }

  onTimeUpdate (): void {
    const video: any = document.getElementById('video-element')

    if (video && video.currentTime >= 26.6) {
      this.finishedVideo = true
      video.pause()
    }
  }
}
