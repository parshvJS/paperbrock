import React, { useState, useEffect } from 'react';
import folder from '../../assets/folder.svg';
import pdf from '../../assets/pdf.svg';
import del from '../../assets/delete.svg';
import './general.css';
import { useUserContext } from '../../context/authChecked';
import DropDown from './DropDown';
import { api_url, course, options } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getPyqData } from '../../utils/apiCall';

const Home_dashboard = () => {
  const { user } = useUserContext();
  const [onStreamChange, setOnStreamChange] = useState(course[0]?.value || "")
  const [onCourseChange, setOnCourseChange] = useState(options[0]?.value || "")
  const [examName, setExamName] = useState("")
  const [help, setHelp] = useState("")
  const [files, setFiles] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)


  function handleStreamChange(value) {
    setOnStreamChange(value)
  }
  function handleCourse(value) {
    setOnCourseChange(value)
  }

  async function handleAnalayzer(e) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("stream", onStreamChange);
      formData.append("course", onCourseChange);
      formData.append("name", examName);
      formData.append("help", help);
      files.forEach(file => {
        formData.append("pyq", file);
      });

      const resp =await getPyqData(formData)

      console.log(resp);
      if (resp.success == false ) {
        const notify = () => toast.error(resp.error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
        notify()
        throw new Error("Failed to upload files");
      }
      navigate(`/analayzer/${resp.data.id}`)
      // navigate('/analayzer/65df6f68e4ce716fe4a8876e')

    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false)
    }
  }
           




  useEffect(() => {
    document.title = " PaperBrock | Analyzer"
  }, []);

  function handleFile(e) {
    const fileList = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...fileList]);
  }

  function handleDelete(index) {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  return (
    <div className='m-3 w-full'>
      <div>
        <p className='text-black text-[24px] font-bold'><span className='text-pri-500'>Upload</span> Exam Papers</p>
      </div>
      {/* 
      {
        files.length == 0 :
        <div></div>
      } */}


      <div className='my-4 flex flex-col md:flex-row w-full'>
        <label htmlFor="file-upload" className='w-1/2 h-fit p-3 flex justify-center items-center flex-col my-4 bg-gray-100 border-[3px] rounded-lg border-dashed border-gray-500 border-dash border-dash-5 border-gap-5 cursor-pointer'>
          <input id="file-upload" type='file' className='hidden' accept=".pdf" multiple onChange={handleFile} />
          <img src={folder} alt="upload folder" className='mt-4' />
          <p className='text-[10px] md:text-[16px] text-gray-600'>Drop or Select Your Question Paper</p>
          <p className='text-[10px] md:text-[16px] text-gray-300 bg-gray-600 p-2 my-2 hover:bg-slate-700 rounded-md'>Select PDF From Device</p>
        </label>

        <div className='w-full gap-2 flex p-4 flex-col md:flex-row flex-wrap'>
          {files.map((file, index) => (
            <div key={index} className={`w-full md:w-1/3 p-2 border border-black shadow-lg h-[30px] md:h-[74px] rounded-md flex justify-between items-center ${index > 2 ? 'md:w-1/2' : ''}`}>
              <img src={pdf} alt="" />
              <p className='p-2 text-center'>{file.name}</p>
              <button onClick={() => handleDelete(index)}><img src={del} alt="" /></button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className='text-black text-[20px]  font-semibold'><span className='text-pri-500'>Exam</span> Details</p>
      </div>

      <div className='flex w-full gap-4'>
        <div className='mt-3 w-1/3'>
          <DropDown options={options} onStreamChange={handleStreamChange} widthSize={'full'} />
        </div>
        <div className='mt-3 w-1/3'>
          <label htmlFor="examName" className="block text-gray-950">Exam Name</label>
          <input
            type="text"
            name='examName'
            className=' mt-1 w-full  border-gray-950 rounded-md  border-2 h-[43px] px-3 py-1 focus:outline-none focus:border-blue-500'
            placeholder='Exam Name   i.e Maths'
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />

        </div>
        <div className='mt-3 w-1/3'>
          <DropDown options={course} onStreamChange={handleCourse} widthSize={'full'} />
        </div>

      </div>

      <div>
        <p className='text-black text-[20px]  font-semibold'><span className='text-pri-500'>Additional</span> Help</p>
      </div>
      <div>
        <textarea
          type="text"
          name='examName'
          className=' mt-1 w-full border-gray-950 rounded-md border-2 h-30  px-3 py-1 focus:outline-none focus:border-blue-500'
          placeholder='which topic is in each exam ?'
          value={help}
          onChange={(e) => setHelp(e.target.value)}
        />
      </div>

      <div className='w-full flex'>
        <button onClick={handleAnalayzer} className="w-full md:w-[100px] h-[50px] bg-gradient-to-r from-black via-pri-500 to-pri-400 hover:to-pri-300 hover:from-gray-900 hover:via-pri-400 transition-all duration-300 rounded-md text-white font-semibold flex justify-center items-center">
          {
            isLoading ?
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-white fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div> :
              <p className='text-white font-semibold'>Submit</p>
          }</button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home_dashboard;
