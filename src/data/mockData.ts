export interface Product {
  id: string;
  product_id: string;
  name: string;
  name_ar: string;
  slug: string;
  price: number;
  original_price?: number;
  stock: number;
  weight: number;
  image: string;
  images?: string[];
  link: string;
  category_slug?: string;
  description?: string;
  description_ar?: string;
  compatible_cars?: string[];
  features?: string[];
  specs?: Record<string, string>;
}

export interface GalleryItem {
  id: string;
  title: string;
  title_ar: string;
  vehicle: string;
  vehicle_brand: string;
  image: string;
  mounting_base: string;
  device_holder: string;
  base_slug: string;
  holder_slug: string;
}

export interface JobOpening {
  id: string;
  title: string;
  title_ar: string;
  department: string;
  location: string;
  type: string;
  description: string;
  description_ar: string;
  requirements: string[];
}

export interface Category {
  id: string;
  category: string;
  category_ar: string;
  slug: string;
  image: string;
  description: string;
  descriptionar: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  star: number;
  review: string;
  reviewar: string;
}

export interface FAQ {
  id: string;
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
}

export const VEHICLE_BRANDS = [
  "Toyota",
  "Nissan",
  "Lexus",
  "Land Rover",
  "Mercedes-Benz",
  "GMC",
  "Ford",
  "Chevrolet",
  "Hyundai",
  "Kia",
  "Porsche",
  "Jeep"
];

export const VEHICLE_MODELS: Record<string, string[]> = {
  Toyota: ["Land Cruiser LC300", "Land Cruiser Prado", "Hilux", "RAV4", "Camry", "FJ Cruiser"],
  Nissan: ["Patrol Y62", "Patrol Super Safari", "X-Terra", "Pathfinder", "Navara"],
  Lexus: ["LX600", "LX570", "GX460", "RX350"],
  "Land Rover": ["Defender 110", "Defender 90", "Range Rover Vogue", "Range Rover Sport"],
  "Mercedes-Benz": ["G-Class G63", "GLE Coupe", "E-Class", "S-Class"],
  GMC: ["Sierra 1500", "Yukon Denali", "Acadia"],
  Ford: ["F-150 Raptor", "Bronco", "Explorer", "Ranger"],
  Chevrolet: ["Tahoe", "Suburban", "Silverado"],
  Jeep: ["Wrangler JL", "Gladiator", "Grand Cherokee"]
};

export const VEHICLE_YEARS = [
  "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"
];

export const DEVICE_BRANDS = ["Apple", "Samsung", "Huawei", "Xiaomi", "Google", "OnePlus"];

export const DEVICE_MODELS: Record<string, string[]> = {
  Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14", "iPad Pro 11"],
  Samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S23 Ultra", "Galaxy Z Fold 5", "Galaxy Tab S9"],
  Huawei: ["Mate 60 Pro", "P60 Pro", "Mate X3"],
  Xiaomi: ["14 Ultra", "13 Pro"],
  Google: ["Pixel 8 Pro", "Pixel 7 Pro"]
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    category: "Device Holders",
    category_ar: "حوامل الأجهزة",
    slug: "device-holders",
    image: "/admin/categories/Device-Holders.png",
    description: "Custom and universal device holders engineered for high stability and accessibility while driving.",
    descriptionar: "حوامل أجهزة مخصصة وعامة مصممة للاستقرار العالي وسهولة الوصول أثناء القيادة."
  },
  {
    id: "2",
    category: "ProClips Mounts",
    category_ar: "قواعد برو كليبس",
    slug: "pro-clips",
    image: "/admin/categories/Untitled-1.png",
    description: "Vehicle-specific dashboard mounts designed to fit without drilling or damaging your car interior.",
    descriptionar: "قواعد لوحة قيادة مخصصة لكل سيارة بدون الحاجة للحفر أو إتلاف مقصورة السيارة."
  },
  {
    id: "3",
    category: "Leather Mounts",
    category_ar: "حوامل جلدية",
    slug: "leather-mount",
    image: "/admin/categories/Leather.png",
    description: "Premium handcrafted leather mounts combining luxury aesthetics with solid device hold.",
    descriptionar: "حوامل جلدية فاخرة مصنوعة يدوياً تجمع بين الفخامة والقبضة المتينة."
  },
  {
    id: "4",
    category: "Motorbike Mounts",
    category_ar: "حوامل الدراجات النارية",
    slug: "motorbike-mount",
    image: "/admin/categories/Mototr-Bike.png",
    description: "Weather-resistant, vibration-dampened mounts for motorcycles and off-road vehicles.",
    descriptionar: "حوامل مقاومة للعوامل الجوية ومضادة للاهتزاز للدراجات النارية والمركبات الوعرة."
  },
  {
    id: "5",
    category: "Antenna & Accessories",
    category_ar: "الهوائيات والإكسسوارات",
    slug: "antenna-accessories",
    image: "/admin/categories/Anteena.png",
    description: "High performance signal boosters, antenna brackets, cable organizers, and extension arms.",
    descriptionar: "مقويات إشارة عالية الأداء، قواعد هوائيات، ومنظمات كابلات."
  }
];

