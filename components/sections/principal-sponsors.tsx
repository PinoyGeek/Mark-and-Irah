"use client"


export function PrincipalSponsors() {
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

  // Parse sponsor data from the provided list
  const sponsors = [
    { name: "Honorable Mayor Roderick Awingan", spouse: "Mrs. November Awingan" },
    { name: "Engr. Roy Kepes", spouse: "Vice Gov. Mary Rose Kepes Fongwan" },
    { name: "Councilor Nestor Fongwan, Jr.", spouse: "Mrs. Alda Unidad" },
    { name: "Rev. Pastor Cresente Faustino", spouse: "Mrs. Cecilia Panlilio" },
    { name: "Kagawad Joseph Aliado", spouse: "Mrs. Araceli Pitogo" },
    { name: "Mr. Pio Macliing", spouse: "Dra. Edna Coloma" },
    { name: "Mr. Cresencio Francisco", spouse: "Dr. Editha Francisco" },
    { name: "Mr. Aurelio Sab-it", spouse: "Mrs. Ester Sab-it" },
    { name: "Mr. Fabian Dupiano", spouse: "Mrs. Mary Christine Dupiano" },
    { name: "Mr. Roberto Dosdos", spouse: "Mrs. Angelica Dosdos" },
    { name: "Mr. George Sacla", spouse: "Mrs. Minda De Bolt Sacla" },
    { name: "Mr. Elmo Casallo", spouse: "Mrs. Nora Casallo" },
    { name: "Engr. Jimmy Atayoc Sr", spouse: "Mrs. Mercedes Atayoc" },
    { name: "Mr. Tomas Moyongan", spouse: "Mrs. Betty Moyongan" },
    { name: "Mr. Roger Balantin", spouse: "Mrs. Delia Balantin" },
    { name: "Mr. Jony Balao", spouse: "Mrs. Conception Balao" },
    { name: "Mr. Pampilo Balajadia", spouse: "Mrs. Angela Balajadia" },
    { name: "Mr. Junvic Suguinsin", spouse: "Mrs. Nida Saguinsin" },
    { name: "Mr. Alan M. Serduar", spouse: "Mrs. Oliva Serduar" },
    { name: "Mr. Peter Ticbaen", spouse: "Mrs. Carina C. Watanabe" },
    { name: "Mr. Salino Dosdos Jr", spouse: "Mrs. Angelica Balajadia" },
    { name: "Mr. Miguel Franco", spouse: "Mrs. Marga Sison" },
    { name: "Mr. Eduardo Dosdos", spouse: "Mrs. Lavenia Inson" },
    { name: "Mr. Ronald Plumos", spouse: "Mrs. Gina Guiang" },
    { name: "Mr. Roger Mateo", spouse: "Mrs. Reine Bernadeth Bolano" },
  ]

  return (
    <section 
      id="sponsors" 
      className="relative bg-gradient-to-b from-[#402921] via-[#583016] to-[#402921] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#BB8A3D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#CDAC77]/15 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#BB8A3D]/8 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse delay-500" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/25 to-transparent" />
        
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
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

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-6 text-balance drop-shadow-lg relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">Principal Sponsors</span>
          {/* Text glow effect */}
        </h2>

          <p className="text-lg md:text-xl text-[#FFF6E7] font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
            Our Beloved Godparents
          </p>

          {/* Bottom decorative ornaments */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
            <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          </div>
        </div>

        {/* Sponsors in Two-Column Layout */}
        <div className="max-w-5xl mx-auto">
          <TwoColumnLayout singleTitle="Principal Sponsors">
            <div className="space-y-3">
              {sponsors.map((sponsor, idx) => (
                <div key={idx}>
                  <NameItem name={sponsor.name} />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {sponsors.map((sponsor, idx) => (
                <div key={idx}>
                  {sponsor.spouse ? (
                    <NameItem name={sponsor.spouse} />
                  ) : (
                    <div className="py-2 sm:py-2.5"></div>
                  )}
                </div>
              ))}
            </div>
          </TwoColumnLayout>
        </div>
      </div>
    </section>
  )
}
