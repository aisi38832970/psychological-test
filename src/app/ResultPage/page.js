'use client';

import MobileResultFrame from '@/component/layout/MobileResultFrame';
import { usePsyStore } from '@/app/store/store';
import bgImg from '@/../public/bgImg.png';
import sponsorLOGO from '@/../public/sponsorLOGO.png';
import AudioVisualizer from '@/component/AudioVisualizer.tsx';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils'
import ResetSVG from '@/../public/restart.svg'
import Image from 'next/image';
import BoBoImg from '@/../public/0.start/BoBo.svg';
import Link from 'next/link'


export default function Page() {
  const { answer01, answer02 } = usePsyStore();
  const audioRef = useRef(null);

  const getId = () => {
    // Map answer01 (emotions) to numbers
    const emotionMap = {
      '快樂': '01',
      '悲傷': '02',
      '害怕': '03',
      '厭惡': '04',
      '驚訝': '05',
      '憤怒': '06'
    };

    // Map answer02 (teams) to numbers
    const teamMap = {
      '緒島': '01',
      '雷諾斯的傘': '02',
      'Blossom': '03',
      '墨魂': '04',
      'Frame': '05',
      'Undrawn': '06',
      'BEPPUMETA': '07',
      '蚌殼': '08'
    };

    // Get random middle digits
    const randomMiddle = Math.floor(Math.random() * 100).toString().padStart(2, '0');

    // Get the first two digits from answer01
    const firstTwo = emotionMap[answer01] || '00';

    // Get the last two digits from answer02
    const lastTwo = teamMap[answer02] || '00';

    // Combine all parts
    return `${firstTwo}${randomMiddle}${lastTwo}`;
  }

  const getBackgroundColor = () => {
    switch (answer02) {
      case '緒島':
        return 'bg-[#EECC67]';
      case '雷諾斯的傘':
        return 'bg-[#9687D5]';
      case 'Blossom':
        return 'bg-[#E398B3]';
      case '墨魂':
        return 'bg-[#6D8CCE]';
      case 'Frame':
        return 'bg-[#DD7B7F]';
      case 'Undrawn':
        return 'bg-[#E8CCB5]';
      case 'BEPPUMETA':
        return 'bg-[#6FB785]';
      case '蚌殼':
        return 'bg-[#E38260]';
      default:
        return 'bg-[#59C3C3]';
    }
  };

  const getHue = () => {
    switch (answer02) {
      case '緒島':
        return 39; // Light pink (#FFB6C1)
      case '雷諾斯的傘':
        return 255; // Sky blue (#87CEEB)
      case 'Blossom':
        return 340; // Hot pink (#FF69B4)
      case '墨魂':
        return 220; // Indigo (#4B0082)
      case 'Frame':
        return 4; // Gold (#FFD700)
      case 'Undrawn':
        return 30; // Gray (#808080)
      case 'BEPPUMETA':
        return 140; // Orange red (#FF4500)
      case '蚌殼':
        return 17; // Light sea green (#20B2AA)
      default:
        return 180; // Default teal (#59C3C3)
    }
  }

  const getRandomMusic = (group, total) => {
    const randTotal = Math.floor(Math.random() * total) + 1;
    return `/music/music${group}-${randTotal}.mp3`;
  }

  const getBG = (group) => {
    switch (answer02) {
      case '緒島': // 2
        return "/bgImg02.png";
      case '雷諾斯的傘': // 1
        return "/bgImg01.png";
      case 'Blossom': // 4
        return "/bgImg04.png";
      case '墨魂': // 3
        return "/bgImg03.png";
      case 'Frame': // 6
        return "/bgImg06.png";
      case 'Undrawn': // 5
        return "/bgImg05.png";
      case 'BEPPUMETA': // 8
        return "/bgImg08.png";
      case '蚌殼': // 7
        return "/bgImg07.png";
      default:
        return "/bgImg.png";
    }
  }

  const getMusic = () => {
    switch (answer02) {
      case '緒島': // 2
        return getRandomMusic(2, 1); // 後面總共幾首
      case '雷諾斯的傘': // 1
        return getRandomMusic(1, 1);
      case 'Blossom': // 4
        return getRandomMusic(4, 1);
      case '墨魂': // 3
        return getRandomMusic(3, 1);
      case 'Frame': // 6
        return getRandomMusic(6, 1);
      case 'Undrawn': // 5
        return getRandomMusic(5, 1);
      case 'BEPPUMETA': // 8
        return getRandomMusic(8, 1);
      case '蚌殼': // 7
        return getRandomMusic(7, 1);
      default:
        return '/music/music1.mp3';
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  // Add new useEffect for URL manipulation
  useEffect(() => {
    const id = getId();
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.history.replaceState({}, '', url);
  }, [answer01, answer02]); // Re-run when answers change

  return (
    <div className={`w-full min-h-[100vh] h-full flex flex-col items-center ${getBackgroundColor()}`}>
      <div className="w-full h-full grow flex flex-col items-center">
        <div className="w-[93%] h-[70%] sm:h-[75%] overflow-hidden mt-15 sm:mt-20"
          style={{
            backgroundImage: `url(${getBG()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* 這邊開始寫波 */}
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-[300px] sm:h-[400px] mt-20 sm:mt-30">
              <AudioVisualizer src={getMusic()} audioRef={audioRef} hue={getHue()} />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center mt-[15px] gap-4">
          <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
            {answer01}
          </div>
          <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
            {answer02}
          </div>
          <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
            <Link href="/">
              <Image src={ResetSVG} alt="旅時大" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