export const MOCK_TOP_SELLERS: Product[] = [
  {
    id: "101",
    product_id: "TH-8551",
    name: "ProClip Custom Car Mount - Toyota Land Cruiser LC300",
    name_ar: "قاعدة برو كليبس مخصصة لسيارة تويوتا لاندركروزر LC300",
    slug: "proclip-land-cruiser-lc300",
    price: 185,
    stock: 12,
    weight: 0.35,
    image: "/admin/banners/proclip-1.jpg",
    link: "products"
  },
  {
    id: "102",
    product_id: "TH-9420",
    name: "Adjustable Smartphone Holder with MagSafe Wireless Charging",
    name_ar: "حامل هاتف قابل للتعديل مع شاحن ماج سيف لاسلكي",
    slug: "magsafe-wireless-holder",
    price: 220,
    stock: 8,
    weight: 0.4,
    image: "/admin/banners/i-phone-h15-holder.jpg",
    link: "products"
  },
  {
    id: "103",
    product_id: "TH-7731",
    name: "Nissan Patrol Y62 Center Console Custom Mount Bracket",
    name_ar: "قاعدة تثبيت مخصصة للكونسول الأوسط لنيسان باترول Y62",
    slug: "nissan-patrol-y62-mount",
    price: 175,
    stock: 15,
    weight: 0.3,
    image: "/admin/banners/center-console.jpg",
    link: "products"
  },
  {
    id: "104",
    product_id: "TH-5512",
    name: "Heavy Duty Off-Road Tablet & Phone Combo Mount",
    name_ar: "حامل تابلت وهاتف مدمج فائق التحمل للطرق الوعرة",
    slug: "heavy-duty-tablet-mount",
    price: 245,
    stock: 5,
    weight: 0.6,
    image: "/admin/banners/accessories.jpg",
    link: "products"
  },
  {
    id: "105",
    product_id: "TH-6640",
    name: "Motorbike All-Weather Handlebar Phone Clamp",
    name_ar: "حامل هاتف لمقبض الدراجات النارية مقاوم لجميع الظروف",
    slug: "motorbike-handlebar-clamp",
    price: 160,
    stock: 0,
    weight: 0.3,
    image: "/admin/banners/bike.jpg",
    link: "products"
  }
];

