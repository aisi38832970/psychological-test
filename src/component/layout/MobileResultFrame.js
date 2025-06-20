'use client';

import bgImg from '@/../public/bgImg.png';
import sponsorLOGO from '@/../public/sponsorLOGO.png';
import { usePsyStore } from '@/app/store/store';



export default function MobileFrame({ children }) {

  const { answer01, answer02 } = usePsyStore();
  const buttonStyle =
    "h-[43px] px-4 py-[7px] transform translate-y-55 text-nowrap flex justify-center items-center text-black text-[22px] font-bold border border-black rounded-3xl transition-colors duration-200";

  return (
    <>


      <div className="w-full min-h-[874px] flex flex-col items-center bg-[#59C3C3]">
        <div className="w-full h-full grow flex flex-col items-center">
          <div className="w-[93%] h-[75%] overflow-auto mt-18"
            style={{
              backgroundImage: `url(${bgImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          <div className="flex flex-row mt-[15px] gap-3">
            <div className="flex justify-center items-center h-[43px] px-4 py-[7px] text-[22px] font-bold border border-black rounded-3xl">{answer01}</div>
            <div className="flex justify-center items-center h-[43px] px-4 py-[7px] text-[22px] font-bold border border-black rounded-3xl">{answer02}</div>
          </div>
          <footer className="w-full flex justify-center text-[10px] font-bold mb-10 ">
            <div className="flex flex-col">

              <div className="flex items-center gap-3 mb-2">
                <p>COPYRIGHT © NCCU DCT 16th</p>
                <div className="flex items-center gap-1.5">
                  <p>SPONSOR</p>
                  <div className="flex items-center justify-center h-[15px] w-[100px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${sponsorLOGO.src})` }}></div>

                </div>

              </div>
              <div className="flex justify-center items-center">
                <p>SENNHEISER 官網：<a href="https://www.uni-announce.com.tw/" className="underline">https://www.uni-announce.com.tw/</a></p>

              </div>
            </div>
          </footer>
        </div>



      </div>

    </>
  );

}
