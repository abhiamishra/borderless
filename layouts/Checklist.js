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



export default function Checklist() {
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://borderless-backend.vercel.app/data');
        const data = await response.json();
        setChecklistData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
