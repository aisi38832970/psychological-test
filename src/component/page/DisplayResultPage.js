'use client';

import MobileFrame from '@/component/layout/MobileFrame'

export default function DisplayResultPage({nextStep}) {

  return (
    <>
      <MobileFrame>
        <div>
          <div>
            顯示我的失控可頌
          </div>
            <div 
              className={` bg-[#89BCFF] w-full rounded-full text-white 
                py-[16px] text-sm flex justify-center items-center font-medium 
                shadow-[0px_4px_0px_1px_#1098EC] cursor-pointer hover:translate-y-0.5 transition`}
              onClick={nextStep}
            > 查看結果 </div>
        </div>
      </MobileFrame>
    </>
  );
}
