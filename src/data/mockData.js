export const STANDARD_QUESTIONS = [
  {
    id: "q1_complaint",
    category: "Chief Complaint",
    question: {
      en: "What is your main health problem today?",
      hi: "आज आपकी मुख्य स्वास्थ्य समस्या क्या है?",
      mr: "आज तुमची मुख्य आरोग्य समस्या काय आहे?",
      ta: "இன்று உங்கள் முக்கிய சுகாதார பிரச்சினை என்ன?"
    },
    audioPrompt: "Please tell us what symptom or discomfort brought you to the hospital today.",
    chips: [
      { label: { en: "Fever & Chills", hi: "बुखार और सर्दी" }, val: "Fever & Chills for 3 days" },
      { label: { en: "Severe Chest Pain", hi: "सीने में तेज दर्द" }, val: "Chest Pain with shortness of breath", isRedFlag: true },
      { label: { en: "Cough & Cold", hi: "खांसी और जुकाम" }, val: "Persistent Cough with Phlegm" },
      { label: { en: "Stomach Ache / Vomiting", hi: "पेट दर्द / उल्टी" }, val: "Severe Abdominal Pain & Vomiting" },
      { label: { en: "Joint Pain & Weakness", hi: "जोड़ों का दर्द" }, val: "Joint Pain & Knee Stiffness" }
    ]
  },
  {
    id: "q2_duration",
    category: "HPI",
    question: {
      en: "How long have you had this problem?",
      hi: "यह समस्या आपको कितने समय से है?",
      mr: "हा त्रास तुम्हाला किती दिवसांपासून आहे?",
      ta: "இந்த பிரச்சனை உங்களுக்கு எவ்வளவு காலமாக உள்ளது?"
    },
    audioPrompt: "Select or say how many days or weeks you have been experiencing these symptoms.",
    chips: [
      { label: { en: "Since Today Morning", hi: "आज सुबह से" }, val: "1 Day (Acute onset)" },
      { label: { en: "2 to 3 Days", hi: "2 से 3 दिन" }, val: "2-3 Days" },
      { label: { en: "About 1 Week", hi: "लगभग 1 हफ्ता" }, val: "1 Week" },
      { label: { en: "More than 1 Month", hi: "1 महीने से अधिक" }, val: "Chronic (> 1 Month)" }
    ]
  },
  {
    id: "q3_past_history",
    category: "Past History",
    question: {
      en: "Do you have any existing health conditions?",
      hi: "क्या आपको पहले से कोई बीमारी या डायबिटीज/बीपी है?",
      mr: "तुम्हाला पूर्वीपासून काही आजार जसे की बीपी किंवा शुगर आहे का?",
      ta: "உங்களுக்கு ஏற்கனவே ஏதேனும் நோய் உள்ளதா?"
    },
    audioPrompt: "Tap all existing medical conditions you take daily medication for.",
    chips: [
      { label: { en: "High BP (Hypertension)", hi: "हाई बीपी" }, val: "Hypertension (On Meds)" },
      { label: { en: "Diabetes (Sugar)", hi: "डायबिटीज (शुगर)" }, val: "Diabetes Mellitus Type 2" },
      { label: { en: "Asthma / Breathing issue", hi: "अस्थमा / सांस फूलना" }, val: "Bronchial Asthma" },
      { label: { en: "Thyroid / Heart Condition", hi: "थायराइड / दिल की बीमारी" }, val: "Thyroid Disorder" },
      { label: { en: "None of these", hi: "इनमें से कोई नहीं" }, val: "No Known Co-morbidities" }
    ]
  },
  {
    id: "q4_medications",
    category: "Current Medications",
    question: {
      en: "Are you currently taking any medicines daily?",
      hi: "क्या आप रोजाना कोई दवाएं ले रहे हैं?",
      mr: "तुम्ही सध्या कोणती औषधे दररोज घेत आहात का?",
      ta: "நீங்கள் தினமும் ஏதேனும் மருந்துகளை உட்கொள்கிறீர்களா?"
    },
    audioPrompt: "State any medicines, insulin, or home remedies you are taking currently.",
    chips: [
      { label: { en: "BP Tablet (Amlodipine/Metoprolol)", hi: "बीपी की गोली" }, val: "Amlodipine 5mg OD" },
      { label: { en: "Sugar Tablet / Insulin", hi: "शुगर की गोली / इंसुलिन" }, val: "Metformin 500mg BD" },
      { label: { en: "Painkillers (Paracetamol/Ibuprofen)", hi: "दर्द निवारक दवा" }, val: "Paracetamol 650mg PRN" },
      { label: { en: "No Medicines Currently", hi: "कोई दवा नहीं" }, val: "None" }
    ]
  },
  {
    id: "q5_allergies",
    category: "Allergies",
    question: {
      en: "Do you have any allergies to medicines or food?",
      hi: "क्या आपको किसी दवा या भोजन से एलर्जी है?",
      mr: "तुम्हाला कोणत्याही औषधाची किंवा अन्नाची ऍलर्जी आहे का?",
      ta: "உங்களுக்கு ஏதேனும் மருந்து அல்லது உணவு ஒவ்வாமை உள்ளதா?"
    },
    audioPrompt: "Mention any medicine that causes itching, swelling, or rash for you.",
    chips: [
      { label: { en: "Penicillin / Antibiotics Allergy", hi: "पेनिसिलिन / एंटीबायोटिक एलर्जी" }, val: "Penicillin Severe Rash", isRedFlag: true },
      { label: { en: "Sulfa Drugs", hi: "सल्फा दवाएं" }, val: "Sulfa Allergy" },
      { label: { en: "Dust / Pollen / Food Allergy", hi: "धूल / भोजन एलर्जी" }, val: "Dust/Food Allergy" },
      { label: { en: "No Known Allergies (NKDA)", hi: "कोई एलर्जी नहीं" }, val: "No Known Drug Allergies" }
    ]
  }
];

