import {
  useEffect,
  useRef,
  useState,
} from "react";

interface VoiceRecorderHook {
  recording: boolean;
  duration: number;
  supported: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
}

export function useVoiceRecorder(): VoiceRecorderHook {
  const mediaRecorder =
    useRef<MediaRecorder | null>(null);

  const stream =
    useRef<MediaStream | null>(null);

  const chunks =
    useRef<Blob[]>([]);

  const interval =
    useRef<number>();

  const [recording, setRecording] =
    useState(false);

  const [duration, setDuration] =
    useState(0);

  const supported =
    typeof window !== "undefined" &&
    !!navigator.mediaDevices &&
    !!window.MediaRecorder;

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }

      stream.current
        ?.getTracks()
        .forEach((track) =>
          track.stop(),
        );
    };
  }, []);

  async function startRecording() {
    if (
      recording ||
      !supported
    ) {
      return;
    }

    const mediaStream =
      await navigator.mediaDevices.getUserMedia(
        {
          audio: true,
        },
      );

    stream.current =
      mediaStream;

    chunks.current = [];

    const recorder =
      new MediaRecorder(
        mediaStream,
      );

    mediaRecorder.current =
      recorder;

    recorder.ondataavailable = (
      event,
    ) => {
      if (
        event.data &&
        event.data.size > 0
      ) {
        chunks.current.push(
          event.data,
        );
      }
    };

    recorder.start();

    setDuration(0);
    setRecording(true);

    interval.current =
      window.setInterval(() => {
        setDuration(
          (previous) =>
            previous + 1,
        );
      }, 1000);
  }

  async function stopRecording(): Promise<Blob | null> {
    return new Promise(
      (resolve) => {
        const recorder =
          mediaRecorder.current;

        if (!recorder) {
          resolve(null);
          return;
        }

        recorder.onstop = () => {
          if (
            interval.current
          ) {
            clearInterval(
              interval.current,
            );
          }

          setRecording(
            false,
          );

          stream.current
            ?.getTracks()
            .forEach(
              (
                track,
              ) =>
                track.stop(),
            );

          stream.current =
            null;

          resolve(
            new Blob(
              chunks.current,
              {
                type: "audio/webm",
              },
            ),
          );
        };

        recorder.stop();
      },
    );
  }

  return {
    recording,
    duration,
    supported,
    startRecording,
    stopRecording,
  };
}