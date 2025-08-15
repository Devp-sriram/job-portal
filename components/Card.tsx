import Image from 'next/image'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';


export default function Card({data}) {

  function timeAgoShort(date) {
    const now = new Date();
    const days = differenceInDays(now, date);
    if (days > 0) return `${days}d`;

    const hours = differenceInHours(now, date);
    if (hours > 0) return `${hours}h`;

    const minutes = differenceInMinutes(now, date);
    if (minutes > 0) return `${minutes}m`;

    const seconds = differenceInSeconds(now, date);
    return `${seconds}s`;
  }

  const points = data.description
  .split(/\. +|(?<=[a-z])(?=[A-Z])/g)
  .map(point => point.trim()) // remove extra spaces
  .filter(point => point.length > 0); // remove empty strings

  return (
    <div className='flex flex-col max-w-sm space-y-6'>
      <div className='flex justify-between'>
        <Image
          src={data.image}
          alt={'logo'}
          width={66}
          height={66}
        />
        <span className='h-fit rounded-lg bg-[#B0D9FF] p-2 text-sm'>
          {timeAgoShort(new Date(data.createdAt))} Ago
        </span>
      </div>

      <h3 className='text-xl font-bold'>{data.jobTitle}</h3>

      <div className='flex justify-start gap-4'>
        <div className='flex gap-2'>
          <Image
            src='/exp.svg'
            alt='+'
            width={18}
            height={15}
          />
          1-3 yr Exp
        </div>

        <div className='flex gap-2'>
          <Image
            src='/joblocation.svg'
            alt='+'
            width={18}
            height={15}
          />
          Onsite
        </div>


        <div className='flex gap-2'>
          <Image
            src='/package.svg'
            alt='+'
            width={18}
            height={15}
          />
          {Math.round(data.salary.max * 12/100000, 2)} LPA{/*data.salary.min}-{data.salary.max*/}
        </div>
      </div>

      <ul className='pl-4 h-full'>
        {points.map((point, index) => (
          <li key={index} className='list-disc'>{point}</li>
        ))}
      </ul>
      <button className='w-full p-4 font-semibold  rounded-lg bg-[#00AAFF] text-white'>
        Apply Now 
      </button>
    </div>
  )
}

