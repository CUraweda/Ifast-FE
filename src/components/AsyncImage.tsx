import { downloadData } from '@/restApi/download.api';
import React, { useEffect, useState } from 'react';

interface EvidenceImageProps {
  filePath: string;
}

const AsyncImage: React.FC<EvidenceImageProps> = ({ filePath }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!filePath) return;
    fetchImage();

  }, [filePath]);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const url = await downloadData(filePath);
      setImageUrl(url);
      
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally{
      setLoading(false)
    }
  };
  
  if (loading) {
    return <div>Loading image...</div>;
  }
  console.log(imageUrl);
  

  return imageUrl ? (
    <img src={imageUrl} alt="Evidence" style={{ maxWidth: '100px' }} />
  ) : (
    <div>No image available.</div>
  );
};

export default AsyncImage;
