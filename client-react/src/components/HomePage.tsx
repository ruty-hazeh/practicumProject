
// import Login from "./Login";
// import { useState } from "react";
// import Username_avatar from "./UserAvatar";
// import { Box, Button } from "@mui/material";

// const HomePage = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [type, setType] = useState('Login');

//     const handleLoginSuccess = () => {
//         setIsLogin((prev) => {
//             if (!prev) setIsLoginOpen(false);
//             return !prev;
//         });
//     }
//     return (<>
//         {!isLogin && (
//             <Box
//                 sx={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 2 }}>
//                 <Button variant="contained" color="error" onClick={() => { setIsLoginOpen(true); setType('Sign'); }}>
//                     Sign
//                 </Button>

//                 <Button variant="contained" color="error" onClick={() => { setIsLoginOpen(true); setType('Login'); }}>
//                     Login
//                 </Button>
//             </Box>
//         )
//         }
//         {isLoginOpen && <Login successLogin={handleLoginSuccess} typeAction={type} close={() => setIsLoginOpen(false)} />}
//         {isLogin && <Username_avatar />}
//     </>)
// }
// export default HomePage;

"use client"

import Login from "./Login"
import { useState } from "react"
import Username_avatar from "./UserAvatar"

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [type, setType] = useState("Login")

  const handleLoginSuccess = () => {
    setIsLogin((prev) => {
      if (!prev) setIsLoginOpen(false)
      return !prev
    })
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Animated Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          animation: "gradientShift 8s ease infinite",
        }}
      >
        {/* Floating Circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            background: "linear-gradient(45deg, #ff6b6b, #feca57)",
            borderRadius: "50%",
            opacity: 0.3,
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "150px",
            height: "150px",
            background: "linear-gradient(45deg, #48cae4, #023e8a)",
            borderRadius: "50%",
            opacity: 0.4,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "100px",
            height: "100px",
            background: "linear-gradient(45deg, #a8e6cf, #88d8c0)",
            borderRadius: "50%",
            opacity: 0.5,
            animation: "float 4s ease-in-out infinite",
          }}
        ></div>

        {/* Music Wave Lines */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "5%",
            width: "4px",
            height: "60px",
            background: "#ff6b6b",
            borderRadius: "2px",
            animation: "wave 1s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "7%",
            width: "4px",
            height: "80px",
            background: "#feca57",
            borderRadius: "2px",
            animation: "wave 1s ease-in-out infinite 0.2s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "9%",
            width: "4px",
            height: "100px",
            background: "#48cae4",
            borderRadius: "2px",
            animation: "wave 1s ease-in-out infinite 0.4s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "11%",
            width: "4px",
            height: "50px",
            background: "#a8e6cf",
            borderRadius: "2px",
            animation: "wave 1s ease-in-out infinite 0.6s",
          }}
        ></div>
      </div>

      {/* Login Buttons */}
      {!isLogin && (
        <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 20, display: "flex", gap: "15px" }}>
          <button
            style={{
              padding: "12px 24px",
              background: "linear-gradient(45deg, #ff6b6b, #feca57)",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 8px 32px rgba(255, 107, 107, 0.4)",
              transition: "all 0.3s ease",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1.1) translateY(-2px)"
              target.style.boxShadow = "0 12px 40px rgba(255, 107, 107, 0.6)"
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1) translateY(0)"
              target.style.boxShadow = "0 8px 32px rgba(255, 107, 107, 0.4)"
            }}
            onClick={() => {
              setIsLoginOpen(true)
              setType("Sign")
            }}
          >
            🎵 Sign Up
          </button>

          <button
            style={{
              padding: "12px 24px",
              background: "linear-gradient(45deg, #48cae4, #023e8a)",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 8px 32px rgba(72, 202, 228, 0.4)",
              transition: "all 0.3s ease",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1.1) translateY(-2px)"
              target.style.boxShadow = "0 12px 40px rgba(72, 202, 228, 0.6)"
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1) translateY(0)"
              target.style.boxShadow = "0 8px 32px rgba(72, 202, 228, 0.4)"
            }}
            onClick={() => {
              setIsLoginOpen(true)
              setType("Login")
            }}
          >
            🎧 Login
          </button>
        </div>
      )}

      {/* Main Content */}
      {!isLogin && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: "40px", position: "relative" }}>
            <div
              style={{
                width: "180px",
                height: "180px",
                background: "linear-gradient(45deg, #ff6b6b, #feca57, #48cae4, #a8e6cf)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 30px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: "80px", animation: "bounce 2s ease-in-out infinite" }}>🎵</span>
            </div>

            {/* Decorative elements */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "20px",
                width: "30px",
                height: "30px",
                background: "#feca57",
                borderRadius: "50%",
                animation: "ping 2s ease-in-out infinite",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                width: "20px",
                height: "20px",
                background: "#ff6b6b",
                borderRadius: "50%",
                animation: "pulse 2s ease-in-out infinite",
              }}
            ></div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "900",
              background: "linear-gradient(45deg, #ff6b6b, #feca57, #48cae4, #a8e6cf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "30px",
              animation: "glow 3s ease-in-out infinite alternate",
              textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
            }}
          >
            MusicFlow
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              color: "white",
              marginBottom: "50px",
              maxWidth: "600px",
              lineHeight: "1.6",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Experience Music Like Never Before
            <br />
            <span style={{ fontSize: "18px", color: "#feca57" }}>Stream • Download • Create • Share</span>
          </p>

          {/* CTA Buttons */}
          <div
            style={{ display: "flex", gap: "30px", marginBottom: "60px", flexWrap: "wrap", justifyContent: "center" }}
          >
            <button
              style={{
                padding: "18px 40px",
                background: "linear-gradient(45deg, #ff6b6b, #feca57)",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                boxShadow: "0 15px 50px rgba(255, 107, 107, 0.4)",
                transition: "all 0.4s ease",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = "scale(1.15) translateY(-5px)"
                target.style.boxShadow = "0 20px 60px rgba(255, 107, 107, 0.6)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = "scale(1) translateY(0)"
                target.style.boxShadow = "0 15px 50px rgba(255, 107, 107, 0.4)"
              }}
              onClick={() => {
                setIsLoginOpen(true)
                setType("Sign")
              }}
            >
              🚀 Start Your Journey
            </button>

            <button
              style={{
                padding: "18px 40px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "30px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.4s ease",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = "scale(1.15) translateY(-5px)"
                target.style.background = "rgba(255, 255, 255, 0.3)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = "scale(1) translateY(0)"
                target.style.background = "rgba(255, 255, 255, 0.2)"
              }}
              onClick={() => {
                setIsLoginOpen(true)
                setType("Login")
              }}
            >
              🎶 Continue Listening
            </button>
          </div>

          {/* Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              maxWidth: "900px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(-10px) scale(1.05)"
                target.style.background = "rgba(255, 255, 255, 0.25)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(0) scale(1)"
                target.style.background = "rgba(255, 255, 255, 0.15)"
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎵</div>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>
                Stream Music
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "16px" }}>Millions of songs in high quality</p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(-10px) scale(1.05)"
                target.style.background = "rgba(255, 255, 255, 0.25)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(0) scale(1)"
                target.style.background = "rgba(255, 255, 255, 0.15)"
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>📱</div>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>
                Create Playlists
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "16px" }}>Organize your favorite tracks</p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(-10px) scale(1.05)"
                target.style.background = "rgba(255, 255, 255, 0.25)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(0) scale(1)"
                target.style.background = "rgba(255, 255, 255, 0.15)"
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>⬇️</div>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Download</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "16px" }}>Listen offline anytime</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {isLoginOpen && <Login successLogin={handleLoginSuccess} typeAction={type} close={() => setIsLoginOpen(false)} />}
      {isLogin && <Username_avatar />}

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
          100% { text-shadow: 0 0 40px rgba(72, 202, 228, 0.8), 0 0 60px rgba(254, 202, 87, 0.6); }
        }
      `}</style>
    </div>
  )
}

export default HomePage






// import Login from "./Login";
// import { useState } from "react";
// import Username_avatar from "./UserAvatar";

// const HomePage = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [type, setType] = useState('Login');

//     const handleLoginSuccess = () => {
//         setIsLogin((prev) => {
//             if (!prev) setIsLoginOpen(false);
//             return !prev;
//         });
//     }

//     return (
//         <div className="min-h-screen relative overflow-hidden">
//             {/* Animated Rainbow Background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-700 via-red-600 via-orange-500 via-yellow-500 via-green-500 via-blue-600 to-indigo-800 animate-pulse"></div>
            
//             {/* Moving Gradient Overlay */}
//             <div className="absolute inset-0 opacity-80">
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-shift"></div>
//             </div>

