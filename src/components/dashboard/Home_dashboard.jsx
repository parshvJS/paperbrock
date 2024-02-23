import React from 'react'
import { useUserContext } from '../../context/authChecked'
import FileUploader from './PdfUploader'
import PdfUploader from './PdfUploader'

const Home_dashboard = () => {

  return (
    <div>
      <div>
        <p className='text-black text-[24px] m-4'><span className='text-pri-500'>Upload</span> Exam Papers</p>
      </div>
      <div className='w-[80%]'>
       <PdfUploader
       />
      </div>
      <div></div>


    </div>
  )
}

export default Home_dashboard