export const MOCK_BRANDS: BrandLogo[] = [
  { id: "2",  name: "Brand 2",  image: "/user/images/cars-logo/1751275129_68625679b5881.png" },
  { id: "3",  name: "Brand 3",  image: "/user/images/cars-logo/1751275141_68625685ad932.png" },
  { id: "4",  name: "Brand 4",  image: "/user/images/cars-logo/1751275153_68625691dca64.png" },
  { id: "5",  name: "Brand 5",  image: "/user/images/cars-logo/1751275164_6862569ca5888.png" },
  { id: "6",  name: "Brand 6",  image: "/user/images/cars-logo/1751275176_686256a820176.png" },
  { id: "7",  name: "Brand 7",  image: "/user/images/cars-logo/1751275185_686256b183ce4.png" },
  { id: "8",  name: "Brand 8",  image: "/user/images/cars-logo/1751275214_686256ce52538.png" },
  { id: "9",  name: "Brand 9",  image: "/user/images/cars-logo/1751275226_686256da57f95.png" },
  { id: "10", name: "Brand 10", image: "/user/images/cars-logo/1751275236_686256e449dad.png" },
  { id: "11", name: "Brand 11", image: "/user/images/cars-logo/1751275246_686256eea1338.png" },
  { id: "12", name: "Brand 12", image: "/user/images/cars-logo/1751275257_686256f950eef.png" },
  { id: "13", name: "Brand 13", image: "/user/images/cars-logo/1751275269_68625705051ab.png" },
  { id: "14", name: "Brand 14", image: "/user/images/cars-logo/1751275293_6862571d32510.png" },
];


export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Rashid Al-Kuwari",
    star: 5,
    review: "Absolutely top-quality mount for my Patrol Y62. Rock solid stability on desert dunes with zero vibration!",
    reviewar: "قاعدة تثبيت ممتازة جداً لسيارتي نيسان باترول. ثبات فائق على الكثبان الرملية بدون أي اهتزاز!"
  },
  {
    id: "2",
    name: "Mohammed Al-Marri",
    star: 5,
    review: "Fast delivery in Qatar and flawless build quality. No tools required and fits into the dashboard seamlessly.",
    reviewar: "توصيل سريع جداً في قطر وجودة تصنيع لا غبار عليها. تركبت بلمح البصر بدون الحاجة لأي أدوات."
  },
  {
    id: "3",
    name: "Sultan Al-Hajri",
    star: 5,
    review: "The MagSafe holder holds my iPhone 15 Pro Max securely even over severe road bumps. 10/10 recommendation!",
    reviewar: "حامل الماج سيف يمسك الآيفون 15 بروماكس بقوة حتى فوق المطبات القوية. أنصح به 10/10!"
  }
];

export const MOCK_FAQS: FAQ[] = [
  {
    id: "1",
    question: "What types of mounting solutions do you offer?",
    question_ar: "ما هي أنواع حلول التثبيت التي تقدمونها؟",
    answer: "We offer a wide range of premium vehicle-specific ProClip mounts, universal device holders, leather custom mounts, motorbike mounts, and antenna accessories.",
    answer_ar: "نقدم مجموعة واسعة من قواعد برو كليبس المخصصة للسيارات، حوامل الأجهزة العامة، الحوامل الجلدية، حوامل الدراجات النارية، وإكسسوارات الهوائيات."
  },
  {
    id: "2",
    question: "Are your products compatible with my car model?",
    question_ar: "هل منتجاتكم متوافقة مع موديل سيارتي؟",
    answer: "Yes! Our mounting bases are customized specifically for each vehicle brand, model, and manufacturing year to ensure a perfect tool-free snap fit without damaging your interior.",
    answer_ar: "نعم! قواعد التثبيت لدينا مخصصة بالكامل لكل ماركة وموديل وسنة صنع لضمان تركيب محكم وسهل بدون أي تلف لمقصورة السيارة."
  },
  {
    id: "3",
    question: "Do your phone holders support wireless charging?",
    question_ar: "هل حوامل الهواتف لديكم تدعم الشحن اللاسلكي؟",
    answer: "Yes, we offer models with built-in MagSafe and automatic inductive fast wireless charging.",
    answer_ar: "نعم، نقدم موديلات تحتوي على شاحن ماج سيف مدمج وشحن لاسلكي سريع بتقنية الاستشعار التلقائي."
  },
  {
    id: "4",
    question: "How long does delivery take across GCC countries?",
    question_ar: "كم يستغرق التوصيل لجميع دول مجلس التعاون الخليجي؟",
    answer: "We deliver across Qatar within 24 hours, and deliver to UAE, Saudi Arabia, Kuwait, Bahrain, and Oman within 2 to 4 business days.",
    answer_ar: "نقوم بالتوصيل داخل قطر خلال 24 ساعة، وإلى الإمارات، السعودية، الكويت، البحرين، وعمان خلال 2-4 أيام عمل."
  }
];

