import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Accordion from './components/Accordion'
import { clsx } from 'clsx'
import twMerge from 'tailwind-merge'
import ChecklistForm from "@layouts/ChecklistForm"
import Column from './components/Columns'
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../pages/firebase/config';
import { signOut, getAuth } from '@firebase/auth';
import { useRouter } from "next/navigation";


export default function Checklist() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  console.log("Case:")
  console.log(user)
  // const [open, setOpen] = useState(true)

  // const [fullyLoaded, setFullyLoaded] = useState(false)

  // // const [formComplete, setFormComplete] = useState(false)
  // const [API_data, setAPI_data] = useState()


  // const [openList, setOpenList] = React.useState(0);
  // const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  // const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  // const handleOpen = (value) => setOpenList(openList === value ? 0 : value);

  const [checklistData, setChecklistData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData(url, data = {}) {
    // console.log("email data in fetchdata: ", JSON.stringify(data))
    const idToken = await user.getIdToken();
    console.log(user.email)
    const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${idToken}`,
         },
    });
    console.log("here?")
    console.log(response)
  
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
  
    return response;
  }

  useEffect(() => {
    async function fetchChecklist () {
      setIsLoading(true);
      try {
        const idToken = await user.getIdToken();
        console.log("here:")
        console.log(idToken)
        console.log(user.email)
        // const response = await fetch("http://localhost:8000/data");
        const response = await fetchData("https://borderless-backend.vercel.app/datauser");

        // const response = await fetchData("http://localhost:8000/datauser");


        // const response = await fetch('https://borderless-backend.vercel.app/data');
        console.log("taking it in mate!")
        const data = await response.json();
        console.log(data)
        setChecklistData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChecklist();
  }, []);


  const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = checklistData.map((accord) => { 
        if (accord.Task === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setChecklistData(updatedAccordions); 
  }; 

//   // how to handle data
  
//   //hide files: 'hidden'
//   console.log("API DATA: ", API_data)
//   //task type
//     // subtask type
  
//   const formComplete = true
//   console.log(formComplete)
  return (
    <>
    <div>
      <h1 className='text-2xl mb-2 mx-auto text-green-800'>Checklist</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {checklistData && checklistData.map((Task) => ( 
          <Accordion 
              key={Task.Task} 
              title={Task.Task} 
              data={Task.Description} 
              isOpen={Task.isOpen} 
              toggleAccordion={() => toggleAccordion(Task.Task)}
              priority={Task.Priority}
          /> 
      ))}
    </div>
    {/* <div className={clsx(formComplete === false && "hidden", "p-2 m-8")}> 
      <h2 className='text-2xl mb-2 mx-auto text-green-800'>Borderless Recommendations</h2> 
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
    </div> */}
    

  </>
  )
}
