import React, { useState } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UploadBox = styled.label`
  width: 100%;
  height: 120px;
  border: 2px dashed ${props => props.hasImage ? '#4CAF50' : '#4A4A52'};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.hasImage ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};

  &:hover {
    border-color: #4CAF50;
    background-color: rgba(76, 175, 80, 0.05);
  }

  input[type="file"] {
    display: none;
  }
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const UploadIcon = styled.div`
  color: ${props => props.hasImage ? '#4CAF50' : '#B0B0B0'};
  font-size: 24px;
`;

const UploadText = styled.p`
  color: ${props => props.hasImage ? '#4CAF50' : '#B0B0B0'};
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 53, 69, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #dc3545;
    transform: scale(1.1);
  }
`;

const FileInfo = styled.div`
  font-size: 12px;
  color: #B0B0B0;
  text-align: center;
`;

const ImageUpload = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  accept = "image/*"
}) => {
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Walidacja pliku
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Dozwolone są tylko pliki JPG, PNG i WebP.');
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
        return;
      }

      // Konwertuj do base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setPreview(base64);
        setFileInfo({
          name: file.name,
          size: Math.round(file.size / 1024) // KB
        });
        onChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileInfo(null);
    onChange('');
  };

  const hasImage = preview || value;

  return (
    <UploadContainer>
      <label style={{ fontSize: '14px', fontWeight: '500', color: '#E0E0E0' }}>
        {label} {required && <span style={{ color: '#dc3545' }}>*</span>}
      </label>
      
      <UploadBox hasImage={hasImage}>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
        />
        
        {hasImage ? (
          <ImagePreview>
            <PreviewImage src={preview || value} alt="Preview" />
            <RemoveButton onClick={handleRemove} type="button">
              <FiX />
            </RemoveButton>
          </ImagePreview>
        ) : (
          <UploadContent>
            <UploadIcon hasImage={hasImage}>
              <FiUpload />
            </UploadIcon>
            <UploadText hasImage={hasImage}>
              Kliknij, aby wybrać zdjęcie
            </UploadText>
          </UploadContent>
        )}
      </UploadBox>
      
      {fileInfo && (
        <FileInfo>
          {fileInfo.name} ({fileInfo.size} KB)
        </FileInfo>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;
