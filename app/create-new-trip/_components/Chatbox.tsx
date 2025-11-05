"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import { s } from 'motion/react-client'
import React, { useState } from 'react'
import EmptyBox from './EmptyBox'

type Message ={
    role: string
    content: string
}

const Chatbox = () => {

    const [ messages, setMessages ] =useState<Message[]>([])
    const [userInput , setUserInput ] = useState<string>('')
    const [loading, setLoading ] = useState<boolean>(false);

    const onSend = async() => {
        // Handle send action
        if(!userInput.trim()) return;
        setLoading(true);
        setUserInput('');
        const newMsg:Message = { role: 'user', content: userInput }

        setMessages((prev) => [...prev, newMsg]);

        const result  = await axios.post('/api/aimodel', { messages : [...messages, newMsg] });

        setMessages((prev) => [...prev, { role: 'assistant', content: result.data.resp }]);

        // console.log('AI Response:', result);
        setLoading(false);
       
    }
  return (
    <div className='h-[87vh] flex flex-col'>
        <section className='flex-1 overflow-y-auto p-4'>
            {messages.length === 0 && !loading && (
                <div><EmptyBox onSelectOption={(v:string)=> {setUserInput(v); onSend()}}/></div>
            )}
            {messages.map((msg: Message, index) => (
                msg.role == 'user' ? (<div key={index} className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                    {msg.content}
                </div>
            </div>) :(
            <div className='flex justify-start mt-2' key={index}>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                </div>
            </div>
            )))}
            {loading && <div className='flex justify-start mt-2' >
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                   <Loader className='animate-spin'/>
                </div>
            </div>}
        </section>
        <section>
             <div>
                <div>
                <Textarea placeholder='Start typing here...' className='w-full h-28 bg-transparent border-none' onChange={(e)=> setUserInput(e.target.value)} value={userInput}/> 
                <Button size={'icon'} onClick={() =>onSend()}>
                    <Send />
                </Button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Chatbox