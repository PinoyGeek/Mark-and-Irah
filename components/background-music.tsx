"use client"

import { useAudio } from "@/contexts/audio-context"

const BackgroundMusic = () => {
  const { audioRef } = useAudio()

  return (
    <audio
      ref={audioRef}
      // Use an encoded URI to avoid issues with spaces/parentheses on some mobile browsers
      src={encodeURI("/background_music/Can't Help Falling In Love - Elvis Presley - Violin cover.mp3")}
      loop
      preload="auto"
      // playsInline helps iOS treat this as inline media rather than requiring fullscreen behavior
      playsInline
      // Keep element non-visible; playback is controlled by Hero component
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic


