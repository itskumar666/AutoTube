import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormDataState {
  title: string;
  description: string;
  category: string;
  keywords: string;
  privacyStatus: string;
}

export const EditorUpload: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    category: '',
    keywords: '',
    privacyStatus: '',
  });

  const handleVideo = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!videoFile) {
      alert('Please select a video to upload');
      return;
    }

    const data = new FormData();
    data.append('file', videoFile);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('keywords', formData.keywords);
    data.append('privacyStatus', formData.privacyStatus);

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post('http://localhost:8080/upload/EditorUpload', data, config);
      alert('Video uploaded successfully');
    } catch (err) {
      alert('Video upload failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="video">Video:</label>
        <input type="file" id="video" accept="video/*" onChange={handleVideo} required />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleFormData} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleFormData} required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleFormData} required />
      </div>
      <div>
        <label htmlFor="keywords">Keywords:</label>
        <input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={handleFormData} required />
      </div>
      <div>
        <label htmlFor="privacyStatus">Privacy Status:</label>
        <input type="text" id="privacyStatus" name="privacyStatus" value={formData.privacyStatus} onChange={handleFormData} required />
      </div>
      <button type="submit">Upload Video</button>
    </form>
  );
};