//             {/* Floating Orbs with Colors */}
//             <div className="absolute inset-0">
//                 <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur-3xl animate-float opacity-60"></div>
//                 <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-3xl animate-float-delayed opacity-60"></div>
//                 <div className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full blur-3xl animate-float-slow opacity-60"></div>
//                 <div className="absolute bottom-32 right-16 w-88 h-88 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-3xl animate-bounce-slow opacity-60"></div>
//                 <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-3xl animate-spin-slow opacity-60"></div>
//             </div>

//             {/* Colorful Floating Music Notes */}
//             <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce-custom text-yellow-300 font-bold drop-shadow-lg">♪</div>
//                 <div className="absolute top-3/4 right-1/4 text-5xl animate-bounce-custom text-pink-400 font-bold drop-shadow-lg" style={{animationDelay: '0.5s'}}>♫</div>
//                 <div className="absolute top-1/2 right-1/3 text-7xl animate-bounce-custom text-cyan-300 font-bold drop-shadow-lg" style={{animationDelay: '1s'}}>♬</div>
//                 <div className="absolute top-1/3 left-1/2 text-4xl animate-bounce-custom text-green-400 font-bold drop-shadow-lg" style={{animationDelay: '1.5s'}}>♩</div>
//                 <div className="absolute bottom-1/4 left-1/5 text-6xl animate-bounce-custom text-purple-400 font-bold drop-shadow-lg" style={{animationDelay: '2s'}}>♭</div>
//             </div>

