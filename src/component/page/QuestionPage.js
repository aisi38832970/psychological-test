'use client';

import MobileFrame from '@/component/layout/MobileFrame'
import Image from 'next/image';
import { usePsyStore, useQuestionStore } from '@/app/store/store'


export default function QuestionPage({questionIndex, nextStep}) {

  const questionData = useQuestionStore( (state)=> state );
  const psyData = usePsyStore( (state)=> state );


  const clickAnswer = function(option){
    nextStep();

    psyData.updateScore(psyData.score + option.value );

    console.log(option.title, option.value);
  }

  const getMainColor = function(prefix){
    
    let colorString = "";

    if(questionIndex == 0){
      colorString = prefix + "-[#90B62A]";
    }else if(questionIndex == 1){
      colorString = prefix + "-[#DD3E3E]";
    }else{
      colorString = prefix + "-[#1098EC]";
    }

    return colorString;

  }


  return (
    <>
      <MobileFrame>
        

        <Image className=' absolute top-0 -translate-y-1/2 ' src={circle2Img} alt='circle2Img' />

        


        <div className='flex flex-col items-center gap-[26px]'>
          <Image src={q1Up} className='w-[88px]' alt='q1Up' />

          <div className='text-[#90B62A] border-2 border-[#90B62A] rounded-full w-[48px] h-[48px]
          flex justify-center items-center font-bold text-xl '>
            Q{questionIndex+1}
          </div>
          

          <div 
            className={`text-center font-bold text-3xl ${getMainColor('text')} mb-[60px]`}
          > {questionData.questions[questionIndex+1].title} </div>


          {            
            questionData.questions[questionIndex+1].options.map( (option, index) => {

              return (
                <>
                  {
                    questionIndex == 0 && 
                    <div 
                      className={` bg-[#BEE351] w-full rounded-full text-white 
                        py-[16px] text-sm flex justify-center items-center font-medium 
                        shadow-[0px_4px_0px_1px_#90B62A] cursor-pointer hover:translate-y-0.5 transition`}

                      onClick={() => clickAnswer(option)}
                      key={option.title + "green"}
                    > {option.title} </div>
                  }

                  {
                    questionIndex == 1 && 
                    <div 
                      className={` bg-[#DD3E3E] w-full rounded-full text-white 
                        py-[16px] text-sm flex justify-center items-center font-medium 
                        shadow-[0px_4px_0px_1px_#8D4509] cursor-pointer hover:translate-y-0.5 transition`}

                      onClick={() => clickAnswer(option)}
                      key={option.title + "red"}
                    > {option.title} </div>
                  }

                  {
                    questionIndex == 2 && 
                    <div 
                      className={` bg-[#89BCFF] w-full rounded-full text-white 
                        py-[16px] text-sm flex justify-center items-center font-medium 
                        shadow-[0px_4px_0px_1px_#1098EC] cursor-pointer hover:translate-y-0.5 transition`}

                      onClick={() => clickAnswer(option)}
                      key={option.title + "blue"}
                    > {option.title} </div>
                  }
                </>
              )

            })

          }
          

          <Image src={q1Down} className='w-[88px]' alt='q1Down' />

        </div>

        <Image className=' absolute bottom-0 translate-y-1/2 ' src={circle2Img} alt='circle2Img' />
        
      </MobileFrame>
    </>
  );
}
