import React from 'react';

export const processTextWithColors = (text: string): React.ReactNode => {
  if (!text.includes('<purple>') && !text.includes('<strong>')) {
    return text;
  }

  let processedText = text
    .replace(/<purple>/g, '<span class="text-purple font-bold">')
    .replace(/<\/purple>/g, '</span>');

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

export const processTextWithColorComponents = (text: string): React.ReactNode => {
  if (!text.includes('<purple>')) {
    return text;
  }

  const parts = text.split(/(<purple>.*?<\/purple>)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('<purple>') && part.endsWith('</purple>')) {
      const innerText = part.replace(/<\/?purple>/g, '');
      return (
        <span key={index} className="text-purple font-bold">
          {innerText}
        </span>
      );
    }
    return part;
  });
};