export const MOCK_ALL_PRODUCTS: Product[] = [
  {
    id: "101",
    product_id: "TH-8551",
    name: "ProClip Custom Car Mount - Toyota Land Cruiser LC300",
    name_ar: "قاعدة برو كليبس مخصصة لسيارة تويوتا لاندكروزر LC300",
    slug: "proclip-land-cruiser-lc300",
    category_slug: "pro-clips",
    price: 185,
    original_price: 210,
    stock: 12,
    weight: 0.35,
    image: "/admin/banners/proclip-1.jpg",
    images: [
      "/admin/banners/proclip-1.jpg",
      "/admin/banners/center-console.jpg",
      "/user/images/home-3.png"
    ],
    link: "products",
    description: "Custom vehicle-specific ProClip mounting base precisely molded for the 2022-2025 Toyota Land Cruiser LC300. Clips firmly into the dashboard seams without drilling, suction cups, or dashboard glue.",
    description_ar: "قاعدة تثبيت برو كليبس مخصصة ومصممة بدقة لتويوتا لاندكروزر LC300 موديلات 2022-2025. تركب بإحكام في فواصل لوحة القيادة بدون حفر أو لواصق أو إتلاف الديكور.",
    compatible_cars: ["Toyota Land Cruiser LC300 (2022-2025)", "Toyota Land Cruiser GR-S (2022-2025)"],
    features: ["Tool-free snap-on installation", "High-grade Swedish ABS plastic", "Maintains full access to climate vents and touchscreen", "Vibration-tested on desert dunes"],
    specs: {
      "Origin": "Engineered in Sweden by Brodit AB",
      "Material": "Automotive Heat-Resistant Acrylonitrile Butadiene Styrene",
      "Placement": "Center Dashboard (Adjacent to Primary Display)",
      "Steering Compatibility": "Left-Hand Drive (GCC Standard)",
      "Warranty": "1-Year Official GCC Replacement Warranty"
    }
  },
  {
    id: "102",
    product_id: "TH-9420",
    name: "Adjustable Smartphone Holder with MagSafe Wireless Charging",
    name_ar: "حامل هاتف قابل للتعديل مع شاحن ماج سيف لاسلكي",
    slug: "magsafe-wireless-holder",
    category_slug: "device-holders",
    price: 220,
    original_price: 260,
    stock: 18,
    weight: 0.4,
    image: "/admin/banners/i-phone-h15-holder.jpg",
    images: [
      "/admin/banners/i-phone-h15-holder.jpg",
      "/admin/banners/accessories.jpg"
    ],
    link: "products",
    description: "Ultra-strong magnetic MagSafe holder equipped with Qi-certified 15W fast wireless charging. Features a ball-and-socket swivel joint for 360-degree portrait and landscape rotation.",
    description_ar: "حامل مغناطيسي ماج سيف فائق القوة مزود بشاحن لاسلكي سريع بقوة 15 واط معتمد من Qi. مزود بمفصل كروي يتيح الدوران 360 درجة أفقياً ورأسياً.",
    compatible_cars: ["Universal - Pairs with any ProClips Base or AMPS Mount"],
    features: ["N52 Neodymium rare-earth magnetic array", "15W fast Qi wireless charging with smart heat dissipation", "360-degree tilt & swivel", "Compatible with iPhone 12 through 16 Pro Max and MagSafe cases"],
    specs: {
      "Input": "USB-C PD 9V/2A, 12V/1.5A",
      "Wireless Output": "15W / 10W / 7.5W Auto-Optimized",
      "Mounting Pattern": "Standard 4-Hole AMPS Plate Compatible",
      "Operating Temp": "-20°C to +75°C",
      "Included Accessories": "1.2m Braided USB-C Cable + Cable Clips"
    }
  },
  {
    id: "103",
    product_id: "TH-7731",
    name: "Nissan Patrol Y62 Center Console Custom Mount Bracket",
    name_ar: "قاعدة تثبيت مخصصة للكونسول الأوسط لنيسان باترول Y62",
    slug: "nissan-patrol-y62-mount",
    category_slug: "pro-clips",
    price: 175,
    original_price: 195,
    stock: 15,
    weight: 0.3,
    image: "/admin/banners/center-console.jpg",
    images: [
      "/admin/banners/center-console.jpg",
      "/user/images/home-3.png"
    ],
    link: "products",
    description: "Custom fit for Nissan Patrol Y62 and NISMO models (2010-2025). Seamlessly hugs the console border, placing your navigation screen at optimal eye level without blocking AC airflow.",
    description_ar: "مخصصة لسيارات نيسان باترول Y62 وموديلات نيسمو (2010-2025). تركب بسلاسة على جانب الكونسول الأوسط لتضع شاشة الملاحة في أفضل زاوية رؤية بدون حجب مكيف السيارة.",
    compatible_cars: ["Nissan Patrol Y62 (2010-2025)", "Nissan Patrol NISMO", "Infiniti QX80 (2011-2024)"],
    features: ["Zero holes, zero screws, zero sticky residues", "Rigid rock-solid lock during desert off-roading", "Ergonomic viewing angle", "Matches luxury interior grain"],
    specs: {
      "Origin": "Sweden (Brodit)",
      "Material": "ABS Polymer Blend",
      "Steering": "Left-Hand Drive (LHD)",
      "Warranty": "1-Year Warranty"
    }
  },
  {
    id: "104",
    product_id: "TH-5512",
    name: "Heavy Duty Off-Road Tablet & Phone Combo Mount",
    name_ar: "حامل تابلت وهاتف مدمج فائق التحمل للطرق الوعرة",
    slug: "heavy-duty-tablet-mount",
    category_slug: "molle",
    price: 245,
    original_price: 290,
    stock: 9,
    weight: 0.6,
    image: "/admin/banners/accessories.jpg",
    images: ["/admin/banners/accessories.jpg", "/user/images/home-3.png"],
    link: "products",
    description: "Engineered for rugged desert expeditions, overland touring, and navigation tablets up to 12.9 inches. Dual spring-loaded grip with rubberized anti-vibration shock absorbers.",
    description_ar: "مصمم للرحلات البرية الصحراوية القاسية، والمغامرات الوعرة، وشاشات وأجهزة التابلت حتى 12.9 بوصة. مزود بنظام تثبيت زنبركي مزدوج ومخمدات اهتزاز مطاطية.",
    compatible_cars: ["Toyota Land Cruiser", "Nissan Patrol", "Jeep Wrangler", "Ford F-150 Raptor", "GMC Sierra"],
    features: ["Holds tablets 7\" to 12.9\" and large phones", "Vibration dampening rubber cushions", "Reinforced dual-arm structure", "Desert heat tested"],
    specs: {
      "Arm Construction": "Reinforced High-Impact Composite",
      "Clamping Range": "120mm to 225mm Width",
      "Load Capacity": "Up to 1.8 kg"
    }
  },
  {
    id: "105",
    product_id: "TH-6640",
    name: "Motorbike All-Weather Handlebar Phone Clamp",
    name_ar: "حامل هاتف لمقبض الدراجات النارية مقاوم لجميع الظروف",
    slug: "motorbike-handlebar-clamp",
    category_slug: "motorbike-mount",
    price: 160,
    stock: 0,
    weight: 0.3,
    image: "/admin/banners/bike.jpg",
    images: ["/admin/banners/bike.jpg", "/admin/banners/accessories.jpg"],
    link: "products",
    description: "Machined aluminum and composite handlebar clamp with quad-point mechanical locking and silicone vibration isolator for smartphones on sportbikes and adventure tourers.",
    description_ar: "مشبك مقبض دراجة من الألومنيوم والمواد المركبة مع قفل ميكانيكي رباعي النقاط وعازل اهتزاز من السيليكون لحماية كاميرات الهواتف الذكية.",
    compatible_cars: ["Universal 22mm to 32mm Handlebars (BMW GS, Ducati, Yamaha, Honda)"],
    features: ["Quad mechanical corner grips", "Integrated camera optical vibration dampener", "IP67 weather resistant", "Quick one-handed lock & release"],
    specs: {
      "Handlebar Diameters": "22mm, 25.4mm, 28.6mm, 31.8mm",
      "Device Compatibility": "Phones 4.7\" to 6.9\""
    }
  },
  {
    id: "106",
    product_id: "TH-3310",
    name: "Handcrafted Luxury Leather Dashboard Mount - Black Gold Edition",
    name_ar: "حامل لوحة قيادة جلدي فاخر مصنوع يدوياً - إصدار الذهب والأسود",
    slug: "luxury-leather-dashboard-mount",
    category_slug: "leather-mount",
    price: 260,
    original_price: 310,
    stock: 6,
    weight: 0.45,
    image: "/admin/categories/Leather.png",
    images: ["/admin/categories/Leather.png", "/admin/banners/center-console.jpg"],
    link: "products",
    description: "Bespoke genuine full-grain Italian leather car mount hand-stitched in Qatar with brushed gold accents. Matches high-end automotive cabin trims in Range Rover, Bentley, and Mercedes Maybach.",
    description_ar: "حامل هاتف مصنوع يدوياً من الجلد الإيطالي الفاخر مع حياكة أنيقة وتفاصيل بلون الذهب المصقول. يناسب مقصورات السيارات الفاخرة مثل رينج روفر، بنتلي، ومرسيدس مايباخ.",
    compatible_cars: ["Universal Luxury Fitment"],
    features: ["Full-grain Italian calf leather", "Brushed gold PVD coated hardware", "Integrated MagSafe magnetic ring", "Handcrafted in Doha, Qatar"],
    specs: {
      "Material": "100% Genuine Full-Grain Leather & Billet Aluminum",
      "Finish": "Obsidian Black with Champagne Gold Accents",
      "Mount Type": "MagSafe Compatible Magnetic Interface"
    }
  },
  {
    id: "107",
    product_id: "TH-8890",
    name: "Off-Road Dual VHF/UHF Antenna Fold-Down Bracket",
    name_ar: "قاعدة هوائي قابلة للطي ثنائية التردد للرحلات البرية",
    slug: "offroad-antenna-bracket",
    category_slug: "antenna-accessories",
    price: 195,
    original_price: 230,
    stock: 14,
    weight: 0.7,
    image: "/admin/categories/Anteena.png",
    images: ["/admin/categories/Anteena.png", "/admin/banners/accessories.jpg"],
    link: "products",
    description: "Heavy-duty 4.5mm stainless steel hood / tailgate antenna mount bracket with spring-detent quick fold-down mechanism for desert dune bashing and garage clearance.",
    description_ar: "قاعدة هوائي فائقة التحمل من الفولاذ المقاوم للصدأ بسمك 4.5 مم تركب على غطاء المحرك أو الباب الخلفي مع آلية طي سريعة لتفادي العوائق في الكراجات وتحديات الكثبان.",
    compatible_cars: ["Toyota Land Cruiser LC200/LC300", "Nissan Patrol Y61/Y62", "Toyota Hilux / Land Cruiser 70 Series"],
    features: ["Multi-position quick fold latch", "Grade 304 stainless steel with black powder coating", "Pre-drilled standard SO-239 / NMO mounting hole", "Direct bolt-on to factory hinge points"],
    specs: {
      "Material": "304 Stainless Steel (4.5mm thickness)",
      "Coating": "Anti-Corrosion Matte Black Powder Coat",
      "Weight": "0.7 kg"
    }
  },
  {
    id: "108",
    product_id: "TH-MX01",
    name: "MountX Desert Edition CNC Billet Aluminum Extreme Mount",
    name_ar: "قاعدة ماونت إكس إصدار الصحراء من ألومنيوم الطائرات المعالج رقمياً",
    slug: "mountx-desert-edition",
    category_slug: "pro-clips",
    price: 340,
    original_price: 390,
    stock: 5,
    weight: 0.85,
    image: "/user/images/home-3.png",
    images: ["/user/images/home-3.png", "/admin/banners/accessories.jpg"],
    link: "products",
    description: "The apex of in-vehicle mounting technology. Precision CNC-machined from 6061-T6 aerospace aluminum, hard anodized in obsidian black. Engineered to survive 80°C desert heat and high-speed dune jumps with zero deflection.",
    description_ar: "قمة تكنولوجيا التثبيت داخل السيارة. مصنوعة بدقة بالغة بالـ CNC من ألومنيوم الطائرات 6061-T6 ومطلية بأكسدة صلبة بلون الأوبسيديان الأسود. مصممة لتحمل حرارة 80 مئوية وقفزات الكثبان بدون أدنى اهتزاز.",
    compatible_cars: ["Toyota Land Cruiser LC300", "Nissan Patrol Y62", "Ford F-150 Raptor", "Land Rover Defender 110/90"],
    features: ["6061-T6 Aerospace Grade Aluminum", "Extreme heat rated (-40°C to +85°C)", "Military grade dual locking collar", "Lifetime structural guarantee"],
    specs: {
      "Alloy": "Aerospace 6061-T6 Billet Aluminum",
      "Surface Treatment": "Mil-Spec Type III Hard Anodizing",
      "Holding Strength": "Exceeds 25G Impact Acceleration",
      "Origin": "Exclusively Engineered by Thabt Engineering Lab"
    }
  }
];

