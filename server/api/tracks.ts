export default defineEventHandler(async (e) => {
  if (e.req.method === "GET") {
    const result = await $fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        "Mark&Lukas"
      )}&entity=musicTrack&media=music&limit=120`
    );
    return result;
  }
});
