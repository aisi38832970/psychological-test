'use client';

import MobileFrame from '@/component/layout/MobileFrame';
import { usePsyStore } from '@/app/store/store';
import Image from 'next/image';
import result1 from '@/../public/4.result/result-1.png';
import result2 from '@/../public/4.result/result-2.png';
import result3 from '@/../public/4.result/result-3.png';

export default function ResultPage() {

  const psyState = usePsyStore( (state) => state );


  const playAgain = function(){
    // todo: 重新整理頁面
    window.location.reload();
  }

  return (
    <>
      <MobileFrame>
        <div>
          
          {
            psyState.score < 6 &&
            <Image src={result1} alt='result1' />
          }

          {
            (psyState.score >= 6 && psyState.score < 8) &&
            <Image src={result2} alt='result2' />
          }

          {
            psyState.score >= 8 &&
            <Image src={result3} alt='result3' />
          }

          <div 
            className={` bg-[#89BCFF] w-full rounded-full text-white 
              py-[16px] text-sm flex justify-center items-center font-medium 
              shadow-[0px_4px_0px_1px_#1098EC] cursor-pointer hover:translate-y-0.5 transition`}
            onClick={playAgain}
          > 再玩一次 </div>
        </div>
      </MobileFrame>
    </>
  );
}