export const MOCK_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Toyota Land Cruiser LC300 - Dual MagSafe Setup",
    title_ar: "تويوتا لاندكروزر LC300 - تركيب ماج سيف مزدوج",
    vehicle: "Land Cruiser LC300 VXR",
    vehicle_brand: "Toyota",
    image: "/user/images/home-3.png",
    mounting_base: "ProClip Center Mount (#8551)",
    device_holder: "MagSafe Wireless Fast Charger",
    base_slug: "proclip-land-cruiser-lc300",
    holder_slug: "magsafe-wireless-holder"
  },
  {
    id: "g2",
    title: "Nissan Patrol Y62 NISMO - Console Navigation Mount",
    title_ar: "نيسان باترول Y62 نيسمو - قاعدة ملاحة كونسول",
    vehicle: "Nissan Patrol NISMO",
    vehicle_brand: "Nissan",
    image: "/admin/banners/center-console.jpg",
    mounting_base: "Patrol Y62 Angled Base (#7731)",
    device_holder: "Adjustable Smartphone Clamp",
    base_slug: "nissan-patrol-y62-mount",
    holder_slug: "magsafe-wireless-holder"
  },
  {
    id: "g3",
    title: "Land Rover Defender 110 - Heavy Duty Molle Tablet",
    title_ar: "لاند روفر ديفندر 110 - حامل تابلت فائق التحمل",
    vehicle: "Defender 110 X-Dynamic",
    vehicle_brand: "Land Rover",
    image: "/admin/banners/accessories.jpg",
    mounting_base: "MountX Heavy Duty Pillar Base",
    device_holder: "Heavy Duty Off-Road Tablet Mount",
    base_slug: "mountx-desert-edition",
    holder_slug: "heavy-duty-tablet-mount"
  },
  {
    id: "g4",
    title: "GMC Sierra 1500 Denali - Clean Dash Setup",
    title_ar: "جي إم سي سييرا دينالي - تثبيت نظيف على لوحة القيادة",
    vehicle: "GMC Sierra 1500",
    vehicle_brand: "GMC",
    image: "/admin/banners/proclip-1.jpg",
    mounting_base: "GMC Sierra Center Bezel Base",
    device_holder: "MagSafe Wireless Fast Charger",
    base_slug: "proclip-land-cruiser-lc300",
    holder_slug: "magsafe-wireless-holder"
  }
];

