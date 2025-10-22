import { Section } from "@/components/section"
import { principalSponsors } from "@/content/site"

export function PrincipalSponsors() {
  return (
    <section id="sponsors" className="relative py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#9caf88' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
            Principal Sponsors
          </h2>
 
          <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
            Our Beloved Godparents
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {principalSponsors.map((sponsor, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl p-4 sm:p-6 text-center hover:shadow-xl hover:border-white/50 hover:bg-white transition-all duration-300 hover:-translate-y-2 group"
            >
              <p className="text-xs sm:text-sm font-sans text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {sponsor.name}
              </p>
              <p className="text-xs sm:text-sm font-sans text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {sponsor.spouse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
