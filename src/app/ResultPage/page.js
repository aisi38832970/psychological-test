'use client';

import MobileResultFrame from '@/component/layout/MobileResultFrame';
import { usePsyStore } from '@/app/store/store';
import bgImg from '@/../public/bgImg.png';
import AudioVisualizer from '@/component/AudioVisualizer.tsx';
import { useEffect, useRef } from 'react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils'
import ResetSVG from '@/../public/restart.svg'
import Image from 'next/image';
import Link from 'next/link'


export default function Page() {
    const { answer01, answer02, answer03, answer04, answer05, answer06, answer07, answer08 } = usePsyStore();
    const audioRef = useRef(null);

    const totalScore =
        answer01 + answer02 + answer03 + answer04 +
        answer05 + answer06 + answer07 + answer08;

    let resultType = "";
    let resultDesc = "";

    if (totalScore >= 20) {
        resultType = "🐟 魚缸之王";
        resultDesc = "暈得深、愛得快、痛得也真";
    } else if (totalScore >= 15) {
        resultType = "🛳 暈了又醒型";
        resultDesc = "一會兒暈一會醒，感情像跳水台";
    } else if (totalScore >= 10) {
        resultType = "🚤 雷達式觀察型";
        resultDesc = "半信半疑的觀察者";
    } else if (totalScore >= 5) {
        resultType = "🧊 破冰困難型";
        resultDesc = "心牆厚，感情慢";
    } else {
        resultType = "🧙‍♂️ 情感觀落陰型";
        resultDesc = "戀愛是什麼？能吃嗎";
    }


    const getBackgroundColor = () => {
        switch (resultType) {
            case '🐟 魚缸之王':
                return 'bg-[#EECC67]';
            case '🛳 暈了又醒型':
                return 'bg-[#9687D5]';
            case '🚤 雷達式觀察型':
                return 'bg-[#E398B3]';
            case '🧊 破冰困難型':
                return 'bg-[#6D8CCE]';
            case '🧙‍♂️ 情感觀落陰型':
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
        switch (resultType) {
            case '🐟 魚缸之王':
                return 39; // Light pink (#FFB6C1)
            case '🛳 暈了又醒型':
                return 255; // Sky blue (#87CEEB)
            case '🚤 雷達式觀察型':
                return 340; // Hot pink (#FF69B4)
            case '🧊 破冰困難型':
                return 220; // Indigo (#4B0082)
            case '🧙‍♂️ 情感觀落陰型':
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
        switch (resultType) {
            case '🐟 魚缸之王': // 2
                return "/bgImg02.png";
            case '🛳 暈了又醒型': // 1
                return "/bgImg01.png";
            case '🚤 雷達式觀察型': // 4
                return "/bgImg04.png";
            case '🧊 破冰困難型': // 3
                return "/bgImg03.png";
            case '🧙‍♂️ 情感觀落陰型': // 6
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
        switch (resultType) {
            case '🐟 魚缸之王': // 2
                return getRandomMusic(2, 1); // 後面總共幾首
            case '🛳 暈了又醒型': // 1
                return getRandomMusic(1, 1);
            case '🚤 雷達式觀察型': // 4
                return getRandomMusic(4, 1);
            case '🧊 破冰困難型': // 3
                return getRandomMusic(3, 1);
            case '🧙‍♂️ 情感觀落陰型': // 6
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

    const [answers, setAnswers] = useState(Array(8).fill(null));

    useEffect(() => {
        const url = new URL(window.location.href);
        window.history.replaceState({}, '', url);
    }, answers); // Re-run when answers change

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

                <div className="flex flex-row justify-center items-center mt-[10px] gap-4">
                    <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
                        {resultType}
                    </div>
                    <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
                        <Link href="/">
                            <Image src={ResetSVG} alt="旅時大" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center mt-[15px] gap-4">
                    <div className="w-auto h-[43px] px-4 py-1 flex justify-center items-center text-[22px] font-bold text-black border-2 border-black rounded-3xl">
                        {resultDesc}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
