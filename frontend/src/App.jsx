import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  X, 
  Globe, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  LogOut,
  CreditCard,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Phone,
  Calendar,
  Lock,
  Upload,
  Bell,
  Maximize2,
  Layers,
  Package,
  Clock,
  Truck,
  Camera,
  RefreshCw
} from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' ? "http://localhost:8080/api" : "https://vanitha-coverings-backend.onrender.com/api";

// Translations
const translations = {
  en: {
    siteName: "Vanitha Coverings",
    headerTagline: "Trustable Quality",
    tagline: "Premium Quality with Low Price",
    adminBtn: "Owner Portal",
    logout: "Logout",
    loginBtn: "Login / Register",
    allJewels: "All Designs",
    categoriesTitle: "Collections",
    priceText: "Price",
    buyNow: "Add to Cart",
    addToCart: "Add to Cart",
    inCart: "In Cart",
    viewCart: "Cart",
    cartTitle: "Your Jewellery Cart",
    cartEmpty: "Your cart is currently empty. Browse our collections and add jewels!",
    totalAmount: "Total Amount",
    proceedToPayment: "Proceed to Payment",
    detailsLabel: "About this item: ",
    addJewelBtn: "Upload New Jewel",
    chatbotTitle: "Vanitha Assistant",
    chatbotWelcome: "Hello! Design your dream covering jewel. Tell me what type of jewel you want (Chains, Attigai, Rings, etc.), details like material (Aimpone, covering, foam), and sizes. You can also upload a reference image!",
    chatInputPlaceholder: "Describe your requirement...",
    chatSubmitSuccess: "Thank you! Your requirement has been sent directly to the owner. We will contact you at ",
    guestMessage: "Please login to submit your custom requirements via Chatbot.",
    submitRequirement: "Send Custom Requirement",
    adminWelcome: "Owner Admin Panel",
    custPhone: "Phone",
    reqMsg: "Requirement Description",
    reqImage: "Reference Image",
    noReqs: "No requirements submitted yet.",
    reqTime: "Date & Time",
    custRequests: "Customer Custom Requirements",
    addProductModal: "Upload Jewel Details",
    prodNameEn: "Product Name (English)",
    prodNameTa: "Product Name (Tamil)",
    prodDescEn: "Description (English)",
    prodDescTa: "Description (Tamil)",
    prodPrice: "Price (Rs.)",
    prodCat: "Select Subcategory",
    prodImg: "Upload Image",
    cancel: "Cancel",
    save: "Upload",
    loginModal: "Login to Vanitha Coverings",
    registerModal: "Register New Account",
    forgotPassModal: "Reset Password",
    usernameOrPhone: "Username or Phone Number",
    username: "Choose Username (e.g. priya)",
    password: "Password",
    phone: "Active Phone Number",
    secQuestion: "Backup Security Question (e.g. Favorite Color?)",
    secAnswer: "Security Answer",
    newPass: "New Password",
    loginSubmit: "Access Account",
    registerSubmit: "Create Profile",
    resetSubmit: "Reset and Update",
    checkQuestion: "Verify and Get Security Question",
    registerLink: "New Customer? Sign Up Here",
    loginLink: "Have an account? Login Here",
    forgotLink: "Forgot Password?",
    paymentGateway: "Cash on Delivery (COD) Checkout",
    choosePayMethod: "Payment Method",
    payWithCard: "Credit / Debit Card (Offline)",
    payWithUPI: "UPI (Offline)",
    payWithNB: "Net Banking (Offline)",
    payWithCOD: "💵 Cash on Delivery (COD)",
    cardNumber: "Card Number",
    cardExpiry: "Expiry Date (MM/YY)",
    cvv: "CVV",
    cardHolder: "Cardholder Name",
    scanQR: "Pay Cash Upon Delivery",
    mockUPIId: "vanithacoverings@puducherry",
    simulateOtp: "Confirm Order (Cash on Delivery)",
    paymentCompleted: "🎉 Order Placed Successfully!",
    orderId: "Order Ref: VC-COD-",
    thankYouOrder: "Thank you for your order! Your jewellery will be delivered to your address in Puducherry. Please pay the exact amount in cash upon delivery.",
    finish: "Done",
    confirmDelete: "Are you sure you want to delete this product?",
    editJewelBtn: "Edit Details",
    editProductModal: "Update Jewel Details",
    update: "Update Jewel"
  },
  ta: {
    siteName: "வணிதா கவரிங்ஸ்",
    headerTagline: "நம்பகமான தரம்",
    tagline: "பிரீமியம் தரம், குறைந்த விலை",
    adminBtn: "உரிமையாளர் பகுதி",
    logout: "வெளியேறு",
    loginBtn: "உள்நுழை / பதிவு",
    allJewels: "அனைத்து டிசைன்கள்",
    categoriesTitle: "கிளைகள்",
    priceText: "விலை",
    buyNow: "கார்ட்டில் சேர்",
    addToCart: "கார்ட்டில் சேர்",
    inCart: "கார்ட்டில் உள்ளது",
    viewCart: "கூடை",
    cartTitle: "உங்கள் நகை கூடை",
    cartEmpty: "உங்கள் கூடை காலியாக உள்ளது. நகைகளைத் தேர்வு செய்து சேர்க்கவும்!",
    totalAmount: "மொத்த தொகை",
    proceedToPayment: "பணம் செலுத்த தொடரவும்",
    detailsLabel: "விவரம்: ",
    addJewelBtn: "புதிய நகை பதிவேற்று",
    chatbotTitle: "வணிதா அத்வைசரி",
    chatbotWelcome: "வணக்கம்! உங்கள் கனவு கவரிங் நகையை வடிவமைக்க உதவுங்கள். உங்களுக்கு என்ன வகையான நகை தேவை (செயின், அட்டிகை, வளையல்கள்), என்ன உலோகம் (ஐம்பொன், கவரிங், ஃபோம்) மற்றும் அளவு விவரங்களைக் கூறுங்கள். குறிப்பு படத்தையும் நீங்கள் பதிவேற்றலாம்!",
    chatInputPlaceholder: "உங்களுக்கு தேவையானதை விவரிக்கவும்...",
    chatSubmitSuccess: "நன்றி! உங்கள் தேவை உரிமையாளருக்கு அனுப்பப்பட்டது. தொடர்பு கொள்ள வேண்டிய எண்: ",
    guestMessage: "சாட்பாட் மூலம் உங்கள் தனிப்பயன் தேவைகளை சமர்ப்பிக்க உள்நுழையவும்.",
    submitRequirement: "தேவைகளை சமர்ப்பிக்கவும்",
    adminWelcome: "உரிமையாளர் நிர்வாக பகுதி",
    custPhone: "தொலைபேசி",
    reqMsg: "தேவையின் விளக்கம்",
    reqImage: "குறிப்பு புகைப்படம்",
    noReqs: "தேவைகள் எதுவும் இதுவரை சமர்ப்பிக்கப்படவில்லை.",
    reqTime: "தேதி மற்றும் நேரம்",
    custRequests: "வாடிக்கையாளர் தனிப்பயன் தேவைகள்",
    addProductModal: "நகை விவரங்கள் பதிவேற்றம்",
    prodNameEn: "நகை பெயர் (ஆங்கிலம்)",
    prodNameTa: "நகை பெயர் (தமிழ்)",
    prodDescEn: "விளக்கம் (ஆங்கிலம்)",
    prodDescTa: "விளக்கம் (தமிழ்)",
    prodPrice: "விலை (ரூ.)",
    prodCat: "உபபிரிவை தேர்ந்தெடுக்கவும்",
    prodImg: "படம் பதிவேற்று",
    cancel: "ரத்து செய்",
    save: "பதிவேற்று",
    loginModal: "வணிதா கவரிங்ஸ் உள்நுழைவு",
    registerModal: "புதிய கணக்கு பதிவு",
    forgotPassModal: "கடவுச்சொல் மீட்டமைப்பு",
    usernameOrPhone: "பயனர் பெயர் அல்லது தொலைபேசி எண்",
    username: "பயனர் பெயர் (எ.கா. priya)",
    password: "கடவுச்சொல்",
    phone: "செயலில் உள்ள தொலைபேசி எண்",
    secQuestion: "பாதுகாப்பு கேள்வி (எ.கா. பிடித்த நிறம்?)",
    secAnswer: "பாதுகாப்பு பதில்",
    newPass: "புதிய கடவுச்சொல்",
    loginSubmit: "உள்நுழைய",
    registerSubmit: "கணக்கை உருவாக்கு",
    resetSubmit: "மீட்டமை மற்றும் புதுப்பி",
    checkQuestion: "கேள்வியை சரிபார்க்கவும்",
    registerLink: "புதிய வாடிக்கையாளரா? இங்கே பதிவு செய்க",
    loginLink: "கணக்கு உள்ளதா? இங்கே உள்நுழைக",
    forgotLink: "கடவுச்சொல் மறந்துவிட்டதா?",
    paymentGateway: "நேரடி பணம் செலுத்துதல் (COD)",
    choosePayMethod: "பணம் செலுத்தும் முறை",
    payWithCard: "கிரெடிட் / டெபிட் கார்டு",
    payWithUPI: "UPI",
    payWithNB: "நெட் பேங்கிங்",
    payWithCOD: "💵 டெலிவரியின் போது பணம் (COD)",
    cardNumber: "அட்டை எண்",
    cardExpiry: "காலாவதி தேதி (MM/YY)",
    cvv: "CVV",
    cardHolder: "அட்டையிலுள்ள பெயர்",
    scanQR: "டெலிவரியின் போது பணமாக செலுத்தவும்",
    mockUPIId: "vanithacoverings@puducherry",
    simulateOtp: "ஆர்டரை உறுதிசெய் (COD)",
    paymentCompleted: "🎉 ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!",
    orderId: "ஆர்டர் எண்: VC-COD-",
    thankYouOrder: "உங்கள் ஆர்டருக்கு நன்றி! நகைகள் உங்கள் புதுச்சேரி முகவரிக்கு கொண்டு வரப்படும். டெலிவரியின் போது பணமாக செலுத்தவும்.",
    finish: "முடிந்தது",
    confirmDelete: "நிச்சயமாக இந்த நகையை நீக்க வேண்டுமா?",
    editJewelBtn: "விவரம் மாற்று",
    editProductModal: "நகை விவரங்கள் புதுப்பிப்பு",
    update: "விவரங்கள் புதுப்பி"
  }
};

