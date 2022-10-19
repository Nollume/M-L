import { defineStore } from "pinia";
import { musicObject, allMusicData } from "~/interfaces";

export const useStore = defineStore("store", {
  state: () => ({
    openNav: false as boolean,
    showLinks: true as boolean,
    loading: false as boolean,
    error: "" as string,
    remixes: [] as allMusicData[],
    tracks: [] as allMusicData[],
    allData: [] as allMusicData[],
    loadData: {
      artistName: "Mark & Lukas",
      trackCensoredName: "Life is about Moments",
      previewUrl:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1e/a6/30/1ea630be-47c2-83ea-c7ca-b7c8abe4569f/mzaf_8243019714510444802.plus.aac.p.m4a",
      artworkUrl60:
        "https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/9c/ba/4a/9cba4a64-88b6-3fcf-64a7-6c70fa248ed0/00_Cover_Art.jpg/60x60bb.jpg",
      collectionName: "Life Is About Moments / Tears of Memories - Single",
      trackId: 1380345653,
    } as musicObject,
    isPlaying: false as boolean,
    isRepeating: false as boolean,
    previousVolume: 100 as number,
  }),
  getters: {},
  actions: {
    fortmatTimeToString: (num: number): string => {
      return num.toString().padStart(2, "0");
    },
    formatTime(time: number) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const result = `${this.fortmatTimeToString(
        minutes
      )}:${this.fortmatTimeToString(seconds)}`;
      return result;
    },
    openNavigation() {
      this.openNav = !this.openNav;
      this.showLinks = false;
      setTimeout(() => {
        this.showLinks = true;
      }, 500);
    },
    async getMusic() {
      this.loading = true;
      try {
        const results = await Promise.all([
          fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              "Mark & Lukas remix"
            )}&entity=musicTrack&media=music&limit=5`
          ),
          fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              "Mark&Lukas"
            )}&entity=musicTrack&media=music&limit=5`
          ),
        ]);
        const data = await Promise.all(results.map((result) => result.json()));

        this.remixes = data[0].results.filter((track: any) => {
          return (
            track.trackCensoredName.includes("Mark & Lukas") &&
            track.trackCensoredName.includes("Remix")
          );
        });
        this.tracks = data[1].results;

        this.allData = [...data[1].results, ...data[0].results];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    sendDataToAudioPlayer(
      artistName: string,
      trackCensoredName: string,
      previewUrl: string,
      artworkUrl60: string,
      collectionName: string,
      trackId: number
    ) {
      if (this.loadData.trackId === trackId) {
        
      } else {
       
        this.loadData = {
          artistName,
          trackCensoredName,
          previewUrl,
          artworkUrl60,
          collectionName,
          trackId,
        };
      }
      this.isPlaying = true;
    },
  },
});
