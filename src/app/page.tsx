'use client';

import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { useState, useRef } from 'react';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  dietInfo: string[];
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processMenuImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/analyze-menu', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze menu');
      }

      const data = await response.json();
      setMenuItems(data.menuItems);
      setShowResults(true);
    } catch (error) {
      console.error('Error processing menu:', error);
      setHasError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetApp = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setMenuItems([]);
    setShowResults(false);
    setIsProcessing(false);
    setHasError(false);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (hasError) {
    return (
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <div className="text-red-500 text-6xl sm:text-8xl mb-4 sm:mb-6">⚠️</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4 sm:mb-6">
            Analysis Failed
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8">
            We couldn&apos;t analyze your menu. Please try again with a clearer image.
          </p>

          {imagePreview && (
            <div className="bg-white rounded-lg shadow-lg p-4 mb-8 max-w-md mx-auto">
              <img
                src={imagePreview}
                alt="Failed menu preview"
                className="w-full h-auto rounded-lg opacity-75"
              />
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={resetApp}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Try Again
            </button>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              Try uploading a different image or make sure your menu is clearly visible
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen p-4 sm:p-8 relative">
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Your Menuated Menu
            </h1>
            <button
              onClick={resetApp}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Upload New Menu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🍽️</div>
                      <p className="text-purple-600 font-medium">Image Generating...</p>
                      <p className="text-sm text-gray-500">AI is creating a custom image</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">{item.name}</h3>
                    <span className="text-lg font-bold text-purple-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.dietInfo.map((diet, dietIndex) => (
                      <span
                        key={dietIndex}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 text-center px-4">
          <FaSpinner className="animate-spin text-5xl sm:text-6xl text-purple-600 mb-4 sm:mb-6 mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Processing Your Menu...
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
            AI is analyzing your menu and generating beautiful images for each item
          </p>
          {imagePreview && (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
              <img
                src={imagePreview}
                alt="Menu preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedImage) {
    return (
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 w-full max-w-4xl px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Menu Preview
            </h1>
            <p className="text-lg sm:text-xl text-gray-700">
              Ready to generate your AI-enhanced menu?
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Menu preview"
                className="w-full h-auto rounded-lg border max-h-96 object-contain mx-auto"
              />
            )}
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={processMenuImage}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Generate AI Menu
            </button>
            <br />
            <button
              onClick={resetApp}
              className="text-gray-600 hover:text-gray-800 underline text-sm sm:text-base"
            >
              Choose Different Image
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <div className="absolute inset-0 bg-white/95"></div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-4xl px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Menuator
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-2xl px-2">
            Upload a menu photo and AI will generate beautiful images and diet information for each item!
          </p>

          <button
            onClick={triggerFileUpload}
            className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform shadow-lg"
          >
            <FaUpload className="h-6 w-6" />
            Upload Menu Photo
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

        <footer className="mt-auto pb-6 sm:pb-8 flex flex-col items-center space-y-3 sm:space-y-4 px-4">
          <div className="flex gap-3 sm:gap-4 items-center">
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
          <p className="mt-2 text-gray-600 text-sm sm:text-base text-center">
            Developed by <span className="font-semibold">Andrew Robinson</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
