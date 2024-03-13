import React, { useState } from "react";

export default function Form() {
  const myData = [
    "Pływanie",
    "Pakowanie na wyjazd",
    "Rower",
    "Bieganie",
    "Jedznie",
    "Jazda na airbiku",
    "Spanie",
    "Spa",
  ];

  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (text) => {
    const filteredData = myData.filter((item) =>
      item.toLowerCase().startsWith(text.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />

      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}