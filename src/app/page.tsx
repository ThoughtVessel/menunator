'use client';

import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import { useState, useRef } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log('Selected file:', file.name);
      // Here we'll later send to backend API
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Main page section
  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="absolute inset-0 bg-white/95"></div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center text-center space-y-6 max-w-4xl">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Menuator
        </h1>
        <p className="text-2xl text-gray-700 max-w-2xl">
          Use AI to generate images and diet information for a menu!
        </p>
        
        <button 
          onClick={triggerFileUpload}
          className="mt-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-semibold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg"
        >
          <FaUpload className="h-6 w-6" />
          Upload Images
          <FaUpload className="h-6 w-6" />
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </main>
      
      <footer className="mt-auto pb-8 flex flex-col items-center space-y-4">
        <div className="flex gap-4 items-center">
          <a
            href="https://www.linkedin.com/in/andrew-robinson314/"
            className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 text-white transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/thoughtvessel"
            className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 text-white transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://andrewrobinson.framer.website/"
            className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 text-white transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Personal Website"
          >
            <FaUserTie className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-2 text-gray-600">
          Developed by <span className="font-semibold">Andrew Robinson</span>
        </p>
      </footer>
      </div>
    </div>
  );
}
