"use client"


export function Entourage() {
  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#BB8A3D] mb-4 sm:mb-6 text-center tracking-wide">
      {children}
    </h3>
  )

  // Helper component for name items
  const NameItem = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center py-2 sm:py-2.5">
      <p className="text-[#FFF6E7] text-sm sm:text-base font-light text-center">{name}</p>
    </div>
  )

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 mb-4 sm:mb-6">
          {leftTitle && (
            <SectionTitle>{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle>{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      {/* Decorative background elements for motif cohesion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating geometric shapes */}
        <div className="hidden sm:block absolute top-8 left-6 w-24 h-24 bg-[#BB8A3D]/10 rounded-full blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-10 w-20 h-20 bg-[#CDAC77]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-16 left-10 w-28 h-28 bg-[#BB8A3D]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="sm:hidden absolute top-6 right-6 w-14 h-14 bg-[#CDAC77]/12 rounded-full blur-lg" />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/35 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/30 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tl-3xl" />
        
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 sm:w-44 md:w-56 lg:w-64 opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-70 rotate-180 select-none"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
            <div className="w-1 h-1 bg-[#FFF6E7] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">Wedding Entourage</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#BB8A3D]/20 blur-2xl -z-10">Wedding Entourage</span>
        </h2>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#BB8A3D] mb-3 sm:mb-4">
          Organizational Chart
        </h3>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
        </div>
      </div>

      {/* Enhanced entourage content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {/* The Couple */}
          <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
            <div className="flex flex-col items-center">
              <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Bride</p>
              <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">Erda Ricohermoso</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Groom</p>
              <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">Russell Ticbaen</p>
            </div>
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Parents of the Bride and Groom */}
          <TwoColumnLayout leftTitle="Parents of the Bride" rightTitle="Parents of the Groom">
            <div className="space-y-3">
              <NameItem name="Federico Ricohermoso (+)" />
              <NameItem name="Eloida Ricohermoso" />
            </div>
            <div className="space-y-3">
              <NameItem name="Valentine Moyongan Ticbaen (+)" />
              <NameItem name="Felicitas Ticbaen" />
            </div>
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Maid/Matron of Honor and Best Man */}
          <TwoColumnLayout leftTitle="Maid/Matron of Honor" rightTitle="Best Man">
            <div>
              <NameItem name="Imeeliza Timpug" />
            </div>
            <div>
              <NameItem name="Red Casallo" />
            </div>
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Bridesmaids and Groomsmen */}
          <TwoColumnLayout leftTitle="Bridesmaids" rightTitle="Groomsmen">
            <div className="space-y-3">
              {[
                "Thea Lynn Dela Cruz",
                "Keara Zane A Cariño",
                "Fiona Padallan",
                "Lorna Ladisla",
                "Carmen Pascual",
                "Ciodie Manota",
              ].map((name, idx) => (
                <NameItem key={idx} name={name} />
              ))}
            </div>
            <div className="space-y-3">
              {[
                "Myric Mateo",
                "Jayson Torquiano",
                "Jenoh Egino",
                "Vincent Saguinsin",
                "Frederick Manota",
                "Emerson Sulit",
              ].map((name, idx) => (
                <NameItem key={idx} name={name} />
              ))}
            </div>
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Candle Sponsors and Veil Sponsors */}
          <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
            <div className="space-y-3">
              <NameItem name="Romela Tolentino" />
              <NameItem name="Noah Alcaria" />
            </div>
            <div className="space-y-3">
              <NameItem name="Carla Vanessa Tabilin" />
              <NameItem name="Jervin Garcia" />
            </div>
          </TwoColumnLayout>

          {/* Cord Sponsors */}
          <TwoColumnLayout singleTitle="Cord Sponsors" centerContent={true}>
            <div>
              <NameItem name="Emmalyn Lipio" />
            </div>
            <div>
              <NameItem name="Caughvan Faustino" />
            </div>
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Flower Girls */}
          <TwoColumnLayout singleTitle="Flower Girls" centerContent={true}>
            {[
              "Kirsten Elija Leyson",
              "Blake Juan",
              "Reign Arastel Rivera",
              "Paige Yael Ticbaen (Little Bride)",
            ].map((name, idx) => (
              <div key={idx}>
                <NameItem name={name} />
              </div>
            ))}
          </TwoColumnLayout>

          {/* Ring/Coin Bearers */}
          <TwoColumnLayout singleTitle="Ring/Coin Bearers" centerContent={true}>
            {[
              "Khaleb Dwayne M. Beltran",
              "Lucas Rhaiden Beltran",
              "Dean James Ticbaen",
            ].map((name, idx) => (
              <div key={idx}>
                <NameItem name={name} />
              </div>
            ))}
          </TwoColumnLayout>

          {/* Divider */}
          <div className="flex justify-center py-4 mb-8">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
          </div>

          {/* Readers */}
          {/* <div className="mb-8 sm:mb-10 md:mb-12">
            <SectionTitle>Readers (1st Reading, Responsorial, Prayers of the Faithful)</SectionTitle>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <NameItem name="Mrs. Alda Unidad" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
