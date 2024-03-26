import React, { useState, useEffect } from 'react';
import { storage } from '../Config/firebase.js'; // Adjust the path according to your project structure

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]); // To store image URLs

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const fileRef = storage.ref().child(`images/${file.name}`);
      fileRef.put(file).then(() => {
        console.log('Uploaded:', file.name);
        // Optionally, get the URL and update the gallery immediately
        fileRef.getDownloadURL().then((url) => {
          setImages((prevUrls) => [...prevUrls, url]);
        });
      });
    }
  };

  // Fetch and display images from Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = storage.ref().child('images');
      imagesRef.listAll().then((result) => {
        const promises = result.items.map((imageRef) => imageRef.getDownloadURL());
        Promise.all(promises).then((urls) => {
          setImages(urls);
        });
      });
    };

    fetchImages();
  }, []);

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i); // Add more video formats as needed
  };

  return (
    <div>
      <h2>Upload your photos and videos</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      <div>
      <h2>Media Gallery</h2>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.map((url, index) => (
            isVideo(url) ? (
              <video controls style={{ width: '100px', height: '100px' }}>
                <source src={url} type="video/mp4" /> {/* Adjust type based on actual video format */}
                Your browser does not support the video tag.
              </video>
            ) : (
              <img key={index} src={url} alt="Uploaded"/>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
