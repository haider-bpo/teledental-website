import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
const appId = "0bcfb8f63fd443f087868b4dfe7009f1";
export const config = { mode: "rtc", codec: "vp8", appId: appId };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "new";

