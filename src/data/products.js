export const PRODUCTS = [
  {
    id: 'us-01',
    name: 'Phantom Stealth Runner',
    series: 'Apex Series 01',
    category: 'Men',
    subcategory: 'Performance Running',
    price: 7499,
    originalPrice: 9999,
    rating: 4.9,
    reviewsCount: 142,
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    description: 'Constructed with aerospace-grade carbon fiber shank and dual-density supercritical foam midsole. Engineered for urban sprints, marathon endurance, and futuristic street styling.',
    features: [
      'Dual-density Supercritical SoleTech™ foam',
      'Ultra-breathable micro-knit engineered upper',
      'High-traction directional rubber outsole',
      'Reflective 3M heel counter for low-light runs',
      'Ergonomic anatomical heel cup'
    ],
    specs: {
      sole: 'Carbon-infused SoleTech™ Foam',
      upper: 'Recycled Poly-Mesh Knit',
      weight: '245 grams (UK 8)',
      origin: 'Designed in Mumbai, Engineered in Italy'
    },
    colors: [
      { name: 'Onyx Carbon', hex: '#111111' },
      { name: 'Stone Beige', hex: '#D7CEC7' },
      { name: 'Chalk White', hex: '#F0EFEA' }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-02',
    name: 'AeroStrata Minimalist Trainer',
    series: 'Studio Line',
    category: 'Women',
    subcategory: 'Lifestyle Sneakers',
    price: 6299,
    originalPrice: 7999,
    rating: 4.8,
    reviewsCount: 98,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    description: 'Clean architectural lines meet cloud-like comfort. Sculpted from buttery Italian nubuck leather and buttery soft memory insoles for flawless day-to-night transitions.',
    features: [
      'Top-grain ethically sourced buttery calf leather',
      'Custom contoured memory-foam footbed',
      'Lightweight vulcanized natural rubber sole',
      'Gold foil embossed series serial number',
      'Waxed cotton laces with metal aglets'
    ],
    specs: {
      sole: 'Vulcanized Natural Gum Rubber',
      upper: 'Ethical Full-Grain Leather',
      weight: '260 grams (UK 6)',
      origin: 'Handcrafted in Florence & Agra'
    },
    colors: [
      { name: 'Desert Sand', hex: '#C5B49E' },
      { name: 'Pure Chalk', hex: '#FAF9F6' },
      { name: 'Midnight Charcoal', hex: '#232323' }
    ],
    sizes: [5, 6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-03',
    name: 'Vortex Quantum Court',
    series: 'Court Lab',
    category: 'Sports',
    subcategory: 'Basketball & Court',
    price: 8999,
    originalPrice: 11499,
    rating: 4.9,
    reviewsCount: 185,
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    description: 'Engineered for aggressive multidirectional lateral cuts and maximum vertical explosion. Featuring our responsive AirPiston cushioning unit and reinforced TPU sidewall cage.',
    features: [
      'AirPiston dynamic rebound sole chamber',
      'TPU external heel counter for locked-in stability',
      'Herringbone high-friction indoor/outdoor traction',
      'Padded neoprene bootie for sock-like lockdown',
      'Anti-abrasion toe bumper'
    ],
    specs: {
      sole: 'Dual-Zone AirPiston Grip Rubber',
      upper: 'Ballistic Mesh & TPU Synthetic Overlays',
      weight: '340 grams (UK 9)',
      origin: 'Designed for High-Impact Athletics'
    },
    colors: [
      { name: 'Solar White / Beige', hex: '#EAE5DB' },
      { name: 'Pitch Black', hex: '#151515' },
      { name: 'Bronze Ochre', hex: '#8D6E63' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-04',
    name: 'SoleCraft Heritage Chelsea',
    series: 'Artisan Collection',
    category: 'Men',
    subcategory: 'Crafted Boots',
    price: 11499,
    originalPrice: 14999,
    rating: 4.9,
    reviewsCount: 76,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    description: 'Timeless silhouette reimagined with modern ergonomic comfort. Built from water-resistant vegetable-tanned full-grain leather, Goodyear welted with a rugged Commando rubber sole.',
    features: [
      'Vegetable-tanned full-grain pull-up leather',
      'Goodyear welt construction, fully resoleable',
      'Elastic side gusset for effortless slip-on fit',
      'Cork-filled midsole that molds to your unique feet',
      'Reinforced leather pull tabs'
    ],
    specs: {
      sole: 'Vibram Commando Lug Rubber',
      upper: '1.8mm Full-Grain Pull-Up Cowhide',
      weight: '490 grams (UK 9)',
      origin: 'Traditional Artisan Workshop'
    },
    colors: [
      { name: 'Sand Taupe Suede', hex: '#9E8B79' },
      { name: 'Espresso Brown', hex: '#3E2723' },
      { name: 'Obsidian Black', hex: '#1C1C1C' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-05',
    name: 'Velocity Junior Sprint Light',
    series: 'Young Urban',
    category: 'Kids',
    subcategory: 'Kids Athletics',
    price: 3499,
    originalPrice: 4499,
    rating: 4.7,
    reviewsCount: 64,
    isNew: true,
    isBestseller: true,
    isFeatured: false,
    description: 'Built for unstoppable playground energy and growing feet. Features rapid slip-on elastic toggle laces, impact-dampening cloud pods, and scuff-proof toe armor.',
    features: [
      'Quick-cinch speed toggle lacing system',
      'Shock-absorbing CloudPod EVA midsole',
      'Non-marking traction rubber grip',
      'Removable antimicrobial washable insole',
      'Lightweight breathable knit mesh'
    ],
    specs: {
      sole: 'Flexible Non-Marking EVA',
      upper: 'Breathable Honeycomb Mesh',
      weight: '165 grams (Kids UK 2)',
      origin: 'Designed for Active Kids'
    },
    colors: [
      { name: 'Oatmeal & Neon', hex: '#E4DDD3' },
      { name: 'Stealth Noir', hex: '#181818' },
      { name: 'Glacier Blue', hex: '#90CAF9' }
    ],
    sizes: [1, 2, 3, 4, 5],
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-06',
    name: 'Terraform Trail Climber',
    series: 'Expedition',
    category: 'Sports',
    subcategory: 'Trail & Hiking',
    price: 9499,
    originalPrice: 12499,
    rating: 4.9,
    reviewsCount: 112,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    description: 'Tackle rocky ridgelines, monsoon treks, and uneven terrains with absolute certainty. Armed with a 5mm deep multidirectional lug outsole and GoreTex-inspired HydroShield lining.',
    features: [
      'HydroShield 100% water-repellent membrane',
      'Vibram Megagrip lugged compound',
      'Integrated rock-plate puncture protection',
      'Gusseted debris-stopping tongue',
      'Reinforced Kevlar abrasion rand'
    ],
    specs: {
      sole: 'Vibram Megagrip Lug Sole',
      upper: 'Cordura Ballistic Canvas & Suede',
      weight: '380 grams (UK 9)',
      origin: 'Trek Tested in Himalayas'
    },
    colors: [
      { name: 'Dune Sand / Raw Earth', hex: '#B8A38E' },
      { name: 'Forest Shadow', hex: '#2E352A' },
      { name: 'Carbon Black', hex: '#1C1C1C' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-07',
    name: 'Eclipse Chunky Platform Sneaker',
    series: 'High-Street Atelier',
    category: 'Women',
    subcategory: 'Chunky Sneakers',
    price: 6999,
    originalPrice: 8999,
    rating: 4.8,
    reviewsCount: 123,
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    description: 'Architectural exaggerated midsole meets featherlight materials. Gives an instant 4.5cm subtle elevation while maintaining cloud-cushioned comfort for 12+ hours on your feet.',
    features: [
      '4.5cm sculpted aerodynamic platform',
      'Feather-weight microcellular EVA midsole',
      'Layered tonal leather, suede & open-mesh',
      'Padded collar and anti-slip velvet heel lining',
      'Subtle beige tone-on-tone stitching'
    ],
    specs: {
      sole: 'Ultra-Lightweight Microcellular EVA',
      upper: 'Full Leather & Plush Velour Mesh',
      weight: '290 grams (UK 6)',
      origin: 'Urban Street Lab'
    },
    colors: [
      { name: 'Warm Cream / Biscuit', hex: '#EAE1D2' },
      { name: 'Monochrome Black', hex: '#161616' },
      { name: 'Ivory Frost', hex: '#F9F8F6' }
    ],
    sizes: [5, 6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-08',
    name: 'Monolith High-Top Urbanite',
    series: 'Modernist Drop',
    category: 'Men',
    subcategory: 'High-Top Sneakers',
    price: 8499,
    originalPrice: 10999,
    rating: 4.8,
    reviewsCount: 91,
    isNew: true,
    isBestseller: false,
    isFeatured: false,
    description: 'A brutalist high-top silhouette built for winter pavements and metropolitan adventures. Featuring padded ankle pillows and a concealed inner side-zip for fast entry.',
    features: [
      'Concealed YKK side-zipper for easy wear',
      'Sculpted heel cage with embossed brand motto',
      'Rich oiled tumbled leather upper',
      'Reflective piping on ankle collar',
      'Dual-compound shock absorbing cupsole'
    ],
    specs: {
      sole: 'Reinforced Rubber Cupsole',
      upper: 'Oiled Nubuck & Calf Leather',
      weight: '390 grams (UK 9)',
      origin: 'Artisan Crafted'
    },
    colors: [
      { name: 'Pitch Matte Black', hex: '#141414' },
      { name: 'Raw Sandstone', hex: '#D2C4B3' },
      { name: 'Muted Slate', hex: '#4A4A4A' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-09',
    name: 'Zenith Studio Slip-On Mule',
    series: 'Lounge Luxury',
    category: 'Women',
    subcategory: 'Mules & Slides',
    price: 4999,
    originalPrice: 6499,
    rating: 4.7,
    reviewsCount: 52,
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    description: 'The pinnacle of relaxed sophistication. Slide in effortlessly for coffee runs, design studios, or weekend gallery walks. Features an ultra-soft molded cork footbed.',
    features: [
      'Natural cork-latex anatomical contour bed',
      'Velvety soft Italian split suede upper',
      'Adjustable antique-brass roller buckle',
      'Durable EVA traction sole',
      'Natural moisture-wicking suede footbed lining'
    ],
    specs: {
      sole: 'Molded Cork & Lightweight EVA',
      upper: 'Premium Italian Suede',
      weight: '210 grams (UK 6)',
      origin: 'European Workshop'
    },
    colors: [
      { name: 'Desert Camel', hex: '#C19A6B' },
      { name: 'Warm Taupe', hex: '#B39F8D' },
      { name: 'Anthracite', hex: '#2B2B2B' }
    ],
    sizes: [5, 6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-10',
    name: 'Kinetic Hydro Marathon Pro',
    series: 'Apex Series 02',
    category: 'Sports',
    subcategory: 'Performance Running',
    price: 10499,
    originalPrice: 13999,
    rating: 5.0,
    reviewsCount: 204,
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    description: 'Anticipate personal bests. Equipped with our full-length curved CarbonBlade propulsion system and 38mm stack of HyperBounce nitrogen-injected foam for explosive energy return.',
    features: [
      'Full-length curved CarbonBlade propulsion unit',
      'HyperBounce nitrogen-infused midsole foam',
      'Single-layer monofilament translucent race mesh',
      'Ultralight zoned wet-weather rubber grip',
      'Minimalist zero-chafe gusseted race tongue'
    ],
    specs: {
      sole: 'Nitrogen-Infused HyperBounce + CarbonBlade',
      upper: 'Monofilament Engineered Weave',
      weight: '198 grams (UK 8.5)',
      origin: 'Championship Track Certified'
    },
    colors: [
      { name: 'Pure White & Cyber Beige', hex: '#EBE5D8' },
      { name: 'Stealth Blackout', hex: '#0F0F0F' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-11',
    name: 'Little Roamer First Steps',
    series: 'Young Urban',
    category: 'Kids',
    subcategory: 'Toddler & Kids',
    price: 2999,
    originalPrice: 3999,
    rating: 4.8,
    reviewsCount: 47,
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    description: 'Specially engineered for natural foot development and confident first steps. Ultra-flexible zero-drop barefoot sole that allows natural sensory feedback and toe splay.',
    features: [
      'Wide anatomical toe box for natural splay',
      'Dual hook-and-loop adjustable velcro straps',
      'Non-toxic chrome-free soft eco-leather',
      'Padded anti-friction collar and tongue',
      'Ultra-bendy barefoot rubber sole'
    ],
    specs: {
      sole: 'Ultra-Flex Natural Rubber',
      upper: 'Baby-Safe Chrome-Free Suede',
      weight: '110 grams (Kids UK 1)',
      origin: 'Pediatric Podiatrist Approved'
    },
    colors: [
      { name: 'Honey Sand', hex: '#D6C09C' },
      { name: 'Cloud White', hex: '#FDFBF7' },
      { name: 'Charcoal Black', hex: '#262626' }
    ],
    sizes: [1, 2, 3, 4],
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-12',
    name: 'Strata Low Raw Vintage',
    series: 'Retro Athletics',
    category: 'Men',
    subcategory: 'Lifestyle Sneakers',
    price: 5999,
    originalPrice: 7499,
    rating: 4.8,
    reviewsCount: 167,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    description: 'Inspired by 1980s terrace culture and retro basketball aesthetics. Aged cream midsole, distressed raw suede panels, and an ultra-durable cupsole made for daily wear.',
    features: [
      'Vintage aged tea-washed midsole finish',
      'Hairy cow suede and smooth leather overlays',
      'Perforated toe box for constant airflow',
      'Debossed heritage Urban Sole monogram',
      'Cotton flat laces with vintage patina'
    ],
    specs: {
      sole: 'Dual-Density Heritage Cupsole',
      upper: 'Raw Suede & Full-Grain Leather',
      weight: '320 grams (UK 8)',
      origin: 'Heritage Edition'
    },
    colors: [
      { name: 'Bone White / Desert Tan', hex: '#E2DCD1' },
      { name: 'Nightshade Navy / Black', hex: '#1C232B' },
      { name: 'Olive Drab', hex: '#556B2F' }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-13',
    name: 'Aura CloudWalk Slip-On',
    series: 'Studio Line',
    category: 'Women',
    subcategory: 'Walking Shoes',
    price: 5499,
    originalPrice: 6999,
    rating: 4.9,
    reviewsCount: 141,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    description: 'Designed for effortless everyday mobility. The stretch knit collar lets you slip in without bending down, while our responsive CloudFoam cushions every heel strike.',
    features: [
      'Hands-free step-in flex heel technology',
      'Seamless 3D stretch-knit upper that moves with you',
      'Arch-support orthotic contoured footbed',
      'Machine-washable gentle cycle design',
      'Whisper-quiet shock absorbing outsole'
    ],
    specs: {
      sole: 'CloudFoam Ultra Cushioned EVA',
      upper: 'Seamless Elastic Weave',
      weight: '190 grams (UK 6)',
      origin: 'Everyday Comfort Lab'
    },
    colors: [
      { name: 'Alabaster Beige', hex: '#EDE6DA' },
      { name: 'Black Caviar', hex: '#191919' },
      { name: 'Dusty Rose Beige', hex: '#D8C3BA' }
    ],
    sizes: [5, 6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-14',
    name: 'Titan Cross-Training Matrix',
    series: 'Court Lab',
    category: 'Sports',
    subcategory: 'Cross Training & Gym',
    price: 7999,
    originalPrice: 9999,
    rating: 4.8,
    reviewsCount: 88,
    isNew: true,
    isBestseller: false,
    isFeatured: false,
    description: 'Engineered for deadlifts, box jumps, rope climbs, and heavy lifting. Wide flat heel geometry delivers absolute stability while the flexible forefoot enables rapid sprints.',
    features: [
      'Wide, zero-compression stable lifting platform',
      'Rope-grip rubber side wings on midfoot',
      'Durable Kevlar reinforced upper mesh',
      'Dual lacing lock down loops',
      'Firm rearfoot cushioning with responsive front rebound'
    ],
    specs: {
      sole: 'Zero-Drop Flat Grip Solid Rubber',
      upper: 'Kevlar Reinforced Mesh',
      weight: '330 grams (UK 9)',
      origin: 'Engineered for Power Athletes'
    },
    colors: [
      { name: 'Graphite & Sand Gold', hex: '#2B2B2B' },
      { name: 'Bone White', hex: '#ECE8DF' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-15',
    name: 'Junior Storm High Top',
    series: 'Young Urban',
    category: 'Kids',
    subcategory: 'Kids High Tops',
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 56,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    description: 'Street-smart basketball style scaled down for active youth. Ankle support padding, durable synthetic leather that wipes clean in seconds, and fun glow-in-the-dark accents.',
    features: [
      'Easy wipe-clean premium synthetic leather',
      'Reinforced ankle collar for support',
      'Non-slip rubber cupsole with pivot circle',
      'Elastic faux laces with heavy-duty top velcro band',
      'Glow-in-the-dark sole piping'
    ],
    specs: {
      sole: 'High-Density Rubber Cupsole',
      upper: 'Wipe-Clean Micro-Leather',
      weight: '215 grams (Kids UK 3)',
      origin: 'Kids Urban Active'
    },
    colors: [
      { name: 'Black / Sand Beige', hex: '#222222' },
      { name: 'Chalk White', hex: '#F7F6F2' }
    ],
    sizes: [2, 3, 4, 5],
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'us-16',
    name: 'Artisan Derby Monkstrap',
    series: 'Artisan Collection',
    category: 'Men',
    subcategory: 'Formal & Smart Casual',
    price: 12999,
    originalPrice: 15999,
    rating: 4.9,
    reviewsCount: 63,
    isNew: true,
    isBestseller: false,
    isFeatured: false,
    description: 'Where sartorial excellence meets sneaker-grade comfort. Hand-burnished French calfskin leather with hidden ortholite cushioning inside a slim, elegant profile.',
    features: [
      'Hand-burnished French calfskin with deep patina',
      'Twin gunmetal buckle closure with hidden elastic',
      'Leather-stacked heel with anti-skid rubber tap',
      'Full calfskin glove lining for breathable luxury',
      'Ortholite dual-density hidden comfort footbed'
    ],
    specs: {
      sole: 'Leather Sole with Inset Rubber Grip',
      upper: 'Hand-Burnished French Calfskin',
      weight: '440 grams (UK 9)',
      origin: 'Master Cobbler Series'
    },
    colors: [
      { name: 'Rich Espresso', hex: '#3B2F2F' },
      { name: 'Tuscan Tan', hex: '#8B5A2B' },
      { name: 'Midnight Black', hex: '#111111' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80'
    ]
  }
];

export const CATEGORIES = [
  {
    id: 'men',
    name: 'Men',
    tagline: 'Architectural precision & commanding street style',
    count: '24+ Models',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'women',
    name: 'Women',
    tagline: 'Sculptural elegance engineered with all-day buoyancy',
    count: '18+ Models',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'sports',
    name: 'Sports',
    tagline: 'High-propulsion carbon plates and all-terrain grip',
    count: '16+ Models',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'kids',
    name: 'Kids',
    tagline: 'Playground-proof durability with anatomic toe comfort',
    count: '12+ Models',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80'
  }
];
