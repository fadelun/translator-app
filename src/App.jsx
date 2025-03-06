import React, { useState } from "react";
import OPEN_API from "./client";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("id");
  const [targetLang, setTargetLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    // Tentukan nama bahasa sesuai dengan kode
    const langNames = {
      id: "Bahasa Indonesia",
      en: "English",
      ar: "Arabic",
    };

    setIsLoading(true);

    // Buat prompt untuk ChatGPT
    const prompt = `Terjemahkan teks berikut dari ${langNames[sourceLang]} ke ${langNames[targetLang]}:\n\n${inputText}`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_API}`,
          },
        },
      );
      // setIsLoading(true);
      setTranslatedText(response.data.choices[0].message.content.trim());
      setIsLoading(false);
    } catch (error) {
      console.error("Error saat menerjemahkan:", error);
      setTranslatedText("Terjadi kesalahan pada penerjemahan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Aplikasi Penerjemah
        </h1>
        <textarea
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 mb-4 focus:outline-none focus:border-orange-500"
          rows="5"
          placeholder="Masukkan teks di sini..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="mb-4">
          <label className="block mb-1 font-medium text-white">
            Bahasa Asal:
          </label>
          <select
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:border-orange-500"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-white">
            Bahasa Tujuan:
          </label>
          <select
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:border-orange-500"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <button
          className="w-full hover:cursor-pointer bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition mb-4"
          onClick={handleTranslate}
        >
          Terjemahkan
        </button>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Hasil Terjemahan:
          </h2>
          <p className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3">
            {isLoading ? "LOADING..." : translatedText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
