'use client';

import { useState } from 'react';
import Image from 'next/image';
import bgImg from '@/../public/bgImg.png';
import sponsorLOGO from '@/../public/sponsorLOGO.png';
import BoBoImg from '@/../public/0.start/BoBo.svg';
import titleImg from '@/../public/0.start/title.svg';
import startBtn from '@/../public/0.start/startBtn.svg';
import startTouchBtn from '@/../public/0.start/startTouchBtn.svg';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/QuestionPage01');
  }


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
          {/* 這邊開始寫波 */}
          <div className='w-full h-full flex flex-col items-center justify-center gap-[60px]'>
            <div className='flex flex-col items-center gap-8'>
              <Image className='w-[300px]' src={BoBoImg} alt='BoBoImg' />
              <Image className='w-[300px]' src={titleImg} alt='title' />
              <Image
                onClick={handleClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className='w-[160px] cursor-pointer'
                src={isHover ? startTouchBtn : startBtn}
                alt='startBtn'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

