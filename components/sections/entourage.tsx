"use client"

import { Heart, Users, Flower2, Crown, Sparkles } from "lucide-react"


export function Entourage() {

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      {/* Decorative background elements for motif cohesion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hidden sm:block absolute top-8 left-6 w-24 h-24 bg-[#BB8A3D]/10 rounded-full blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-10 w-20 h-20 bg-[#CDAC77]/15 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="hidden sm:block absolute bottom-16 left-10 w-28 h-28 bg-[#BB8A3D]/8 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="sm:hidden absolute top-6 right-6 w-14 h-14 bg-[#CDAC77]/12 rounded-full blur-lg" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/25 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
            Our Entourage
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
            The special people standing by our side
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-5xl mx-auto">
          <div>
            <div className="text-center mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFF6E7]">The Couple</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-white/90 rounded-xl p-4 border border-[#BB8A3D]/30">
                <div className="flex flex-col items-center justify-center text-center gap-1">
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-[#BB8A3D]" />
                    <p className="text-[#402921] font-semibold">Erda Precious Ricohermoso</p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#583016]/80">Bride</p>
                </div>
              </div>
              <div className="bg-white/90 rounded-xl p-4 border border-[#BB8A3D]/30">
                <div className="flex flex-col items-center justify-center text-center gap-1">
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-[#BB8A3D]" />
                    <p className="text-[#402921] font-semibold">Russell Ticbaen</p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#583016]/80">Groom</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-3 sm:mb-4"><h4 className="text-base sm:text-lg font-semibold text-[#FFF6E7]">Parents of the Bride</h4></div>
              <div className="space-y-2">
                <div className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30">
                  <div className="flex flex-col items-center justify-center text-center gap-0.5">
                    <div className="flex items-center justify-center gap-2"><Users className="w-4 h-4 text-[#CDAC77]" /><p className="text-[#402921]">Jaime Balajadia</p></div>
                    <p className="text-xs text-[#583016]/80">(Uncle)</p>
                  </div>
                </div>
                <div className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30"><div className="flex items-center justify-center gap-2 text-center"><Users className="w-4 h-4 text-[#CDAC77]" /><p className="text-[#402921]">Eloida Ricohermoso</p></div></div>
              </div>
            </div>
            <div>
              <div className="text-center mb-3 sm:mb-4"><h4 className="text-base sm:text-lg font-semibold text-[#FFF6E7]">Parents of the Groom</h4></div>
              <div className="space-y-2">
                <div className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30">
                  <div className="flex flex-col items-center justify-center text-center gap-0.5">
                    <div className="flex items-center justify-center gap-2"><Users className="w-4 h-4 text-[#CDAC77]" /><p className="text-[#402921]">Perry Ticbaen</p></div>
                    <p className="text-xs text-[#583016]/80">(Brother)</p>
                  </div>
                </div>
                <div className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30"><div className="flex items-center justify-center gap-2 text-center"><Users className="w-4 h-4 text-[#CDAC77]" /><p className="text-[#402921]">Felicitas Ticbaen</p></div></div>
              </div>
            </div>
          </div>

       
          <div className="flex justify-center py-4">
            <div className="h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-white/90 rounded-xl p-4 border border-[#BB8A3D]/30">
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <div className="flex items-center justify-center gap-2"><Crown className="w-4 h-4 text-[#BB8A3D]" /><p className="text-[#402921] font-semibold">Imeeliza Timpug</p></div>
                <p className="text-xs sm:text-sm text-[#583016]/80">Maid/Matron of Honor</p>
              </div>
            </div>
            <div className="bg-white/90 rounded-xl p-4 border border-[#BB8A3D]/30">
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <div className="flex items-center justify-center gap-2"><Crown className="w-4 h-4 text-[#BB8A3D]" /><p className="text-[#402921] font-semibold">Red Casallo</p></div>
                <p className="text-xs sm:text-sm text-[#583016]/80">Best Man</p>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-3 sm:mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-[#FFF6E7]">Bridesmaids & Groomsmen </h4>
            </div>
            {(() => {
              const bridesmaids = [
                "Thea Lynn Dela Cruz",
                "Keara Zane A Cariño",
                "Fidnah Gracia Padallan",
                "Lorna Ladisla",
                "Carla Vanessa Tabilin",
                "Romela Tolentino",
                "Emmalyn Lipio",
                "Carmen Pascual",
                "Ciddie Manota",
              ]
              const groomsmen = [
                "Noah Alcaria",
                "Jervin Garcia",
                "Myric Mateo",
                "Caughvan Faustino",
                "Jayson Torquiano",
                "Jendah Egino",
                "Vincent Saguinsin",
                "Frederick Manota",
                "Emerson Sulit",
              ]
              const maxLen = Math.max(bridesmaids.length, groomsmen.length)
              return (
                <div className="space-y-1.5 sm:space-y-2">
                  {Array.from({ length: maxLen }).map((_, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {bridesmaids[i] && (
                        <div className="group bg-white/90 rounded-lg p-3 sm:p-3.5 border border-[#BB8A3D]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#BB8A3D]/60">
                          <div className="flex items-center justify-center gap-2 text-center">
                            <Users className="w-4 h-4 text-[#CDAC77]" />
                            <p className="text-[#402921] text-sm sm:text-base transition-colors duration-300 group-hover:text-[#BB8A3D]">{bridesmaids[i]}</p>
                          </div>
                        </div>
                      )}
                      {groomsmen[i] && (
                        <div className="group bg-white/90 rounded-lg p-3 sm:p-3.5 border border-[#BB8A3D]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#BB8A3D]/60">
                          <div className="flex items-center justify-center gap-2 text-center">
                            <Users className="w-4 h-4 text-[#CDAC77]" />
                            <p className="text-[#402921] text-sm sm:text-base transition-colors duration-300 group-hover:text-[#BB8A3D]">{groomsmen[i]}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>

          <div className="space-y-4">
            <div className="text-center"><h4 className="text-base sm:text-lg font-semibold text-[#FFF6E7]">Secondary Sponsors</h4></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/90 rounded-xl p-3 sm:p-4 border border-[#BB8A3D]/30 text-center">
                <p className="text-[#402921] font-semibold mb-2 text-center">Candle Sponsors</p>
                <ul className="space-y-1">
                  <li className="text-[#402921] flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-[#BB8A3D]" /><span>Romela Tolentino</span></li>
                </ul>
              </div>
              <div className="bg-white/90 rounded-xl p-3 sm:p-4 border border-[#BB8A3D]/30 text-center">
                <p className="text-[#402921] font-semibold mb-2 text-center">Veil Sponsors</p>
                <ul className="space-y-1">
                  <li className="text-[#402921] flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-[#BB8A3D]" /><span>Carla Vanessa Tabilin</span></li>
                </ul>
              </div>
              <div className="bg-white/90 rounded-xl p-3 sm:p-4 border border-[#BB8A3D]/30 text-center">
                <p className="text-[#402921] font-semibold mb-2 text-center">Cord Sponsors</p>
                <ul className="space-y-1">
                  <li className="text-[#402921] flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-[#BB8A3D]" /><span>Emmalyn Lipio</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-4"><h4 className="text-lg font-semibold text-[#FFF6E7]">Flower Girls</h4></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Kirsten Elija Leyson",
                "Blake Juan",
                "Reign Arastel Rivera",
                "Paige Yael Ticbaen (Little Bride)",
              ].map((name) => (
                <div key={name} className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30"><div className="flex items-center justify-center gap-2 text-center"><Flower2 className="w-4 h-4 text-[#BB8A3D]" /><p className="text-[#402921]">{name}</p></div></div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-4"><h4 className="text-lg font-semibold text-[#FFF6E7]">Ring/ Coin Bearers</h4></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "Khaleb Dwayne M. Beltran",
                "Lucas Rhaiden Beltran",
                "Dean James Ticbaen",
              ].map((name) => (
                <div key={name} className="bg-white/90 rounded-lg p-3 border border-[#BB8A3D]/30"><div className="flex items-center justify-center gap-2 text-center"><Crown className="w-4 h-4 text-[#CDAC77]" /><p className="text-[#402921]">{name}</p></div></div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-4"><h4 className="text-lg font-semibold text-[#FFF6E7]">Readers (1st Reading, Responsorial, Prayers of the Faithful)</h4></div>
            <div className="bg-white/90 rounded-xl p-4 border border-[#BB8A3D]/30">
              <div className="flex items-center justify-center gap-2 text-center">
                <Sparkles className="w-4 h-4 text-[#BB8A3D]" />
                <p className="text-[#402921]">Mrs. Alda Unidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