//             {/* Pulsing Circles */}
//             <div className="absolute inset-0">
//                 <div className="absolute top-20 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
//                 <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-pink-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
//                 <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
//                 <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
//             </div>

//             {/* Main Content */}
//             <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
//                 {/* Animated Title */}
//                 <div className="text-center mb-8 animate-slideDown">
//                         <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 via-purple-500 via-cyan-400 to-green-400 mb-6 tracking-wide animate-text-shimmer drop-shadow-2xl">
//                             🎵 SoundWave 🎵
//                         </h1>
//                         <div className="text-lg md:text-2xl font-bold text-white mb-6 animate-slideUp drop-shadow-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
//                             ✨ חווה מוזיקה כמו שמעולם לא חווית! ✨
//                         </div>
                        
//                         {/* Colorful Audio Visualizer */}
//                         <div className="flex justify-center items-end space-x-1 mb-8 bg-black/20 p-4 rounded-3xl backdrop-blur-sm border border-white/20">
//                             {[...Array(20)].map((_, i) => (
//                                 <div
//                                     key={i}
//                                     className={`w-3 rounded-full animate-pulse ${
//                                         i % 5 === 0 ? 'bg-gradient-to-t from-pink-500 to-purple-500' :
//                                         i % 5 === 1 ? 'bg-gradient-to-t from-cyan-400 to-blue-500' :
//                                         i % 5 === 2 ? 'bg-gradient-to-t from-yellow-400 to-orange-500' :
//                                         i % 5 === 3 ? 'bg-gradient-to-t from-green-400 to-emerald-500' :
//                                         'bg-gradient-to-t from-red-400 to-pink-500'
//                                     }`}
//                                     style={{
//                                         height: `${30 + Math.random() * 60}px`,
//                                         animationDelay: `${i * 0.1}s`,
//                                         animationDuration: `${0.5 + Math.random() * 0.8}s`
//                                     }}
//                                 ></div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Spectacular Login Buttons */}
//                     {!isLogin && (
//                         <div className="flex flex-col sm:flex-row gap-6 animate-zoomIn mb-8">
//                             <button
//                                 onClick={() => { setIsLoginOpen(true); setType('Sign'); }}
//                                 className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-125 hover:rotate-2 transition-all duration-500 ease-out animate-pulse-slow border-4 border-white/30"
//                             >
//                                 <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></span>
//                                 <span className="relative flex items-center justify-center gap-3 z-10">
//                                     <span className="text-xl animate-bounce">🚀</span>
//                                     הרשמה מהירה
//                                     <span className="text-xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
//                                 </span>
//                                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 scale-0 group-hover:scale-150 transition-transform duration-700 blur-sm"></div>
//                             </button>