const categories = [
  { id: "NEW_COLLECTIONS", en: "✨ New Collections", ta: "✨ புதிய வரவுகள்", subs: [], isNew: true },
  { id: "Chains", en: "Chains", ta: "செயின்கள்", subs: [
      { id: "Chains — Baby Chains", en: "Baby Chains", ta: "பேபி செயின்கள்" },
      { id: "Chains — Long Chains", en: "Long Chains", ta: "நீளமான செயின்கள்" }
    ]
  },
  { id: "Attigai", en: "Attigai", ta: "அட்டிகை", subs: [
      { id: "Attigai — Aimpone Attigai", en: "Aimpone Attigai", ta: "ஐம்பொன் அட்டிகை" },
      { id: "Attigai — Single-Stone Attigai", en: "Single-Stone Attigai", ta: "ஒருகல் அட்டிகை" }
    ]
  },
  { id: "Aaram", en: "Aaram", ta: "ஆரம்", subs: [
      { id: "Aaram — Aimpone Aaram", en: "Aimpone Aaram", ta: "ஐம்பொன் ஆரம்" },
      { id: "Aaram — Covering Aaram", en: "Covering Aaram", ta: "கவரிங் ஆரம்" },
      { id: "Aaram — Foam Aaram Sets", en: "Foam Aaram Sets", ta: "ஃபோம் ஆரம் செட்கள்" }
    ]
  },
  { id: "Necklaces", en: "Necklaces", ta: "நெக்லஸ்கள்", subs: [
      { id: "Necklaces — Aimpone Necklaces", en: "Aimpone Necklaces", ta: "ஐம்பொன் நெக்லஸ்கள்" },
      { id: "Necklaces — Covering Necklaces", en: "Covering Necklaces", ta: "கவரிங் நெக்லஸ்கள்" },
      { id: "Necklaces — Foam Necklaces", en: "Foam Necklaces", ta: "ஃபோம் நெக்லஸ்கள்" }
    ]
  },
  { id: "Rings", en: "Rings", ta: "மோதிரங்கள்", subs: [] },
  { id: "Kamal Jewellery Sets", en: "Kamal Jewellery Sets", ta: "கமல் நகை செட்கள்", subs: [] },
  { id: "Bangles", en: "Bangles", ta: "வளையல்கள்", subs: [
      { id: "Bangles — Aimpone Bangles", en: "Aimpone Bangles", ta: "ஐம்பொன் வளையல்கள்" }
    ]
  },
  { id: "Ear Jewellery", en: "Ear Jewellery", ta: "காதணிகள்", subs: [
      { id: "Ear Jewellery — Ear Hoops", en: "Ear Hoops", ta: "காது வளையங்கள்" },
      { id: "Ear Jewellery — Flower Stud Earrings", en: "Flower Stud Earrings", ta: "பூ தோடுகள்" },
      { id: "Ear Jewellery — Dangling Earrings", en: "Dangling Earrings", ta: "தொங்கும் காதணிகள்" },
      { id: "Ear Jewellery — Foam Dangling Earrings", en: "Foam Dangling Earrings", ta: "ஃபோம் தொங்கல்கள்" }
    ]
  },
  { id: "Nethichutti", en: "Nethichutti", ta: "நெத்திச்சுட்டி", subs: [] },
  { id: "Bridal Jewellery Sets", en: "Bridal Jewellery Sets", ta: "திருமண நகை செட்கள்", subs: [] },
  { id: "Nose Pins", en: "Nose Pins", ta: "மூக்குத்திகள்", subs: [] },
  { id: "Foam Jewellery", en: "Foam Jewellery", ta: "ஃபோம் நகைகள்", subs: [
      { id: "Foam Jewellery — Foam Danglers", en: "Foam Danglers", ta: "ஃபோம் தொங்கல்கள்" },
      { id: "Foam Jewellery — Foam Necklaces", en: "Foam Necklaces", ta: "ஃபோம் நெக்லஸ்கள்" },
      { id: "Foam Jewellery — Foam Aaram Sets", en: "Foam Aaram Sets", ta: "ஃபோம் ஆரம் செட்கள்" }
    ]
  },
  { id: "Covering Jewellery", en: "Covering Jewellery", ta: "கவரிங் நகைகள்", subs: [
      { id: "Covering Jewellery — Covering Aaram", en: "Covering Aaram", ta: "கவரிங் ஆரம்" },
      { id: "Covering Jewellery — Covering Necklaces", en: "Covering Necklaces", ta: "கவரிங் நெக்லஸ்கள்" }
    ]
  }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('vanitha_user') || 'null');
  });

  // State flags for Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login'); // login, register, forgot
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Delivery Address State
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    phone: '',
    doorNo: '',
    street: '',
    area: '',
    district: 'Puducherry',
    pincode: ''
  });
  const [addressError, setAddressError] = useState('');

  // Auth form states
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerRole, setRegisterRole] = useState('CUSTOMER');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // OTP states for registration
  const [regOtpMode, setRegOtpMode] = useState('PHONE'); // 'PHONE' or 'EMAIL'
  const [regOtpDest, setRegOtpDest] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpValue, setRegOtpValue] = useState('');
  const [simulatedOtpDisplay, setSimulatedOtpDisplay] = useState('');
  const [regEmail, setRegEmail] = useState('');

  // OTP states for forgot-password reset
  const [resetUsername, setResetUsername] = useState('');
  const [resetOtpMode, setResetOtpMode] = useState('PHONE');
  const [resetOtpDest, setResetOtpDest] = useState('');
  const [resetOtpSent, setResetOtpSent] = useState(false);
  const [resetOtpValue, setResetOtpValue] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');

  // Store data states
  const [jewels, setJewels] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Form states for adding/editing product
  const [formData, setFormData] = useState({
    nameEn: '',
    nameTa: '',
    descriptionEn: '',
    descriptionTa: '',
    price: '',
    category: 'Chains — Baby Chains',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Live Camera Capture Modal States
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedCameraPhotos, setCapturedCameraPhotos] = useState([]);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Chatbot widget states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [uploadedBase64, setUploadedBase64] = useState(''); 
  const messagesEndRef = useRef(null);

  // Admin Notification Modal State
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('orders'); // 'orders' | 'requirements'

  // User & Admin Orders States
  const [userOrders, setUserOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [deliveryDateInputs, setDeliveryDateInputs] = useState({});

  // Fullscreen Lightbox Image Gallery Modal State
  const [fullscreenImage, setFullscreenImage] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  // Active view index for each jewel card: { [jewelId]: index }
  const [cardActiveImageIndex, setCardActiveImageIndex] = useState({});

  // Helper to split multi-view image strings
  const getJewelImages = (imageUrlStr) => {
    if (!imageUrlStr) return [];
    return imageUrlStr.split('|||').filter(Boolean);
  };

  // Helper: true if jewel was added within the last 3 days
  const isNewArrival = (jewel) => {
    if (!jewel.createdAt) return false;
    const created = new Date(jewel.createdAt);
    const now = new Date();
    const diffHours = (now - created) / (1000 * 60 * 60);
    return diffHours <= 72; // 3 days = 72 hours
  };

  const openFullscreenGallery = (images, startIndex = 0, title = '') => {
    const list = Array.isArray(images) ? images.filter(Boolean) : [images].filter(Boolean);
    if (list.length === 0) return;
    setFullscreenImage({
      isOpen: true,
      images: list,
      currentIndex: startIndex < list.length ? startIndex : 0,
      title: title || ''
    });
  };

  const closeFullscreenGallery = () => {
    setFullscreenImage({ isOpen: false, images: [], currentIndex: 0, title: '' });
  };

  const nextFullscreenImage = () => {
    setFullscreenImage(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevFullscreenImage = () => {
    setFullscreenImage(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenImage.isOpen) return;
      if (e.key === 'Escape') closeFullscreenGallery();
      if (e.key === 'ArrowRight') nextFullscreenImage();
      if (e.key === 'ArrowLeft') prevFullscreenImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage.isOpen, fullscreenImage.images.length]);

  // Auto-translate helper for English text to Tamil
  const autoTranslateToTamil = (text) => {
    if (!text) return '';
    const dict = {
      'chain': 'செயின்',
      'chains': 'செயின்கள்',
      'baby': 'பேபி',
      'long': 'நீளமான',
      'attigai': 'அட்டிகை',
      'aimpone': 'ஐம்பொன்',
      'single-stone': 'ஒருகல்',
      'aaram': 'ஆரம்',
      'covering': 'கவரிங்',
      'foam': 'ஃபோம்',
      'necklace': 'நெக்லஸ்',
      'necklaces': 'நெக்லஸ்கள்',
      'ring': 'மோதிரம்',
      'rings': 'மோதிரங்கள்',
      'kamal': 'கமல்',
      'bangle': 'வளையல்',
      'bangles': 'வளையல்கள்',
      'ear': 'காது',
      'hoop': 'வளையம்',
      'flower': 'பூ',
      'stud': 'தோடு',
      'dangling': 'தொங்கட்டான்',
      'earring': 'தோடுகள்',
      'earrings': 'தோடுகள்',
      'nethichutti': 'நெத்திச்சுட்டி',
      'bridal': 'திருமண',
      'set': 'செட்',
      'sets': 'செட்கள்',
      'nose': 'மூக்கு',
      'pin': 'மூக்குத்தி',
      'pins': 'மூக்குத்திகள்',
      'gold': 'தங்கம்',
      'plated': 'பூச்சுக் கொண்ட',
      'design': 'டிசைன்',
      'jewel': 'நகை',
      'jewellery': 'நகைகள்'
    };

    let result = text;
    Object.keys(dict).forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'gi');
      result = result.replace(regex, dict[word]);
    });
    return result;
  };

  // Cart state
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  // Buy / Payment Flow state
  const [payMethod, setPayMethod] = useState('cod'); // cod (Cash on Delivery)
  const [paymentFinished, setPaymentFinished] = useState(false);
  const [mockTxnId, setMockTxnId] = useState('');
  const [cardForm, setCardForm] = useState({
    no: '', expiry: '', cvv: '', name: ''
  });

  const addToCart = (jewel) => {
    setCart(prev => {
      const existing = prev.find(item => item.jewel.id === jewel.id);
      if (existing) {
        return prev.map(item =>
          item.jewel.id === jewel.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { jewel, quantity: 1 }];
    });
  };

  const updateCartQuantity = (jewelId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.jewel.id === jewelId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (jewelId) => {
    setCart(prev => prev.filter(item => item.jewel.id !== jewelId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.jewel.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const t = translations[lang];

  // Load Jewels from Backend
  const fetchJewels = () => {
    fetch(`${API_BASE}/jewels`)
      .then(res => res.json())
      .then(data => setJewels(data))
      .catch(err => console.error("Error loading products", err));
  };

  // Load Requirements for Admin ONLY
  const fetchRequirements = () => {
    if (currentUser?.role === 'ADMIN') {
      fetch(`${API_BASE}/requirements`)
        .then(res => {
          if (!res.ok) return fetch(`${API_BASE}/chatbot/requirements`);
          return res;
        })
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setRequirements(data); })
        .catch(err => console.error("Error loading requirements", err));
    } else {
      setRequirements([]);
    }
  };

  // Load Orders for Authenticated User ONLY
  const fetchUserOrders = () => {
    if (currentUser && currentUser.username) {
      fetch(`${API_BASE}/orders/user/${currentUser.username}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUserOrders(data);
          }
        })
        .catch(err => console.error("Error loading user orders", err));
    } else {
      setUserOrders([]);
    }
  };

  // Load Orders for Admin ONLY
  const fetchAdminOrders = () => {
    if (currentUser?.role === 'ADMIN') {
      fetch(`${API_BASE}/orders`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setAdminOrders(data);
          }
        })
        .catch(err => console.error("Error loading admin orders", err));
    } else {
      setAdminOrders([]);
    }
  };

  const handleUpdateDeliveryDate = (orderId) => {
    const expectedDate = deliveryDateInputs[orderId];
    if (!expectedDate || !expectedDate.trim()) {
      return;
    }

    // Optimistic UI state update (silent, no alert popups)
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, expectedDeliveryDate: expectedDate, status: o.status === 'PENDING' ? 'CONFIRMED' : o.status } : o));
    setUserOrders(prev => prev.map(o => o.id === orderId ? { ...o, expectedDeliveryDate: expectedDate, status: o.status === 'PENDING' ? 'CONFIRMED' : o.status } : o));

    fetch(`${API_BASE}/orders/${orderId}/delivery-date`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expectedDeliveryDate: expectedDate,
        status: 'CONFIRMED'
      })
    })
    .then(res => res.json())
    .then(() => {
      fetchAdminOrders();
      fetchUserOrders();
    })
    .catch(err => console.error("Error updating delivery date", err));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // Optimistic UI state update (silent, no alert popups)
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setUserOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
      fetchAdminOrders();
      fetchUserOrders();
    })
    .catch(err => console.error("Error updating order status", err));
  };

  useEffect(() => {
    fetchJewels();
  }, []);

  useEffect(() => {
    fetchRequirements();
    fetchUserOrders();
    fetchAdminOrders();

    if (currentUser?.role === 'ADMIN') {
      const interval = setInterval(() => {
        fetchRequirements();
        fetchAdminOrders();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      setChatMessages([
        { sender: 'bot', text: t.chatbotWelcome }
      ]);
    }
    // Auto Scroll Chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isChatOpen, chatMessages, lang]);

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernameOrPhone: usernameOrPhone,
        password: loginPassword
      })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      return data;
    })
    .then(userData => {
      localStorage.setItem('vanitha_user', JSON.stringify(userData));
      setCurrentUser(userData);
      setShowAuthModal(false);
      setUsernameOrPhone('');
      setLoginPassword('');
    })
    .catch(err => {
      setAuthError(err.message);
    });
  };

  // Send OTP helper
  const sendOtp = (destination, mode, onSuccess) => {
    setAuthError('');
    fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination, mode })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP send failed');
      return data;
    })
    .then(data => {
      // Show OTP in alert for simulation (in production remove this)
      alert(`OTP sent to ${destination}: ${data.otp}`);
      onSuccess();
    })
    .catch(err => setAuthError(err.message));
  };

  const handleSendRegisterOtp = (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    if (!registerPhone || registerPhone.trim().length < 10) {
      setAuthError(lang === 'en' ? 'Please enter a valid 10-digit phone number' : 'செல்லுபடியாகும் 10-இலக்க தொலைபேசி எண்ணை உள்ளிடவும்');
      return;
    }
    if (!registerUsername.trim() || !registerPassword.trim()) {
      setAuthError(lang === 'en' ? 'Please fill in username and password first' : 'முதலில் பயனர் பெயர் மற்றும் கடவுச்சொல்லை நிரப்பவும்');
      return;
    }

    fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: registerPhone.trim(), mode: 'PHONE' })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP send failed');
      return data;
    })
    .then(() => {
      setRegOtpSent(true);
      setAuthError('');
    })
    .catch(err => setAuthError(err.message));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError('');

    const uName = registerUsername.trim();
    const phone = registerPhone.trim();
    const pass = registerPassword;
    const confirmPass = registerConfirmPassword;

    if (!uName) {
      setAuthError(lang === 'en' ? 'Please enter a unique username' : 'பயனர் பெயரை உள்ளிடவும்');
      return;
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      setAuthError(lang === 'en' ? 'Phone number must be exactly 10 digits (e.g. 9876543210)' : 'தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்');
      return;
    }

    if (pass.length < 8) {
      setAuthError(lang === 'en' ? 'Password must be at least 8 characters long' : 'கடவுச்சொல் குறைந்தபட்சம் 8 எழுத்துக்கள் இருக்க வேண்டும்');
      return;
    }

    if (!/[0-9]/.test(pass)) {
      setAuthError(lang === 'en' ? 'Password must contain at least one number (0-9)' : 'கடவுச்சொல்லில் குறைந்தபட்சம் ஒரு எண் (0-9) இருக்க வேண்டும்');
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
      setAuthError(lang === 'en' ? 'Password must contain at least one special character (e.g. @, #, $, !)' : 'கடவுச்சொல்லில் ஒரு சிறப்பு குறியீடு (எ.கா @, #, !) இருக்க வேண்டும்');
      return;
    }

    if (pass !== confirmPass) {
      setAuthError(lang === 'en' ? 'Password and Confirm Password do not match' : 'கடவுச்சொல் மற்றும் உறுதிப்படுத்தப்பட்ட கடவுச்சொல் பொருந்தவில்லை');
      return;
    }

    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: uName,
        password: pass,
        phoneNumber: phone,
        role: 'CUSTOMER'
      })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return data;
    })
    .then(() => {
      fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrPhone: uName, password: pass })
      })
      .then(r => r.json())
      .then(uData => {
        localStorage.setItem('vanitha_user', JSON.stringify(uData));
        setCurrentUser(uData);
        setShowAuthModal(false);
        setRegisterUsername('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
        setRegisterPhone('');
      });
    })
    .catch(err => setAuthError(err.message));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setAuthError('');
    fetch(`${API_BASE}/auth/forgot-password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernameOrPhone: resetUsername,
        otp: '0000',
        otpDestination: resetOtpDest,
        newPassword: resetNewPass
      })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
      return data;
    })
    .then(() => {
      setAuthError('');
      setAuthType('login');
      setResetUsername('');
      setResetOtpDest('');
      setResetNewPass('');
      alert(lang === 'en' ? '✅ Password reset successful! Please login with your new password.' : '✅ கடவுச்சொல் வெற்றிகரமாக மீட்டமைக்கப்பட்டது! புதிய கடவுச்சொல்லுடன் உள்நுழையவும்.');
    })
    .catch(err => setAuthError(err.message));
  };

  // Log out
  const handleLogout = () => {
    localStorage.removeItem('vanitha_user');
    setCurrentUser(null);
    setUserOrders([]);
    setAdminOrders([]);
    setRequirements([]);
    setShowOrdersModal(false);
    setShowNotifModal(false);
  };

  // Upload/Edit Jewel submit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    const isEdit = (authType === 'edit');
    const endpoint = isEdit ? `/jewels/update/${editingId}` : '/jewels/add';
    const method = isEdit ? 'PUT' : 'POST';

    // Auto translate if Tamil fields are empty
    const finalPayload = {
      ...formData,
      nameTa: formData.nameTa.trim() || autoTranslateToTamil(formData.nameEn),
      descriptionTa: formData.descriptionTa.trim() || autoTranslateToTamil(formData.descriptionEn || formData.nameEn)
    };

    fetch(`${API_BASE}${endpoint}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload)
    })
    .then(async res => {
      const data = res.ok ? await res.json() : null;
      if (!res.ok) throw new Error("Operation failed");
      return data;
    })
    .then(() => {
      fetchJewels();
      setShowAddModal(false);
      setShowEditModal(false);
      setFormData({
        nameEn: '', nameTa: '', descriptionEn: '', descriptionTa: '', price: '', category: 'Chains — Baby Chains', imageUrl: ''
      });
      setEditingId(null);
    })
    .catch(err => alert("Error: " + err.message));
  };

  // Open Add Jewel modal with clean empty form
  const handleOpenAddModal = () => {
    setAuthType('add');
    setEditingId(null);
    setFormData({
      nameEn: '',
      nameTa: '',
      descriptionEn: '',
      descriptionTa: '',
      price: '',
      category: 'Chains — Baby Chains',
      imageUrl: ''
    });
    setShowAddModal(true);
    setShowEditModal(false);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (confirm(t.confirmDelete)) {
      fetch(`${API_BASE}/jewels/delete/${id}`, {
        method: 'DELETE'
      })
      .then(() => fetchJewels())
      .catch(err => console.error(err));
    }
  };

  // Convert uploaded image files to Base64 list (Front, Back views, etc.)
  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const readFilesAsBase64 = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFilesAsBase64).then(newImages => {
      setFormData(prev => {
        const currentImages = prev.imageUrl ? prev.imageUrl.split('|||').filter(Boolean) : [];
        const combined = [...currentImages, ...newImages];
        return { ...prev, imageUrl: combined.join('|||') };
      });
    });
  };

  // Remove a specific image view from admin upload form
  const handleRemoveImageIndex = (indexToRemove) => {
    setFormData(prev => {
      const currentImages = prev.imageUrl ? prev.imageUrl.split('|||').filter(Boolean) : [];
      const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
      return { ...prev, imageUrl: updated.join('|||') };
    });
  };

  // Live Camera Handlers
  const handleOpenLiveCamera = () => {
    setCapturedCameraPhotos([]);
    setShowCameraModal(true);
    setTimeout(() => {
      initCameraStream('environment');
    }, 250);
  };

  const initCameraStream = (facingMode) => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      .then(stream => {
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            mediaStreamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
          })
          .catch(err => {
            console.error("Camera access failed:", err);
            alert(lang === 'en' ? 'Camera access failed or permission denied.' : 'கேமரா அனுமதி மறுக்கப்பட்டது.');
          });
      });
    } else {
      alert(lang === 'en' ? 'Live camera access is not supported on this browser.' : 'உங்கள் உலாவி நேரலை கேமராவை ஆதரிக்கவில்லை.');
    }
  };

  const handleSwitchCameraFacingMode = () => {
    const nextMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
    setCameraFacingMode(nextMode);
    initCameraStream(nextMode);
  };

  const handleCaptureCameraPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedCameraPhotos(prev => [...prev, dataUrl]);
  };

  const handleRemoveCapturedCameraPhoto = (idxToRemove) => {
    setCapturedCameraPhotos(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleCloseCameraModal = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setShowCameraModal(false);
  };

  const handleSaveCapturedCameraPhotos = () => {
    if (capturedCameraPhotos.length > 0) {
      setFormData(prev => {
        const currentImages = prev.imageUrl ? prev.imageUrl.split('|||').filter(Boolean) : [];
        const combined = [...currentImages, ...capturedCameraPhotos];
        return { ...prev, imageUrl: combined.join('|||') };
      });
    }
    handleCloseCameraModal();
  };

  const handleChatImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send chatbot message / requirement
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim() && !uploadedBase64) return;

    if (!currentUser) {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: userInput },
        { sender: 'bot', text: t.guestMessage }
      ]);
      setUserInput('');
      setUploadedBase64('');
      return;
    }

    const newMessage = userInput;
    const refImage = uploadedBase64;

    // Add customer message locally
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: newMessage, image: refImage }
    ]);
    
    // Call API to Save Requirement
    fetch(`${API_BASE}/chatbot/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser.username,
        phoneNumber: currentUser.phoneNumber || currentUser.phone || '',
        message: newMessage,
        imageUrl: refImage
      })
    })
    .then(res => {
      if (!res.ok) {
        return fetch(`${API_BASE}/requirements`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: currentUser.username,
            phoneNumber: currentUser.phoneNumber || currentUser.phone || '',
            message: newMessage,
            imageUrl: refImage
          })
        });
      }
      return res;
    })
    .then(res => res.json())
    .then(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: lang === 'en'
            ? `✨ Thank you ${currentUser.username}! Your requirement details and reference image have been sent directly to the Owner Admin Portal. The owner will review your request and call you at ${currentUser.phoneNumber}.`
            : `✨ நன்றி ${currentUser.username}! உங்கள் தேவை விவரங்கள் மற்றும் படம் நேரடியாக உரிமையாளர் கணக்கிற்கு அனுப்பப்பட்டது. உரிமையாளர் உங்கள் படத்தை பார்த்து உங்கள் எண் ${currentUser.phoneNumber}-க்கு தொடர்பு கொள்வார்.`
        }
      ]);
      fetchRequirements();
    })
    .catch(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Error submitting requirement. Try again.' }
      ]);
    });

    setUserInput('');
    setUploadedBase64('');
  };

  // Checkout flow: open Address Modal first
  const triggerCartCheckout = () => {
    if (cart.length === 0) return;
    setShowCartModal(false);
    setAddressError('');
    // Pre-fill name and phone from logged-in user
    setDeliveryAddress(prev => ({
      ...prev,
      fullName: prev.fullName || currentUser?.username || '',
      phone: prev.phone || currentUser?.phoneNumber || ''
    }));
    setShowAddressModal(true);
  };

  // Address form submit: Puducherry check then proceed to payment
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setAddressError('');
    const dist = deliveryAddress.district.trim().toLowerCase();
    const isPuducherry = dist === 'puducherry' || dist === 'pondicherry' ||
      dist === 'புதுச்சேரி' || dist === 'புதுச்சேரி' || dist === 'pondichéry';
    if (!isPuducherry) {
      setAddressError(
        lang === 'en'
          ? '🚚 Sorry! We currently deliver only within Puducherry district. Please update your district.'
          : '🚚 மன்னிக்கவும்! நாங்கள் தற்போது புதுச்சேரி மாவட்டத்தில் மட்டுமே டெலிவரி செய்கிறோம்.'
      );
      return;
    }
    // Verify pincode starts with 605 (Puducherry pincodes)
    const pin = deliveryAddress.pincode.trim();
    if (pin && pin.length === 6 && !pin.startsWith('605')) {
      setAddressError(
        lang === 'en'
          ? '📮 Invalid pincode for Puducherry. Puducherry pincodes start with 605.'
          : '📮 புதுச்சேரிக்கான தப்பான பின்கோடு. புதுச்சேரி பின்கோடுகள் 605 இல் தொடங்கும்.'
      );
      return;
    }
    // All good → open payment
    setShowAddressModal(false);
    setMockTxnId(Math.floor(10000000 + Math.random() * 90000000).toString());
    setPaymentFinished(false);
    setShowPaymentModal(true);
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.username) {
      alert(lang === 'en' ? 'Please log in to place an order.' : 'ஆர்டர் செய்ய தயவுசெய்து உள்நுழையவும்.');
      setShowPaymentModal(false);
      setShowAddressModal(false);
      setAuthType('login');
      setShowAuthModal(true);
      return;
    }

    const newOrder = {
      orderIdStr: `VC-COD-${mockTxnId}`,
      username: currentUser.username,
      fullName: deliveryAddress.fullName,
      phone: deliveryAddress.phone,
      doorNo: deliveryAddress.doorNo,
      street: deliveryAddress.street,
      area: deliveryAddress.area,
      district: deliveryAddress.district,
      pincode: deliveryAddress.pincode,
      itemsSummary: cart.map(item => `${lang === 'en' ? item.jewel.nameEn : item.jewel.nameTa} x${item.quantity} (₹${((item.jewel.price || 0) * item.quantity).toLocaleString()})`).join(', '),
      totalAmount: cartTotal,
      paymentMethod: 'Cash or Online UPI Scanner on Delivery (No Cards/Bank Transfer)',
      status: 'PENDING'
    };

    fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(() => {
      setPaymentFinished(true);
      fetchUserOrders();
      fetchAdminOrders();
    })
    .catch(err => {
      console.error("Order save error", err);
      setPaymentFinished(true);
    });
  };

  const finishPayment = () => {
    setShowPaymentModal(false);
    setCart([]);
  };

  // Filters logic
  const filteredJewels = jewels.filter(j => {
    // New Collections: only show jewels added within 72 hours
    if (currentCategory === 'NEW_COLLECTIONS') {
      const matchesSearch = searchQuery === '' ||
        j.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.nameTa.toLowerCase().includes(searchQuery.toLowerCase());
      return isNewArrival(j) && matchesSearch;
    }

    // Category match: either "all" or matching prefix
    const matchesCategory = currentCategory === 'all' || 
      j.category === currentCategory || 
      j.category.startsWith(currentCategory + ' —');

    // Search query match (English/Tamil)
    const matchesSearch = searchQuery === '' ||
      j.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.nameTa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.descriptionTa.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Global Header */}
      <header className="header animate-fade-in">
        <div className="header-brand">
          <ShoppingBag className="icon-gold" style={{ color: 'var(--gold)' }} size={32} />
          <div className="header-logo">
            {t.siteName}
            <span>{t.headerTagline}</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ flexGrow: 0.5, maxWidth: '400px' }} className="search-bar">
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Search for jewels..." : "நகைகளைத் தேடுங்கள்..."}
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: '24px', padding: '8px 16px' }}
          />
        </div>

        <div className="header-nav">
          {/* Language Toggle */}
          <button className="btn-lang" onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}>
            <Globe size={16} style={{ marginRight: '6px', inlineSize: '16px' }} />
            {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>

          {/* Notification Bell for Admin OR Cart & Orders Buttons for Customer/Guest */}
          {currentUser?.role === 'ADMIN' ? (
            <button
              className="btn btn-gold"
              onClick={() => { setAdminActiveTab('orders'); setShowNotifModal(true); }}
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Admin Portal - Orders & Requirements"
            >
              <Bell size={18} />
              <span>{lang === 'en' ? 'Orders & Requests' : 'ஆர்டர்கள் & தேவைகள்'}</span>
              {(adminOrders.length + requirements.length) > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: '#c62828', color: '#fff',
                  fontSize: '0.75rem', fontWeight: '700', borderRadius: '50%',
                  minWidth: '20px', height: '20px', padding: '0 4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--gold)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  {adminOrders.length + requirements.length}
                </span>
              )}
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                className="btn btn-gold"
                onClick={() => {
                  if (!currentUser) {
                    setAuthType('login');
                    setShowAuthModal(true);
                  } else {
                    setShowCartModal(true);
                  }
                }}
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title={t.viewCart}
              >
                <ShoppingBag size={18} />
                <span>{t.viewCart}</span>
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: 'var(--primary)', color: '#fff',
                    fontSize: '0.75rem', fontWeight: '700', borderRadius: '50%',
                    minWidth: '20px', height: '20px', padding: '0 4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--gold)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {currentUser && currentUser.role !== 'ADMIN' && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowOrdersModal(true)}
                  style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fff', borderColor: 'var(--gold)' }}
                  title="View My Placed Orders"
                >
                  <Package size={18} style={{ color: 'var(--gold)' }} />
                  <span>{lang === 'en' ? 'My Orders' : 'என் ஆர்டர்கள்'}</span>
                  {userOrders.length > 0 && (
                    <span style={{
                      background: 'var(--gold)', color: '#1a0005',
                      fontSize: '0.75rem', fontWeight: '800', borderRadius: '12px',
                      padding: '1px 7px', marginLeft: '4px'
                    }}>
                      {userOrders.length}
                    </span>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Admin Dashboard / User Status */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="user-greeting" style={{ fontSize: '0.95rem' }}>
                {lang === 'en' ? 'Hello' : 'அன்பான'}, <strong>{currentUser.username}</strong> ({currentUser.role === 'ADMIN' ? t.adminBtn : 'Customer'})
              </span>
              
              {currentUser.role === 'ADMIN' && (
                <button className="btn btn-gold" onClick={handleOpenAddModal}>
                  <Plus size={16} />
                  {t.addJewelBtn}
                </button>
              )}

              <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '6px 12px', color: '#fff', borderColor: 'var(--gold)' }}>
                <LogOut size={16} />
                {t.logout}
              </button>
            </div>
          ) : (
            <button className="btn btn-gold" onClick={() => { setAuthType('login'); setShowAuthModal(true); }}>
              <UserIcon size={16} />
              {t.loginBtn}
            </button>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero animate-fade-in">
        <h1>{t.siteName}</h1>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gold)', marginBottom: '1.5rem' }}>{t.tagline}</p>
        {!currentUser && (
          <button className="btn btn-gold" onClick={() => { setAuthType('register'); setShowAuthModal(true); }} style={{ padding: '12px 28px', fontSize: '1.1rem' }}>
            {lang === 'en' ? 'Start Ordering Now' : 'இப்போதே ஆர்டர் செய்யுங்கள்'}
          </button>
        )}
      </section>

      {/* Main Shop Section */}
      <main className="shop-layout animate-fade-in">
        {/* Mobile Horizontal Category Filter Bar */}
        <div className="mobile-filter-wrapper">
          <div className="mobile-filter-header">
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary)' }}>
              {lang === 'en' ? '💎 Quick Category Filter:' : '💎 விரைவு நகை பிரிவுகள்:'}
            </span>
          </div>
          <div className="mobile-pills-row">
            <button
              className={`filter-pill ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => {
                setCurrentCategory('all');
              }}
            >
              {lang === 'en' ? 'Show All' : 'அனைத்தும்'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-pill ${currentCategory === cat.id ? 'active' : ''}`}
                style={cat.isNew ? { background: currentCategory === cat.id ? 'linear-gradient(135deg, #7a0c20, #d4af37)' : 'linear-gradient(135deg, #d4af37, #a07800)', color: '#fff', border: 'none' } : {}}
                onClick={() => {
                  setCurrentCategory(cat.id);
                }}
              >
                {lang === 'en' ? cat.en : cat.ta}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Sidebar (Desktop) */}
        <aside className="sidebar desktop-sidebar">
          <h3>
            {t.categoriesTitle}
          </h3>
          
          <div className="cat-tree-node">
            <div 
              className={`cat-parent ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('all')}
            >
              {lang === 'en' ? 'Show All' : 'அனைத்தும் காட்டு'}
            </div>
          </div>

          {categories.map((cat) => {
            const hasSubs = cat.subs && cat.subs.length > 0;
            const isSelectedParent = currentCategory === cat.id;

            // Special rendering for New Collections
            if (cat.isNew) {
              return (
                <div key={cat.id} className="cat-tree-node" style={{ marginBottom: '1rem' }}>
                  <div
                    onClick={() => setCurrentCategory(cat.id)}
                    style={{
                      background: isSelectedParent
                        ? 'linear-gradient(135deg, #7a0c20, #d4af37)'
                        : 'linear-gradient(135deg, #d4af37, #a07800)',
                      color: isSelectedParent ? '#fff' : '#3b0a10',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.92rem',
                      boxShadow: '0 3px 12px rgba(212,175,55,0.35)',
                      letterSpacing: '0.3px',
                      border: '1.5px solid #d4af37',
                      animation: 'glowPulse 2s infinite'
                    }}
                  >
                    <span>{lang === 'en' ? cat.en : cat.ta}</span>
                    <span style={{ fontSize: '0.7rem', background: '#fff', color: '#7a0c20', padding: '2px 7px', borderRadius: '10px', fontWeight: '800' }}>3 Days</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={cat.id} className="cat-tree-node">
                <div 
                  className={`cat-parent ${isSelectedParent ? 'active' : ''}`}
                  onClick={() => setCurrentCategory(cat.id)}
                >
                  <span>{lang === 'en' ? cat.en : cat.ta}</span>
                  {hasSubs && <ChevronRight size={14} />}
                </div>

                {hasSubs && (
                  <div className="cat-subs">
                    {cat.subs.map((sub) => {
                      const isSelectedSub = currentCategory === sub.id;
                      return (
                        <span 
                          key={sub.id} 
                          className={`cat-sub ${isSelectedSub ? 'active' : ''}`}
                          onClick={() => setCurrentCategory(sub.id)}
                        >
                          {lang === 'en' ? sub.en : sub.ta}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        {/* Products Section */}
        <section className="products-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ color: currentCategory === 'NEW_COLLECTIONS' ? 'transparent' : 'var(--primary)',
              background: currentCategory === 'NEW_COLLECTIONS' ? 'linear-gradient(135deg, #d4af37, #a07800)' : 'none',
              WebkitBackgroundClip: currentCategory === 'NEW_COLLECTIONS' ? 'text' : 'unset',
              backgroundClip: currentCategory === 'NEW_COLLECTIONS' ? 'text' : 'unset'
            }}>
              {currentCategory === 'NEW_COLLECTIONS'
                ? (lang === 'en' ? '✨ New Collections' : '✨ புதிய வரவுகள்')
                : currentCategory === 'all' 
                  ? t.allJewels 
                  : (lang === 'en' 
                      ? (categories.find(c => c.id === currentCategory)?.en || currentCategory.split(' — ')[1] || currentCategory)
                      : (categories.find(c => c.id === currentCategory)?.ta || currentCategory.split(' — ')[1] || currentCategory))}
            </h2>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>{filteredJewels.length} {lang === 'en' ? 'Items Found' : 'நகைகள் உள்ளன'}</span>
          </div>

          {currentCategory === 'NEW_COLLECTIONS' && (
            <div style={{
              background: 'linear-gradient(135deg, #3b0a10, #7a0c20)',
              borderLeft: '4px solid #d4af37',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 16px rgba(90,12,26,0.2)'
            }}>
              <span style={{ fontSize: '1.6rem' }}>🆕</span>
              <div>
                <strong style={{ color: '#d4af37', fontFamily: 'var(--font-royal)', fontSize: '1rem' }}>
                  {lang === 'en' ? 'Freshly Arrived — Last 3 Days Only!' : 'புதிதாக வந்த நகைகள் — கடந்த 3 நாட்கள் மட்டும்!'}
                </strong>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', marginTop: '3px' }}>
                  {lang === 'en'
                    ? 'These jewels were uploaded within the past 72 hours. After 3 days they move to their own category.'
                    : 'இந்த நகைகள் கடந்த 72 மணி நேரத்தில் ஏற்றப்பட்டவை. 3 நாட்களுக்குப் பிறகு அவற்றின் சொந்த பிரிவில் மட்டுமே காட்டப்படும்.'}
                </p>
              </div>
            </div>
          )}

          {filteredJewels.length === 0 ? (
            <div style={{ textShadow: 'none', background: '#fff', textAlign: 'center', padding: '4rem', borderRadius: '12px' }}>
              <HelpCircle size={48} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.2rem', color: '#888' }}>
                {lang === 'en' ? "No jewels uploaded under this category yet." : "இந்தப்பிரிவில் இன்னும் நகைகள் ஏதும் ஏற்றப்படவில்லை."}
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredJewels.map((jewel) => {
                const jewelImages = getJewelImages(jewel.imageUrl);
                const activeImgIndex = cardActiveImageIndex[jewel.id] || 0;
                const displayImg = jewelImages[activeImgIndex] || jewelImages[0];

                return (
                  <div key={jewel.id} className="card product-card animate-fade-in">
                    <div 
                      className="product-image"
                      onClick={() => openFullscreenGallery(jewelImages, activeImgIndex, lang === 'en' ? jewel.nameEn : jewel.nameTa)}
                      style={{ cursor: jewelImages.length > 0 ? 'pointer' : 'default' }}
                      title={jewelImages.length > 0 ? (lang === 'en' ? 'Click for Full Screen View' : 'முழு திரையில் பார்க்க சொடுக்கவும்') : ''}
                    >
                      {displayImg ? (
                        <img src={displayImg} alt={jewel.nameEn} />
                      ) : (
                        <div className="placeholder-image">
                          <ShoppingBag size={42} style={{ color: 'var(--gold)' }} />
                          <span>Vanitha Coverings</span>
                        </div>
                      )}

                      {/* Fullscreen Zoom Badge */}
                      {jewelImages.length > 0 && (
                        <div className="image-zoom-badge">
                          <Maximize2 size={13} />
                          <span>{lang === 'en' ? 'Full View' : 'முழு படம்'}</span>
                        </div>
                      )}

                      {/* Multi-view count badge */}
                      {jewelImages.length > 1 && (
                        <div className="image-views-badge">
                          <Layers size={13} />
                          <span>{jewelImages.length} {lang === 'en' ? 'Views' : 'கோணங்கள்'}</span>
                        </div>
                      )}

                      {/* NEW Arrival Badge */}
                      {isNewArrival(jewel) && (
                        <div style={{
                          position: 'absolute', top: '8px', left: '8px',
                          background: 'linear-gradient(135deg, #d4af37, #b8860b)',
                          color: '#1a0005',
                          fontSize: '0.68rem', fontWeight: '800',
                          padding: '3px 9px', borderRadius: '12px',
                          letterSpacing: '0.5px', boxShadow: '0 2px 8px rgba(212,175,55,0.5)',
                          animation: 'glowPulse 2s infinite',
                          textTransform: 'uppercase'
                        }}>
                          ✨ {lang === 'en' ? 'New' : 'புதியது'}
                        </div>
                      )}
                    </div>

                    <div className="product-info">
                      <span className="product-category">{jewel.category}</span>
                      <h3 className="product-title">{lang === 'en' ? jewel.nameEn : jewel.nameTa}</h3>
                      
                      {/* Multi-View Thumbnails Selector */}
                      {jewelImages.length > 1 && (
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                          {jewelImages.map((imgSrc, imgIdx) => (
                            <button
                              key={imgIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardActiveImageIndex(prev => ({ ...prev, [jewel.id]: imgIdx }));
                              }}
                              style={{
                                padding: '2px 8px',
                                fontSize: '0.72rem',
                                borderRadius: '4px',
                                border: activeImgIndex === imgIdx ? '1.5px solid var(--primary)' : '1px solid #ccc',
                                background: activeImgIndex === imgIdx ? 'var(--primary)' : '#fff',
                                color: activeImgIndex === imgIdx ? '#fff' : '#444',
                                cursor: 'pointer',
                                fontWeight: '600'
                              }}
                            >
                              {imgIdx === 0 ? (lang === 'en' ? 'Front View' : 'முன்பக்கம்') : imgIdx === 1 ? (lang === 'en' ? 'Back View' : 'பின்பக்கம்') : `View ${imgIdx + 1}`}
                            </button>
                          ))}
                        </div>
                      )}

                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                        <strong>{t.detailsLabel}</strong> 
                        {lang === 'en' ? jewel.descriptionEn : jewel.descriptionTa}
                      </p>
                    
                    <div className="product-price">
                      ₹{jewel.price ? jewel.price.toLocaleString() : 'N/A'}
                    </div>

                    <div className="product-actions">
                      {currentUser?.role === 'ADMIN' ? (
                        <>
                          <button className="btn btn-secondary" style={{ flexGrow: 1 }} onClick={() => {
                            setFormData({
                              nameEn: jewel.nameEn,
                              nameTa: jewel.nameTa,
                              descriptionEn: jewel.descriptionEn || '',
                              descriptionTa: jewel.descriptionTa || '',
                              price: jewel.price,
                              category: jewel.category,
                              imageUrl: jewel.imageUrl
                            });
                            setEditingId(jewel.id);
                            setAuthType('edit');
                            setShowEditModal(true);
                          }} title={t.editJewelBtn}>
                            {t.editJewelBtn}
                          </button>
                          <button className="btn btn-secondary" onClick={() => handleDeleteProduct(jewel.id)} style={{ color: 'red', borderColor: 'orange' }} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : currentUser ? (
                        <button 
                          className="btn btn-primary" 
                          style={{ flexGrow: 1 }} 
                          onClick={() => addToCart(jewel)}
                        >
                          <Plus size={16} />
                          {cart.find(i => i.jewel.id === jewel.id) 
                            ? `${t.inCart} (${cart.find(i => i.jewel.id === jewel.id).quantity})` 
                            : t.addToCart}
                        </button>
                      ) : (
                        <button className="btn btn-secondary" style={{ flexGrow: 1 }} onClick={() => { setAuthType('login'); setShowAuthModal(true); }}>
                          🔒 {lang === 'en' ? 'Login to Order' : 'ஆர்டர் செய்ய உள்நுழைக'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>
      </main>

      {/* Auth Modal (Login / Register / Forgot Password) */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-slide-up">
            <X className="modal-close" onClick={() => { setShowAuthModal(false); setAuthError(''); }} />
            
            {authType === 'login' && (
              <form onSubmit={handleLogin}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>{t.loginModal}</h2>
                {authError && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>{authError}</div>}
                
                <div className="form-group">
                  <label>{t.usernameOrPhone}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={usernameOrPhone}
                    onChange={(e) => setUsernameOrPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>{t.password}</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => { setAuthType('forgot'); setResetStep(1); setAuthError(''); }}>
                    {t.forgotLink}
                  </span>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>{t.loginSubmit}</button>

                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: '#666' }}>
                  {t.registerLink} - <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setAuthType('register'); setAuthError(''); }}>
                    {t.registerModal}
                  </span>
                </p>
              </form>
            )}

            {authType === 'register' && (
              <form onSubmit={handleRegister}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', textAlign: 'center' }}>{t.registerModal}</h2>
                <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  {lang === 'en' ? 'Create your customer account to order jewellery' : 'நகைகள் ஆர்டர் செய்ய உங்கள் கணக்கை உருவாக்கவும்'}
                </p>
                {authError && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', background: '#fff0f0', padding: '8px', borderRadius: '6px', fontSize: '0.9rem' }}>{authError}</div>}

                <div className="form-group">
                  <label>{lang === 'en' ? 'Username (Unique)' : 'பயனர் பெயர் (தனித்துவமானது)'}</label>
                  <input type="text" className="form-control" value={registerUsername}
                    onChange={e => setRegisterUsername(e.target.value)} placeholder={t.username} required />
                </div>

                <div className="form-group">
                  <label>{lang === 'en' ? 'Phone Number (10 Digits)' : 'தொலைபேசி எண் (10 இலக்கங்கள்)'}</label>
                  <input type="tel" className="form-control" value={registerPhone} maxLength={10}
                    placeholder={lang === 'en' ? 'e.g. 9876543210' : 'எ.கா. 9876543210'}
                    onChange={e => setRegisterPhone(e.target.value.replace(/\D/g, ''))} required />
                </div>

                <div className="form-group">
                  <label>{lang === 'en' ? 'Password (Min 8 chars, 1 number & 1 symbol)' : 'கடவுச்சொல் (குறைந்தது 8 குறியீடுகள், 1 எண் & 1 சிறப்பு குறியீடு)'}</label>
                  <input type="password" className="form-control" value={registerPassword}
                    placeholder="••••••••"
                    onChange={e => setRegisterPassword(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>{lang === 'en' ? 'Confirm Password' : 'கடவுச்சொல்லை உறுதிப்படுத்தவும்'}</label>
                  <input type="password" className="form-control" value={registerConfirmPassword}
                    placeholder="••••••••"
                    onChange={e => setRegisterConfirmPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
                  {t.registerSubmit}
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: '#666' }}>
                  <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setAuthType('login'); setAuthError(''); }}>
                    {t.loginLink}
                  </span>
                </p>
              </form>
            )}

            {authType === 'forgot' && (
              <div>
                <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', textAlign: 'center' }}>{t.forgotPassModal}</h2>
                <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {lang === 'en' ? 'Enter your username and registered phone number to reset your password' : 'கடவுச்சொல்லை மீட்டமைக்க உங்கள் பெயர் மற்றும் பதிவு செய்த தொலைபேசி எண் உள்ளிடவும்'}
                </p>
                {authError && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', background: '#fff0f0', padding: '8px', borderRadius: '6px', fontSize: '0.9rem' }}>{authError}</div>}

                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label>{lang === 'en' ? 'Username' : 'பயனர் பெயர்'}</label>
                    <input type="text" className="form-control" value={resetUsername}
                      placeholder={lang === 'en' ? 'Your registered username' : 'பதிவு செய்த பயனர் பெயர்'}
                      onChange={e => setResetUsername(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'en' ? 'Registered Phone Number' : 'பதிவு செய்த தொலைபேசி எண்'}</label>
                    <input type="tel" className="form-control" value={resetOtpDest}
                      placeholder={lang === 'en' ? 'Your registered phone e.g. 9876543210' : 'பதிவு செய்த எண் எ.கா. 9876543210'}
                      onChange={e => setResetOtpDest(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>{t.newPass}</label>
                    <input type="password" className="form-control" value={resetNewPass}
                      placeholder={lang === 'en' ? 'Enter your new password' : 'புதிய கடவுச்சொல் உள்ளிடவும்'}
                      onChange={e => setResetNewPass(e.target.value)} required />
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
                    {t.resetSubmit}
                  </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: '#666' }}>
                  <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setAuthType('login'); setAuthError(''); }}>
                    {t.loginLink}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Jewel Modal (Admin Only) */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-slide-up">
            <X className="modal-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} />
            <h2>{authType === 'edit' ? t.editProductModal : t.addProductModal}</h2>
            
            <form onSubmit={handleSaveProduct} style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div className="form-group">
                    <label>{t.prodNameEn} *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      placeholder="e.g. Royal Aimpone Attigai"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.prodNameTa} <span style={{ fontSize: '0.8rem', color: '#888' }}>(✨ Auto-translated if left blank)</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.nameTa}
                      onChange={(e) => setFormData({ ...formData, nameTa: e.target.value })}
                      placeholder="அட்டிகை (Optional)"
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.prodDescEn}</label>
                    <textarea 
                      className="form-control" 
                      rows="2"
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      placeholder="Details in English..."
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.prodDescTa} <span style={{ fontSize: '0.8rem', color: '#888' }}>(✨ Auto-translated if left blank)</span></label>
                    <textarea 
                      className="form-control" 
                      rows="2"
                      value={formData.descriptionTa}
                      onChange={(e) => setFormData({ ...formData, descriptionTa: e.target.value })}
                      placeholder="விவரங்கள் (Optional)"
                    />
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    <label>{t.prodPrice}</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t.prodCat}</label>
                    <select 
                      className="form-control" 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((cat) => {
                        const hasSubs = cat.subs && cat.subs.length > 0;
                        if (!hasSubs) {
                          return <option key={cat.id} value={cat.id}>{lang === 'en' ? cat.en : cat.ta}</option>;
                        }
                        return cat.subs.map(sub => (
                          <option key={sub.id} value={sub.id}>{lang === 'en' ? `${cat.en} - ${sub.en}` : `${cat.ta} - ${sub.ta}`}</option>
                        ));
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                      🖼️ {lang === 'en' ? 'Jewel Multi-Angle Photos (Front View, Back View, Side View)' : 'நகையின் பல கோண படங்கள் (முன்பக்கம், பின்பக்கம்)'}
                    </label>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>
                      {lang === 'en' ? 'Upload photos from gallery or snap live photos directly using phone camera!' : 'கேலரியிலிருந்து படங்களை பதிவேற்றலாம் அல்லது மொபைல் கேமராவில் நேரடியாக படம் எடுக்கலாம்!'}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      {/* Option A: Select local device storage files */}
                      <label style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '12px 8px', background: '#fdfaf6', border: '1.5px dashed var(--gold)',
                        borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                      }}>
                        <Upload size={22} style={{ color: 'var(--primary)', marginBottom: '4px' }} />
                        <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                          📁 {lang === 'en' ? 'Choose Storage Files' : 'கேலரி படங்கள்'}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: '#777' }}>
                          {lang === 'en' ? 'Multiple Files' : 'பல படங்கள்'}
                        </span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment"
                          multiple
                          style={{ display: 'none' }}
                          onChange={handleImageFileChange}
                        />
                      </label>

                      {/* Option B: Open Live Interactive Camera */}
                      <button
                        type="button"
                        onClick={handleOpenLiveCamera}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          padding: '12px 8px', background: 'linear-gradient(135deg, #5a0c1a, #800e26)',
                          border: '1.5px solid var(--gold)', color: 'var(--gold-glowing)',
                          borderRadius: '8px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 3px 8px rgba(90,12,26,0.2)'
                        }}
                      >
                        <Camera size={22} style={{ marginBottom: '4px' }} />
                        <strong style={{ fontSize: '0.85rem' }}>
                          📸 {lang === 'en' ? 'Live Camera Capture' : 'நேரலை கேமரா'}
                        </strong>
                        <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                          {lang === 'en' ? 'Snap Multiple Views' : 'மொபைல் மூலம் படம்'}
                        </span>
                      </button>
                    </div>
                    
                    {formData.imageUrl && (
                      <div style={{ marginTop: '14px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>
                          {lang === 'en' ? `Uploaded Views (${getJewelImages(formData.imageUrl).length})` : `ஏற்றப்பட்ட கோணங்கள் (${getJewelImages(formData.imageUrl).length})`}
                        </label>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '8px', marginTop: '8px' }}>
                          {getJewelImages(formData.imageUrl).map((imgSrc, idx) => (
                            <div key={idx} style={{ position: 'relative', border: '1.5px solid var(--gold)', borderRadius: '6px', overflow: 'hidden', height: '80px', background: '#000' }}>
                              <img 
                                src={imgSrc} 
                                alt={`View ${idx + 1}`} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => openFullscreenGallery(getJewelImages(formData.imageUrl), idx, formData.nameEn || 'Jewel View')}
                              />
                              <span style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'rgba(0,0,0,0.75)', color: 'var(--gold)', fontSize: '0.65rem', padding: '1px 4px', borderRadius: '3px' }}>
                                {idx === 0 ? (lang === 'en' ? 'Front' : 'முன்') : idx === 1 ? (lang === 'en' ? 'Back' : 'பின்') : `View ${idx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveImageIndex(idx)}
                                style={{
                                  position: 'absolute', top: '2px', right: '2px',
                                  background: 'rgba(198,40,40,0.9)', color: '#fff',
                                  border: 'none', borderRadius: '50%', width: '18px', height: '18px',
                                  fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }}
                                title="Remove view"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem', borderTop: '1px solid #eee', paddingBottom: '0', paddingTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                  {t.cancel}
                </button>
                <button type="submit" className="btn btn-gold">
                  {authType === 'edit' ? t.update : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Portal Modal — Orders & Requirements */}
      {showNotifModal && currentUser?.role === 'ADMIN' && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-slide-up">
            <X className="modal-close" onClick={() => setShowNotifModal(false)} />
            
            <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Package style={{ color: 'var(--gold)' }} />
              {lang === 'en' ? 'Owner Admin Portal — Orders & Requests' : 'நிர்வாகியகம் — ஆர்டர்கள் & கோரிக்கைகள்'}
            </h2>

            {/* Sub-tabs for Admin */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', borderBottom: '1px solid #e0d5c1', paddingBottom: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn ${adminActiveTab === 'orders' ? 'btn-gold' : 'btn-secondary'}`}
                onClick={() => setAdminActiveTab('orders')}
                style={{ borderRadius: '20px', padding: '8px 16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Package size={16} />
                {lang === 'en' ? '📦 Active Orders' : '📦 புதிய ஆர்டர்கள்'} ({adminOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'PROVIDED').length})
              </button>
              <button
                type="button"
                className={`btn ${adminActiveTab === 'completed' ? 'btn-gold' : 'btn-secondary'}`}
                onClick={() => setAdminActiveTab('completed')}
                style={{ borderRadius: '20px', padding: '8px 16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <CheckCircle size={16} />
                {lang === 'en' ? '✅ Completed Orders' : '✅ முடிந்த ஆர்டர்கள்'} ({adminOrders.filter(o => o.status === 'DELIVERED' || o.status === 'PROVIDED').length})
              </button>
              <button
                type="button"
                className={`btn ${adminActiveTab === 'requirements' ? 'btn-gold' : 'btn-secondary'}`}
                onClick={() => setAdminActiveTab('requirements')}
                style={{ borderRadius: '20px', padding: '8px 16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Bell size={16} />
                {lang === 'en' ? '💬 Customer Custom Requirements' : '💬 வாடிக்கையாளர் தேவைகள்'} ({requirements.length})
              </button>
            </div>

            {/* Tab 1: Active Received Orders */}
            {adminActiveTab === 'orders' && (
              <div>
                {adminOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'PROVIDED').length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Package size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>
                      {lang === 'en' ? 'No active pending or processing orders.' : 'புதிய அல்லது நிலுவையில் உள்ள ஆர்டர்கள் ஏதும் இல்லை.'}
                    </p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
                    {adminOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'PROVIDED').map((ord) => {
                      const ordTime = ord.createdAt ? new Date(ord.createdAt).toLocaleString() : '';
                      const isConfirmed = ord.status === 'CONFIRMED' || ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY';
                      const isDispatched = ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY';
                      
                      return (
                        <div key={ord.id} style={{ background: '#fdfaf6', border: '1.5px solid #e0d5c1', borderRadius: '12px', padding: '16px', marginBottom: '16px', borderLeft: '6px solid var(--primary)', boxShadow: '0 3px 10px rgba(0,0,0,0.06)' }}>
                          {/* Header: Order ID & Date */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px dashed #d4a373', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <strong style={{ fontSize: '1.05rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                📦 {ord.orderIdStr || `VC-COD-${ord.id}`}
                                <span style={{
                                  fontSize: '0.72rem',
                                  background: isDispatched ? '#e3f2fd' : isConfirmed ? '#e8f5e9' : '#fff3cd',
                                  color: isDispatched ? '#0d47a1' : isConfirmed ? '#2e7d32' : '#856404',
                                  padding: '2px 8px', borderRadius: '10px', border: '1px solid', fontWeight: '700'
                                }}>
                                  {isDispatched ? '🛵 OUT FOR DELIVERY' : isConfirmed ? '🚚 CONFIRMED' : (ord.status || 'PENDING')}
                                </span>
                              </strong>
                              <span style={{ fontSize: '0.82rem', color: '#666' }}>🕒 {ordTime}</span>
                            </div>
                            <strong style={{ color: 'var(--gold-dark)', fontSize: '1.25rem' }}>
                              ₹{ord.totalAmount ? ord.totalAmount.toLocaleString() : '0'}
                            </strong>
                          </div>

                          {/* Customer Details & Delivery Address */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #eee' }}>
                            <div>
                              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
                                👤 {lang === 'en' ? 'Customer Info' : 'வாடிக்கையாளர் விவரம்'}
                              </label>
                              <div style={{ fontSize: '0.9rem', color: '#222', marginTop: '2px' }}>
                                <strong>{ord.fullName}</strong> ({ord.username})<br />
                                📞 <a href={`tel:${ord.phone}`} style={{ color: 'var(--primary)', fontWeight: '700' }}>{ord.phone}</a>
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
                                🏠 {lang === 'en' ? 'Delivery Address (Puducherry)' : 'டெலிவரி முகவரி'}
                              </label>
                              <div style={{ fontSize: '0.88rem', color: '#333', marginTop: '2px', lineHeight: '1.4' }}>
                                Door {ord.doorNo}, {ord.street}, {ord.area}<br />
                                <strong>{ord.district} - {ord.pincode}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Order Items & Payment Type */}
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
                              🛒 {lang === 'en' ? 'Ordered Items' : 'வாங்கிய பொருள்கள்'}
                            </label>
                            <div style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.88rem', color: '#333', marginTop: '4px', whiteSpace: 'pre-line' }}>
                              {ord.itemsSummary}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#2e7d32', marginTop: '6px', fontWeight: '600' }}>
                              💵 Payment Method: {ord.paymentMethod || 'Cash or Online UPI Scanner on Delivery (No Cards/Bank Transfer)'}
                            </div>
                          </div>

                          {/* Set/Update Expected Delivery Date */}
                          <div style={{ background: 'linear-gradient(135deg, #fffdf5, #fff8e7)', border: '1.5px solid #f0c040', borderRadius: '10px', padding: '12px', marginTop: '12px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '6px' }}>
                              🚚 {lang === 'en' ? 'Set Expected Delivery Date & Time:' : 'எதிர்பார்க்கப்படும் டெலிவரி தேதியை உள்ளிடவும்:'}
                            </label>

                            {ord.expectedDeliveryDate && (
                              <div style={{ fontSize: '0.88rem', color: '#2e7d32', fontWeight: '700', marginBottom: '8px' }}>
                                Current Set Date: ✅ {ord.expectedDeliveryDate}
                              </div>
                            )}

                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={lang === 'en' ? 'e.g. Today by 6:00 PM or Tomorrow 11:00 AM' : 'எ.கா. இன்று மாலை 6:00 மணி / நாளை காலை 11 மணி'}
                                value={deliveryDateInputs[ord.id] !== undefined ? deliveryDateInputs[ord.id] : (ord.expectedDeliveryDate || '')}
                                onChange={e => setDeliveryDateInputs(prev => ({ ...prev, [ord.id]: e.target.value }))}
                                style={{ flexGrow: 1, borderRadius: '8px', border: '1.5px solid #e0d0c0', fontSize: '0.9rem' }}
                              />
                              <button
                                type="button"
                                className="btn btn-gold"
                                onClick={() => handleUpdateDeliveryDate(ord.id)}
                                style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '0.88rem', fontWeight: '700' }}
                              >
                                💾 {lang === 'en' ? 'Save Delivery Date' : 'தேதியை சேமி'}
                              </button>
                            </div>

                            {/* Quick Presets */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                              <span style={{ color: '#666', fontWeight: '600', alignSelf: 'center' }}>Quick Suggestions:</span>
                              {['Today by 6:00 PM', 'Tomorrow by 11:00 AM', 'Tomorrow by 5:00 PM', 'Within 2 Days'].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setDeliveryDateInputs(prev => ({ ...prev, [ord.id]: preset }))}
                                  style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #c9973f', background: '#fff', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                                >
                                  {preset}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Admin One-Way Order Status Actions */}
                          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #d4a373', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary)' }}>
                              📌 {lang === 'en' ? 'Order Status Progress:' : 'ஆர்டர் நிலை கட்டங்கள்:'}
                            </span>
                            
                            {/* Step 1: Confirmed */}
                            <button
                              type="button"
                              disabled={isConfirmed}
                              onClick={() => handleUpdateOrderStatus(ord.id, 'CONFIRMED')}
                              style={{
                                padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700',
                                border: '1px solid #81c784',
                                background: isConfirmed ? '#2e7d32' : '#fff',
                                color: isConfirmed ? '#fff' : '#2e7d32',
                                cursor: isConfirmed ? 'not-allowed' : 'pointer',
                                opacity: isConfirmed ? 0.85 : 1
                              }}
                            >
                              {isConfirmed ? '✓ 1. Confirmed' : '🚚 1. Confirmed'}
                            </button>

                            {/* Step 2: Out for Delivery */}
                            <button
                              type="button"
                              disabled={isDispatched}
                              onClick={() => handleUpdateOrderStatus(ord.id, 'OUT_FOR_DELIVERY')}
                              style={{
                                padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700',
                                border: '1px solid #64b5f6',
                                background: isDispatched ? '#1565c0' : '#fff',
                                color: isDispatched ? '#fff' : '#1565c0',
                                cursor: isDispatched ? 'not-allowed' : 'pointer',
                                opacity: isDispatched ? 0.85 : 1
                              }}
                            >
                              {isDispatched ? '✓ 2. Out for Delivery' : '🛵 2. Out for Delivery'}
                            </button>

                            {/* Step 3: Order Delivered / Provided (Completes Order and moves to Completed Orders page) */}
                            <button
                              type="button"
                              onClick={() => handleUpdateOrderStatus(ord.id, 'DELIVERED')}
                              style={{
                                padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '800',
                                border: '1.5px solid #2e7d32', background: '#e8f5e9',
                                color: '#1b5e20', cursor: 'pointer',
                                boxShadow: '0 2px 6px rgba(46,125,50,0.15)'
                              }}
                            >
                              ✅ 3. Mark Order Provided / Delivered
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Completed Orders */}
            {adminActiveTab === 'completed' && (
              <div>
                {adminOrders.filter(o => o.status === 'DELIVERED' || o.status === 'PROVIDED').length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <CheckCircle size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>
                      {lang === 'en' ? 'No completed orders yet.' : 'முடிக்கப்பட்ட ஆர்டர்கள் ஏதும் இல்லை.'}
                    </p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
                    {adminOrders.filter(o => o.status === 'DELIVERED' || o.status === 'PROVIDED').map((ord) => {
                      const ordTime = ord.createdAt ? new Date(ord.createdAt).toLocaleString() : '';
                      return (
                        <div key={ord.id} style={{ background: '#f4fbf7', border: '1.5px solid #a5d6a7', borderRadius: '12px', padding: '16px', marginBottom: '16px', borderLeft: '6px solid #2e7d32', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px dashed #a5d6a7', paddingBottom: '8px' }}>
                            <strong style={{ fontSize: '1.05rem', color: '#1b5e20', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              📦 {ord.orderIdStr || `VC-COD-${ord.id}`}
                              <span style={{ fontSize: '0.75rem', background: '#d4edda', color: '#155724', padding: '2px 10px', borderRadius: '12px', fontWeight: '800', border: '1px solid #c3e6cb' }}>
                                🎉 ORDER COMPLETED & DELIVERED
                              </span>
                            </strong>
                            <strong style={{ color: '#1b5e20', fontSize: '1.2rem' }}>
                              ₹{ord.totalAmount ? ord.totalAmount.toLocaleString() : '0'}
                            </strong>
                          </div>

                          <div style={{ fontSize: '0.88rem', color: '#333', marginBottom: '6px' }}>
                            <strong>👤 Customer:</strong> {ord.fullName} ({ord.username}) | 📞 {ord.phone}
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#333', marginBottom: '6px' }}>
                            <strong>🏠 Delivery Address:</strong> Door {ord.doorNo}, {ord.street}, {ord.area}, {ord.district} - {ord.pincode}
                          </div>
                          <div style={{ background: '#fff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '0.85rem', color: '#444' }}>
                            <strong>🛒 Delivered Items:</strong> {ord.itemsSummary}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Custom Requirements */}
            {adminActiveTab === 'requirements' && (
              <div>
                {requirements.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Bell size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>{t.noReqs}</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
                    {requirements.map((req) => {
                      const reqName = req.username || req.userName || 'Customer';
                      const reqPhone = req.phoneNumber || req.userPhone || 'N/A';
                      const reqMsg = req.message || req.description || 'No description provided.';
                      const reqTime = req.createdAt ? new Date(req.createdAt).toLocaleString() : '';

                      return (
                        <div key={req.id} style={{ background: '#fdfaf6', border: '1px solid #e0d5c1', borderRadius: '10px', padding: '16px', marginBottom: '16px', borderLeft: '5px solid var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px dashed #d4a373', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <strong style={{ fontSize: '1.05rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                👤 {reqName}
                              </strong>
                              <span style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                📞 {reqPhone}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#666', background: 'rgba(90,12,26,0.06)', padding: '4px 10px', borderRadius: '12px' }}>
                              🕒 {reqTime}
                            </span>
                          </div>

                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              {lang === 'en' ? 'Requirement Details:' : 'தேவை விவரம்:'}
                            </label>
                            <p style={{ fontSize: '0.95rem', color: '#222', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e8e8e8', marginTop: '4px', lineHeight: '1.5' }}>
                              "{reqMsg}"
                            </p>
                          </div>

                          {req.imageUrl && (
                            <div style={{ marginBottom: '12px' }}>
                              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '6px' }}>
                                🖼️ {lang === 'en' ? 'Customer Reference Photo (Click to View Fullscreen):' : 'வாடிக்கையாளர் படம் (முழுமையாக பார்க்க கிளிக் செய்யவும்):'}
                              </label>
                              <div 
                                style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--gold)' }}
                                onClick={() => openFullscreenGallery(req.imageUrl, 0, `Requirement Photo from ${reqName}`)}
                              >
                                <img 
                                  src={req.imageUrl} 
                                  alt="Customer Reference View" 
                                  style={{ maxWidth: '220px', maxHeight: '200px', objectFit: 'cover', display: 'block' }} 
                                />
                                <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.75)', color: 'var(--gold-glowing)', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Maximize2 size={12} /> {lang === 'en' ? 'Full View' : 'முழு படம்'}
                                </span>
                              </div>
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                            <a 
                              href={`tel:${reqPhone}`} 
                              className="btn btn-gold"
                              style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                            >
                              <Phone size={15} /> {lang === 'en' ? `Call ${reqName} (${reqPhone})` : `அழைக்கவும் (${reqPhone})`}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCartModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-slide-up">
            <X className="modal-close" onClick={() => setShowCartModal(false)} />
            <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag style={{ color: 'var(--gold)' }} />
              {t.cartTitle} ({cartCount})
            </h2>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <ShoppingBag size={56} style={{ color: '#ccc', marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', color: '#666' }}>{t.cartEmpty}</p>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setShowCartModal(false)}>
                  {lang === 'en' ? 'Continue Shopping' : 'தொடர்ந்து நகைகளை பார்க்க'}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ maxHeight: '50vh', overflowY: 'auto', marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                  {cart.map((item) => (
                    <div key={item.jewel.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0', gap: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1 }}>
                        {item.jewel.imageUrl ? (
                          <img src={item.jewel.imageUrl} alt={item.jewel.nameEn} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ccc' }} />
                        ) : (
                          <div style={{ width: '60px', height: '60px', background: '#eee', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShoppingBag size={24} style={{ color: '#888' }} />
                          </div>
                        )}
                        <div>
                          <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '1rem' }}>
                            {lang === 'en' ? item.jewel.nameEn : item.jewel.nameTa}
                          </strong>
                          <span style={{ fontSize: '0.85rem', color: '#666' }}>
                            ₹{item.jewel.price ? item.jewel.price.toLocaleString() : '0'} {lang === 'en' ? 'each' : 'ஒன்று'}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ width: '30px', height: '30px', padding: 0 }} onClick={() => updateCartQuantity(item.jewel.id, -1)}>-</button>
                        <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                        <button className="btn btn-secondary" style={{ width: '30px', height: '30px', padding: 0 }} onClick={() => updateCartQuantity(item.jewel.id, 1)}>+</button>
                      </div>

                      <div style={{ fontWeight: '700', color: 'var(--gold-dark)', minWidth: '80px', textAlign: 'right' }}>
                        ₹{((item.jewel.price || 0) * item.quantity).toLocaleString()}
                      </div>

                      <button className="btn btn-secondary" style={{ padding: '6px', color: 'red', borderColor: 'transparent' }} onClick={() => removeFromCart(item.jewel.id)} title="Remove">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fdfaf6', borderRadius: '8px', borderLeft: '4px solid var(--gold)', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary)' }}>{t.totalAmount}:</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--gold-dark)' }}>₹{cartTotal.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowCartModal(false)}>
                    {lang === 'en' ? 'Add More Jewels' : 'மேலும் நகைகள் சேர்'}
                  </button>
                  <button className="btn btn-gold" style={{ padding: '12px 24px', fontSize: '1rem' }} onClick={triggerCartCheckout}>
                    {t.proceedToPayment} (₹{cartTotal.toLocaleString()}) →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="animate-slide-up" style={{
            background: '#fff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '540px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Luxury Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1a0208, #3b0610, #6b0f1f)',
              padding: '1.5rem 2rem 1.2rem',
              textAlign: 'center',
              borderBottom: '2px solid transparent',
              borderImage: 'linear-gradient(90deg, transparent, #c9973f, #f0c040, #c9973f, transparent) 1',
              position: 'relative'
            }}>
              <X style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer', color: 'rgba(255,228,143,0.7)' }}
                size={20} onClick={() => setShowAddressModal(false)} />

              {/* Step indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(201,151,63,0.3)', color: '#c9973f', border: '1px solid #c9973f', borderRadius: '20px', padding: '3px 14px', fontSize: '0.75rem', fontWeight: '600' }}>
                  ✓ {lang === 'en' ? 'Cart' : 'கார்ட்'}
                </span>
                <span style={{ color: 'rgba(255,228,143,0.4)', fontSize: '0.8rem' }}>›</span>
                <span style={{ background: 'linear-gradient(135deg, #c9973f, #f0c040)', color: '#1a0005', borderRadius: '20px', padding: '3px 14px', fontSize: '0.75rem', fontWeight: '700' }}>
                  📍 {lang === 'en' ? 'Address' : 'முகவரி'}
                </span>
                <span style={{ color: 'rgba(255,228,143,0.4)', fontSize: '0.8rem' }}>›</span>
                <span style={{ color: 'rgba(255,228,143,0.35)', fontSize: '0.75rem', padding: '3px 14px', border: '1px solid rgba(255,228,143,0.2)', borderRadius: '20px' }}>
                  💵 {lang === 'en' ? 'Cash on Delivery' : 'COD பணம்'}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-royal)',
                fontSize: '1.4rem',
                background: 'linear-gradient(135deg, #ffe58f, #c9973f)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '1px',
                marginBottom: '0.3rem'
              }}>
                🏠 {lang === 'en' ? 'Delivery Address' : 'டெலிவரி முகவரி'}
              </h2>
              <p style={{ color: 'rgba(255,228,143,0.65)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                {lang === 'en' ? 'Delivering within Puducherry district only' : 'புதுச்சேரி மாவட்டத்தில் மட்டுமே டெலிவரி'}
              </p>
            </div>

            {/* Form Body */}
            <div style={{ padding: '1.5rem 2rem' }}>

              {/* Delivery Zone Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #fdf6e3, #fef9ec)',
                border: '1.5px solid #f0c040',
                borderLeft: '5px solid #c9973f',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '1.8rem' }}>🚚</span>
                <div>
                  <strong style={{ color: '#7a5a10', fontSize: '0.92rem', display: 'block' }}>
                    {lang === 'en' ? 'Puducherry Delivery Only' : 'புதுச்சேரி டெலிவரி மட்டுமே'}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#8a6a20' }}>
                    {lang === 'en'
                      ? 'Free home delivery within Puducherry. Other areas not serviceable.'
                      : 'புதுச்சேரியில் இலவச வீட்டு விநியோகம். மற்ற பகுதிகளுக்கு சேவை இல்லை.'}
                  </span>
                </div>
              </div>

              {/* Error */}
              {addressError && (
                <div style={{
                  background: '#fff0f0',
                  border: '1.5px solid #ffcdd2',
                  borderLeft: '4px solid #c62828',
                  color: '#c62828',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🚫</span>
                  <span>{addressError}</span>
                </div>
              )}

              <form onSubmit={handleAddressSubmit}>
                {/* Full Name & Phone row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ margin: 0, gridColumn: '1 / -1' }}>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      👤 {lang === 'en' ? 'Full Name' : 'முழு பெயர்'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="text" className="form-control"
                      value={deliveryAddress.fullName}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, fullName: e.target.value })); }}
                      placeholder={lang === 'en' ? 'e.g. Priya Rajan' : 'எ.கா. பிரியா ராஜன்'}
                      style={{ borderRadius: '10px', border: '1.5px solid #e0d0c0' }}
                      required />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      📞 {lang === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="tel" className="form-control"
                      value={deliveryAddress.phone}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, phone: e.target.value })); }}
                      placeholder="e.g. 9876543210"
                      style={{ borderRadius: '10px', border: '1.5px solid #e0d0c0' }}
                      required />
                  </div>

                  {/* Door No */}
                  <div>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      🚪 {lang === 'en' ? 'Door / Flat No.' : 'வீட்டு எண்'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="text" className="form-control"
                      value={deliveryAddress.doorNo}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, doorNo: e.target.value })); }}
                      placeholder="e.g. 14/A"
                      style={{ borderRadius: '10px', border: '1.5px solid #e0d0c0' }}
                      required />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      📮 {lang === 'en' ? 'Pincode' : 'பின்கோடு'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="text" className="form-control" maxLength="6"
                      value={deliveryAddress.pincode}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') })); }}
                      placeholder="605 001"
                      style={{ borderRadius: '10px', border: `1.5px solid ${deliveryAddress.pincode.length === 6 && !deliveryAddress.pincode.startsWith('605') ? '#ffcdd2' : '#e0d0c0'}` }}
                      required />
                    {deliveryAddress.pincode.length === 6 && deliveryAddress.pincode.startsWith('605') && (
                      <span style={{ fontSize: '0.75rem', color: '#2e7d32', marginTop: '3px', display: 'block' }}>✅ Valid Puducherry Pincode</span>
                    )}
                    {deliveryAddress.pincode.length === 6 && !deliveryAddress.pincode.startsWith('605') && (
                      <span style={{ fontSize: '0.75rem', color: '#c62828', marginTop: '3px', display: 'block' }}>⚠️ Puducherry pincodes start with 605</span>
                    )}
                  </div>

                  {/* Street */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      🛣️ {lang === 'en' ? 'Street / Road' : 'தெரு / சாலை'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="text" className="form-control"
                      value={deliveryAddress.street}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, street: e.target.value })); }}
                      placeholder={lang === 'en' ? 'e.g. Gandhi Road' : 'எ.கா. காந்தி சாலை'}
                      style={{ borderRadius: '10px', border: '1.5px solid #e0d0c0' }}
                      required />
                  </div>

                  {/* Area */}
                  <div>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      🏘️ {lang === 'en' ? 'Area / Town' : 'பகுதி'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <input type="text" className="form-control"
                      value={deliveryAddress.area}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, area: e.target.value })); }}
                      placeholder={lang === 'en' ? 'e.g. Villianur' : 'எ.கா. விள்ளியனூர்'}
                      style={{ borderRadius: '10px', border: '1.5px solid #e0d0c0' }}
                      required />
                  </div>

                  {/* District */}
                  <div>
                    <label style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.88rem', marginBottom: '5px', display: 'block' }}>
                      🗺️ {lang === 'en' ? 'District' : 'மாவட்டம்'} <span style={{ color: '#c62828' }}>*</span>
                    </label>
                    <select className="form-control"
                      value={deliveryAddress.district}
                      onChange={e => { setAddressError(''); setDeliveryAddress(p => ({ ...p, district: e.target.value })); }}
                      style={{ borderRadius: '10px', border: `1.5px solid ${deliveryAddress.district === 'Puducherry' ? '#a5d6a7' : '#ffcdd2'}`, background: deliveryAddress.district === 'Puducherry' ? '#f0fff0' : '#fff0f0' }}>
                      <option value="Puducherry">✅ Puducherry (புதுச்சேரி)</option>
                      <option value="Other">🚫 {lang === 'en' ? 'Other District (No Delivery)' : 'மற்ற மாவட்டம் — டெலிவரி இல்லை'}</option>
                    </select>
                    {deliveryAddress.district === 'Puducherry' && (
                      <span style={{ fontSize: '0.75rem', color: '#2e7d32', marginTop: '3px', display: 'block' }}>
                        ✅ {lang === 'en' ? 'Delivery available in your area!' : 'உங்கள் பகுதியில் டெலிவரி உள்ளது!'}
                      </span>
                    )}
                    {deliveryAddress.district === 'Other' && (
                      <span style={{ fontSize: '0.75rem', color: '#c62828', marginTop: '3px', display: 'block' }}>
                        🚫 {lang === 'en' ? 'Sorry, no delivery outside Puducherry.' : 'மன்னிக்கவும், புதுச்சேரிக்கு வெளியே டெலிவரி இல்லை.'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '1.25rem' }}>
                  <button type="button" className="btn btn-secondary" style={{ flexGrow: 1, borderRadius: '10px' }}
                    onClick={() => { setShowAddressModal(false); setShowCartModal(true); }}>
                    ← {lang === 'en' ? 'Back to Cart' : 'கார்ட்டிற்கு திரும்பு'}
                  </button>
                  <button type="submit" className="btn btn-gold"
                    style={{ flexGrow: 2, borderRadius: '10px', fontSize: '1rem', padding: '12px', opacity: deliveryAddress.district === 'Other' ? 0.5 : 1 }}
                    disabled={deliveryAddress.district === 'Other'}>
                    {lang === 'en' ? 'Confirm & Pay' : 'உறுதிப்படுத்தி செலுத்து'} →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cash on Delivery Order Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-slide-up" style={{ maxWidth: '520px' }}>
            <X className="modal-close" onClick={() => setShowPaymentModal(false)} />
            
            <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', marginBottom: '1.25rem', textAlign: 'center', fontFamily: 'var(--font-royal)' }}>
              💵 {lang === 'en' ? 'Cash on Delivery (COD)' : 'நேரடி பணம் செலுத்துதல் (COD)'}
            </h2>

            {!paymentFinished ? (
              <div>
                {/* Delivery Address Summary */}
                <div style={{ background: 'linear-gradient(135deg, #f0f8f0, #e8f5e9)', border: '1.5px solid #a5d6a7', borderLeft: '5px solid #2e7d32', borderRadius: '10px', padding: '12px 16px', marginBottom: '1rem', fontSize: '0.88rem', color: '#1b5e20' }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.95rem' }}>
                    🏠 {lang === 'en' ? 'Delivering To (Puducherry):' : 'டெலிவரி முகவரி (புதுச்சேரி):'}
                  </strong>
                  <span style={{ display: 'block', lineHeight: '1.4' }}>
                    <strong>{deliveryAddress.fullName}</strong> • 📞 {deliveryAddress.phone}<br />
                    {deliveryAddress.doorNo}, {deliveryAddress.street}, {deliveryAddress.area}, {deliveryAddress.district} - {deliveryAddress.pincode}
                  </span>
                </div>

                {/* Items Summary */}
                <div style={{ background: '#fdfaf6', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e0d5c1', borderLeft: '5px solid var(--primary)', marginBottom: '1.25rem' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', marginBottom: '6px' }}>
                    🛒 {lang === 'en' ? 'Order Items Summary:' : 'வாங்கும் பொருள்கள் விவரம்:'}
                  </h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#444', maxHeight: '110px', overflowY: 'auto' }}>
                    {cart.map(item => (
                      <li key={item.jewel.id} style={{ marginBottom: '4px' }}>
                        {lang === 'en' ? item.jewel.nameEn : item.jewel.nameTa} x <strong>{item.quantity}</strong> — ₹{((item.jewel.price || 0) * item.quantity).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #c9973f' }}>
                    <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>{t.totalAmount}:</span>
                    <strong style={{ color: 'var(--gold-dark)', fontSize: '1.3rem' }}>₹{cartTotal.toLocaleString()}</strong>
                  </div>
                </div>

                {/* COD Info Banner - Cash OR Online UPI on Delivery */}
                <div style={{ background: 'linear-gradient(135deg, #fff9e6, #fff3cd)', border: '1.5px solid #ffeba9', borderLeft: '5px solid #c9973f', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.25rem' }}>
                  <strong style={{ color: '#856404', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', marginBottom: '6px' }}>
                    💵 {lang === 'en' ? 'Pay Cash OR Online UPI Scanner on Delivery' : 'டெலிவரியின் போது பணம் அல்லது ஆன்லைன் UPI'}
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: '#856404', margin: 0, lineHeight: '1.4' }}>
                    {lang === 'en'
                      ? `Pay ₹${cartTotal.toLocaleString()} directly to our delivery executive upon receiving your jewellery in Puducherry using Cash OR Online UPI scanner (GPay/PhonePe/Paytm). Note: Credit/Debit Cards & Bank Transfers are NOT accepted.`
                      : `புதுச்சேரியில் நகைகளைப் பெற்றுக்கொள்ளும்போது ₹${cartTotal.toLocaleString()}-ஐ ரொக்கமாக (Cash) அல்லது ஆன்லைன் UPI (GPay/PhonePe) மூலம் செலுத்தலாம். குறிப்பு: கார்டு மற்றும் வங்கி கணக்கு டிரான்ஸ்பர் கிடையாது.`}
                  </p>
                </div>

                <form onSubmit={handleSimulatePayment}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" className="btn btn-secondary" style={{ flexGrow: 1, borderRadius: '10px' }}
                      onClick={() => { setShowPaymentModal(false); setShowAddressModal(true); }}>
                      ← {lang === 'en' ? 'Back' : 'பின்செல்'}
                    </button>
                    <button type="submit" className="btn btn-gold" style={{ flexGrow: 2, borderRadius: '10px', fontSize: '1.05rem', padding: '12px', fontWeight: '700' }}>
                      🚚 {lang === 'en' ? 'Place Order (COD)' : 'ஆர்டர் செய் (COD)'} (₹{cartTotal.toLocaleString()})
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                <CheckCircle size={60} style={{ color: '#2e7d32', marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--primary)', marginBottom: '8px', fontFamily: 'var(--font-royal)' }}>
                  {t.paymentCompleted}
                </h3>
                <div style={{ background: '#fdfaf6', border: '1px solid #e0d5c1', borderRadius: '10px', padding: '14px', margin: '1rem 0 1.25rem' }}>
                  <p style={{ fontWeight: '700', color: 'var(--gold-dark)', fontSize: '1.1rem', marginBottom: '6px' }}>
                    {t.orderId}VC-COD-{mockTxnId}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '8px' }}>
                    💵 {lang === 'en' ? `Amount to Pay on Delivery: ` : `டெலிவரி சமயம் செலுத்த வேண்டிய தொகை: `}
                    <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>₹{cartTotal.toLocaleString()}</strong>
                  </p>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>
                    Payment Options on Delivery: Cash or Online UPI Scanner (No Cards / Bank Transfer)
                  </div>
                </div>

                {/* 10 MINUTE EXPECTED DELIVERY DATE BANNER */}
                <div style={{
                  background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                  border: '1.5px solid #81c784',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 12px rgba(46,125,50,0.15)',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Clock size={20} style={{ color: '#1b5e20' }} />
                    <strong style={{ color: '#1b5e20', fontSize: '0.95rem' }}>
                      {lang === 'en' ? '⏰ Expected Delivery Date Update' : '⏰ எதிர்பார்ப்பு டெலிவரி தேதி அறிவிப்பு'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#2e7d32', margin: 0, lineHeight: '1.45', fontWeight: '600' }}>
                    {lang === 'en'
                      ? 'Expected delivery date will be available within 10 minutes. Please check back in "My Orders" tab shortly!'
                      : '10 நிமிடங்களில் உங்கள் ஆர்டருக்கான எதிர்பார்ப்பு டெலிவரி தேதி வழங்கப்படும். "என் ஆர்டர்கள்" பகுதியில் சற்று நேரத்தில் சரிபார்க்கவும்!'}
                  </p>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#555', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {t.thankYouOrder}
                </p>
                <button className="btn btn-gold" onClick={finishPayment} style={{ minWidth: '160px', padding: '10px 24px', borderRadius: '10px', fontSize: '1rem' }}>
                  ✨ {t.finish}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer "My Orders" Modal */}
      {showOrdersModal && currentUser && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-slide-up">
            <X className="modal-close" onClick={() => setShowOrdersModal(false)} />
            
            <h2 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--gold)', paddingBottom: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Package style={{ color: 'var(--gold)' }} />
              {lang === 'en' ? 'My Placed Orders' : 'என் ஆர்டர்கள்'} ({userOrders.length})
            </h2>

            {userOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <Package size={52} style={{ color: '#ccc', marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                  {lang === 'en' ? 'You have not placed any orders yet.' : 'நீங்கள் இன்னும் எந்த ஆர்டரும் செய்யவில்லை.'}
                </p>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowOrdersModal(false)}>
                  {lang === 'en' ? 'Browse Jewellery' : 'நகைகளைப் பார்க்க'}
                </button>
              </div>
            ) : (
              <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '4px' }}>
                {userOrders.map((ord) => {
                  const ordTime = ord.createdAt ? new Date(ord.createdAt).toLocaleString() : '';
                  return (
                    <div key={ord.id} style={{ background: '#fdfaf6', border: '1.5px solid #e0d5c1', borderRadius: '12px', padding: '16px', marginBottom: '16px', borderLeft: '6px solid var(--primary)', boxShadow: '0 3px 10px rgba(0,0,0,0.06)' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px dashed #d4a373', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            📦 {ord.orderIdStr || `VC-COD-${ord.id}`}
                            <span style={{
                              fontSize: '0.72rem',
                              background: (ord.status === 'DELIVERED' || ord.status === 'PROVIDED') ? '#d4edda' : (ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY') ? '#e3f2fd' : ord.status === 'CONFIRMED' ? '#e8f5e9' : '#fff3cd',
                              color: (ord.status === 'DELIVERED' || ord.status === 'PROVIDED') ? '#155724' : (ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY') ? '#0d47a1' : ord.status === 'CONFIRMED' ? '#2e7d32' : '#856404',
                              padding: '2px 8px', borderRadius: '10px', border: '1px solid', fontWeight: '700'
                            }}>
                              {ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY' ? '🛵 OUT FOR DELIVERY' : (ord.status || 'PENDING')}
                            </span>
                          </strong>
                          <span style={{ fontSize: '0.82rem', color: '#666' }}>🕒 {ordTime}</span>
                        </div>
                        <strong style={{ color: 'var(--gold-dark)', fontSize: '1.25rem' }}>
                          ₹{ord.totalAmount ? ord.totalAmount.toLocaleString() : '0'}
                        </strong>
                      </div>

                      {/* Items */}
                      <div style={{ marginBottom: '12px', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #eee' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
                          🛒 {lang === 'en' ? 'Items Ordered:' : 'ஆர்டர் செய்யப்பட்ட பொருள்கள்:'}
                        </label>
                        <div style={{ fontSize: '0.9rem', color: '#333', marginTop: '4px', whiteSpace: 'pre-line' }}>
                          {ord.itemsSummary}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#2e7d32', marginTop: '8px', fontWeight: '600' }}>
                          💵 Payment Mode: Cash or Online UPI Scanner on Delivery (No Card / Bank Transfer)
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div style={{ marginBottom: '12px', fontSize: '0.88rem', color: '#444' }}>
                        <strong>🏠 Delivery Address:</strong> Door {ord.doorNo}, {ord.street}, {ord.area}, {ord.district} - {ord.pincode} (📞 {ord.phone})
                      </div>

                      {/* Status Banner Box */}
                      { (ord.status === 'DELIVERED' || ord.status === 'PROVIDED') ? (
                        <div style={{ background: 'linear-gradient(135deg, #d4edda, #c3e6cb)', border: '1.5px solid #2e7d32', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <CheckCircle size={26} style={{ color: '#155724' }} />
                          <div>
                            <strong style={{ color: '#155724', fontSize: '1rem', display: 'block' }}>
                              🎉 {lang === 'en' ? 'Order Provided / Delivered!' : 'ஆர்டர் வழங்கப்பட்டது!'}
                            </strong>
                            <span style={{ fontSize: '0.88rem', color: '#1b5e20', fontWeight: '600' }}>
                              {lang === 'en'
                                ? 'Your jewellery order has been successfully delivered and handed over.'
                                : 'உங்கள் நகை ஆர்டர் வெற்றிகரமாக உங்களுக்கு வழங்கப்பட்டது.'}
                            </span>
                          </div>
                        </div>
                      ) : (ord.status === 'DISPATCHED' || ord.status === 'OUT_FOR_DELIVERY') ? (
                        <div style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', border: '1.5px solid #1976d2', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Truck size={26} style={{ color: '#0d47a1' }} />
                          <div>
                            <strong style={{ color: '#0d47a1', fontSize: '0.95rem', display: 'block' }}>
                              🛵 {lang === 'en' ? 'Out for Delivery!' : 'டெலிவரிக்கு புறப்பட்டது!'}
                            </strong>
                            <span style={{ fontSize: '0.88rem', color: '#1565c0', fontWeight: '600' }}>
                              {lang === 'en'
                                ? 'Our delivery executive is on the way to your address in Puducherry.'
                                : 'எங்கள் டெலிவரி ஆள் புதுச்சேரியில் உள்ள உங்கள் முகவரிக்கு வந்து கொண்டு இருக்கிறார்.'}
                            </span>
                          </div>
                        </div>
                      ) : ord.expectedDeliveryDate ? (
                        <div style={{ background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)', border: '1.5px solid #a5d6a7', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Truck size={24} style={{ color: '#2e7d32' }} />
                          <div>
                            <strong style={{ color: '#1b5e20', fontSize: '0.95rem', display: 'block' }}>
                              🚚 {lang === 'en' ? 'Expected Delivery Date:' : 'எதிர்பார்க்கப்படும் டெலிவரி தேதி:'}
                            </strong>
                            <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#2e7d32' }}>
                              {ord.expectedDeliveryDate}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: 'linear-gradient(135deg, #fffdf5, #fff8e7)', border: '1.5px solid #f0c040', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Clock size={24} style={{ color: '#b8860b' }} />
                          <div>
                            <strong style={{ color: '#7a5a10', fontSize: '0.9rem', display: 'block' }}>
                              ⏰ {lang === 'en' ? 'Expected Delivery Date Notice' : 'எதிர்பார்ப்பு டெலிவரி தேதி அறிவிப்பு'}
                            </strong>
                            <span style={{ fontSize: '0.85rem', color: '#8a6a20', fontWeight: '600' }}>
                              {lang === 'en'
                                ? 'Expected delivery date will be available within 10 minutes. Please check back shortly!'
                                : '10 நிமிடங்களில் எதிர்பார்ப்பு டெலிவரி தேதி வழங்கப்படும். சற்று நேரத்தில் மீண்டும் வந்து பார்க்கவும்!'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Chat Assistant (Hidden for Admin) */}
      {currentUser?.role !== 'ADMIN' && (
        <>
          {/* Always-Visible Chatbot Invitation Banner */}
          {!isChatOpen && (
            <div
              style={{
                position: 'fixed', bottom: '90px', right: '24px',
                background: 'linear-gradient(135deg, var(--primary), #80182a)',
                color: '#fff', padding: '12px 16px', borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(90,12,26,0.35)',
                zIndex: 998, maxWidth: '270px',
                borderLeft: '4px solid var(--gold)', animation: 'slideUp 0.4s ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={16} style={{ color: 'var(--gold)' }} />
                  <strong style={{ fontSize: '0.85rem', fontFamily: 'var(--font-royal)', color: 'var(--gold-glowing)' }}>
                    {t.chatbotTitle}
                  </strong>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.35', opacity: 0.95, cursor: 'pointer', margin: '4px 0 6px' }} onClick={() => setIsChatOpen(true)}>
                {lang === 'en'
                  ? '💬 Have a custom jewel idea? Tell us — we can arrange it for you!'
                  : '💬 உங்களுக்கு ஒரு தனிப்பயன் நகை வேண்டுமா? சொல்லுங்கள் — நாங்கள் ஏற்பாடு செய்கிறோம்!'}
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: '700', cursor: 'pointer' }} onClick={() => setIsChatOpen(true)}>
                {lang === 'en' ? 'Click to Chat →' : 'அழுத்தி பேசுங்கள் →'}
              </span>
            </div>
          )}

          {/* Floating Chatbot Widget */}
          <div className="chatbot-widget">
            <div className="chatbot-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
              {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </div>

            {isChatOpen && (
              <div className="chat-window">
                <div className="chat-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={20} style={{ color: 'var(--gold)' }} />
                    <strong style={{ fontSize: '1rem', fontFamily: 'var(--font-royal)', color: 'var(--gold-glowing)' }}>{t.chatbotTitle}</strong>
                  </div>
                  <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsChatOpen(false)} />
                </div>

                <div className="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      <div>{msg.text}</div>
                      {msg.image && (
                        <img src={msg.image} alt="User reference" style={{ maxWidth: '100%', borderRadius: '4px', marginTop: '6px' }} />
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="chat-input-area">
                  {uploadedBase64 && (
                    <div className="chat-img-indicator">
                      <ImageIcon size={14} />
                      <span>Image added!</span>
                      <X size={12} style={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={() => setUploadedBase64('')} />
                    </div>
                  )}
                  
                  <div className="chat-input-row">
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', padding: '8px', borderRadius: '50%', cursor: 'pointer' }} title={lang === 'en' ? 'Add Photo' : 'புகைப்படம் சேர்'}>
                      <Upload size={16} style={{ color: 'var(--primary)' }} />
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChatImageUpload} disabled={!currentUser} />
                    </label>

                    <input 
                      type="text" 
                      className="chat-input"
                      placeholder={currentUser ? t.chatInputPlaceholder : t.guestMessage}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={!currentUser}
                    />
                    
                    <button type="submit" className="chatbot-toggle" style={{ width: '38px', height: '38px', border: 'none' }} disabled={!currentUser}>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 {t.siteName}. All Rights Reserved. - Quality Covered &amp; Gold Plated Artificial Jewels</p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem', opacity: '0.6' }}>
          {lang === 'en' ? 'Contact Owner (WhatsApp): 8825869139 | Vanitha Coverings, Tamil Nadu' : 'தொடர்புக்கு (வாட்ஸ்ஆப்): 8825869139 | வணிதா கவரிங்ஸ், தமிழ்நாடு'}
        </p>
      </footer>

      {/* Fullscreen Lightbox Image Gallery Modal */}
      {fullscreenImage.isOpen && (
        <div 
          className="fullscreen-lightbox-overlay animate-fade-in"
          onClick={closeFullscreenGallery}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0, 0, 0, 0.94)',
            zIndex: 3000,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px'
          }}
        >
          {/* Top Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', zIndex: 3001 }} onClick={e => e.stopPropagation()}>
            <div>
              <h3 style={{ margin: 0, color: 'var(--gold-glowing)', fontFamily: 'var(--font-royal)', fontSize: '1.3rem' }}>
                {fullscreenImage.title || 'Vanitha Coverings Jewel'}
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#ccc' }}>
                {lang === 'en' ? `View ${fullscreenImage.currentIndex + 1} of ${fullscreenImage.images.length}` : `கோணம் ${fullscreenImage.currentIndex + 1} / ${fullscreenImage.images.length}`}
                {fullscreenImage.currentIndex === 0 ? ` (${lang === 'en' ? 'Front View' : 'முன்பக்கம்'})` : fullscreenImage.currentIndex === 1 ? ` (${lang === 'en' ? 'Back View' : 'பின்பக்கம்'})` : ''}
              </span>
            </div>

            <button 
              onClick={closeFullscreenGallery} 
              style={{
                background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid var(--gold)',
                borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
              }}
              title="Close Full Screen"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Fullscreen Image Area */}
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '15px 0' }} onClick={e => e.stopPropagation()}>
            {fullscreenImage.images.length > 1 && (
              <button
                onClick={prevFullscreenImage}
                style={{
                  position: 'absolute', left: '10px',
                  background: 'rgba(0,0,0,0.65)', color: 'var(--gold)',
                  border: '1.5px solid var(--gold)', borderRadius: '50%',
                  width: '50px', height: '50px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', zIndex: 3002
                }}
                title="Previous Image"
              >
                <ChevronLeft size={30} />
              </button>
            )}

            <img 
              src={fullscreenImage.images[fullscreenImage.currentIndex]} 
              alt="Full Screen Jewel View"
              style={{
                maxWidth: '90vw', maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 12px 50px rgba(0,0,0,0.9)',
                border: '2px solid var(--gold)'
              }}
            />

            {fullscreenImage.images.length > 1 && (
              <button
                onClick={nextFullscreenImage}
                style={{
                  position: 'absolute', right: '10px',
                  background: 'rgba(0,0,0,0.65)', color: 'var(--gold)',
                  border: '1.5px solid var(--gold)', borderRadius: '50%',
                  width: '50px', height: '50px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', zIndex: 3002
                }}
                title="Next Image"
              >
                <ChevronRight size={30} />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {fullscreenImage.images.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', overflowX: 'auto', padding: '10px 0', zIndex: 3001 }} onClick={e => e.stopPropagation()}>
              {fullscreenImage.images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setFullscreenImage(prev => ({ ...prev, currentIndex: idx }))}
                  style={{
                    width: '64px', height: '64px', borderRadius: '6px', overflow: 'hidden',
                    border: fullscreenImage.currentIndex === idx ? '2.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.3)',
                    opacity: fullscreenImage.currentIndex === idx ? 1 : 0.6,
                    cursor: 'pointer', transition: 'all 0.2s', background: '#000'
                  }}
                >
                  <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Interactive Live Camera Capture Modal for Admin */}
      {showCameraModal && (
        <div 
          className="fullscreen-lightbox-overlay animate-fade-in"
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0, 0, 0, 0.96)',
            zIndex: 4000,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Bar: Title & Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Camera style={{ color: 'var(--gold-glowing)' }} size={24} />
              <div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--gold-glowing)', display: 'block' }}>
                  📸 {lang === 'en' ? 'Live Camera Capture' : 'நேரலை கேமரா படம்'}
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#ccc' }}>
                  {cameraFacingMode === 'environment' 
                    ? (lang === 'en' ? '📷 Rear Phone Camera Active' : '📷 பின்புற கேமரா') 
                    : (lang === 'en' ? '🤳 Front Camera Active' : '🤳 முன்புற கேமரா')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Switch Rear / Front Camera Button */}
              <button
                type="button"
                onClick={handleSwitchCameraFacingMode}
                style={{
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: '1px solid var(--gold)', borderRadius: '20px',
                  padding: '6px 14px', fontSize: '0.8rem', display: 'flex',
                  alignItems: 'center', gap: '6px', cursor: 'pointer'
                }}
                title="Switch Camera"
              >
                <RefreshCw size={15} />
                {lang === 'en' ? 'Flip Camera' : 'கேமரா மாற்று'}
              </button>

              <button
                type="button"
                onClick={handleCloseCameraModal}
                style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff',
                  border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Center Viewport: Video Stream & Shutter Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, my: '10px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', display: 'flex', justifyContent: 'center' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  maxHeight: '52vh',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '2.5px solid var(--gold)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
                }}
              />

              {/* Shutter Overlay Button */}
              <button
                type="button"
                onClick={handleCaptureCameraPhoto}
                style={{
                  position: 'absolute', bottom: '16px',
                  background: 'linear-gradient(135deg, #d4af37, #b8860b)',
                  color: '#1a0005', border: '3px solid #fff',
                  borderRadius: '50px', padding: '12px 28px',
                  fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                  animation: 'pulse 1.8s infinite'
                }}
              >
                <Camera size={22} />
                {lang === 'en' ? 'Snap Photo' : 'படம் எடு'}
              </button>
            </div>
          </div>

          {/* Bottom Bar: Captured Thumbnails & Save Button */}
          <div style={{ background: 'rgba(20, 20, 20, 0.95)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-glowing)', fontWeight: '700' }}>
                📸 {lang === 'en' ? `Captured Views (${capturedCameraPhotos.length})` : `எடுக்கப்பட்ட படங்கள் (${capturedCameraPhotos.length})`}
              </span>

              {capturedCameraPhotos.length > 0 && (
                <button
                  type="button"
                  onClick={handleSaveCapturedCameraPhotos}
                  style={{
                    background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
                    color: '#fff', border: '1px solid #a5d6a7',
                    borderRadius: '8px', padding: '6px 16px',
                    fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <CheckCircle size={16} />
                  {lang === 'en' ? `Use ${capturedCameraPhotos.length} Photos in Jewel` : `இந்த ${capturedCameraPhotos.length} படங்களை பயன்படுத்து`}
                </button>
              )}
            </div>

            {capturedCameraPhotos.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: '#888', margin: '4px 0', textAlign: 'center' }}>
                {lang === 'en' ? 'Tap "Snap Photo" above to capture front, back, or side views of your jewel!' : 'நகையின் முன்பக்கம், பின்பக்கம் படம் எடுக்க மேலே உள்ள "படம் எடு" பொத்தானை அழுத்தவும்!'}
              </p>
            ) : (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {capturedCameraPhotos.map((photo, pIdx) => (
                  <div key={pIdx} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1.5px solid var(--gold)', background: '#000' }}>
                    <img src={photo} alt={`Captured ${pIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemoveCapturedCameraPhoto(pIdx)}
                      style={{
                        position: 'absolute', top: '2px', right: '2px',
                        background: 'rgba(198,40,40,0.9)', color: '#fff',
                        border: 'none', borderRadius: '50%', width: '18px', height: '18px',
                        fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                      }}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
