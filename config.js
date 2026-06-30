/* ============================================================
   WEDDING CONFIG — edit everything about the wedding here.
   Nothing in the rest of the codebase should be hardcoded.
   ============================================================ */

const WEDDING_CONFIG = {

  couple: {
    bride:  { name: "Ananya",  full: "Ananya Raghunathan", initial: "A" },
    groom:  { name: "Vivaan",  full: "Vivaan Malhotra",    initial: "V" },
    hashtag: "#VivaanWedsAnanya",
  },

  wedding: {
    // ISO date used by the countdown + calendar links
    dateISO:      "2026-12-12T17:30:00+05:30",
    dateLabel:    "12th December 2026",
    timeLabel:    "5:30 PM onward",
    venueName:    "The Leela Palace",
    venueAddress: "Lakefront Road, Sector 9, Udaipur, Rajasthan — 313 001",
    mapsUrl:      "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
    city:         "Udaipur, Rajasthan",
    rsvpDeadline: "1st November 2026",
  },

  theme: {
    colors: {
      emerald:     "#0B3D2E",
      emeraldDeep: "#072A20",
      gold:        "#C9A227",
      goldLight:   "#E8C766",
      ivory:       "#F8F1E1",
      maroon:      "#7A1F2B",
      midnight:    "#0A0A12",
    },
  },

  // -------- Royal Palace Journey rooms --------
  rooms: [
    {
      id:          "haldi",
      emoji:       "🌼",
      title:       "Haldi Courtyard",
      subtitle:    "A golden morning of marigolds & turmeric blessings",
      date:        "10th December 2026 · 10:00 AM",
      venue:       "Sunken Courtyard, The Leela Palace",
      dressCode:   "Yellow Ethnic",
      accent:      "#D9A52B",
      bg:          "linear-gradient(160deg,rgba(244,201,75,0.55) 0%,rgba(217,150,43,0.65) 55%,rgba(154,91,23,0.75) 100%)",
      bgImage:     "assets/bg_feast.png",
      description: "The air is thick with marigold and the bright sting of turmeric. Brass urns overflow; dholak rhythms spill across the sunken courtyard. Elders take turns smearing the paste — part blessing, part mischief — while the bride and groom try, and fail, to stay dignified. This is where the wedding truly begins.",
    },
    {
      id:          "mehendi",
      emoji:       "🌿",
      title:       "Mehendi Garden",
      subtitle:    "Henna trails through a Mughal garden at dusk",
      date:        "10th December 2026 · 4:00 PM",
      venue:       "The Mughal Lawn, The Leela Palace",
      dressCode:   "Green Floral",
      accent:      "#3E7D4C",
      bg:          "linear-gradient(160deg,rgba(127,184,118,0.50) 0%,rgba(62,125,76,0.62) 55%,rgba(22,59,34,0.78) 100%)",
      bgImage:     "assets/bg_love_story.png",
      description: "Latticed archways frame a garden lit warm by lanterns. On low cushioned seats, artists trace stories into skin — paisley, lotus, the couple's names hidden somewhere in the pattern. Find them, and you win something. The evening moves slowly, the way beautiful evenings always do.",
    },
    {
      id:          "cocktail",
      emoji:       "🍸",
      title:       "Cocktail Night",
      subtitle:    "Skyline glitter, signature pours, and a DJ with no requests",
      date:        "10th December 2026 · 9:00 PM",
      venue:       "Skyline Rooftop, The Leela Palace",
      dressCode:   "Black & Gold",
      accent:      "#C9A227",
      bg:          "linear-gradient(160deg,rgba(43,35,48,0.52) 0%,rgba(21,16,28,0.62) 55%,rgba(7,5,9,0.78) 100%)",
      bgImage:     "assets/bg_thankyou.png",
      description: "Udaipur shimmers forty feet below. On the rooftop bar, two cocktails are being poured — one named Vivaan, one named Ananya. We'll let you find out which is which. The DJ has a setlist and a strong opinion about it. Dress sharp. Dance shamelessly.",
    },
    {
      id:          "sangeet",
      emoji:       "🎵",
      title:       "Sangeet Ballroom",
      subtitle:    "Chandeliers, choreography & beautiful chaos",
      date:        "11th December 2026 · 7:00 PM",
      venue:       "The Grand Ballroom, The Leela Palace",
      dressCode:   "Royal Blue",
      accent:      "#2A4FA0",
      bg:          "linear-gradient(160deg,rgba(42,79,160,0.52) 0%,rgba(21,39,90,0.62) 55%,rgba(7,12,36,0.78) 100%)",
      bgImage:     "assets/bg_families.png",
      description: "Crystal chandeliers. An LED dance floor. Both families have been rehearsing in secret for weeks — and tonight, the rivalry resolves in performance. There will be Bollywood. There will be tears of laughter. And somewhere near the end, the couple will take the stage and remind everyone why we're all here.",
    },
    {
      id:          "mandap",
      emoji:       "💍",
      title:       "Wedding Mandap",
      subtitle:    "Sacred fire, seven vows, one glorious beginning",
      date:        "12th December 2026 · 5:30 PM",
      venue:       "The Lakeside Mandap, The Leela Palace",
      dressCode:   "Traditional Indian",
      accent:      "#9A1F2B",
      bg:          "linear-gradient(160deg,rgba(192,57,43,0.52) 0%,rgba(122,31,43,0.62) 55%,rgba(46,10,16,0.78) 100%)",
      bgImage:     "assets/hero_bg.png",
      description: "The lake is still. Temple bells call the hour. Rose petals carpet the mandap aisle, and the sacred fire — lit at precisely the right moment — has been witness to every true vow made here. When the seven circles are complete, two people will have made one home. Every other moment has been pointing here.",
    },
    {
      id:          "reception",
      emoji:       "🥂",
      title:       "Reception Evening",
      subtitle:    "A five-star toast to a lifetime of forever",
      date:        "13th December 2026 · 8:00 PM",
      venue:       "The Grand Banquet Hall, The Leela Palace",
      dressCode:   "Black Tie",
      accent:      "#C9A227",
      bg:          "linear-gradient(160deg,rgba(59,46,19,0.52) 0%,rgba(28,22,7,0.62) 55%,rgba(7,5,1,0.78) 100%)",
      bgImage:     "assets/bg_venue.png",
      description: "Golden light on every surface. A live pianist sets the tone. Champagne rises in tall flutes and catches the chandelier on its way up. This is the couple's first public moment as husband and wife — and we want you there when they walk in. Black tie is not optional. Dancing is.",
    },
    {
      id:          "vidai",
      emoji:       "🌅",
      title:       "Vidai",
      subtitle:    "Every ending is the most beautiful beginning",
      date:        "13th December 2026 · 11:30 PM",
      venue:       "The Palace Gate, The Leela",
      dressCode:   "—",
      accent:      "#B98A2E",
      bg:          "linear-gradient(160deg,rgba(231,166,90,0.52) 0%,rgba(138,74,34,0.62) 55%,rgba(43,22,10,0.78) 100%)",
      bgImage:     "assets/bg_thankyou.png",
      description: "Under a scatter of stars, with flower petals and family prayers trailing behind her, the bride steps forward into her new life. It is the oldest ceremony of all — a goodbye that is also a hello. Bring flowers. Bring a handkerchief. Bring everything you have.",
    },
  ],

  // -------- Love Story timeline --------
  loveStory: [
    {
      year:  "2019",
      title: "The First Meeting",
      text:  "A mutual friend's birthday. A glass of wine spilled at the worst possible moment. An apology that stretched into a conversation neither of us wanted to end. We left three hours after everyone else.",
    },
    {
      year:  "2020",
      title: "Something More",
      text:  "The world went quiet, and somehow that made it easier to be honest. Late-night calls stretched into early mornings. Somewhere in the long silences between sentences, 'just friends' quietly stopped fitting.",
    },
    {
      year:  "2021",
      title: "The First Trip",
      text:  "Goa in December. Terrible weather, a flooded scooter, a guesthouse that was nothing like the photos. We laughed until it hurt and quietly agreed: this is the person. This is exactly the person.",
    },
    {
      year:  "2022",
      title: "The Proposal",
      text:  "A hilltop in Udaipur. Sunset arriving right on cue. A ring that took four jewellers, two revisions, and one very nervous call to your father. She said yes before he finished the sentence.",
    },
    {
      year:  "2023",
      title: "The Engagement",
      text:  "Two families, one very long lunch, and a roka ceremony that went four hours past schedule. No one minded. The aunties cried. Someone brought too much mithai. It was perfect.",
    },
    {
      year:  "2026",
      title: "The Wedding",
      text:  "Every stumble, every late-night call, every imperfect ordinary day has been building toward this week. We are so grateful you will be here to witness it — and to help us celebrate.",
    },
  ],

  families: [
    {
      side:     "Bride's Family",
      initial:  "R",
      father:   "Mr. Rajesh Raghunathan",
      mother:   "Mrs. Sunita Raghunathan",
      note:     "Parents of the Bride",
      city:     "Chennai, Tamil Nadu",
      blessing: "May this union be blessed with love, laughter, and a lifetime of joy.",
    },
    {
      side:     "Groom's Family",
      initial:  "M",
      father:   "Mr. Anil Malhotra",
      mother:   "Mrs. Kavita Malhotra",
      note:     "Parents of the Groom",
      city:     "New Delhi",
      blessing: "We welcome Ananya into our family with open arms and full hearts.",
    },
  ],

  gallery: [
    { caption: "The proposal, Udaipur hilltop" },
    { caption: "Roka ceremony, Chennai" },
    { caption: "Engagement evening, Delhi" },
    { caption: "Goa, December 2021" },
    { caption: "First Diwali together, 2020" },
    { caption: "Family lunch — the big introduction" },
    { caption: "Sangeet rehearsal (spy photo)" },
    { caption: "The ring, finally on her finger" },
  ],

  film: {
    title:    "Our Pre-Wedding Film",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },

  menu: {
    "Haldi Morning": {
      Vegetarian:       ["Kachori Chaat", "Dahi Bhalla", "Pyaaz Kachori", "Aloo Tikki"],
      Beverages:        ["Fresh Sugarcane Juice", "Nimbu Pani", "Thandai"],
      Desserts:         ["Gulab Jamun", "Ghewar", "Malpua"],
    },
    "Mehendi Garden": {
      Vegetarian:       ["Paneer Tikka", "Dhokla", "Hara Bhara Kebab"],
      Beverages:        ["Mojito Live Counter", "Aam Panna", "Rose Sharbat"],
      Desserts:         ["Falooda", "Kulfi", "Shahi Tukda"],
    },
    "Wedding Feast": {
      Vegetarian:       ["Dal Makhani", "Paneer Lababdar", "Sarson ka Saag", "Live Chaat Counter"],
      "Non-Vegetarian": ["Mutton Rogan Josh", "Butter Chicken", "Seekh Kebab"],
      Breads:           ["Butter Naan", "Laccha Paratha", "Missi Roti"],
      Desserts:         ["Rasmalai", "Live Jalebi Counter", "Phirni"],
    },
    "Reception Gala": {
      Vegetarian:       ["Truffle Risotto", "Stuffed Portobello", "Mezze Platter"],
      "Non-Vegetarian": ["Tenderloin with Jus", "Tandoori Lobster", "Seared Salmon"],
      Desserts:         ["Chocolate Fountain", "French Patisserie Counter", "Rabri Tart"],
    },
  },

  dressCode: {
    Male: {
      Haldi:     "Yellow or saffron kurta-pyjama",
      Mehendi:   "Emerald or sage bandhgala",
      Cocktail:  "Black tuxedo, gold accessories",
      Sangeet:   "Royal blue sherwani",
      Wedding:   "Cream or ivory sherwani with gold dupatta",
      Reception: "Classic black tie",
    },
    Female: {
      Haldi:     "Yellow lehenga or salwar suit",
      Mehendi:   "Green anarkali or lehenga",
      Cocktail:  "Black & gold gown or saree",
      Sangeet:   "Royal blue or cobalt lehenga",
      Wedding:   "Red & gold traditional lehenga",
      Reception: "Formal evening gown or saree",
    },
    Kids: {
      All: "Pastel ethnic wear — comfort is key!",
    },
    palette: ["#D9A52B", "#3E7D4C", "#0A0A12", "#2A4FA0", "#9A1F2B", "#C9A227"],
    paletteLabels: ["Haldi Gold", "Mehendi Green", "Cocktail Noir", "Sangeet Royal", "Maroon", "Gold"],
  },

  rsvp: {
    formAction: null, // hook up to a backend / Formspree / etc. if desired
  },

  venue: {
    phone:   "+91 294 670 1234",
    website: "https://www.theleela.com/udaipur",
    parking: "Complimentary valet parking is available at the main Palace Gate. Self-parking is also available in the North courtyard.",
    travel:  "Maharana Pratap Airport (UDR) is 25 km away. The Palace arranges luxury transfers — please contact concierge in advance.",
  },

  hosts: {
    note: "Hosted with love by the Raghunathan & Malhotra families",
  },

};

// Freeze so nothing downstream accidentally mutates shared config
Object.freeze(WEDDING_CONFIG);
