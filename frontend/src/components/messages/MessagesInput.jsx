import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCamera } from "react-icons/ai";
import { IoAttachSharp } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { TiMicrophoneOutline } from "react-icons/ti";
import useSendMessage from '../../hooks/useSendMessage';
import toast from 'react-hot-toast';
import useSendFiles from '../../hooks/useSendFiles';
import { TbCaptureFilled } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";

const MessagesInput = () => {
  const [message, setMessage] = useState("");
  const { messageLoading, sendMessage } = useSendMessage();
  const { loading: fileLoading, sendFiles } = useSendFiles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [showOptions, setshowOptions] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audio, setAudio] = useState(null);
  const [timer, setTimer] = useState(0);

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

  const selectOptions = () => {
    setshowOptions(true);
  };

  const closeSelectOptions = () => {
    setshowOptions(false);
  };

  useEffect(() => {
    if (mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const openCameraModal = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      setShowCameraModal(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera.');
    }
  };

  const closeCameraModal = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setShowCameraModal(false);
  };

  const handleCameraCapture = () => {
    if (videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setFilePreview(imageDataUrl);
      closeCameraModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !selectedFile && !filePreview && !audio) return;

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (audio) {
      await sendMessage(undefined, undefined, audio);
      setAudio(null);
    }

    if (message || selectedFile || filePreview) {
      await sendMessage(message, selectedFile || filePreview);
      setMessage("");
      setSelectedFile(null);
      setFilePreview(null);
      setAudio(null);
    }

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      toast.error("The maximum limit allowed is 10MB");
      return;
    }
  };

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setTimer(0);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudio(blob);
        };

        recorder.start();
        setRecording(true);
      })
      .catch(err => console.error('Error accessing microphone:', err));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <form className='px-2 my-3' onSubmit={handleSubmit}>

      {/* Clicked Image Preview */}
      {filePreview && (
        <div className="-mt-5 absolute top-20">
          <img src={filePreview} alt="Preview" className="w-[26.5rem] h-[26.5rem]" />
        </div>
      )}

      <div className='w-96 relative flex items-center justify-between'>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        <button type='button' className='bg-emerald-500 p-2 mr-1 rounded-full' onClick={selectOptions}>
          {messageLoading ? <div className='loading loading-spinner'></div> : <IoAttachSharp className='w-7 h-7 text-black' />}
        </button>

        <input type="file" className="hidden" ref={fileInputRef} />
        <input
          type="text"
          className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black'
          placeholder={recording ? `Recording...${formatTime(timer)}` : 'Message here'} // Conditional placeholder
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit' className='absolute end-0 items-center p-2 rounded-full mt-0.5 mr-2'>
          {fileLoading ? <div className='loading loading-spinner'></div> : <TbSend className='w-5 h-5 text-black' />}
        </button>

        {recording ? (
          <div className='flex flex-1 items-center justify-center relative'>
            <button type='button' className='absolute left-1 bg-red-500 p-2 rounded-full h-10' onClick={stopRecording}>
              <div className='loading loading-spinner'></div>
            </button>
          </div>
        ) : (
          <div className='flex flex-1 items-center justify-center relative'>
            <button type='button' className='absolute left-1 bg-emerald-500 p-2.5 rounded-full' onClick={startRecording}>
              {messageLoading ? <div className='loading loading-spinner'></div> : <TiMicrophoneOutline className='w-6 h-6 text-black' />}
            </button>
          </div>
        )}

      </div>

      {showOptions && (
        <div className="fixed w-26 h-20 bottom-16 rounded-lg flex items-center justify-center gap-2 bg-gray-50 z-50">
          <span className='absolute top-0 right-0 mr-2 text-black cursor-pointer' onClick={closeSelectOptions}>x</span>

          <abbr title='Open Camera'>
            <button className="flex items-center justify-center ml-4" onClick={openCameraModal}>
              <AiOutlineCamera className="w-10 h-10 p-2 rounded-full bg-emerald-500 text-black" />
            </button>
          </abbr>

          <abbr title='Attach Files'>
            <button className='bg-emerald-500 p-1.5 mr-3 rounded-full' onClick={() => fileInputRef.current.click()}>
              <IoAttachSharp className='w-7 h-7 text-black' />
            </button>
          </abbr>
        </div>
      )}

      {mediaStream && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover"></video>
        </div>
      )}

      {mediaStream && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover"></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <button type='button' className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 p-2 rounded-full' onClick={handleCameraCapture}>
            <TbCaptureFilled className='w-8 h-8 text-white' />
          </button>
          <button type='button' className='absolute top-4 right-4 text-red-500' onClick={closeCameraModal}>
            <ImCancelCircle className='w-6 h-6' />
          </button>
        </div>
      )}

    </form>
  )
}

export default MessagesInput;