'use client';
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Accordion from './components/Accordion'
import { clsx } from 'clsx'
import twMerge from 'tailwind-merge'
// import ChecklistForm from "@layouts/ChecklistForm"
import Column from './components/Columns'
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config';
import { signOut, getAuth } from '@firebase/auth';
import { useRouter } from "next/navigation";

export default function Case() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const router = useRouter()

  const userEmail = user?.email;


  console.log("Case:")
  console.log(user)
  console.log(router)
  // if (!user){
  //   console.log(router)
  //   router.push('/login');
  // }

  
  const [open, setOpen] = useState(true)

  const [fullyLoaded, setFullyLoaded] = useState(false)

  const [formComplete, setFormComplete] = useState(false)
  const [API_data, setAPI_data] = useState()


  const [openList, setOpenList] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpenList(openList === value ? 0 : value);



  const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = API_data.map((accord) => { 
        if (accord.Task === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAPI_data(updatedAccordions); 
  }; 

  async function fetchData(url, data = {}) {
    // console.log("email data in fetchdata: ", JSON.stringify(data))
    const idToken = await user.getIdToken();
    console.log(idToken)
    const response = await fetch(url, {
        method: 'POST', // Adjust method as needed (e.g., 'GET')
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
         },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email
        }),
    });
  
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
  
    return await response.json();
  }

  useEffect(() => {
    async function sendEmail() {
      try {
        console.log("hi - sending data for email!")
        console.log(userEmail)
        const response = await fetchData('https://borderless-backend.vercel.app/insert-user'); 
        // const response = await fetchData('http://localhost:8000/insert-user'); // Replace with your endpoint
        console.log(response.data); // Example: Store data in state
      } catch (error) {
          console.error('Error fetching data!:', error);
          // Handle errors (e.g., display error message)
      }
    }

    sendEmail();
  }, []);

  // how to handle data
  
  //hide files: 'hidden'
  console.log("API DATA: ", API_data)
  //task type
    // subtask type
  

  return (
    <>
      <div className='flex flex-row justify-center items-center'>
        <h1>Borderless Case</h1>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <iframe src="https://tally.so/embed/3E0z0r?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"width="600" height="400"></iframe>
        {/* <iframe src="https://tally.so/embed/3E0z0r?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" width="600" height="400"></iframe> */}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className='flex flex-row justify-center items-center'>
      <Link className="btn btn-primary mt-4"
                  href={`/checklist`}
                  rel="">
                  Go To Checklist
      </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      
      {/* <ChecklistForm formComplete={formComplete} setFormComplete={setFormComplete} setAPI_data={setAPI_data} setFullyLoaded={setFullyLoaded}/>

      <div className={clsx(formComplete === false && "hidden", "p-2 m-8")}> 
        <h2 className='text-2xl mb-2 mx-auto text-green-800'>Borderless' Recommendations</h2> 
        {API_data && API_data.map((Task) => ( 
            <Accordion 
                key={Task.Task} 
                title={Task.Task} 
                data={Task.Description} 
                isOpen={Task.isOpen} 
                toggleAccordion={() => toggleAccordion(Task.Task)}
                priority={Task.Priority}
                subTasks={Task.Subtasks}
            /> 
        ))} 
      </div>  */}
    
    </>
  )
}
