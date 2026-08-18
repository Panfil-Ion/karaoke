export interface SingerPayload {
  firstName: string;
  lastName: string;
  songName: string;
  youtubeLink?: string;
  isSpecialGuest: boolean;
}

export interface KaraokeState {
  mode: "idle" | "active";
  singer: SingerPayload | null;
}
