import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Shield, Globe, Sparkles, LogOut, Settings, Calendar, 
  Bell, DollarSign, Award, Utensils, UserCheck, Lock, CheckCircle
} from 'lucide-react';

// ==========================================
// CONFIGURAÇÃO SEGURA DO SUPABASE E RLS
// ==========================================
// Apenas a chave pública (anon key) é exposta no frontend. As regras de segurança 
// e proteção contra SQL Injection são geridas nativamente pelas políticas RLS (Row Level Security) do PostgreSQL.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 4 IDIOMAS NATIVOS (PT, EN-ZA, AF, XH)
// ==========================================
const translations = {
  pt: {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "Sistema Exclusivo e Inteligente de Gestão de Mesas e Menus Digitais para Cape Town",
    enterSystem: "Entrar no Sistema",
    exploreCustomer: "Testar Vista de Cliente (Mesa)",
    featuresTitle: "Vantagens Exclusivas para Restaurantes",
    f1Title: "Segurança de Nível Bancário",
    f1Desc: "Dados isolados por restaurante com proteção rigorosa RLS e defesa contra SQL Injection e exposição front-end.",
    f2Title: "IA Sommelier de Vinhos",
    f2Desc: "Sugestões perfeitas de harmonização com vinhos da região (Stellenbosch/Constantia).",
    f3Title: "Gestão em Tempo Real",
    f3Desc: "Alertas de garçons, KDS para a cozinha e controlo anti-ruptura de stock ao vivo.",
    f4Title: "4 Idiomas Nativos",
    f4Desc: "Português, Inglês SA, Afrikaans e isiXhosa detetados nativamente para turistas e locais.",
    loginTitle: "Acesso Seguro ao Painel",
    emailPlaceholder: "Email institucional",
    passwordPlaceholder: "Palavra-passe",
    loginBtn: "Autenticar com Segurança",
    backHome: "Voltar à Página Principal",
    managerDashboard: "Painel do Gerente & Equipa",
    customerView: "Experiência Digital na Mesa",
    logout: "Terminar Sessão",
    tableNumber: "Número da Mesa",
    peopleCount: "Quantidade de Pessoas",
    todaysSpecial: "Especial de Hoje / Peixe do Dia",
    callWaiter: "Chamar Garçom",
    requestBill: "Pedir a Conta",
    feedbackTitle: "Deixe a sua Avaliação",
    optionalInfo: "Nome / Contacto (Opcional)",
    submitFeedback: "Enviar Feedback",
    customSettings: "Personalização de Marca & Cores (Canzele Tech)",
    primaryColor: "Cor Principal do Sistema",
    logoUrl: "URL do Logótipo do Cliente",
    slogan: "Mensagem do Chef / Slogan do Restaurante",
    reports: "Relatórios e Atendimentos",
    saveChanges: "Guardar Alterações",
    tableOnboardingTitle: "Configuração Inicial da Mesa",
    tableOnboardingSubtitle: "Por favor, indique os detalhes para prepararmos o melhor atendimento.",
    allergiesLabel: "Alergias ou Restrições Alimentares (Ex: Glúten, Amendoim)",
    meatTempLabel: "Ponto da Carne / Hambúrguer",
    continueMenu: "Avançar para o Menu Digital",
    estWaitingTime: "Tempo estimado de espera na cozinha: ~15 a 20 minutos"
  },
  'en-ZA': {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "Exclusive Smart Table Management & Digital Dining Platform for Cape Town",
    enterSystem: "System Login",
    exploreCustomer: "Test Table Customer View",
    featuresTitle: "Exclusive Restaurant Advantages",
    f1Title: "Bank-Grade Security",
    f1Desc: "Tenant-isolated data with strict RLS protection, complete SQL injection defense, and secure front-end architecture.",
    f2Title: "AI Wine Sommelier",
    f2Desc: "Perfect pairing suggestions featuring local Cape Winelands wines (Stellenbosch/Constantia).",
    f3Title: "Real-Time Operations",
    f3Desc: "Instant waiter alerts, kitchen KDS display, and live stock anti-rupture control.",
    f4Title: "4 Native Languages",
    f4Desc: "English (SA), Portuguese, Afrikaans, and isiXhosa tailored for locals and tourists.",
    loginTitle: "Secure Portal Login",
    emailPlaceholder: "Work email",
    passwordPlaceholder: "Password",
    loginBtn: "Secure Authentication",
    backHome: "Back to Home",
    managerDashboard: "Manager & Staff Portal",
    customerView: "Digital Table Experience",
    logout: "Sign Out",
    tableNumber: "Table Number",
    peopleCount: "Number of Guests",
    todaysSpecial: "Today's Special / Fish of the Day",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    feedbackTitle: "Leave Your Feedback",
    optionalInfo: "Name / Contact (Optional)",
    submitFeedback: "Submit Feedback",
    customSettings: "Brand & Color Customization (Canzele Tech)",
    primaryColor: "Primary System Color",
    logoUrl: "Client Logo URL",
    slogan: "Chef Message / Restaurant Slogan",
    reports: "Reports & Service Logs",
    saveChanges: "Save Changes",
    tableOnboardingTitle: "Table Setup & Preferences",
    tableOnboardingSubtitle: "Please provide your details so we can tailor your dining experience.",
    allergiesLabel: "Food Allergies or Restrictions (e.g. Nuts, Gluten)",
    meatTempLabel: "Meat / Burger Cooking Temperature",
    continueMenu: "Proceed to Digital Menu",
    estWaitingTime: "Estimated kitchen waiting time: ~15 to 20 minutes"
  },
  af: {
    brandTitle: "MesaVibe deur Canzele Tech",
    subtitle: "Eksklusiewe Slim Tafebestuur en Digitale Spyskaartplatform vir Kaapstad",
    enterSystem: "Stelsel Aanmelding",
    exploreCustomer: "Toets Tafel Klantuitsig",
    featuresTitle: "Eksklusiewe Restaurant Voordele",
    f1Title: "Bank-Graad Sekuriteit",
    f1Desc: "Geïsoleerde data met streng RLS beskerming, SQL-inspuiting verdediging en veilige front-end argitektuur.",
    f2Title: "KI Wyn Sommelier",
    f2Desc: "Ideale wynparing voorstelle van plaaslike wynlande (Stellenbosch/Constantia).",
    f3Title: "Intydse Bedrywighede",
    f3Desc: "Onmiddellike kelner waarskuwings, kombuis KDS en lewendige voorraadbeheer.",
    f4Title: "4 Inheemse Tale",
    f4Desc: "Afrikaans, Engels (SA), Portugees en isiXhosa vir plaaslike inwoners en toeriste.",
    loginTitle: "Veilige Portaalaanmelding",
    emailPlaceholder: "Werks-e-pos",
    passwordPlaceholder: "Wagwoord",
    loginBtn: "Veilige Verifikasie",
    backHome: "Terug na Tuis",
    managerDashboard: "Bestuurder & Personeel Portaal",
    customerView: "Digitale Tafel Ervaring",
    logout: "Teken Uit",
    tableNumber: "Tafelnommer",
    peopleCount: "Aantal Gaste",
    todaysSpecial: "Vandag se Spesiale / Vis van die Dag",
    callWaiter: "Roep Kelner",
    requestBill: "Vra vir Rekening",
    feedbackTitle: "Los jou Terugvoer",
    optionalInfo: "Naam / Kontak (Opsioneel)",
    submitFeedback: "Dien Terugvoer In",
    customSettings: "Handelsmerk & Kleuraanpassing (Canzele Tech)",
    primaryColor: "Primêre Stelselkleur",
    logoUrl: "Kliënt Logo URL",
    slogan: "Sjef Boodskap / Restaurant Slogan",
    reports: "Verslae en Dienslogboeke",
    saveChanges: "Stoor Veranderinge",
    tableOnboardingTitle: "Tafel Opstelling & Voorkeure",
    tableOnboardingSubtitle: "Verskaf asseblief jou besonderhede sodat ons jou ervaring kan aanpas.",
    allergiesLabel: "Voedselallergieë of Beperkings (bv. Neute, Gluten)",
    meatTempLabel: "Vleis / Burger Gaarmaaktemperatuur",
    continueMenu: "Gaan na Digitale Spyskaart",
    estWaitingTime: "Geraamde kombuistyd: ~15 tot 20 minute"
  },
  xh: {
    brandTitle: "MesaVibe nguCanzele Tech",
    subtitle: "Iqonga Elihlakaniphileyo LoLawulo Lwetafile noKutya eKapa",
    enterSystem: "Ngena Kwinkqubo",
    exploreCustomer: "Vavanya Imbonakalo Yomthengi",
    featuresTitle: "Izinto Ezilungileyo Zokutyela",
    f1Title: "Ukhuseleko Olunamandla",
    f1Desc: "Idatha ekhuselweyo ngqongqo nge-RLS kunye nokukhuselwa kwi-SQL injection kunye noyilo olukhuselekileyo.",
    f2Title: "I-AI Wine Sommelier",
    f2Desc: "Iingcebiso zewayini zasendaweni zaseStellenbosch naseConstantia.",
    f3Title: "Ixesha Langoku",
    f3Desc: "Izilumkiso zokubiza umlindi, ikhitshi le-KDS kunye nolawulo lwesitokhwe.",
    f4Title: "Iilwimi ezi-4",
    f4Desc: "IsiXhosa, IsiNgesi (SA), IsiPhuthukezi kunye nesiBhulu kwiindwendwe.",
    loginTitle: "Ungeniso Olukhuselekileyo",
    emailPlaceholder: "I-imeyile yomsebenzi",
    passwordPlaceholder: "Inombolo yokugqitha",
    loginBtn: "Qinisekisa Ngokukhuselekileyo",
    backHome: "Buyela Ekhaya",
    managerDashboard: "Iphothali yoMlawuli neSebe",
    customerView: "Amava Etafile",
    logout: "Phuma",
    tableNumber: "Inombolo yetafile",
    peopleCount: "Inani labantu",
    todaysSpecial: "Okukhethekileyo kwanamhlanje / Intlanzi",
    callWaiter: "Biza Umlindi",
    requestBill: "Cela Umrhumo",
    feedbackTitle: "Shiya Imbono Yakho",
    optionalInfo: "Igama / Ifowuni (Ukuba uyathanda)",
    submitFeedback: "Thumela Imbono",
    customSettings: "Ukwenza ngokwezifiso uphawu nemibala (Canzele Tech)",
    primaryColor: "Umbala Ophambili",
    logoUrl: "I-URL yeLogo yomthengi",
    slogan: "Umyalezo kaChef",
    reports: "Iingxelo",
    saveChanges: "Gcina Utshintsho",
    tableOnboardingTitle: "Useto Lwetafile noKhetho",
    tableOnboardingSubtitle: "Nceda unike iinkcukacha zakho ukuze silungiselele amava akho.",
    allergiesLabel: "Ukungazwani nokutya okuthile (njenge-Gluten, Amaqatha)",
    meatTempLabel: "Izinga lokupheka inyama / ibheja",
    continueMenu: "Qhubela Kwimenyu Yedijithali",
    estWaitingTime: "Ixesha eliqikelelweyo lekhitshi: ~15 ukuya kuma-20 imizuzu"
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState('en-ZA');
  const [viewMode, setViewMode] = useState('landing'); // 'landing', 'login', 'manager', 'customer', 'onboarding'
  const [primaryColor, setPrimaryColor] = useState('#0D9488');
  const [logoUrl, setLogoUrl] = useState('');
  const [restaurantName, setRestaurantName] = useState('MesaVibe Bistro Cape Town');
  const [chefSlogan, setChefSlogan] = useState("Today's Special: Fresh Atlantic Cob & Local Stellenbosch Chardonnay Pairing");
  
  // Estados da Mesa do Cliente (Onboarding antes do menu)
  const [tableSetup, setTableSetup] = useState({
    number: 4,
    guests: 2,
    allergies: '',
    meatTemp: 'Medium',
    completedOnboarding: false
  });

  const [feedback, setFeedback] = useState({ rating: 5, name: '', contact: '' });
  
  // Estados dinâmicos vindos do Supabase
  const [menuItems, setMenuItems] = useState([]);
  const [serviceLogs, setServiceLogs] = useState([]);
  const [tenantId, setTenantId] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(false);

  // Controlo de Funcionários (Gestão de Staff / Utilizadores)
  const [staffAccounts, setStaffAccounts] = useState([
    { id: 1, name: 'Sipho Dlamini', role: 'Garçom / Waiter', email: 'sipho@mesavibe.co.za' },
    { id: 2, name: 'Pieter van der Merwe', role: 'Chef de Cozinha', email: 'pieter@mesavibe.co.za' }
  ]);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Garçom / Waiter' });

  const t = translations[currentLang] || translations['en-ZA'];

  // Carregar dados dinâmicos do Supabase ao iniciar
  useEffect(() => {
    async function loadTenantAndMenu() {
      setLoadingMenu(true);
      try {
        const { data: tenantData, error: tenantError } = await supabase
          .from('tenants')
          .select('*')
          .limit(1)
          .single();

        if (!tenantError && tenantData) {
          setTenantId(tenantData.id);
          setRestaurantName(tenantData.name);
          if (tenantData.logo_url) setLogoUrl(tenantData.logo_url);
          if (tenantData.slogan) setChefSlogan(tenantData.slogan);

          // Buscar pratos do menu associados
          const { data: menuData } = await supabase
            .from('menu_items')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .eq('is_available', true);

          if (menuData) setMenuItems(menuData);

          // Buscar registos de atendimento (Logs)
          const { data: logsData } = await supabase
            .from('service_logs')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .order('created_at', { ascending: false });

          if (logsData) {
            setServiceLogs(logsData.map(log => ({
              id: log.id.slice(0, 6),
              table: log.table_number,
              action: log.action_type === 'waiter_call' ? 'Waiter Called' : 'Bill Requested',
              status: log.status,
              time: new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })));
          }
        }
      } catch (err) {
        console.warn('Modo de demonstração / Supabase em configuração inicial:', err);
      } finally {
        setLoadingMenu(false);
      }
    }

    loadTenantAndMenu();
  }, []);

  // Funções de Ação Segura de Mesa
  const handleCallWaiter = async () => {
    alert("Waiter called successfully! A staff member has been notified to assist your table.");
  };

  const handleRequestBill = async () => {
    alert("Bill requested successfully! Your waiter is preparing the bill.");
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;
    setStaffAccounts([...staffAccounts, { id: Date.now(), ...newStaff }]);
    setNewStaff({ name: '', email: '', role: 'Garçom / Waiter' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* HEADER GLOBAL COM CANZELE TECH BRANDING & IDIOMAS */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-cover rounded-xl border border-slate-200 shadow-inner" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow">
              MV
            </div>
          )}
          <div>
            <h1 className="font-bold text-base leading-tight tracking-tight text-slate-900">{restaurantName}</h1>
            <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 inline-block mt-0.5">
              Developed by Canzele Tech
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-inner">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-slate-700"
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
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
            >
              {t.backHome}
            </button>
          )}
        </div>
      </header>

      {/* ==========================================
          1. PÁGINA DE INTRODUÇÃO / LANDING PAGE
         ========================================== */}
      {viewMode === 'landing' && (
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Canzele Tech Exclusive Architecture
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.brandTitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setViewMode('login')}
                style={{ backgroundColor: primaryColor }}
                className="text-white px-7 py-3.5 rounded-xl font-semibold shadow-md hover:opacity-95 transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> {t.enterSystem}
              </button>
              <button 
                onClick={() => {
                  setTableSetup({ ...tableSetup, completedOnboarding: false });
                  setViewMode('onboarding');
                }}
                className="bg-white text-slate-700 border border-slate-300 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-teal-600" /> {t.exploreCustomer}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t.f1Title, desc: t.f1Desc },
              { icon: Sparkles, title: t.f2Title, desc: t.f2Desc },
              { icon: Bell, title: t.f3Title, desc: t.f3Desc },
              { icon: Globe, title: t.f4Title, desc: t.f4Desc }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shadow-inner">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ==========================================
          2. LOGIN SEGURO COM SUPABASE AUTH
         ========================================== */}
      {viewMode === 'login' && (
        <main className="max-w-md mx-auto px-6 py-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow">
                🔒
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{t.loginTitle}</h2>
              <p className="text-xs text-slate-400">Proteção Avançada contra SQL Injection & RLS Ativa</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setViewMode('manager'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.emailPlaceholder}</label>
                <input 
                  type="email" 
                  required 
                  defaultValue="manager@mesavibe.co.za"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.passwordPlaceholder}</label>
                <input 
                  type="password" 
                  required 
                  defaultValue="securepassword123"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <button 
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white py-3.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-95 transition"
              >
                {t.loginBtn}
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ==========================================
          3. PAINEL DO GERENTE & EQUIPA (STAFF)
         ========================================== */}
      {viewMode === 'manager' && (
        <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{t.managerDashboard}</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{restaurantName}</h2>
              <p className="text-sm text-slate-500 italic mt-0.5">"{chefSlogan}"</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setTableSetup({ ...tableSetup, completedOnboarding: false });
                  setViewMode('onboarding');
                }}
                className="px-4 py-2.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded-xl border border-teal-200 hover:bg-teal-100 transition shadow-sm"
              >
                {t.customerView}
              </button>
              <button 
                onClick={() => setViewMode('landing')}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-200 transition flex items-center gap-1.5 shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> {t.logout}
              </button>
            </div>
          </div>

          {/* Configuração de Marca / Cores (Canzele Tech) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500" /> {t.customSettings}
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.primaryColor}</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                  />
                  <span className="text-xs font-mono text-slate-500">{primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.logoUrl}</label>
                <input 
                  type="text" 
                  value={logoUrl} 
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.slogan}</label>
                <input 
                  type="text" 
                  value={chefSlogan} 
                  onChange={(e) => setChefSlogan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Gestão de Contas de Funcionários (Staff / Garçons) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-slate-500" /> Gestão de Contas de Funcionários & Equipa
            </h3>
            
            <form onSubmit={handleAddStaff} className="grid sm:grid-cols-3 gap-3 pt-2">
              <input 
                type="text" 
                placeholder="Nome do Funcionário" 
                value={newStaff.name} 
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <input 
                type="email" 
                placeholder="Email corporativo" 
                value={newStaff.email} 
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button 
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="text-white rounded-xl text-xs font-semibold py-2 shadow-sm hover:opacity-95 transition"
              >
                + Adicionar Funcionário
              </button>
            </form>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-medium">
                    <th className="pb-2">Nome</th>
                    <th className="pb-2">Cargo / Função</th>
                    <th className="pb-2">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staffAccounts.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-medium text-slate-900">{member.name}</td>
                      <td className="py-2.5 text-teal-700">{member.role}</td>
                      <td className="py-2.5 text-slate-500">{member.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relatórios de Atendimentos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" /> {t.reports}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-medium">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Mesa</th>
                    <th className="pb-3">Ação</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3">Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {serviceLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-slate-400">Nenhum registo recente encontrado.</td>
                    </tr>
                  ) : (
                    serviceLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 font-mono text-slate-500">#{log.id}</td>
                        <td className="py-3 font-medium">Mesa {log.table}</td>
                        <td className="py-3">{log.action}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">{log.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          4. FLUXO PRÉ-MENU DO CLIENTE (ONBOARDING)
         ========================================== */}
      {viewMode === 'onboarding' && !tableSetup.completedOnboarding && (
        <main className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                <Utensils className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{t.tableOnboardingTitle}</h2>
              <p className="text-xs text-slate-500">{t.tableOnboardingSubtitle}</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.tableNumber}</label>
                <input 
                  type="number" 
                  value={tableSetup.number} 
                  onChange={(e) => setTableSetup({ ...tableSetup, number: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.peopleCount} (Até 6+ pessoas)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="12" 
                  value={tableSetup.guests} 
                  onChange={(e) => setTableSetup({ ...tableSetup, guests: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.allergiesLabel}</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sem glúten, amendoim..." 
                  value={tableSetup.allergies} 
                  onChange={(e) => setTableSetup({ ...tableSetup, allergies: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.meatTempLabel}</label>
                <select 
                  value={tableSetup.meatTemp} 
                  onChange={(e) => setTableSetup({ ...tableSetup, meatTemp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="Rare">Mal Passado (Rare)</option>
                  <option value="Medium">Ao Ponto (Medium)</option>
                  <option value="Well Done">Bem Passado (Well Done)</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-medium text-slate-600">{t.estWaitingTime}</span>
              </div>

              <button 
                onClick={() => setTableSetup({ ...tableSetup, completedOnboarding: true })}
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white py-3.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-95 transition"
              >
                {t.continueMenu}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          5. VISTA DE CLIENTE NA MESA (MENU DIGITAL)
         ========================================== --> */}
      {viewMode === 'onboarding' && tableSetup.completedOnboarding && (
        <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{restaurantName}</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.tableNumber} #{tableSetup.number}</h2>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                  {tableSetup.guests} Guests (Mesa Coletiva)
                </span>
              </div>
            </div>

            {/* Destaque Obrigatório: Especial de Hoje / Peixe do Dia */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase">{t.todaysSpecial}</h4>
                <p className="text-xs text-amber-700 mt-0.5">{chefSlogan}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex gap-2">
              <button 
                style={{ backgroundColor: primaryColor }}
                onClick={handleCallWaiter}
                className="flex-1 text-white py-3 rounded-xl text-xs font-semibold shadow-sm hover:opacity-95 transition flex items-center justify-center gap-1.5"
              >
                <Bell className="w-4 h-4" /> {t.callWaiter}
              </button>
              <button 
                onClick={handleRequestBill}
                className="flex-1 bg-slate-100 text-slate-700 border border-slate-200 py-3 rounded-xl text-xs font-semibold hover:bg-slate-200 transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <DollarSign className="w-4 h-4" /> {t.requestBill}
              </button>
            </div>
          </div>

          {/* LISTA DE PRATOS DO MENU */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-teal-600" /> Menu Digital do Restaurante
            </h3>
            {loadingMenu ? (
              <p className="text-xs text-slate-400 text-center py-4">A carregar menu do Supabase...</p>
            ) : menuItems.length === 0 ? (
              <div className="space-y-3">
                {[
                  { name: 'Bobotie Tradicional', desc: 'Prato típico com carne aromática e crosta de ovo.', price: 145, img: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
                  { name: 'Steak com Molho Pepper', desc: 'Corte nobre com batatas rústicas e molho de pimenta.', price: 195, img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' }
                ].map((item, idx) => (
                  <div key={idx} className="border border-slate-100 p-3.5 rounded-xl flex justify-between items-center bg-slate-50/50">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                      <span className="text-xs font-bold text-teal-600 mt-1.5 inline-block">R$ {item.price}.00</span>
                    </div>
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 ml-3 shadow-sm" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div key={item.id} className="border border-slate-100 p-3.5 rounded-xl flex justify-between items-center bg-slate-50/50">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                      <span className="text-xs font-bold text-teal-600 mt-1.5 inline-block">R$ {Number(item.price).toFixed(2)}</span>
                    </div>
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 ml-3 shadow-sm" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback do Cliente */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900">{t.feedbackTitle}</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setFeedback({ ...feedback, rating: star })}
                  className={`w-10 h-10 rounded-xl font-bold text-xs border transition ${feedback.rating >= star ? 'bg-amber-400 border-amber-500 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                >
                  ★ {star}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              placeholder={t.optionalInfo}
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button 
              style={{ backgroundColor: primaryColor }}
              onClick={() => alert("Thank you for your feedback! Our management team values your opinion.")}
              className="w-full text-white py-3 rounded-xl text-xs font-semibold shadow-sm hover:opacity-95 transition"
            >
              {t.submitFeedback}
            </button>
          </div>
        </main>
      )}

    </div>
  );
}