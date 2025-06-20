'use client';

import { useEffect, useRef } from 'react';

interface AudioBufferVisualizerProps {
  src: string; 
  audioRef: React.RefObject<HTMLAudioElement>; // 添加 audioRef 屬性
  hue: number
}

// 使用 WeakMap 來追踪每個 audio 元素的 AudioContext 和 MediaElementSource
const contextMap = new WeakMap<HTMLAudioElement, AudioContext>();
const sourceMap = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>();

const AudioBufferVisualizer: React.FC<AudioBufferVisualizerProps> = ({ src, audioRef, hue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;

    let animationFrameId: number;

    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const init = async () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // 檢查是否已經存在 AudioContext
      let audioContext: AudioContext;
      if (contextMap.has(audio)) {
        audioContext = contextMap.get(audio)!;
      } else {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        contextMap.set(audio, audioContext);
      }

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;

      // 檢查這個 audio 元素是否已經創建過 MediaElementSource
      let source: MediaElementAudioSourceNode;
      if (sourceMap.has(audio)) {
        source = sourceMap.get(audio)!;
      } else {
        console.log('source = audioContext.createMediaElementSource(audio);')
        source = audioContext.createMediaElementSource(audio);
        sourceMap.set(audio, source);
      }

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        animationFrameId = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(frequencyData);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = 'rgba(173, 216, 230, 0)';  // 設置為完全透明
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / analyser.frequencyBinCount) * 6;  // 增加條形寬度
        let x = 0;
        const centerY = canvas.height / 2;  // 中心線位置

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          const value = frequencyData[i];
          // 使用非線性映射來增強高度變化
          const normalizedValue = Math.pow(value / 255, 0.5);
          const barHeight = normalizedValue * (canvas.height / 2);  // 高度為畫布高度的一半

          // 根據頻率值計算顏色飽和度
          const saturation = Math.min(40, 10 + (value / 255) * 70); // 飽和度在30%到100%之間變化
          // const hue = 180; // 保持青色基調
          const lightness = 50; // 保持中等亮度
          canvasCtx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

          // 繪製上半部分
          canvasCtx.fillRect(
            x,
            centerY - barHeight,  // 從中心線向上
            barWidth,
            barHeight
          );
          // 繪製下半部分
          canvasCtx.fillRect(
            x,
            centerY,  // 從中心線向下
            barWidth,
            barHeight
          );

          x += barWidth + 3;  // 移除間隔，讓條形緊密相連
        }
      };

      draw();
    };

    init();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [src, audioRef]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="w-full h-[80%]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="w-[100%] pt-15 ">
        <audio 
          ref={audioRef}
          src={src} 
          justify-center="true"
          items-center="true"
          controls
          className="w-full scale-75"
          allow="autoplay"
          style={{ 
            display: 'none',
            background: 'transparent',
            WebkitAppearance: 'none',
            appearance: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default AudioBufferVisualizer;
