"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    // Validate guest count if attending
    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Please enter the number of guests (minimum 1)")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative z-30 py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          RSVP
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-4 sm:mb-5">
          Please search for your name below to confirm your attendance
        </p>
        
        {/* Deadline and Contact Information */}
        <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto px-2">
          <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
            Kindly respond on or before the 20th day of November, 2025
          </p>
          <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
            concerns : contact Edlin Mae Cellona : 09399038910 or email: emaecellona@gmail.com
          </p>
        </div>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 overflow-visible">
        {/* Card with elegant border */}
        <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md border-2 border-[#A78256]/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-visible">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-5 md:p-6 overflow-visible">
            <div className="relative z-10 space-y-4 overflow-visible">
              <div className="flex items-center gap-3">
                <div className="bg-[#A78256] p-2 rounded-lg shadow-md">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-[#A78256] font-sans mb-1">
                    Find Your Name
                  </label>
                  <p className="text-xs text-[#B28383] font-sans">
                    Type as you search to see instant results
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative z-[100]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A78256]/60 pointer-events-none transition-colors duration-200" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 hover:border-[#A78256]/60 focus:ring-2 focus:ring-[#A78256]/20 bg-white shadow-sm focus:shadow-md"
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-[9999] w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border border-[#B38538]/30 rounded-lg sm:rounded-xl shadow-xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      left: 0,
                      right: 0
                    }}
                  >
                      {filteredGuests.map((guest, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(guest)}
                          className="w-full px-3 py-2.5 text-left hover:bg-[#EDD6AC]/20 active:bg-[#EDD6AC]/30 transition-all duration-200 flex items-center gap-3 border-b border-[#C2D3C3]/20 last:border-b-0 group"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="bg-[#A78256] p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                              <User className="h-3.5 w-3.5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-[#A78256] group-hover:text-[#B28383] transition-colors duration-200 truncate">
                              {guest.Name}
                            </div>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="text-xs text-[#B28383]/70 truncate mt-0.5">
                                {guest.Email}
                              </div>
                            )}
                          </div>
                          <div className="text-[#A78256]/40 group-hover:text-[#A78256] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-[9999] w-full mt-2 bg-white/95 backdrop-blur-lg border-2 border-[#A78256]/30 rounded-lg shadow-xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      left: 0,
                      right: 0
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-[#A78256] p-2 rounded-lg flex-shrink-0 shadow-sm">
                          <UserPlus className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-[#A78256] mb-1">Not finding your name?</h4>
                          <p className="text-xs text-[#B28383] leading-relaxed">
                            We'd love to have you with us! Send a request to join the celebration.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full bg-[#A78256] hover:bg-[#B28383] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <UserPlus className="h-3 w-3 mr-2 inline" />
                        Request to Join
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-lg mx-2 sm:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/30 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-[#A78256] p-4 sm:p-5 md:p-6 flex-shrink-0">
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white truncate">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-tight sm:leading-normal">
                      Hello <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-1 sm:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 min-h-0">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-4 sm:py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#EDD6AC] rounded-full mb-3 sm:mb-4">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#A78256] mb-2 sm:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#B28383] text-xs sm:text-sm mb-3 sm:mb-4 px-2">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-[#EDD6AC]/20 rounded-lg p-3 sm:p-4 border border-[#A78256]/20 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            <span className="text-sm sm:text-base font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                            <span className="text-sm sm:text-base font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                        <div className="bg-[#EDD6AC]/30 rounded-lg p-2.5 sm:p-3 border border-[#A78256]/30">
                          <div className="text-center">
                            <p className="text-xs text-[#B28383] mb-1 font-medium">Number of Guests</p>
                            <p className="text-xl sm:text-2xl font-bold text-[#A78256]">
                              {selectedGuest.Guest || "1"}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="pt-2 border-t border-[#A78256]/20">
                          <p className="text-xs text-[#B28383] italic px-1">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleCloseModal}
                      className="mt-4 sm:mt-6 bg-[#A78256] hover:bg-[#B28383] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Can you attend? */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans">
                        <Sparkles className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                        <span>Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                          className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-500 bg-green-50 shadow-md scale-105"
                              : "border-[#C2D3C3]/40 bg-white hover:border-[#A78256]/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle
                              className={`h-5 w-5 flex-shrink-0 ${
                                formData.RSVP === "Yes" ? "text-green-600" : "text-[#A78256]/40"
                              }`}
                            />
                            <span
                              className={`text-sm font-bold ${
                                formData.RSVP === "Yes"
                                  ? "text-green-600"
                                  : "text-[#A78256]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-md scale-105"
                              : "border-[#C2D3C3]/40 bg-white hover:border-[#A78256]/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <XCircle
                              className={`h-5 w-5 flex-shrink-0 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#A78256]/40"
                              }`}
                            />
                            <span
                              className={`text-sm font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#A78256]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Number of Guests - Only show when RSVP is "Yes" */}
                    {formData.RSVP === "Yes" && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans">
                          <User className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                          <span>Number of Guests *</span>
                        </label>
                        <input
                          type="number"
                          name="Guest"
                          value={formData.Guest}
                          onChange={handleFormChange}
                          min="1"
                          required
                          placeholder="How many guests?"
                          className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                        />
                      </div>
                    )}

                    {/* Message to the couple */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans">
                        <MessageSquare className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                        <span>Your Message to the Couple</span>
                        <span className="text-xs font-normal text-[#B28383]">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement..."
                        rows={3}
                        className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 resize-none bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans flex-wrap">
                        <Mail className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                        <span>Your Email Address</span>
                        <span className="text-xs font-normal text-[#B28383]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#A78256] hover:bg-[#B28383] text-white py-2.5 sm:py-3 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Submit RSVP</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Enhanced Success Overlay */}
              {success && (
                <div className="absolute inset-0 bg-[#A78256]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[#A78256]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-1.5 mb-3">
                        <p className="text-white/95 text-sm font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-white/80 text-xs">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-white/90 text-sm mb-3">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-white/90 text-sm mb-3">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-xs">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !success && (
                <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-lg mx-2 sm:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/30 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-[#A78256] p-4 sm:p-5 md:p-6 flex-shrink-0">
                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white truncate">
                        Request to Join
                      </h3>
                    </div>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base font-sans leading-tight sm:leading-normal">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                      ) : (
                        <>Want to celebrate with us? Send a request!</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 min-h-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans">
                      <User className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans flex-wrap">
                      <Mail className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                      <span>Email Address</span>
                      <span className="text-xs font-normal text-[#B28383]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans flex-wrap">
                      <Phone className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                      <span>Phone Number</span>
                      <span className="text-xs font-normal text-[#B28383]">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans">
                      <User className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                      <span>Number of Guests *</span>
                    </label>
                    <input
                      type="number"
                      name="Guest"
                      value={requestFormData.Guest}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                      min="1"
                      required
                      placeholder="How many guests?"
                      className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#A78256] mb-2 font-sans flex-wrap">
                      <MessageSquare className="h-4 w-4 text-[#A78256] flex-shrink-0" />
                      <span>Message</span>
                      <span className="text-xs font-normal text-[#B28383]">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join..."
                      rows={3}
                      className="w-full px-3 py-2 border-2 border-[#C2D3C3]/40 focus:border-[#A78256] rounded-lg text-sm font-sans text-[#A78256] placeholder:text-[#B28383]/50 transition-all duration-300 focus:ring-2 focus:ring-[#A78256]/20 resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#A78256] hover:bg-[#B28383] text-white py-2.5 sm:py-3 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          <span className="text-sm">Send Request</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-[#A78256]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                  <div className="text-center p-4 sm:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[#A78256]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                      Request Sent!
                    </h4>
                    
                    {/* Message */}
                    <div className="space-y-1.5 mb-3">
                      <p className="text-white/95 text-sm font-medium">
                        We've received your request
                      </p>
                      <p className="text-white/85 text-xs">
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-xs">
                        This will close automatically
                      </p>
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !requestSuccess && (
                <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-sm sm:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
