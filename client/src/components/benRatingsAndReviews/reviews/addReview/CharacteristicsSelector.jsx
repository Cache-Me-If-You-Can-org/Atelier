import React, { useState } from 'react';
import CharacteristicInput from './CharacteristicInput';

function CharacteristicsSelector({ characteristics, getCharacteristics }) {
  const [selectedValues, setSelectedValues] = useState({});

  const characteristicOptions = {
    size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const handleSelection = (id, value) => {
    const updated = { ...selectedValues, [id]: value };
    setSelectedValues(updated);
    getCharacteristics(updated); // bubble up to a higher parent if needed
  };

  const fullCharArr = Object.entries(characteristics).map(([name, data]) => ({
    ...data,
    name,
    options: characteristicOptions[name.toLowerCase()],
  }));

  return (
    <div>
      {fullCharArr.map((characteristic) => (
        <CharacteristicInput
          key={characteristic.id}
          id={characteristic.id.toString()}
          label={characteristic.name}
          name={characteristic.name}
          options={characteristic.options}
          value={selectedValues[characteristic.id]}
          onChange={(val) => handleSelection(characteristic.id, val)}
        />
      ))}
    </div>
  );
}

export default CharacteristicsSelector;
