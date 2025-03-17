import React, { useEffect, useRef, useState } from "react";

// Declare the onYouTubeIframeAPIReady property on the window object
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlaylistPlayerProps {
  playlistId: string;
  showVideo: boolean; // Add a boolean flag to choose between the two setups
}

const YouTubePlaylistPlayer: React.FC<YouTubePlaylistPlayerProps> = ({ playlistId, showVideo }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!playlistId) return;

    // Load the YouTube iframe API script dynamically
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current!, {
          height: showVideo ? "360" : "0",
          width: showVideo ? "640" : "0",
          playerVars: {
            listType: "playlist",
            list: playlistId,
            autoplay: 1,
            controls: showVideo ? 1 : 0,
            modestbranding: 1,
            disablekb: showVideo ? 0 : 1,
            showinfo: 0,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
            },
          },
        });
      }
    };

    // Clean up the script and player on unmount
    return () => {
      if (playerRef.current && window.YT) {
        const playerInstance = new window.YT.Player(playerRef.current);
        playerInstance.destroy();
      }
      document.body.removeChild(tag);
    };
  }, [playlistId, showVideo]);

  const handlePlayPause = () => {
    if (player) {
      if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleNext = () => {
    if (player) {
      player.nextVideo();
    }
  };

  const handlePrevious = () => {
    if (player) {
      player.previousVideo();
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      player.setVolume(Number(event.target.value));
    }
  };

  return (
    <div>
      <div ref={playerRef}></div>
      {!showVideo && (
        <div className="music-controls">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handlePlayPause}>Play/Pause</button>
          <button onClick={handleNext}>Next</button>
          <input
            type="range"
            min="0"
            max="100"
            onChange={handleVolumeChange}
            defaultValue="50"
          />
        </div>
      )}
    </div>
  );
};

export default YouTubePlaylistPlayer;