export const AYUSH_QUESTIONS = [
  {
    id: "ayush_prakriti",
    category: "AYUSH - Prakriti (Body Constitution)",
    question: {
      en: "How would you describe your natural physical constitution (Prakriti)?",
      hi: "आप अपनी प्राकृतिक शारीरिक प्रकृति (वात, पित्त, कफ) का वर्णन कैसे करेंगे?",
      mr: "आपल्या नैसर्गिक शारीरिक प्रकृतीचे वर्णन कसे कराल?",
      ta: "உங்கள் பிரக்ருதி இயல்பை எவ்வாறு விவரிப்பீர்கள்?"
    },
    audioPrompt: "Ayurvedic assessment of baseline constitutional dominance: Vata, Pitta, or Kapha.",
    chips: [
      { label: { en: "Vata (Thin frame, light sleep, quick movement)", hi: "वात (दुबला शरीर, हल्की नींद)" }, val: "Vata-dominant Prakriti" },
      { label: { en: "Pitta (Medium body, high hunger/thirst, warm skin)", hi: "पित्त (मध्यम शरीर, तेज भूख)" }, val: "Pitta-dominant Prakriti" },
      { label: { en: "Kapha (Stout frame, calm, deep sleep)", hi: "कफ (मजबूत शरीर, गहरी नींद)" }, val: "Kapha-dominant Prakriti" },
      { label: { en: "Dual / Mixed (Vata-Pitta / Pitta-Kapha)", hi: "द्वि-दोष (वात-पित्त / पित्त-कफ)" }, val: "Dvandvaja (Vata-Pitta) Prakriti" }
    ]
  },
  {
    id: "ayush_vikriti",
    category: "AYUSH - Vikriti (Current Imbalance)",
    question: {
      en: "What current imbalance or discomfort are you experiencing?",
      hi: "वर्तमान में आप किस दोष असंतुलन (विकृति) को महसूस कर रहे हैं?",
      mr: "सध्या तुम्हाला कोणत्या दोषांचे असंतुलन जाणवत आहे?",
      ta: "தற்போது நீங்கள் உணரும் விக்ருதி கோளாறு என்ன?"
    },
    audioPrompt: "Assess current state of Vikriti: joint gas/dryness, acidity/burning, or heaviness/phlegm.",
    chips: [
      { label: { en: "Vata Vikriti (Gas, Dryness, Joint Cracking)", hi: "वात असंतुलन (गैस, जोड़ों में दर्द)" }, val: "Vata Imbalance (Vataja Vikriti)" },
      { label: { en: "Pitta Vikriti (Hyperacidity, Burning, Heat)", hi: "पित्त असंतुलन (एसिडिटी, जलन)" }, val: "Pitta Imbalance (Amlapitta / Daha)" },
      { label: { en: "Kapha Vikriti (Heavy head, Excessive phlegm, Lethargy)", hi: "कफ असंतुलन (भारीपन, बलगम)" }, val: "Kapha Imbalance (Kaphaja Gaurava)" }
    ]
  },
  {
    id: "ayush_agni",
    category: "AYUSH - Agni (Digestive Fire)",
    question: {
      en: "How is your digestion and appetite (Agni)?",
      hi: "आपकी पाचन शक्ति और भूख (अग्नि) कैसी है?",
      mr: "तुमची पचनशक्ती आणि भूक कशी आहे?",
      ta: "உங்கள் ஜீரண சக்தி மற்றும் பசி எவ்வாறு உள்ளது?"
    },
    audioPrompt: "Assess Agni state: Mandagni (sluggish), Tikshnagni (intense), Vishamagni (irregular), or Samagni (balanced).",
    chips: [
      { label: { en: "Mandagni (Sluggish digestion, bloating after small meals)", hi: "मंदाग्नि (धीमी पाचन शक्ति, भारीपन)" }, val: "Mandagni (Sluggish Agni)" },
      { label: { en: "Tikshnagni (Intense hunger, frequent loose acid stools)", hi: "तीक्ष्णाग्नि (तेज भूख, खट्टी डकार)" }, val: "Tikshnagni (Hyperactive Agni)" },
      { label: { en: "Vishamagni (Irregular hunger & unpredictable stomach)", hi: "विषमाग्नि (अनियमित भूख)" }, val: "Vishamagni (Irregular Agni)" },
      { label: { en: "Samagni (Normal balanced hunger & easy digestion)", hi: "समाग्नि (सामान्य स्वस्थ पाचन)" }, val: "Samagni (Normal Digestion)" }
    ]
  },
  {
    id: "ayush_koshtha",
    category: "AYUSH - Koshtha & Bowels",
    question: {
      en: "How would you describe your bowel movements (Koshtha)?",
      hi: "आपकी पेट साफ होने की स्थिति (कोष्ठ) कैसी है?",
      mr: "तुमचे पोट साफ होण्याची सवय कशी आहे?",
      ta: "உங்கள் குடல் இயக்கம் எவ்வாறு உள்ளது?"
    },
    audioPrompt: "Evaluate Koshtha status: Krura (hard/constipated), Mridu (soft/laxative-sensitive), or Madhyama (balanced).",
    chips: [
      { label: { en: "Krura Koshtha (Hard stools, chronic constipation)", hi: "क्रूर कोष्ठ (कब्ज, कठिन मल)" }, val: "Krura Koshtha (Constipated Pattern)" },
      { label: { en: "Mridu Koshtha (Soft stools, easily gets loose motion)", hi: "मृदु कोष्ठ (नरम मल, आसानी से दस्त)" }, val: "Mridu Koshtha (Laxity Pattern)" },
      { label: { en: "Madhyama Koshtha (Regular once daily normal stool)", hi: "मध्यम कोष्ठ (नियमित पेट साफ)" }, val: "Madhyama Koshtha (Regular Bowel)" }
    ]
  },
  {
    id: "ayush_ahara_vihara",
    category: "AYUSH - Ahara & Vihara (Diet & Lifestyle)",
    question: {
      en: "What are your daily dietary and sleep habits (Ahara-Vihara)?",
      hi: "आपका दैनिक आहार और सोने-जागने का समय (आहार-विहार) कैसा है?",
      mr: "तुमचा दैनंदिन आहार आणि झोपेची पद्धत कशी आहे?",
      ta: "உங்கள் தினசரி உணவு மற்றும் தூக்கப் பழக்கம் என்ன?"
    },
    audioPrompt: "Assess dietary habits (Ahara), late-night wakefulness (Ratri Jagarana), and stress levels.",
    chips: [
      { label: { en: "Spicy/Oily Food + Late Night Sleeping", hi: "मसालेदार खाना + देर रात तक जगना" }, val: "Katu-Vidahi Ahara & Ratri Jagarana" },
      { label: { en: "Irregular Meals + High Mental Stress", hi: "अनियमित भोजन + अत्यधिक तनाव" }, val: "Vishamashana & Mansika Tapa" },
      { label: { en: "Sedentary Lifestyle + Excess Dairy/Sweets", hi: "आरामदायक दिनचर्या + मीठा/दूध" }, val: "Avyayama & Guru-Madhura Ahara" },
      { label: { en: "Balanced Home Cooked Food & Regular Timings", hi: "संतुलित सात्विक भोजन" }, val: "Satvik Ahara & Niyama Vihara" }
    ]
  }
];

export const MOCK_OCR_DOCUMENTS = [
  {
    id: "doc_001",
    filename: "Apollo_OPD_Prescription_2025.jpg",
    fileSize: "1.4 MB",
    uploadedTime: "2 mins ago",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=60",
    status: "extracted",
    extractedData: {
      hospitalName: "Apollo Hospitals OPD Dept",
      doctorName: "Dr. K. S. Verma (MD General Med)",
      visitDate: "2025-11-14",
      diagnosis: "Essential Hypertension & Mild Upper Respiratory Infection",
      medicines: [
        { name: "Tab. Amlodipine", dosage: "5mg", frequency: "1-0-0 (Morning)", duration: "30 Days" },
        { name: "Tab. Paracetamol", dosage: "650mg", frequency: "1-0-1 (As needed)", duration: "5 Days" },
        { name: "Syr. Benadryl", dosage: "10ml", frequency: "0-0-1 (Night)", duration: "5 Days" }
      ],
      investigationsRequired: "CBC, Serum Creatinine, Fasting Blood Sugar",
      notes: "Follow up after 1 month. Avoid heavy salt intake."
    }
  },
  {
    id: "doc_002",
    filename: "Diagnostic_Lab_Report_HbA1c.pdf",
    fileSize: "850 KB",
    uploadedTime: "Just now",
    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=150&auto=format&fit=crop&q=60",
    status: "extracted",
    extractedData: {
      hospitalName: "Metropolis Healthcare Lab",
      doctorName: "Ref by Dr. S. Patel",
      visitDate: "2026-02-10",
      diagnosis: "Laboratory Blood Test - HbA1c & Lipid Profile",
      medicines: [],
      investigationsRequired: "HbA1c: 7.2% (Elevated), Fasting Glucose: 138 mg/dL, Triglycerides: 190 mg/dL",
      notes: "Diabetic control needs review. Repeat in 3 months."
    }
  }
];

