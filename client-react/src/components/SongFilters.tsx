// import { useState } from "react";

// interface Props {
//     onFilter: (singer: string, genre: string) => void;
//     availableGenres: string[];
//     availableSingers: string[];
// }

// const SongFilters = ({ onFilter, availableGenres, availableSingers }: Props) => {
//     const [selectedSinger, setSelectedSinger] = useState("");
//     const [selectedGenre, setSelectedGenre] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onFilter(selectedSinger, selectedGenre);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
//             <select
//                 value={selectedSinger}
//                 onChange={(e) => setSelectedSinger(e.target.value)}
//                 className="p-2 rounded border border-gray-300"
//             >
//                 <option value="">בחר זמר</option>
//                 {availableSingers.map((singer, idx) => (
//                     <option key={idx} value={singer}>{singer}</option>
//                 ))}
//             </select>

//             <select
//                 value={selectedGenre}
//                 onChange={(e) => setSelectedGenre(e.target.value)}
//                 className="p-2 rounded border border-gray-300"
//             >
//                 <option value="">בחר ז'אנר</option>
//                 {availableGenres.map((genre, idx) => (
//                     <option key={idx} value={genre}>{genre}</option>
//                 ))}
//             </select>

//             <button
//                 type="submit"
//                 className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow"
//             >
//                 סנן
//             </button>
//         </form>
//     );
// };

// export default SongFilters;


"use client"

import type React from "react"

import { useState } from "react"

interface Props {
  onFilter: (singer: string, genre: string) => void
  availableGenres: string[]
  availableSingers: string[]
}

const SongFilters = ({ onFilter, availableGenres, availableSingers }: Props) => {
  const [selectedSinger, setSelectedSinger] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(selectedSinger, selectedGenre)
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        marginBottom: "30px",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .select-wrapper {
          position: relative;
          width: 100%;
        }
        
        .select-wrapper::after {
          content: '▼';
          font-size: 12px;
          color: white;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
      `}</style>

      <h2
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        🔍 חיפוש וסינון שירים
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <div style={{ flex: "1 1 200px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }}
            >
              בחר זמר
            </label>
            <div className="select-wrapper">
              <select
                value={selectedSinger}
                onChange={(e) => setSelectedSinger(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontSize: "16px",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backdropFilter: "blur(5px)",
                  direction: "rtl",
                }}
              >
                <option value="" style={{ background: "#764ba2", color: "white" }}>
                  כל הזמרים
                </option>
                {availableSingers.map((singer, idx) => (
                  <option key={idx} value={singer} style={{ background: "#764ba2", color: "white" }}>
                    {singer}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }}
            >
              בחר ז'אנר
            </label>
            <div className="select-wrapper">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontSize: "16px",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backdropFilter: "blur(5px)",
                  direction: "rtl",
                }}
              >
                <option value="" style={{ background: "#764ba2", color: "white" }}>
                  כל הז'אנרים
                </option>
                {availableGenres.map((genre, idx) => (
                  <option key={idx} value={genre} style={{ background: "#764ba2", color: "white" }}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            color: "white",
            border: "none",
            borderRadius: "15px",
            padding: "14px 25px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            alignSelf: "center",
            marginTop: "10px",
            minWidth: "150px",
            animation: "pulse 2s infinite",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(-2px) scale(1.05)"
            target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement
            target.style.transform = "translateY(0) scale(1)"
            target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
          }}
        >
          🔍 סנן שירים
        </button>
      </form>
    </div>
  )
}

export default SongFilters
