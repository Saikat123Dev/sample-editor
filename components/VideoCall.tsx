"use client";

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Video, Mic, MicOff, VideoOff } from 'lucide-react';

export default function VideoCall() {
  const [peer, setPeer] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPeer = new Peer();
    setPeer(initPeer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Failed to get media devices:', err));

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      initPeer.destroy();
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <Card className="relative h-full rounded-none border-0 bg-muted p-4">
      <div className="flex h-full flex-col">
        <div className="relative flex-1">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleVideo}
            className={!videoEnabled ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleAudio}
            className={!audioEnabled ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </Button>
        </div>
      </div>
    </Card>
  );
}