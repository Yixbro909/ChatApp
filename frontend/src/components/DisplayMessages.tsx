import React, {FC, useEffect, useState} from 'react'
import {formatDistanceToNow} from 'date-fns';

type MessageStr = {
    username: string,
    timestamp: Date,
    message: string,
}

interface Props {
    messages:  MessageStr[],
    username: string,
}

const DisplayMessages:FC<Props> = ({messages, username}) => {

  
  return (
     <div className='flex flex-col mb-5 messages space-y-10'>
          {messages.map((data:MessageStr, i:number) => {
            return (
              <>
                {data.username === username ?
                   <div className={'self-end p-2'} key={i}>
                       <div className='text-[18px] text-blue-900 capitalize font-semibold'>{data.username}</div>
                        <div className='text-[12px] italic text-gray-400'>{formatDistanceToNow(new Date(data.timestamp), {addSuffix: false})}</div>
                      <div className=' bg-primary rounded-lg text-center p-3 text-white'>{data.message}</div> 
                  </div> :

                   <div className={'self-start p-2'} key={i + 1}>
                      <div className='text-[18px] text-blue-900 capitalize font-semibold'>{data.username}</div>
                      <div className='text-[12px] italic text-gray-400'>{formatDistanceToNow(new Date(data.timestamp), {addSuffix: false})}</div>
                      <div className='bg-slate-100 rounded-lg text-center p-3' key={i}>{data.message}</div> 
                  </div>

                }
              </>
            )
          })}
        </div>
  )
}

export default DisplayMessages