export const MOCK_PATIENT_QUEUE = [
  {
    tokenNo: "101",
    id: "pt_101",
    name: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    abhaId: "14-1234-5678-9012",
    waitTime: "12 mins",
    chiefComplaintPreview: "Chest pain with shortness of breath & sweating",
    hasRedFlag: true,
    redFlagReason: "CRITICAL: Severe retrosternal chest pain with diaphoretic symptoms detected by AI.",
    ayushModeActive: false,
    summary: {
      chiefComplaint: "Severe Chest Pain & Mild Shortness of Breath (Duration: 4 Hours)",
      hpi: "Patient reports sudden onset retrosternal chest heaviness starting at 6 AM today after morning walk. Radiates slightly to left arm. Accompanied by mild sweating. No previous episode.",
      pastHistory: "Hypertension for 5 years on Tab. Amlodipine 5mg. Non-smoker.",
      medications: "Tab. Amlodipine 5mg OD, Tab. Aspirin 75mg OD (Self initiated today)",
      allergies: "Penicillin (Causes severe itching & hives)",
      familyHistory: "Father died of Acute Myocardial Infarction at age 52.",
      personalHistory: "Diet: Mixed, Sleep: 6 hours/night, Tobacco: None",
      reviewOfSystems: "Cardiovascular: Positive for chest pressure. Respiratory: Mild dyspnea on exertion. GI: Mild nausea.",
      ayushParameters: null,
    },
    timeline: [
      { date: "2026-09-02 (Today)", event: "OPD Pre-Consultation Kiosk Check-in (Token #101)", type: "current" },
      { date: "2026-02-10", event: "Metropolis Lab: HbA1c 7.2%, Lipid Profile Elevated", type: "lab" },
      { date: "2025-11-14", event: "Apollo OPD Visit: Prescribed Amlodipine 5mg OD", type: "prescription" },
      { date: "2024-05-20", event: "District Hospital Emergency: Evaluated for Palpitations", type: "hospital" }
    ]
  },
  {
    tokenNo: "102",
    id: "pt_102",
    name: "Sunita Devi",
    age: 38,
    gender: "Female",
    abhaId: "91-9876-5432-1098",
    waitTime: "25 mins",
    chiefComplaintPreview: "Hyperacidity, epigastric burning & Mandagni (AYUSH Intake)",
    hasRedFlag: false,
    redFlagReason: null,
    ayushModeActive: true,
    summary: {
      chiefComplaint: "Pitta Imbalance (Amlapitta) with Epigastric Burning & Acid Reflux",
      hpi: "3 weeks history of burning sensation in throat and chest after lunch. Worse after spicy meals and tea.",
      pastHistory: "No chronic illness reported. Hypothyroidism under evaluation.",
      medications: "Cap. Omez 20mg PRN (Over the counter)",
      allergies: "No Known Drug Allergies (NKDA)",
      familyHistory: "Mother has chronic gastritis.",
      personalHistory: "Diet: High spice, frequent tea/coffee (4 cups/day). Sleep: Interrupted.",
      reviewOfSystems: "GI: Burning epigastrium, sour eructations, bloated feeling.",
      ayushParameters: {
        prakriti: "Pitta-Vata Dvandvaja Prakriti",
        vikriti: "Pitta Imbalance (Amlapitta & Daha)",
        agni: "Mandagni (Sluggish digestion after meals)",
        koshtha: "Krura Koshtha (Hard stools every 2 days)",
        aharaVihara: "Katu-Vidahi Ahara (Spicy/Oily diet) & Ratri Jagarana (Late sleep)",
        nidana: "Irregular meal timings & excessive sour/spicy food",
        samprapti: "Agni Mandya leading to Amavisha and Pitta Prakopa in Amashaya."
      }
    },
    timeline: [
      { date: "2026-09-02 (Today)", event: "OPD AYUSH Kiosk Check-in (Token #102)", type: "current" },
      { date: "2026-01-15", event: "Local PHC Center: Prescribed Antacids & Multivitamins", type: "prescription" }
    ]
  },
  {
    tokenNo: "103",
    id: "pt_103",
    name: "Gurpreet Singh",
    age: 58,
    gender: "Male",
    abhaId: "45-5566-7788-9900",
    waitTime: "35 mins",
    chiefComplaintPreview: "Chronic knee joint pain & high fasting blood sugar",
    hasRedFlag: false,
    redFlagReason: null,
    ayushModeActive: false,
    summary: {
      chiefComplaint: "Bilateral Knee Osteoarthritis Pain & Uncontrolled Diabetes",
      hpi: "Knee pain for 2 years, severe while climbing stairs. Morning stiffness for 20 mins. Fasting sugar recorded 190 mg/dL yesterday.",
      pastHistory: "Diabetes Mellitus Type 2 (10 yrs), Osteoarthritis Both Knees.",
      medications: "Tab. Metformin 1000mg BD, Tab. Teneligliptin 20mg OD",
      allergies: "Sulfa Drugs",
      familyHistory: "Both parents had Type 2 Diabetes.",
      personalHistory: "Diet: Vegetarian, High Carbohydrate. Exercise: Minimal due to knee pain.",
      reviewOfSystems: "Musculoskeletal: Bilateral crepitus knee joints, tenderness grade 2.",
      ayushParameters: null
    },
    timeline: [
      { date: "2026-09-02 (Today)", event: "OPD Pre-Consultation Check-in (Token #103)", type: "current" },
      { date: "2025-12-01", event: "Civil Hospital Ortho OPD: Knee X-Ray shows Grade 3 OA", type: "lab" }
    ]
  }
];