//                             <button
//                                 onClick={() => { setIsLoginOpen(true); setType('Login'); }}
//                                 className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-125 hover:-rotate-2 transition-all duration-500 ease-out animate-pulse-slow border-4 border-white/30"
//                             >
//                                 <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-reverse"></span>
//                                 <span className="relative flex items-center justify-center gap-3 z-10">
//                                     <span className="text-xl animate-bounce">🎯</span>
//                                     התחברות מיידית  
//                                     <span className="text-xl animate-bounce" style={{animationDelay: '0.3s'}}>⚡</span>
//                                 </span>
//                                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 scale-0 group-hover:scale-150 transition-transform duration-700 blur-sm"></div>
//                             </button>
//                         </div>
//                     )}

//                     {/* Colorful Feature Cards */}
//                     <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//                         <div className="text-center p-6 bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-lg rounded-3xl border-2 border-white/20 hover:bg-gradient-to-br hover:from-purple-500/90 hover:to-pink-500/90 transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-purple-500/50 animate-slideInLeft">
//                             <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow border-4 border-white/30">
//                                 <span className="text-3xl">🎵</span>
//                             </div>
//                             <h3 className="text-xl font-black text-white mb-3 drop-shadow-lg">איכות 4K סאונד</h3>
//                             <p className="text-pink-100 font-semibold">צליל קריסטלי באיכות אולפן מקצועי!</p>
//                         </div>

//                         <div className="text-center p-6 bg-gradient-to-br from-cyan-600/80 to-blue-600/80 backdrop-blur-lg rounded-3xl border-2 border-white/20 hover:bg-gradient-to-br hover:from-cyan-500/90 hover:to-blue-500/90 transition-all duration-500 transform hover:scale-110 hover:-rotate-1 shadow-2xl hover:shadow-cyan-500/50 animate-slideInUp">
//                             <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow border-4 border-white/30">
//                                 <span className="text-3xl">💝</span>
//                             </div>
//                             <h3 className="text-xl font-black text-white mb-3 drop-shadow-lg">רשימות אינסופיות</h3>
//                             <p className="text-cyan-100 font-semibold">צור אלפי רשימות השמעה מותאמות אישית!</p>
//                         </div>

//                         <div className="text-center p-6 bg-gradient-to-br from-green-600/80 to-emerald-600/80 backdrop-blur-lg rounded-3xl border-2 border-white/20 hover:bg-gradient-to-br hover:from-green-500/90 hover:to-emerald-500/90 transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-green-500/50 animate-slideInRight">
//                             <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse border-4 border-white/30">
//                                 <span className="text-3xl">⚡</span>
//                             </div>
//                             <h3 className="text-xl font-black text-white mb-3 drop-shadow-lg">מהירות אור</h3>
//                             <p className="text-green-100 font-semibold">טעינה מיידית ללא המתנה בכלל!</p>
//                         </div>
//                     </div>
//                 </div>

