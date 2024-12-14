import { useState } from 'react';
import axios from "axios";

export const usePdfUpload = () => {
  const [pdfUploadLoading, setPdfUploadLoading] = useState(false);

  const uploadPdf = async (formData: FormData) => {
    setPdfUploadLoading(true);
    console.log('🚀 Starting PDF upload...');
    console.log('📦 FormData contents:', {
      pdf: formData.get('pdf'),
      chatId: formData.get('chatId')
    });

    try {
      const token = localStorage.getItem('accessToken');
      console.log('📤 Sending request to /api/upload-pdf...');
      const response = await axios.post(
        'https://backend-autolanding-ai.vercel.app/api/upload-pdf', 
        formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
      });


      console.log('✨ Parsing JSON response...');
      const data = await response.data;
      console.log('📦 Parsed response data:', data);

      console.log('✅ Upload successful!');
      return data;
    } catch (error) {
      console.error('💥 Upload failed:', error);
      throw error;
    } finally {
      setPdfUploadLoading(false);
      console.log('🏁 Upload process completed');
    }
  };

  return { uploadPdf, pdfUploadLoading };
};