export default defineEventHandler(async (e) => {
  if (e.req.method === "GET") {
    const response = await $fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        "Mark & Lukas remix"
      )}&entity=musicTrack&media=music&limit=120`
    );
    return response;
  }
});
