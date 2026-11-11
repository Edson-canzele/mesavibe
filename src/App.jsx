import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Shield, Globe, Sparkles, LogOut, Settings, Calendar, 
  Bell, DollarSign, Award, Utensils, UserCheck, Lock, CheckCircle,
  Wine, Users, Clock, AlertCircle, ChevronRight, Check, Trash2, Plus, Save
} from 'lucide-react';

// ==========================================
// CONFIGURAÇÃO SUPABASE & RLS
// ==========================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// DICIONÁRIO DE TRADUÇÕES NATIVAS COMPLETAS (4 IDIOMAS)
// ==========================================
const translations = {
  pt: {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "A plataforma inteligente e segura de gestão de mesas e menus digitais para Cape Town.",
    enterSystem: "Painel do Restaurante (Login)",
    exploreCustomer: "Testar Experiência do Cliente",
    featuresTitle: "Ecossistema Completo MesaVibe",
    f1Title: "Segurança Bancária & RLS",
    f1Desc: "Dados isolados por tenant com proteção total contra SQL Injection e políticas restritas no Supabase.",
    f2Title: "IA Sommelier de Vinhos",
    f2Desc: "Harmonização inteligente com vinhos da região (Stellenbosch e Constantia).",
    f3Title: "Operações em Tempo Real",
    f3Desc: "KDS para cozinha, alertas instantâneos de garçons e controlo anti-ruptura de stock.",
    f4Title: "4 Idiomas Nativos",
    f4Desc: "Suporte completo adaptado para locais e turistas (EN-ZA, PT, AF, XH).",
    loginTitle: "Acesso Seguro ao Restaurante",
    emailPlaceholder: "email@restaurante.co.za",
    passwordPlaceholder: "Palavra-passe",
    loginBtn: "Autenticar com Segurança",
    backHome: "Voltar à Página Principal",
    managerDashboard: "Painel de Gestão & Cozinha",
    customerView: "Interface do Cliente na Mesa",
    logout: "Terminar Sessão",
    tableNumber: "Número da Mesa",
    peopleCount: "Número de Convidados",
    todaysSpecial: "Especial do Chef / Sugestão do Dia",
    callWaiter: "Chamar Garçom",
    requestBill: "Pedir a Conta",
    feedbackTitle: "Deixe a sua Avaliação",
    optionalInfo: "Nome / Contacto (Opcional)",
    submitFeedback: "Enviar Feedback",
    customSettings: "Configuração Completa do Restaurante",
    primaryColor: "Cor de Destaque",
    logoUrl: "URL do Logótipo",
    slogan: "Slogan / Mensagem do Chef",
    restaurantNameLabel: "Nome do Restaurante",
    reports: "Relatórios e Atendimentos",
    saveChanges: "Guardar Alterações no Supabase",
    tableOnboardingTitle: "Bem-vindo ao Restaurante",
    tableOnboardingSubtitle: "Por favor, indique os detalhes da sua mesa para iniciarmos a experiência.",
    allergiesLabel: "Alergias ou Restrições (Ex: Glúten, Amendoim)",
    meatTempLabel: "Ponto da Carne / Hambúrguer",
    noMeatTemp: "Não aplicável (Prato sem carne)",
    continueMenu: "Aceder ao Menu Digital",
    estWaitingTime: "Tempo estimado médio de espera: ~15 a 20 minutos",
    menuCategories: "Categorias do Menu",
    manageMenu: "Gestão Completa de Menus & Bebidas",
    manageTables: "Gestão de Mesas e Limite de Clientes",
    notifications: "Notificações em Tempo Real",
    activeOrders: "Pedidos e Chamadas Ativas",
    noActiveOrders: "Nenhum pedido pendente de momento.",
    markAsCompleted: "Marcar como Atendido",
    addDish: "Adicionar Novo Prato / Bebida",
    dishName: "Nome do Item",
    dishPrice: "Preço (ZAR)",
    dishCategory: "Categoria",
    dishDesc: "Descrição",
    addTable: "Adicionar Mesa",
    tableLimit: "Limite Máximo de Pessoas",
    securityNotice: "Sessão protegida por token seguro. Acesso restrito a credenciais válidas.",
    tabMenu: "Menu e Pratos",
    tabTables: "Mesas",
    tabReports: "Relatórios",
    tabSettings: "Definições"
  },
  'en-ZA': {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "The secure, smart table management and digital dining platform for Cape Town.",
    enterSystem: "Restaurant Portal (Login)",
    exploreCustomer: "Test Customer Experience",
    featuresTitle: "Complete MesaVibe Ecosystem",
    f1Title: "Bank-Grade Security & RLS",
    f1Desc: "Tenant-isolated data with complete SQL injection defense and strict Supabase policies.",
    f2Title: "AI Wine Sommelier",
    f2Desc: "Smart pairing suggestions featuring local Cape Winelands wines (Stellenbosch & Constantia).",
    f3Title: "Real-Time Operations",
    f3Desc: "Kitchen KDS display, instant waiter alerts, and live stock anti-rupture control.",
    f4Title: "4 Native Languages",
    f4Desc: "Tailored multi-language support for locals and international tourists (EN-ZA, PT, AF, XH).",
    loginTitle: "Secure Restaurant Login",
    emailPlaceholder: "email@restaurant.co.za",
    passwordPlaceholder: "Password",
    loginBtn: "Secure Authentication",
    backHome: "Back to Home",
    managerDashboard: "Management & Kitchen Dashboard",
    customerView: "Digital Table Interface",
    logout: "Sign Out",
    tableNumber: "Table Number",
    peopleCount: "Number of Guests",
    todaysSpecial: "Chef's Special / Daily Recommendation",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    feedbackTitle: "Leave Your Feedback",
    optionalInfo: "Name / Contact (Optional)",
    submitFeedback: "Submit Feedback",
    customSettings: "Complete Restaurant Configuration",
    primaryColor: "Accent Color",
    logoUrl: "Logo URL",
    slogan: "Chef Message / Slogan",
    restaurantNameLabel: "Restaurant Name",
    reports: "Reports & Service Logs",
    saveChanges: "Save Changes to Supabase",
    tableOnboardingTitle: "Welcome to the Restaurant",
    tableOnboardingSubtitle: "Please provide your table details to begin your dining experience.",
    allergiesLabel: "Allergies or Dietary Restrictions (e.g. Gluten, Nuts)",
    meatTempLabel: "Meat / Burger Cooking Temperature",
    noMeatTemp: "Not applicable (Non-meat dish)",
    continueMenu: "Access Digital Menu",
    estWaitingTime: "Estimated average waiting time: ~15 to 20 minutes",
    menuCategories: "Menu Categories",
    manageMenu: "Complete Menu & Beverage Management",
    manageTables: "Table Management & Guest Limits",
    notifications: "Real-Time Notifications",
    activeOrders: "Active Orders & Waiter Calls",
    noActiveOrders: "No pending requests at the moment.",
    markAsCompleted: "Mark as Completed",
    addDish: "Add New Dish / Beverage",
    dishName: "Item Name",
    dishPrice: "Price (ZAR)",
    dishCategory: "Category",
    dishDesc: "Description",
    addTable: "Add Table",
    tableLimit: "Maximum Guest Limit",
    securityNotice: "Session secured by token. Access restricted to valid credentials.",
    tabMenu: "Menu & Dishes",
    tabTables: "Tables",
    tabReports: "Reports",
    tabSettings: "Settings"
  },
  af: {
    brandTitle: "MesaVibe deur Canzele Tech",
    subtitle: "Die veilige, slim tafebestuur en digitale spyskaartplatform vir Kaapstad.",
    enterSystem: "Restaurant Portaal (Aanmelding)",
    exploreCustomer: "Toets Klant Ervaring",
    featuresTitle: "Volledige MesaVibe Ekosisteem",
    f1Title: "Bank-Graad Sekuriteit & RLS",
    f1Desc: "Geïsoleerde data met volledige SQL-inspuiting verdediging en streng Supabase beleide.",
    f2Title: "KI Wyn Sommelier",
    f2Desc: "Slim wynparing voorstelle van plaaslike wynlande (Stellenbosch & Constantia).",
    f3Title: "Intydse Bedrywighede",
    f3Desc: "Kombuis KDS vertoon, onmiddellike kelner waarskuwings en lewendige voorraadbeheer.",
    f4Title: "4 Inheemse Tale",
    f4Desc: "Pasgemaakte meertalige ondersteuning vir plaaslike inwoners en toeriste (EN-ZA, PT, AF, XH).",
    loginTitle: "Veilige Restaurant Aanmelding",
    emailPlaceholder: "email@restaurant.co.za",
    passwordPlaceholder: "Wagwoord",
    loginBtn: "Veilige Verifikasie",
    backHome: "Terug na Tuis",
    managerDashboard: "Bestuur & Kombuis Dashboard",
    customerView: "Digitale Tafel Koppelvlak",
    logout: "Teken Uit",
    tableNumber: "Tafelnommer",
    peopleCount: "Aantal Gaste",
    todaysSpecial: "Sjef se Spesiale / Daaglikse Aanbeveling",
    callWaiter: "Roep Kelner",
    requestBill: "Vra vir Rekening",
    feedbackTitle: "Los jou Terugvoer",
    optionalInfo: "Naam / Kontak (Opsioneel)",
    submitFeedback: "Dien Terugvoer In",
    customSettings: "Volledige Restaurant Konfigurasie",
    primaryColor: "Aksentkleur",
    logoUrl: "Logo URL",
    slogan: "Sjef Boodskap / Slogan",
    restaurantNameLabel: "Restaurant Naam",
    reports: "Verslae en Dienslogboeke",
    saveChanges: "Stoor Veranderinge in Supabase",
    tableOnboardingTitle: "Welkom by die Restaurant",
    tableOnboardingSubtitle: "Verskaf asseblief jou tafelbesonderhede om jou ervaring te begin.",
    allergiesLabel: "Allergieë of Dieetbeperkings (bv. Gluten, Neute)",
    meatTempLabel: "Vleis / Burger Gaarmaaktemperatuur",
    noMeatTemp: "Nie van toepassing nie (Geen vleis gereg nie)",
    continueMenu: "Toegang tot Digitale Spyskaart",
    estWaitingTime: "Geraamde gemiddelde wagtyd: ~15 tot 20 minute",
    menuCategories: "Spyskaart Kategorieë",
    manageMenu: "Volledige Spyskaart & Drank Bestuur",
    manageTables: "Tafel Bestuur & Gaste Limiete",
    notifications: "Intydse Kennisgewings",
    activeOrders: "Aktiewe Bestellings & Kelner Oproepe",
    noActiveOrders: "Geen hangende versoeke tans nie.",
    markAsCompleted: "Merk as Voltooi",
    addDish: "Voeg Nuwe Gereg / Drank By",
    dishName: "Item Naam",
    dishPrice: "Prys (ZAR)",
    dishCategory: "Kategorie",
    dishDesc: "Beskrywing",
    addTable: "Voeg Tafel By",
    tableLimit: "Maksimum Gaste Limiet",
    securityNotice: "Sessie beveilig deur token. Toegang beperk tot geldige geloofsbriewe.",
    tabMenu: "Spyskaart",
    tabTables: "Tafels",
    tabReports: "Verslae",
    tabSettings: "Instellings"
  },
  xh: {
    brandTitle: "MesaVibe nguCanzele Tech",
    subtitle: "Iqonga elikhuselekileyo nelihlakaniphileyo lolawulo lwetafile nokutya eKapa.",
    enterSystem: "Iphothali yoMlawuli (Ngena)",
    exploreCustomer: "Vavanya Amava Omthengi",
    featuresTitle: "Iinkqubo Zonke zeMesaVibe",
    f1Title: "Ukhuseleko Olunamandla & RLS",
    f1Desc: "Idatha ekhuselweyo ngqongqo kwi-SQL injection kunye nemigaqo ye-Supabase.",
    f2Title: "I-AI Wine Sommelier",
    f2Desc: "Iingcebiso zewayini zasendaweni zaseStellenbosch naseConstantia.",
    f3Title: "Ixesha Langoku",
    f3Desc: "Ikhitshi le-KDS, izilumkiso zokubiza umlindi kunye nolawulo lwesitokhwe.",
    f4Title: "Iilwimi ezi-4",
    f4Desc: "Inkxaso yeelwimi ngenjongo yabahlali kunye nabakhenkethi (EN-ZA, PT, AF, XH).",
    loginTitle: "Ungeniso Olukhuselekileyo",
    emailPlaceholder: "email@restaurant.co.za",
    passwordPlaceholder: "Inombolo yokugqitha",
    loginBtn: "Qinisekisa Ngokukhuselekileyo",
    backHome: "Buyela Ekhaya",
    managerDashboard: "Iphothali yoLawulo neKhitshi",
    customerView: "Ujongano Lwetafile",
    logout: "Phuma",
    tableNumber: "Inombolo yetafile",
    peopleCount: "Inani labantu",
    todaysSpecial: "Okukhethekileyo kukaChef",
    callWaiter: "Biza Umlindi",
    requestBill: "Cela Umrhumo",
    feedbackTitle: "Shiya Imbono Yakho",
    optionalInfo: "Igama / Ifowuni (Ukuba uyathanda)",
    submitFeedback: "Thumela Imbono",
    customSettings: "Ukwenza ngokwezifiso indawo yokutyela",
    primaryColor: "Umbala",
    logoUrl: "I-URL yeLogo",
    slogan: "Umyalezo kaChef",
    restaurantNameLabel: "Igama Lendawo Yokutyela",
    reports: "Iingxelo",
    saveChanges: "Gcina Utshintsho kwi-Supabase",
    tableOnboardingTitle: "Wamkelekile kwiNdawo Yokutyela",
    tableOnboardingSubtitle: "Nceda unike iinkcukacha zetafile yakho uqale amava.",
    allergiesLabel: "Ukungazwani nokutya (njenge-Gluten)",
    meatTempLabel: "Izinga lokupheka inyama",
    noMeatTemp: "Ayisebenzi (Akukho nyama)",
    continueMenu: "Ngena Kwimenyu",
    estWaitingTime: "Ixesha eliqikelelweyo: ~15 ukuya kuma-20 imizuzu",
    menuCategories: "Iindidi Zemenyu",
    manageMenu: "Ulawulo Lwemenyu Nezinto zokusela",
    manageTables: "Ulawulo Lwetafile Kunye Nemida",
    notifications: "Izaziso Zangoku",
    activeOrders: "Iiodolo Ezisebenzayo",
    noActiveOrders: "Akukho ziiodolo ngoku.",
    markAsCompleted: "Phawula Njengegqityiweyo",
    addDish: "Yongeza Isidlo / Isiselo",
    dishName: "Igama",
    dishPrice: "Ixabiso (ZAR)",
    dishCategory: "Udidi",
    dishDesc: "Inkcazo",
    addTable: "Yongeza Etafile",
    tableLimit: "Inani Eliphezulu Labantu",
    securityNotice: "Iseshini ikhuselwe. Imvume ikhawulelwe kubasebenzi.",
    tabMenu: "Menyu",
    tabTables: "Iitafile",
    tabReports: "Iingxelo",
    tabSettings: "Izilungiselelo"
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('mesavibe_lang') || 'en-ZA');
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('mesavibe_view') || 'landing');
  const [managerTab, setManagerTab] = useState('menu');

  const [tenantId, setTenantId] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#374151');
  const [logoUrl, setLogoUrl] = useState('');
  const [restaurantName, setRestaurantName] = useState('Camps Bay Social Bistro');
  const [chefSlogan, setChefSlogan] = useState("Fresh Atlantic Catch & Stellenbosch Wine Pairings");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    localStorage.setItem('mesavibe_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('mesavibe_view', viewMode);
  }, [viewMode]);

  const [tableSetup, setTableSetup] = useState({
    number: 3,
    guests: 2,
    allergies: '',
    meatTemp: 'Medium',
    completedOnboarding: false
  });

  const [feedback, setFeedback] = useState({ rating: 5, name: '', contact: '', comment: '' });
  const [feedbacksList, setFeedbacksList] = useState([
    { id: 1, rating: 5, name: 'Liam Smith', comment: 'Excellente atendimento e vinho espetacular!', time: '12:30' }
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Stellenbosch Bobotie', category: 'Pratos Principais', price: 165.00, description: 'Traditional spiced minced meat with savory custard and yellow rice.', image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947', hasMeat: true },
    { id: 2, name: 'Atlantic Grilled Cob', category: 'Pratos Principais', price: 210.00, description: 'Fresh line fish served with herb butter and roasted baby potatoes.', image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', hasMeat: false },
    { id: 3, name: 'Kanonkop Paul Sauer Red Wine', category: 'Bebidas & Vinhos', price: 450.00, description: 'World-class Stellenbosch red blend with rich berry notes.', image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', hasMeat: false },
    { id: 4, name: 'Malva Pudding with Custard', category: 'Sobremesas', price: 85.00, description: 'Spongy caramelized Cape dessert served warm.', image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814', hasMeat: false }
  ]);

  const [newDish, setNewDish] = useState({ name: '', category: 'Pratos Principais', price: '', description: '', hasMeat: true });

  const [tablesList, setTablesList] = useState([
    { id: 1, number: 1, maxGuests: 4, status: 'Livre' },
    { id: 2, number: 2, maxGuests: 2, status: 'Ocupada' },
    { id: 3, number: 3, maxGuests: 6, status: 'Ativa' }
  ]);
  const [newTableNum, setNewTableNum] = useState(4);
  const [newTableLimit, setNewTableLimit] = useState(4);

  const [serviceLogs, setServiceLogs] = useState([
    { id: 'log-1', table: 3, action: 'Waiter Called', status: 'Pending', time: '13:10', type: 'waiter' },
    { id: 'log-2', table: 2, action: 'Bill Requested', status: 'Pending', time: '13:05', type: 'bill' }
  ]);

  const t = translations[currentLang] || translations['en-ZA'];

  useEffect(() => {
    async function fetchTenantData() {
      try {
        const { data, error } = await supabase.from('tenants').select('*').limit(1).single();
        if (data) {
          setTenantId(data.id);
          setRestaurantName(data.name);
          if (data.logo_url) setLogoUrl(data.logo_url);
          if (data.primary_color) setPrimaryColor(data.primary_color);
          if (data.slogan) setChefSlogan(data.slogan);
        }
      } catch (err) {
        console.log("Modo local ativo.");
      }
    }
    fetchTenantData();
  }, []);

  const handleSaveSettings = async () => {
    if (!tenantId) {
      alert("Tenant ID não detetado na base de dados.");
      return;
    }
    const { error } = await supabase
      .from('tenants')
      .update({
        name: restaurantName,
        logo_url: logoUrl,
        primary_color: primaryColor,
        slogan: chefSlogan
      })
      .eq('id', tenantId);

    if (error) {
      alert("Erro ao guardar: " + error.message);
    } else {
      alert("Configurações atualizadas com sucesso no Supabase!");
    }
  };

  const handleSecureAction = async (actionCallback) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await actionCallback();
    } finally {
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  const handleCallWaiter = () => handleSecureAction(() => {
    const newLog = {
      id: `log-${Date.now()}`,
      table: tableSetup.number,
      action: 'Waiter Called',
      status: 'Pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'waiter'
    };
    setServiceLogs([newLog, ...serviceLogs]);
    alert(currentLang === 'pt' ? "Garçom chamado com sucesso! A equipa foi notificada." : "Waiter called successfully! Staff notified.");
  });

  const handleRequestBill = () => handleSecureAction(() => {
    const newLog = {
      id: `log-${Date.now()}`,
      table: tableSetup.number,
      action: 'Bill Requested',
      status: 'Pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'bill'
    };
    setServiceLogs([newLog, ...serviceLogs]);
    alert(currentLang === 'pt' ? "Conta solicitada com sucesso! O caixa está a preparar." : "Bill requested successfully! Cashier is preparing.");
  });

  const handleCompleteLog = (id) => {
    setServiceLogs(serviceLogs.map(l => l.id === id ? { ...l, status: 'Completed' } : l));
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    setMenuItems([...menuItems, { id: Date.now(), ...newDish, price: Number(newDish.price), image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5' }]);
    setNewDish({ name: '', category: 'Pratos Principais', price: '', description: '', hasMeat: true });
  };

  const handleDeleteDish = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    setTablesList([...tablesList, { id: Date.now(), number: Number(newTableNum), maxGuests: Number(newTableLimit), status: 'Livre' }]);
    setNewTableNum(newTableNum + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-gray-200">
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-cover rounded-xl border border-gray-200" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
              MV
            </div>
          )}
          <div>
            <h1 className="font-bold text-base leading-tight tracking-tight text-gray-900">{restaurantName}</h1>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200 inline-block mt-0.5">
              Powered by Canzele Tech
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-gray-700"
            >
              <option value="pt">Português</option>
              <option value="en-ZA">English (SA)</option>
              <option value="af">Afrikaans</option>
              <option value="xh">isiXhosa</option>
            </select>
          </div>

          {viewMode !== 'landing' && (
            <button 
              onClick={() => setViewMode('landing')} 
              className="text-xs font-medium text-gray-700 hover:text-black px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-xs transition hover:bg-gray-50"
            >
              {t.backHome}
            </button>
          )}
        </div>
      </header>

      {viewMode === 'landing' && (
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gray-600" /> MesaVibe Ecosystem (Cape Town)
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {t.brandTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setViewMode('login')}
                style={{ backgroundColor: primaryColor }}
                className="text-white px-7 py-3.5 rounded-xl font-semibold shadow-md hover:opacity-90 transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> {t.enterSystem}
              </button>
              <button 
                onClick={() => {
                  setTableSetup({ ...tableSetup, completedOnboarding: false });
                  setViewMode('onboarding');
                }}
                className="bg-white text-gray-800 border border-gray-300 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition shadow-xs flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-gray-600" /> {t.exploreCustomer}
              </button>
            </div>
            <p className="text-xs text-gray-500 italic pt-2">{t.securityNotice}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t.f1Title, desc: t.f1Desc },
              { icon: Wine, title: t.f2Title, desc: t.f2Desc },
              { icon: Bell, title: t.f3Title, desc: t.f3Desc },
              { icon: Globe, title: t.f4Title, desc: t.f4Desc }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs space-y-3 hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center shadow-inner">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-900 text-base">{feat.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {viewMode === 'login' && (
        <main className="max-w-md mx-auto px-6 py-20">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow-xs">
                🔒
              </div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">{t.loginTitle}</h2>
              <p className="text-xs text-gray-500">Acesso exclusivo para contas registadas no Supabase Auth</p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-center font-medium">
                {authError}
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              setAuthError('');
              const email = e.target.email.value;
              const password = e.target.password.value;

              try {
                const { data, error } = await supabase.auth.signInWithPassword({
                  email,
                  password,
                });

                if (error) throw error;
                if (data.session) setViewMode('manager');
              } catch (err) {
                console.error("Erro no login:", err.message);
                setAuthError("Credenciais inválidas ou utilizador não registado no Supabase.");
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.emailPlaceholder}</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="manager@mesavibe.co.za"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.passwordPlaceholder}</label>
                <input 
                  type="password" 
                  name="password"
                  required 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                />
              </div>
              <button 
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white py-3.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 transition"
              >
                {t.loginBtn}
              </button>
            </form>
          </div>
        </main>
      )}

      {viewMode === 'manager' && (
        <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.managerDashboard}</span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">{restaurantName}</h2>
              <p className="text-sm text-gray-500 italic mt-0.5">"{chefSlogan}"</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setTableSetup({ ...tableSetup, completedOnboarding: false });
                  setViewMode('onboarding');
                }}
                className="px-4 py-2.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl border border-gray-300 hover:bg-gray-200 transition shadow-xs"
              >
                {t.customerView}
              </button>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  setViewMode('landing');
                }}
                className="px-4 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition flex items-center gap-1.5 shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" /> {t.logout}
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-200 pb-2">
            {[
              { id: 'menu', label: t.tabMenu },
              { id: 'tables', label: t.tabTables },
              { id: 'reports', label: t.tabReports },
              { id: 'settings', label: t.tabSettings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setManagerTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${managerTab === tab.id ? 'bg-gray-900 text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {managerTab === 'menu' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-gray-700" /> {t.manageMenu}
              </h3>

              <form onSubmit={handleAddDish} className="grid sm:grid-cols-5 gap-3 pt-2">
                <input 
                  type="text" 
                  placeholder={t.dishName} 
                  value={newDish.name} 
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  required
                />
                <select 
                  value={newDish.category} 
                  onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-gray-900 focus:outline-none"
                >
                  <option value="Pratos Principais">Pratos Principais</option>
                  <option value="Bebidas & Vinhos">Bebidas & Vinhos</option>
                  <option value="Sobremesas">Sobremesas</option>
                </select>
                <input 
                  type="number" 
                  placeholder={t.dishPrice} 
                  value={newDish.price} 
                  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  required
                />
                <div className="flex items-center gap-2 px-2">
                  <input 
                    type="checkbox" 
                    id="hasMeat"
                    checked={newDish.hasMeat}
                    onChange={(e) => setNewDish({ ...newDish, hasMeat: e.target.checked })}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <label htmlFor="hasMeat" className="text-xs text-gray-600">Requer Ponto da Carne?</label>
                </div>
                <button 
                  type="submit"
                  className="bg-gray-900 text-white rounded-xl text-xs font-semibold py-2 shadow-xs hover:bg-gray-800 transition"
                >
                  + {t.addDish}
                </button>
              </form>

              <div className="space-y-3 pt-2">
                {menuItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 p-3.5 rounded-xl flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-gray-200" />
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900">{item.name} <span className="text-[10px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded ml-1">{item.category}</span></h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">{item.description}</p>
                        <span className="text-xs font-bold text-gray-900 mt-1 inline-block">R$ {Number(item.price).toFixed(2)} ZAR</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteDish(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {managerTab === 'tables' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-700" /> {t.manageTables}
              </h3>
              
              <form onSubmit={handleAddTable} className="grid sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.tableNumber}</label>
                  <input 
                    type="number" 
                    value={newTableNum} 
                    onChange={(e) => setNewTableNum(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.tableLimit}</label>
                  <input 
                    type="number" 
                    value={newTableLimit} 
                    onChange={(e) => setNewTableLimit(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gray-900 text-white rounded-xl text-xs font-semibold py-2.5 shadow-xs hover:bg-gray-800 transition"
                  >
                    + {t.addTable}
                  </button>
                </div>
              </form>

              <div className="grid sm:grid-cols-3 gap-3 pt-3">
                {tablesList.map((tbl) => (
                  <div key={tbl.id} className="border border-gray-200 p-3.5 rounded-xl bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Mesa #{tbl.number}</h4>
                      <span className="text-xs text-gray-500">Máx: {tbl.maxGuests} convidados</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-200 text-gray-800">
                      {tbl.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {managerTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-700" /> {t.notifications} & {t.activeOrders}
                </h3>
                <div className="space-y-3">
                  {serviceLogs.filter(l => l.status === 'Pending').length === 0 ? (
                    <p className="text-xs text-gray-500 py-3 text-center">{t.noActiveOrders}</p>
                  ) : (
                    serviceLogs.filter(l => l.status === 'Pending').map((log) => (
                      <div key={log.id} className="flex justify-between items-center p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-xs">
                            #{log.table}
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-gray-900">Mesa {log.table} - {log.action}</h4>
                            <span className="text-[11px] text-gray-500">{log.time}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleCompleteLog(log.id)}
                          className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition shadow-xs"
                        >
                          {t.markAsCompleted}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-700" /> {t.feedbackTitle} (Recebidos)
                </h3>
                <div className="space-y-3">
                  {feedbacksList.map((fb) => (
                    <div key={fb.id} className="border border-gray-200 p-4 rounded-xl bg-gray-50 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-gray-900">{fb.name}</span>
                          <span className="text-amber-500 text-xs">{"★".repeat(fb.rating)}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{fb.comment}</p>
                      </div>
                      <span className="text-[11px] text-gray-400">{fb.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {managerTab === 'settings' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-700" /> {t.customSettings}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.restaurantNameLabel}</label>
                  <input 
                    type="text" 
                    value={restaurantName} 
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.primaryColor}</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300"
                    />
                    <span className="text-xs font-mono text-gray-600">{primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.logoUrl}</label>
                  <input 
                    type="text" 
                    value={logoUrl} 
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.slogan}</label>
                  <input 
                    type="text" 
                    value={chefSlogan} 
                    onChange={(e) => setChefSlogan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveSettings}
                className="mt-4 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-gray-800 transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> {t.saveChanges}
              </button>
            </div>
          )}

        </main>
      )}

      {viewMode === 'onboarding' && !tableSetup.completedOnboarding && (
        <main className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                <Utensils className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">{t.tableOnboardingTitle}</h2>
              <p className="text-xs text-gray-500">{t.tableOnboardingSubtitle}</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.tableNumber}</label>
                <input 
                  type="number" 
                  value={tableSetup.number} 
                  onChange={(e) => setTableSetup({ ...tableSetup, number: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.peopleCount} (Máx: 6)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="6" 
                  value={tableSetup.guests} 
                  onChange={(e) => setTableSetup({ ...tableSetup, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.allergiesLabel}</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sem glúten, amendoim..." 
                  value={tableSetup.allergies} 
                  onChange={(e) => setTableSetup({ ...tableSetup, allergies: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.meatTempLabel}</label>
                <select 
                  value={tableSetup.meatTemp} 
                  onChange={(e) => setTableSetup({ ...tableSetup, meatTemp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-gray-900 focus:outline-none"
                >
                  <option value="Rare">Mal Passado (Rare)</option>
                  <option value="Medium">Ao Ponto (Medium)</option>
                  <option value="Well Done">Bem Passado (Well Done)</option>
                  <option value="None">{t.noMeatTemp}</option>
                </select>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-center">
                <span className="text-xs font-medium text-gray-600 flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {t.estWaitingTime}
                </span>
              </div>

              <button 
                onClick={() => setTableSetup({ ...tableSetup, completedOnboarding: true })}
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white py-3.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 transition"
              >
                {t.continueMenu}
              </button>
            </div>
          </div>
        </main>
      )}

      {viewMode === 'onboarding' && tableSetup.completedOnboarding && (
        <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{restaurantName}</span>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t.tableNumber} #{tableSetup.number}</h2>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full border border-gray-200">
                  {tableSetup.guests} Guests | Ponto: {tableSetup.meatTemp}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-start gap-3">
              <Award className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">{t.todaysSpecial}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{chefSlogan}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="flex gap-2">
              <button 
                style={{ backgroundColor: primaryColor }}
                onClick={handleCallWaiter}
                disabled={isSubmitting}
                className="flex-1 text-white py-3 rounded-xl text-xs font-semibold shadow-xs hover:opacity-90 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Bell className="w-4 h-4" /> {t.callWaiter}
              </button>
              <button 
                onClick={handleRequestBill}
                disabled={isSubmitting}
                className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 py-3 rounded-xl text-xs font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                <DollarSign className="w-4 h-4" /> {t.requestBill}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-gray-700" /> Menu Digital & Bebidas (ZAR)
            </h3>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div key={item.id} className="border border-gray-200 p-3.5 rounded-xl flex justify-between items-center bg-gray-50">
                  <div>
                    <h4 className="font-semibold text-xs text-gray-900">{item.name} <span className="text-[10px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded ml-1">{item.category}</span></h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.description}</p>
                    <span className="text-xs font-bold text-gray-900 mt-1.5 inline-block">R$ {Number(item.price).toFixed(2)} ZAR</span>
                  </div>
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200 shrink-0 ml-3 shadow-xs" />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

    </div>
  );
}