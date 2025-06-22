'use client';

import { useRouter } from 'next/navigation';
import MobileFrame from '@/component/layout/MobileFrame';
import Image from 'next/image';
import bgImg from '@/../public/bgImg.png';
import sponsorLOGO from '@/../public/sponsorLOGO.png';
import BoBoImg from '@/../public/0.start/BoBo.svg';
import Q1title from '@/../public/1.question/1.1question.svg';
import { usePsyStore } from '@/app/store/store';
import { cn } from '@/lib/utils'

export default function QuestionPage01({ questionIndex, nextStep }) {
    const router = useRouter();
    const setAnswer01 = usePsyStore((state) => state.setAnswer01);
    const answer02 = usePsyStore((state) => state.answer02);

    // 根據 answer02 設置顏色
    const getButtonColor = () => {
        switch (answer02) {
            case '溫暖':
                return {
                    text: 'text-[#FF6B6B]',
                    border: 'border-[#FF6B6B]',
                    hover: 'hover:bg-[#FFE5E5]'
                };
            case '明亮':
                return {
                    text: 'text-[#4ECDC4]',
                    border: 'border-[#4ECDC4]',
                    hover: 'hover:bg-[#E0F7F5]'
                };
            default:
                return {
                    text: 'text-[#66C3C5]',
                    border: 'border-[#66C3C5]',
                    hover: 'hover:bg-[#C0E4E5]'
                };
        }
    };

    const buttonColors = getButtonColor();

    const emotionButtons = [
        { label: "快樂", value:3, x: "translate-x-1", y: "-translate-y-10" },
        { label: "悲傷", value:2, x: "translate-x-22", y: "-translate-y-3" },
        { label: "害怕", value:1, x: "-translate-x-25", y: "translate-y-13" },
        { label: "厭惡", value:0, x: "translate-x-2", y: "-translate-y-16" }
    ];

    const buttonStyle = `w-full px-4 py-[4px] flex justify-center items-center
                    text-[#cca1e0] text-[22px] font-bold
                    border border-[#cca1e0] rounded-full
                    transition-colors duration-200 hover:bg-[#F0D4FC] hover:text-[#864DA1]
                    active:bg-[#F0D4FC] active:text-[#864DA1]`

    const handleClick = (value) => {
        console.log('選擇的數值：', value);
        setAnswer01(value);
        router.push('/QuestionPage02');
    };

    return (
        <div className="w-full min-h-[100vh] h-full flex flex-col items-center bg-[#cca1e0]">
            <div className="w-full h-full grow flex flex-col items-center">
                <div className="w-[93%] h-[85%] sm:h-[85%] overflow-hidden mt-15 sm:mt-15"
                    style={{
                        backgroundImage: `url(${bgImg.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* 主內容 */}
                    <div className="w-full h-full flex flex-col items-center gap-8 pt-10">
                        {/* 角色圖 */}
                        <Image className="w-52" src={BoBoImg} alt="BoBoImg" />
                        <Image className="w-[100vw] max-w-[370px]" src={Q1title} alt="Q1title" />

                        {/* 按鈕容器 */}
                        <div className="flex flex-wrap w-full justify-center gap-6 px-4 grow">
                            <div className="w-full flex flex-col gap-5 pb-4 px-5">
                                <button onClick={() => handleClick("快樂")} className={cn(buttonStyle)}>哇…他手指好修長</button>
                                <button onClick={() => handleClick("悲傷")} className={buttonStyle}>覺得心動，拿耳機就走</button>
                                <button onClick={() => handleClick("害怕")} className={buttonStyle}>說聲謝謝就走了</button>
                                <button onClick={() => handleClick("厭惡")} className={buttonStyle}>他該不會是偷裝追蹤器</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

