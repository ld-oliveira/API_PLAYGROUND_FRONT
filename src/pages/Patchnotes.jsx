import React from 'react';
import patchNotes from '../data/patchNotes';
import '../styles/components/Patchnotes.scss';

const Patchnotes = () => {
  return (
    <div className="patch-notes">
      <h1>🛠️ Patch Notes</h1>
      {patchNotes.map((note, index) => (
        <div key={index} className="note">
          <h2>{note.versao} - <span>{note.data}</span></h2>
          <p>{note.conteudo}</p>
        </div>
      ))}
    </div>
  );
};

export default Patchnotes;