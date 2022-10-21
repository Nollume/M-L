import { defineStore } from "pinia";
import { musicObject, allMusicData } from "~/interfaces";

export const useStore = defineStore("store", {
  state: () => ({
    openNav: false as boolean,
    showLinks: true as boolean,
    loading: false as boolean,
    error: "" as string,
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
    validateSearch(name: string) {
      const validate = name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/ {2,}/g, " ")
        .replace(/ /g, "")
        .trim();

      return validate;
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
            )}&entity=musicTrack&media=music&limit=200`
          ),
          fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              "Mark&Lukas"
            )}&entity=musicTrack&media=music&limit=200`
          ),
        ]);
        const data = await Promise.all(results.map((result) => result.json()));

        /**
         * filter data
         */
        const remixes = data[0].results.filter((track: allMusicData) => {
          return (
            track.trackCensoredName.includes("Mark & Lukas") &&
            track.trackCensoredName.includes("Remix") &&
            !track.artistName.includes("Sergey Bayer") &&
            !track.artistName.includes("NekliFF")
          );
        });

        const originals = data[1].results.filter((track: allMusicData) => {
          return (
            !track.trackCensoredName.includes("Remix") &&
            !track.trackCensoredName.includes("Balearic") &&
            !track.trackCensoredName.includes("Touch of the Moonlight") &&
            !track.trackCensoredName.includes("Wym") &&
            !track.trackCensoredName.includes("EDU") &&
            !track.trackCensoredName.includes("Mixed") &&
            !track.trackCensoredName.includes("Progstep") &&
            !track.trackCensoredName.includes("Vonyc Sessions") &&
            !track.trackCensoredName.includes("Freedom") &&
            !track.collectionName.includes("Rooftop Beats") &&
            !track.collectionName.includes("Essential Deep House") &&
            !track.trackCensoredName.includes("Scales of Life") &&
            !track.trackCensoredName.includes("End of the Road")
          );
        });

        /**
         * filter out same tracks
         */
        const allTracks = [...originals, ...remixes];

        const uniqueTracks = allTracks.reduce((acc, curr: allMusicData) => {
          const name = curr.trackCensoredName;
          const contain = acc.some((item: allMusicData) => {
            return item.trackCensoredName === name;
          });
          if (!contain) {
            acc.push(curr);
          }
          return acc;
        }, []);

        /**
         * sort tracks
         */

        const sortedTracks = uniqueTracks.sort((a, b) => {
          return a.trackCensoredName < b.trackCensoredName ? -1 : 1;
        });

        this.allData = [...sortedTracks];
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
      this.isPlaying = true;
      if (this.loadData.trackId === trackId) {
        return;
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
    },
    getTrackIndex() {
      const id = this.loadData.trackId;
      const indexCurrentTrack = this.allData.findIndex(
        (track: allMusicData) => {
          return track.trackId === id;
        }
      );
      return indexCurrentTrack;
    },
    loadNextOrPreviousTrack(data: string) {
      if (this.getTrackIndex() === 0 && data === "prev") return;
      if (this.getTrackIndex() === this.allData.length - 1 && data === "next")
        return;
      const nextOrPreviousTrack = this.allData.find(
        (track: allMusicData, index: number) => {
          if (data === "next") {
            return index === this.getTrackIndex() + 1;
          } else if (data === "prev") {
            return index === this.getTrackIndex() - 1;
          }
        }
      );

      this.loadData = {
        artistName: nextOrPreviousTrack.artistName,
        trackCensoredName: nextOrPreviousTrack.trackCensoredName,
        previewUrl: nextOrPreviousTrack.previewUrl,
        artworkUrl60: nextOrPreviousTrack.artworkUrl60,
        collectionName: nextOrPreviousTrack.collectionName,
        trackId: nextOrPreviousTrack.trackId,
      };

      this.isPlaying = true;
    },
  },
});
