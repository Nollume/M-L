function fortmatTimeToString(num: number): string {
    return num.toString().padStart(2, "0");
  }
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const result = `${fortmatTimeToString(minutes)}:${fortmatTimeToString(
      seconds
    )}`;
    return result;
  };

  export{formatTime}