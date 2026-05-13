import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Welcome Screen
      careConnect: 'CareConnect',
      mobile: 'Mobile',
      welcomeBack: 'Welcome Back!',
      email: 'Email',
      enterEmail: 'Enter your email',
      password: 'Password',
      enterPassword: 'Enter your password',
      logIn: 'Log In',
      forgotPassword: 'Forgot Password?',
      or: 'OR',
      caregiverLogin: 'Caregiver Login',
      caregiverDesc: 'For next-of-kin & proxies',
      needHelp: 'Need help logging in?',

      // Language Selection
      selectLanguage: 'Select Language',
      english: 'English',
      malay: 'Bahasa Melayu',
      chinese: '中文 (简体)',
      tamil: 'தமிழ் (Tamil)',
      continue: 'Continue',

      // Home Screen
      goodMorning: 'Good Morning',
      dailyCheckIn: 'Daily Check-in',
      checkedIn: 'Checked In',
      checkInDesc: 'How are you feeling today? Complete your daily health check-in',
      checkedInDesc: "Great! You've completed your daily check-in",
      doCheckIn: 'Do my daily check-in',
      viewMedicalRecords: 'View Medical Records',
      viewMedicalRecordsDesc: 'Access your health history',
      medicationReminders: 'Medication Reminders',
      medicationRemindersDesc: 'Manage your medications',
      upcomingAppointments: 'Upcoming Appointments',
      upcomingAppointmentsDesc: 'See your scheduled visits',

      // Navigation
      home: 'Home',
      meds: 'Meds',
      sos: 'SOS',
      points: 'Points',
      profile: 'Profile',

      // SOS Screen
      emergencySOS: 'Emergency SOS',
      sosDesc: 'Press the button below to send SOS to your emergency contacts',
      sendingAlert: 'Sending emergency alert...',
      sosWarning: 'This feature will alert emergency services in 15 seconds',
      editEmergencyContacts: 'Edit Emergency Contacts',
      viewSupport: 'View My Support',

      // Profile Screen
      personalInfo: 'Personal Information',
      notifications: 'Notifications',
      privacySecurity: 'Privacy & Security',
      helpSupport: 'Help & Support',
      logOut: 'Log Out',
      editProfile: 'Edit Profile',

      // Points Screen
      healthRewardsBalance: 'Your Health Rewards Balance',
      redeemPoints: 'Redeem Your Points',
      healthStoreVoucher: '$5 Health Store Voucher',
      freeCheckup: 'Free Health Checkup',
      pharmacyDiscount: '$10 Pharmacy Discount',
      redeem: 'Redeem',
      howToEarn: 'How to Earn Points',
      earnCheckIn: 'Daily Check-in',
      earnAssessment: 'Complete Health Assessment',
      earnAdherence: 'Medication Adherence (7 days)',
      earnReferral: 'Refer a Friend',
      pts: 'pts',

      // Medication Screen
      medicationRemindersTitle: 'Medication Reminders',
      addNewMedication: 'Add New Medication',
      taken: 'Taken',
      takeNow: 'Take Now',
    },
  },
  ms: {
    translation: {
      // Welcome Screen
      careConnect: 'CareConnect',
      mobile: 'Mudah Alih',
      welcomeBack: 'Selamat Kembali!',
      email: 'E-mel',
      enterEmail: 'Masukkan e-mel anda',
      password: 'Kata Laluan',
      enterPassword: 'Masukkan kata laluan anda',
      logIn: 'Log Masuk',
      forgotPassword: 'Lupa Kata Laluan?',
      or: 'ATAU',
      caregiverLogin: 'Log Masuk Penjaga',
      caregiverDesc: 'Untuk saudara terdekat & proksi',
      needHelp: 'Perlukan bantuan log masuk?',

      // Language Selection
      selectLanguage: 'Pilih Bahasa',
      english: 'English',
      malay: 'Bahasa Melayu',
      chinese: '中文 (简体)',
      tamil: 'தமிழ் (Tamil)',
      continue: 'Teruskan',

      // Home Screen
      goodMorning: 'Selamat Pagi',
      dailyCheckIn: 'Daftar Masuk Harian',
      checkedIn: 'Berjaya Daftar',
      checkInDesc: 'Bagaimana perasaan anda hari ini? Lengkapkan pemeriksaan kesihatan harian anda',
      checkedInDesc: 'Hebat! Anda telah menyelesaikan daftar masuk harian anda',
      doCheckIn: 'Buat daftar masuk harian saya',
      viewMedicalRecords: 'Lihat Rekod Perubatan',
      viewMedicalRecordsDesc: 'Akses sejarah kesihatan anda',
      medicationReminders: 'Peringatan Ubat',
      medicationRemindersDesc: 'Urus ubat-ubatan anda',
      upcomingAppointments: 'Temujanji Akan Datang',
      upcomingAppointmentsDesc: 'Lihat lawatan terjadual anda',

      // Navigation
      home: 'Utama',
      meds: 'Ubat',
      sos: 'SOS',
      points: 'Mata',
      profile: 'Profil',

      // SOS Screen
      emergencySOS: 'SOS Kecemasan',
      sosDesc: 'Tekan butang di bawah untuk hantar SOS kepada kenalan kecemasan anda',
      sendingAlert: 'Menghantar amaran kecemasan...',
      sosWarning: 'Ciri ini akan memaklumkan perkhidmatan kecemasan dalam 15 saat',
      editEmergencyContacts: 'Edit Kenalan Kecemasan',
      viewSupport: 'Lihat Sokongan Saya',

      // Profile Screen
      personalInfo: 'Maklumat Peribadi',
      notifications: 'Pemberitahuan',
      privacySecurity: 'Privasi & Keselamatan',
      helpSupport: 'Bantuan & Sokongan',
      logOut: 'Log Keluar',
      editProfile: 'Edit Profil',

      // Points Screen
      healthRewardsBalance: 'Baki Ganjaran Kesihatan Anda',
      redeemPoints: 'Tebus Mata Anda',
      healthStoreVoucher: 'Baucar Kedai Kesihatan $5',
      freeCheckup: 'Pemeriksaan Kesihatan Percuma',
      pharmacyDiscount: 'Diskaun Farmasi $10',
      redeem: 'Tebus',
      howToEarn: 'Cara Untuk Dapatkan Mata',
      earnCheckIn: 'Daftar masuk harian',
      earnAssessment: 'Lengkapkan Penilaian Kesihatan',
      earnAdherence: 'Pematuhan Ubat (7 hari)',
      earnReferral: 'Rujuk Rakan',
      pts: 'mata',

      // Medication Screen
      medicationRemindersTitle: 'Peringatan Ubat',
      addNewMedication: 'Tambah Ubat Baru',
      taken: 'Diambil',
      takeNow: 'Ambil Sekarang',
    },
  },
  zh: {
    translation: {
      // Welcome Screen
      careConnect: 'CareConnect',
      mobile: '移动版',
      welcomeBack: '欢迎回来！',
      email: '电子邮件',
      enterEmail: '输入您的电子邮件',
      password: '密码',
      enterPassword: '输入您的密码',
      logIn: '登录',
      forgotPassword: '忘记密码？',
      or: '或',
      caregiverLogin: '护理人员登录',
      caregiverDesc: '适用于近亲和代理人',
      needHelp: '需要登录帮助？',

      // Language Selection
      selectLanguage: '选择语言',
      english: 'English',
      malay: 'Bahasa Melayu',
      chinese: '中文 (简体)',
      tamil: 'தமிழ் (Tamil)',
      continue: '继续',

      // Home Screen
      goodMorning: '早上好',
      dailyCheckIn: '每日签到',
      checkedIn: '已签到',
      checkInDesc: '您今天感觉如何？完成您的每日健康检查',
      checkedInDesc: '太好了！您已完成今日签到',
      doCheckIn: '进行每日签到',
      viewMedicalRecords: '查看医疗记录',
      viewMedicalRecordsDesc: '访问您的健康历史',
      medicationReminders: '用药提醒',
      medicationRemindersDesc: '管理您的药物',
      upcomingAppointments: '即将到来的预约',
      upcomingAppointmentsDesc: '查看您的预定访问',

      // Navigation
      home: '首页',
      meds: '药物',
      sos: '紧急',
      points: '积分',
      profile: '个人',

      // SOS Screen
      emergencySOS: '紧急求救',
      sosDesc: '按下面的按钮向您的紧急联系人发送求救信号',
      sendingAlert: '正在发送紧急警报...',
      sosWarning: '此功能将在15秒内通知紧急服务',
      editEmergencyContacts: '编辑紧急联系人',
      viewSupport: '查看我的支持',

      // Profile Screen
      personalInfo: '个人信息',
      notifications: '通知',
      privacySecurity: '隐私与安全',
      helpSupport: '帮助与支持',
      logOut: '退出登录',
      editProfile: '编辑个人资料',

      // Points Screen
      healthRewardsBalance: '您的健康奖励余额',
      redeemPoints: '兑换您的积分',
      healthStoreVoucher: '$5 健康商店优惠券',
      freeCheckup: '免费健康检查',
      pharmacyDiscount: '$10 药房折扣',
      redeem: '兑换',
      howToEarn: '如何赚取积分',
      earnCheckIn: '每日签到',
      earnAssessment: '完成健康评估',
      earnAdherence: '药物依从性（7天）',
      earnReferral: '推荐朋友',
      pts: '分',

      // Medication Screen
      medicationRemindersTitle: '用药提醒',
      addNewMedication: '添加新药物',
      taken: '已服用',
      takeNow: '立即服用',
    },
  },
  ta: {
    translation: {
      // Welcome Screen
      careConnect: 'CareConnect',
      mobile: 'மொபைல்',
      welcomeBack: 'மீண்டும் வரவேற்கிறோம்!',
      email: 'மின்னஞ்சல்',
      enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      password: 'கடவுச்சொல்',
      enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      logIn: 'உள்நுழைய',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      or: 'அல்லது',
      caregiverLogin: 'பராமரிப்பாளர் உள்நுழைவு',
      caregiverDesc: 'உறவினர்கள் & பிரதிநிதிகளுக்கு',
      needHelp: 'உள்நுழைவதில் உதவி தேவையா?',

      // Language Selection
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      english: 'English',
      malay: 'Bahasa Melayu',
      chinese: '中文 (简体)',
      tamil: 'தமிழ் (Tamil)',
      continue: 'தொடரவும்',

      // Home Screen
      goodMorning: 'காலை வணக்கம்',
      dailyCheckIn: 'தினசரி செக்-இன்',
      checkedIn: 'செக்-இன் செய்யப்பட்டது',
      checkInDesc: 'இன்று நீங்கள் எப்படி உணர்கிறீர்கள்? உங்கள் தினசரி சுகாதார சோதனையை முடிக்கவும்',
      checkedInDesc: 'அருமை! நீங்கள் உங்கள் தினசரி செக்-இன் முடித்துவிட்டீர்கள்',
      doCheckIn: 'எனது தினசரி செக்-இன் செய்யவும்',
      viewMedicalRecords: 'மருத்துவ பதிவுகளைக் காண்க',
      viewMedicalRecordsDesc: 'உங்கள் சுகாதார வரலாற்றை அணுகவும்',
      medicationReminders: 'மருந்து நினைவூட்டல்கள்',
      medicationRemindersDesc: 'உங்கள் மருந்துகளை நிர்வகிக்கவும்',
      upcomingAppointments: 'வரவிருக்கும் நியமனங்கள்',
      upcomingAppointmentsDesc: 'உங்கள் திட்டமிடப்பட்ட வருகைகளைக் காண்க',

      // Navigation
      home: 'முகப்பு',
      meds: 'மருந்துகள்',
      sos: 'SOS',
      points: 'புள்ளிகள்',
      profile: 'சுயவிவரம்',

      // SOS Screen
      emergencySOS: 'அவசர SOS',
      sosDesc: 'உங்கள் அவசர தொடர்புகளுக்கு SOS அனுப்ப கீழே உள்ள பொத்தானை அழுத்தவும்',
      sendingAlert: 'அவசர எச்சரிக்கையை அனுப்புகிறது...',
      sosWarning: 'இந்த அம்சம் 15 விநாடிகளில் அவசர சேவைகளை எச்சரிக்கும்',
      editEmergencyContacts: 'அவசர தொடர்புகளைத் திருத்து',
      viewSupport: 'எனது ஆதரவைக் காண்க',

      // Profile Screen
      personalInfo: 'தனிப்பட்ட தகவல்',
      notifications: 'அறிவிப்புகள்',
      privacySecurity: 'தனியுரிமை & பாதுகாப்பு',
      helpSupport: 'உதவி & ஆதரவு',
      logOut: 'வெளியேறு',
      editProfile: 'சுயவிவரத்தைத் திருத்து',

      // Points Screen
      healthRewardsBalance: 'உங்கள் சுகாதார வெகுமதி இருப்பு',
      redeemPoints: 'உங்கள் புள்ளிகளை மீட்கவும்',
      healthStoreVoucher: '$5 சுகாதார கடை வவுச்சர்',
      freeCheckup: 'இலவச சுகாதார பரிசோதனை',
      pharmacyDiscount: '$10 மருந்தகம் தள்ளுபடி',
      redeem: 'மீட்கவும்',
      howToEarn: 'புள்ளிகளைப் பெறுவது எப்படி',
      earnCheckIn: 'தினசரி செக்-இன்',
      earnAssessment: 'சுகாதார மதிப்பீட்டை முடிக்கவும்',
      earnAdherence: 'மருந்து கடைபிடிப்பு (7 நாட்கள்)',
      earnReferral: 'நண்பரை பரிந்துரைக்கவும்',
      pts: 'புள்ளிகள்',

      // Medication Screen
      medicationRemindersTitle: 'மருந்து நினைவூட்டல்கள்',
      addNewMedication: 'புதிய மருந்தைச் சேர்க்கவும்',
      taken: 'எடுக்கப்பட்டது',
      takeNow: 'இப்போது எடுக்கவும்',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
