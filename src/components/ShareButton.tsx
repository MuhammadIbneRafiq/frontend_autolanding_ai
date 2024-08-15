import React, { useState,useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin, FaCopy, FaShareAlt } from 'react-icons/fa';

interface ShareButtonProps {
  shareUrl: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
        if (isOpen && !e.target.closest(".share-button")) {
          setIsOpen(false);
        }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
        document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full flex justify-end">
      <button
        onClick={togglePopup}
        className="flex items-center justify-center p-2 bg-gray-300 dark:bg-blue-400 hover:dark:bg-blue-600 text-white rounded-md shadow hover:bg-gray-500 share-button"
      >
        <FaShareAlt className="text-black" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-12 w-48 border rounded-lg shadow-lg bg-white dark:bg-blue-800 text-black dark:text-white z-[200]">
          <div className="p-4 flex flex-col items-center space-y-4">
            <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
              <button className="flex items-center justify-center w-full p-2 text-gray-700 dark:text-white border rounded-md hover:bg-gray-100 hover:dark:bg-black">
                <FaCopy className="mr-2" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </CopyToClipboard>

            <div className="flex space-x-8">
              <FacebookShareButton url={shareUrl} title={title} className="text-blue-600">
                <FaFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title} className="text-blue-400">
                <FaTwitter />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={title} className="text-blue-700">
                <FaLinkedin />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
