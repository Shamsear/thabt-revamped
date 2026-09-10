export interface Product {
  id: string;
  product_id: string;
  name: string;
  name_ar: string;
  slug: string;
  price: number;
  stock: number;
  weight: number;
  image: string;
  link: string;
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
    image: "https://www.thabt.qa/admin/categories/Device-Holders.png",
    description: "Custom and universal device holders engineered for high stability and accessibility while driving.",
    descriptionar: "حوامل أجهزة مخصصة وعامة مصممة للاستقرار العالي وسهولة الوصول أثناء القيادة."
  },
  {
    id: "2",
    category: "ProClips Mounts",
    category_ar: "قواعد برو كليبس",
    slug: "pro-clips",
    image: "https://www.thabt.qa/admin/categories/Untitled-1.png",
    description: "Vehicle-specific dashboard mounts designed to fit without drilling or damaging your car interior.",
    descriptionar: "قواعد لوحة قيادة مخصصة لكل سيارة بدون الحاجة للحفر أو إتلاف مقصورة السيارة."
  },
  {
    id: "3",
    category: "Leather Mounts",
    category_ar: "حوامل جلدية",
    slug: "leather-mount",
    image: "https://www.thabt.qa/admin/categories/Leather.png",
    description: "Premium handcrafted leather mounts combining luxury aesthetics with solid device hold.",
    descriptionar: "حوامل جلدية فاخرة مصنوعة يدوياً تجمع بين الفخامة والقبضة المتينة."
  },
  {
    id: "4",
    category: "Motorbike Mounts",
    category_ar: "حوامل الدراجات النارية",
    slug: "motorbike-mount",
    image: "https://www.thabt.qa/admin/categories/Mototr-Bike.png",
    description: "Weather-resistant, vibration-dampened mounts for motorcycles and off-road vehicles.",
    descriptionar: "حوامل مقاومة للعوامل الجوية ومضادة للاهتزاز للدراجات النارية والمركبات الوعرة."
  },
  {
    id: "5",
    category: "Antenna & Accessories",
    category_ar: "الهوائيات والإكسسوارات",
    slug: "antenna-accessories",
    image: "https://www.thabt.qa/admin/categories/Anteena.png",
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
    image: "https://www.thabt.qa/admin/banners/proclip-1.jpg",
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
    image: "https://www.thabt.qa/admin/banners/i-phone-h15-holder.jpg",
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
    image: "https://www.thabt.qa/admin/banners/center-console.jpg",
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
    image: "https://www.thabt.qa/admin/banners/accessories.jpg",
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
    image: "https://www.thabt.qa/admin/banners/bike.jpg",
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