export const MOCK_JOBS: JobOpening[] = [
  {
    id: "j1",
    title: "Automotive Fitment & Installation Specialist",
    title_ar: "أخصائي تركيب وتثبيت تجهيزات السيارات",
    department: "Operations & Workshop",
    location: "Doha, Qatar",
    type: "Full-time",
    description: "Join our expert technical team at our flagship Doha showroom. Responsible for high-precision, tool-free ProClips and MountX installations into premium GCC luxury and off-road vehicles.",
    description_ar: "انضم لفريق الخبراء الفني في معرضنا بالدوحة. مسؤول عن تركيب وتثبيت قواعد برو كليبس وماونت إكس بدقة عالية داخل أحدث السيارات الفاخرة وسيارات الدفع الرباعي.",
    requirements: [
      "Minimum 2 years experience in automotive accessories or car audio/electronics",
      "Deep familiarity with GCC vehicle dashboard trims (Land Cruiser, Patrol, Defender, Sierra)",
      "Meticulous attention to detail and zero-damage mindset",
      "Valid Qatar driver's license preferred"
    ]
  },
  {
    id: "j2",
    title: "Customer Experience & WhatsApp Concierge Associate",
    title_ar: "أخصائي تجربة العملاء وخدمة واتساب المميزة",
    department: "Customer Service",
    location: "Doha, Qatar (Hybrid)",
    type: "Full-time",
    description: "Guide customers across Qatar, Saudi Arabia, UAE, and the GCC through finding their vehicle's exact 2-part mounting match via chat and phone support.",
    description_ar: "إرشاد ومساعدة عملاء ثقة في قطر والسعودية والإمارات ودول الخليج في اختيار التوافق الدقيق لسياراتهم وأجهزتهم عبر محادثات واتساب والهاتف.",
    requirements: [
      "Fluent bilingual proficiency in Arabic and English (Written and Spoken)",
      "High empathy and passion for automotive gear",
      "Experience with e-commerce customer support tools",
      "Available for weekend shifts on rotation"
    ]
  },
  {
    id: "j3",
    title: "E-Commerce Logistics & Inventory Coordinator",
    title_ar: "منسق لوجستيات وشحن التجارة الإلكترونية",
    department: "Supply Chain",
    location: "Doha, Qatar",
    type: "Full-time",
    description: "Coordinate same-day dispatches within Qatar and cross-border express shipments across the GCC via DHL and Aramex, ensuring order accuracy and rapid turnaround.",
    description_ar: "تنسيق الشحنات والتوصيل الفوري داخل قطر والشحن السريع الدولي عبر دي إتش إل وأرامكس لجميع دول الخليج لضمان سرعة ودقة التسليم.",
    requirements: [
      "Knowledge of GCC customs regulations and courier platforms (DHL Express, Aramex)",
      "Experience with inventory management and ERP barcode scanning",
      "Proactive problem solver with high accuracy"
    ]
  }
];

export const MOCK_ORDERS = [
  {
    id: "THABT-2026-8941",
    date: "10 Sep 2026",
    status: "Delivered",
    status_ar: "تم التوصيل",
    items_count: 2,
    total: 405,
    tracking_number: "DHL-QA-99218401",
    courier: "DHL Express",
    products: [
      { name: "ProClip Custom Car Mount - Toyota Land Cruiser LC300", qty: 1, price: 185 },
      { name: "Adjustable Smartphone Holder with MagSafe Wireless Charging", qty: 1, price: 220 }
    ]
  },
  {
    id: "THABT-2026-8712",
    date: "28 Aug 2026",
    status: "Delivered",
    status_ar: "تم التوصيل",
    items_count: 1,
    total: 175,
    tracking_number: "ARMX-QA-441209",
    courier: "Aramex Express",
    products: [
      { name: "Nissan Patrol Y62 Center Console Custom Mount Bracket", qty: 1, price: 175 }
    ]
  }
];