//             {/* Animated Login Modal */}
//             {isLoginOpen && (
//                 <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-pink-900/60 backdrop-blur-lg flex items-center justify-center z-50 animate-fadeIn">
//                     <div className="animate-zoomIn">
//                         <Login 
//                             successLogin={handleLoginSuccess} 
//                             typeAction={type} 
//                             close={() => setIsLoginOpen(false)} 
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* User Avatar */}
//             {isLogin && <Username_avatar />}

//             <style>{`
//                 @keyframes gradient-shift {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
                
//                 @keyframes text-shimmer {
//                     0% { background-position: -200% center; }
//                     100% { background-position: 200% center; }
//                 }
                
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-30px) rotate(10deg); }
//                 }
                
//                 @keyframes float-delayed {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-20px) rotate(-8deg); }
//                 }
                
//                 @keyframes float-slow {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-15px) rotate(5deg); }
//                 }
                
//                 @keyframes bounce-slow {
//                     0%, 100% { transform: translateY(0px) scale(1); }
//                     50% { transform: translateY(-10px) scale(1.1); }
//                 }
                
//                 @keyframes spin-slow {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }
                
//                 @keyframes spin-reverse {
//                     from { transform: rotate(360deg); }
//                     to { transform: rotate(0deg); }
//                 }
                
//                 @keyframes bounce-custom {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-25px) rotate(10deg); }
//                 }
                
//                 @keyframes slideDown {
//                     from { opacity: 0; transform: translateY(-100px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
                
//                 @keyframes slideUp {
//                     from { opacity: 0; transform: translateY(100px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
                
//                 @keyframes slideInLeft {
//                     from { opacity: 0; transform: translateX(-100px) rotate(-10deg); }
//                     to { opacity: 1; transform: translateX(0) rotate(0deg); }
//                 }
                
//                 @keyframes slideInRight {
//                     from { opacity: 0; transform: translateX(100px) rotate(10deg); }
//                     to { opacity: 1; transform: translateX(0) rotate(0deg); }
//                 }
                
//                 @keyframes slideInUp {
//                     from { opacity: 0; transform: translateY(100px) scale(0.8); }
//                     to { opacity: 1; transform: translateY(0) scale(1); }
//                 }
                
//                 @keyframes zoomIn {
//                     from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
//                     to { opacity: 1; transform: scale(1) rotate(0deg); }
//                 }
                
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
                
//                 @keyframes pulse-slow {
//                     0%, 100% { opacity: 1; }
//                     50% { opacity: 0.7; }
//                 }
                
//                 .animate-gradient-shift {
//                     background-size: 400% 400%;
//                     animation: gradient-shift 8s ease infinite;
//                 }
                
//                 .animate-text-shimmer {
//                     background-size: 400% 100%;
//                     animation: text-shimmer 3s ease-in-out infinite;
//                 }
                
//                 .animate-float { animation: float 6s ease-in-out infinite; }
//                 .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
//                 .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
//                 .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
//                 .animate-spin-slow { animation: spin-slow 10s linear infinite; }
//                 .animate-spin-reverse { animation: spin-reverse 8s linear infinite; }
//                 .animate-bounce-custom { animation: bounce-custom 3s ease-in-out infinite; }
//                 .animate-slideDown { animation: slideDown 1s ease-out; }
//                 .animate-slideUp { animation: slideUp 1s ease-out 0.3s both; }
//                 .animate-slideInLeft { animation: slideInLeft 1s ease-out 0.5s both; }
//                 .animate-slideInRight { animation: slideInRight 1s ease-out 0.7s both; }
//                 .animate-slideInUp { animation: slideInUp 1s ease-out 0.6s both; }
//                 .animate-zoomIn { animation: zoomIn 0.8s ease-out; }
//                 .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
//                 .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
//             `}</style>
//         </div>
//     );
// }

// export default HomePage;