import React, { useEffect, useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlaylistPlayerProps {
  playlistId: string;
  showVideo: boolean; 
}

const YouTubePlaylistPlayer: React.FC<YouTubePlaylistPlayerProps> = ({ playlistId, showVideo }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(30);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) {
        createPlayer();
      }
    };

    return () => {
      if (player) {
        player.destroy();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.body.removeChild(tag);
    };
  }, []);

  useEffect(() => {
    if (player) {
      player.destroy();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      createPlayer();
    }
  }, [playlistId]);

  const createPlayer = () => {
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
          setCurrentTitle(event.target.getVideoData().title);
          event.target.setVolume(volume);
          setDuration(event.target.getDuration());
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setCurrentTitle(event.target.getVideoData().title);
            setIsPlaying(true);
            setDuration(event.target.getDuration());
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
              setCurrentTime(event.target.getCurrentTime());
            }, 1000);
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        },
      },
    });
  };

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

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const volume = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(volume);
    if (player) {
      player.setVolume(volume);
    }
  };

  const handleSeek = (event: Event, newValue: number | number[]) => {
    const time = Array.isArray(newValue) ? newValue[0] : newValue;
    setCurrentTime(time);
    if (player) {
      player.seekTo(time, true);
    }
  };

  return (
    <div>
      <div ref={playerRef}></div>
      <div className="current-title">{currentTitle}</div>
      {!showVideo && (
        <div className="music-controls">
          <Slider
            value={currentTime}
            onChange={handleSeek}
            aria-labelledby="progress-slider"
            min={0}
            max={duration}
            style={{ width: 200, color: '#9387B4'}}
          />
          <div className="control-buttons">
            <IconButton onClick={handlePrevious}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </IconButton>
            <IconButton onClick={handleNext}>
              <SkipNextIcon />
            </IconButton>
          </div>
          <div className="volume-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <VolumeDown fontSize="small"/>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
              min={0}
              max={100}
              style={{ width: 150, color: '#9387B4', margin: '0 10px' }}
            />
            <VolumeUp fontSize="small" />
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubePlaylistPlayer;
