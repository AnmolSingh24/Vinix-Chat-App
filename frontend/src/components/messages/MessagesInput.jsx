import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineCameraAlt } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { TiMicrophoneOutline } from "react-icons/ti";
import useSendMessage from '../../hooks/useSendMessage';
import toast from 'react-hot-toast';
import useSendFiles from '../../hooks/useSendFiles';

const MessagesInput = () => {
  const [message, setMessage] = useState("");
  const { messageLoading, sendMessage } = useSendMessage();
  const { loading: fileLoading, sendFiles } = useSendFiles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file) {
        setMessage(file.name);
        if (file.type.startsWith('image/')) {
          setFilePreview(URL.createObjectURL(file));
        } else if (['application/pdf'].includes(file.type)) {
          setFilePreview('pdf');
        } else if (['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
          setFilePreview('word');
        } else if (['text/plain'].includes(file.type)) {
          setFilePreview('txt');
        }
      }
    };

    fileInputRef.current.addEventListener('change', handleFileChange);

    return () => {
      fileInputRef.current.removeEventListener('change', handleFileChange);
    };

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !selectedFile) return;

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (message || selectedFile) {
      await sendMessage(message, selectedFile);
      setMessage("");
      setSelectedFile(null);
    }

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the maximum allowed limit 10MB");
      return;
    }
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-96 relative flex items-center justify-between'>
        <button type='button' className='bg-emerald-500 p-3 mr-1 rounded-full' onClick={() => fileInputRef.current.click()}>
          {messageLoading ? <div className='loading loading-spinner'></div> : <MdOutlineCameraAlt className='w-5 h-5 text-black' />}
        </button>

        <input type="file" className="hidden" ref={fileInputRef} />
        <input type="text" className='border z-10 text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black'
          placeholder='Message here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit' className='z-10 absolute end-0 items-center p-2 rounded-full mt-0.5 mr-2'>
          {fileLoading ? <div className='loading loading-spinner'></div> : <TbSend className='w-5 h-5 text-black' />}
        </button>

        <div className='flex flex-1 items-center justify-center relative'>
          <button type='button' className='absolute left-1 bg-emerald-500 p-3 rounded-full'>
            {messageLoading ? <div className='loading loading-spinner'></div> : <TiMicrophoneOutline className='w-5 h-5 text-black' />}
          </button>
        </div>
      </div>
    </form>
  )
}

export default MessagesInput;