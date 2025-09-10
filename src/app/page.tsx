import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';

export default function Home() {
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
        <p className="text-gray-600">Developed by Andrew Robinson</p>
      </footer>
      </div>
    </div>
  );
}
