import React, { useState } from 'react';
import { 
  Shield, Globe, Sparkles, LogOut, Settings, Calendar, 
  Bell, DollarSign, Award
} from 'lucide-react';

// Dicionário de Traduções Nativas para os 4 Idiomas Exigidos
const translations = {
  pt: {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "Plataforma Inteligente de Gestão de Mesas e Menus Digitais para Cape Town",
    enterSystem: "Entrar no Sistema",
    exploreCustomer: "Testar Vista de Cliente (Mesa)",
    featuresTitle: "Vantagens Exclusivas para Restaurantes",
    f1Title: "Segurança de Nível Bancário",
    f1Desc: "Dados isolados por restaurante com proteção rigorosa RLS e defesa contra SQL Injection.",
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
    managerDashboard: "Painel do Gerente & Cozinha",
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
    customSettings: "Personalização de Marca & Cores",
    primaryColor: "Cor Principal do Sistema",
    logoUrl: "URL do Logótipo",
    slogan: "Mensagem do Chef / Slogan",
    reports: "Relatórios e Atendimentos",
    saveChanges: "Guardar Alterações"
  },
  'en-ZA': {
    brandTitle: "MesaVibe by Canzele Tech",
    subtitle: "Smart Table Management & Digital Dining Platform for Cape Town",
    enterSystem: "System Login",
    exploreCustomer: "Test Table Customer View",
    featuresTitle: "Exclusive Restaurant Advantages",
    f1Title: "Bank-Grade Security",
    f1Desc: "Tenant-isolated data with strict RLS protection and complete SQL injection defense.",
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
    managerDashboard: "Manager & Kitchen Portal",
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
    customSettings: "Brand & Color Customization",
    primaryColor: "Primary System Color",
    logoUrl: "Logo URL",
    slogan: "Chef Message / Slogan",
    reports: "Reports & Service Logs",
    saveChanges: "Save Changes"
  },
  af: {
    brandTitle: "MesaVibe deur Canzele Tech",
    subtitle: "Slim Tafebestuur en Digitale Spyskaartplatform vir Kaapstad",
    enterSystem: "Stelsel Aanmelding",
    exploreCustomer: "Toets Tafel Klantuitsig",
    featuresTitle: "Eksklusiewe Restaurant Voordele",
    f1Title: "Bank-Graad Sekuriteit",
    f1Desc: "Geïsoleerde data met streng RLS beskerming en SQL-inspuiting verdediging.",
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
    managerDashboard: "Bestuurder & Kombuis Portaal",
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
    customSettings: "Handelsmerk & Kleuraanpassing",
    primaryColor: "Primêre Stelselkleur",
    logoUrl: "Logo URL",
    slogan: "Sjef Boodskap / Slogan",
    reports: "Verslae en Dienslogboeke",
    saveChanges: "Stoor Veranderinge"
  },
  xh: {
    brandTitle: "MesaVibe nguCanzele Tech",
    subtitle: "Iqonga Elihlakaniphileyo LoLawulo Lwetafile eKapa",
    enterSystem: "Ngena Kwinkqubo",
    exploreCustomer: "Vavanya Imbonakalo Yomthengi",
    featuresTitle: "Izinto Ezilungileyo Zokutyela",
    f1Title: "Ukhuseleko Olunamandla",
    f1Desc: "Idatha ekhuselweyo ngqongqo nge-RLS kunye nokukhuselwa kwi-SQL injection.",
    f2Title: "I-AI Wine Sommelier",
    f2Desc: "Iingcebiso zewayini zasendaweni zaseStellenbosch naseConstantia.",
    f3Title: "Ixesha Langoku",
    f3Desc: "Izilumkiso zokubiza umlindi, ikhitshi le-KDS kunye nolawulo lwesitokhwe.",
    f4Title: "Iilwimi ezi-4",
    f4Desc: "IsiXhosa, IsiNgesi (SA), IsiPhuthukezi kunye nsisiBhulu kwiindwendwe.",
    loginTitle: "Ungeniso Olukhuselekileyo",
    emailPlaceholder: "I-imeyile yomsebenzi",
    passwordPlaceholder: "Inombolo yokugqitha",
    loginBtn: "Qinisekisa Ngokukhuselekileyo",
    backHome: "Buyela Ekhaya",
    managerDashboard: "Iphothali yoMlawuli neKhitshi",
    customerView: "Amava Etafile",
    logout: "Phuma",
    tableNumber: "Inombolo yetafile",
    peopleCount: "Inani labantu",
    todaysSpecial: "Okukhethekileyo kwanamhlanje / Intlanzi",
    callWaiter: "Bizا Umlindi",
    requestBill: "Cela Umrhumo",
    feedbackTitle: "Shiya Imbono Yakho",
    optionalInfo: "Igama / Ifowuni (Ukuba uyathanda)",
    submitFeedback: "Thumela Imbono",
    customSettings: "Ukwenza ngokwezifiso uphawu nemibala",
    primaryColor: "Umbala Ophambili",
    logoUrl: "I-URL yeLogo",
    slogan: "Umyalezo kaChef",
    reports: "Iingxelo",
    saveChanges: "Gcina Utshintsho"
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState('en-ZA');
  const [viewMode, setViewMode] = useState('landing'); // 'landing', 'login', 'manager', 'customer'
  const [primaryColor, setPrimaryColor] = useState('#0D9488');
  const [logoUrl, setLogoUrl] = useState('');
  const [restaurantName, setRestaurantName] = useState('Camps Bay Bistro');
  const [chefSlogan, setChefSlogan] = useState("Today's Special: Fresh Atlantic Cob & Local Stellenbosch Chardonnay Pairing");
  
  const [tableInfo] = useState({ number: 4, guests: 2 });
  const [feedback, setFeedback] = useState({ rating: 5, name: '', contact: '' });
  const [serviceLogs] = useState([
    { id: 1, table: 4, action: 'Waiter Called', status: 'Pending', time: '19:42' },
    { id: 2, table: 2, action: 'Bill Requested', status: 'Completed', time: '19:30' }
  ]);

  const t = translations[currentLang] || translations['en-ZA'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* HEADER GLOBAL COM SELETOR DOS 4 IDIOMAS */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-9 h-9 object-contain rounded-lg border border-slate-200" />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              MV
            </div>
          )}
          <div>
            <h1 className="font-bold text-base leading-tight tracking-tight">{restaurantName}</h1>
            <span className="text-xs text-slate-400">Powered by Canzele Tech</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
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
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              {t.backHome}
            </button>
          )}
        </div>
      </header>

      {/* 1. LANDING PAGE DE INTRODUÇÃO (CANZELE TECH) */}
      {viewMode === 'landing' && (
        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5" /> Canzele Tech Ecosystem
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {t.brandTitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setViewMode('login')}
                style={{ backgroundColor: primaryColor }}
                className="text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:opacity-95 transition"
              >
                {t.enterSystem}
              </button>
              <button 
                onClick={() => setViewMode('customer')}
                className="bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition"
              >
                {t.exploreCustomer}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-20">
            {[
              { icon: Shield, title: t.f1Title, desc: t.f1Desc },
              { icon: Sparkles, title: t.f2Title, desc: t.f2Desc },
              { icon: Bell, title: t.f3Title, desc: t.f3Desc },
              { icon: Globe, title: t.f4Title, desc: t.f4Desc }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 2. LOGIN SEGURO */}
      {viewMode === 'login' && (
        <main className="max-w-md mx-auto px-6 py-20">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-xl mx-auto flex items-center justify-center font-bold text-lg">
                🔒
              </div>
              <h2 className="text-xl font-bold tracking-tight">{t.loginTitle}</h2>
              <p className="text-xs text-slate-400">Supabase Auth & RLS Protection Active</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setViewMode('manager'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.emailPlaceholder}</label>
                <input 
                  type="email" 
                  required 
                  defaultValue="manager@campsbaybistro.co.za"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.passwordPlaceholder}</label>
                <input 
                  type="password" 
                  required 
                  defaultValue="securepassword123"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <button 
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="w-full text-white py-3 rounded-xl font-medium text-sm shadow-sm hover:opacity-95 transition"
              >
                {t.loginBtn}
              </button>
            </form>
          </div>
        </main>
      )}

      {/* 3. PAINEL DO GERENTE */}
      {viewMode === 'manager' && (
        <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{t.managerDashboard}</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{restaurantName}</h2>
              <p className="text-sm text-slate-500 italic mt-0.5">"{chefSlogan}"</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setViewMode('customer')}
                className="px-4 py-2 bg-teal-50 text-teal-700 text-xs font-semibold rounded-xl border border-teal-200 hover:bg-teal-100 transition"
              >
                {t.customerView}
              </button>
              <button 
                onClick={() => setViewMode('landing')}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-200 transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> {t.logout}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t.slogan}</label>
                <input 
                  type="text" 
                  value={chefSlogan} 
                  onChange={(e) => setChefSlogan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
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
                  {serviceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono text-slate-500">#{log.id}</td>
                      <td className="py-3 font-medium">Mesa {log.table}</td>
                      <td className="py-3">{log.action}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* 4. VISTA DE CLIENTE NA MESA (QR CODE) */}
      {viewMode === 'customer' && (
        <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{restaurantName}</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.tableNumber} #{tableInfo.number}</h2>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                  {tableInfo.guests} Guests
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
              <Award className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">{t.todaysSpecial}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{chefSlogan}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex gap-2">
              <button 
                style={{ backgroundColor: primaryColor }}
                onClick={() => alert("Waiter called successfully!")}
                className="flex-1 text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm hover:opacity-95 transition flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" /> {t.callWaiter}
              </button>
              <button 
                onClick={() => alert("Bill requested!")}
                className="flex-1 bg-slate-100 text-slate-700 border border-slate-200 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5" /> {t.requestBill}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900">{t.feedbackTitle}</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setFeedback({ ...feedback, rating: star })}
                  className={`w-9 h-9 rounded-xl font-bold text-xs border ${feedback.rating >= star ? 'bg-amber-400 border-amber-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button 
              style={{ backgroundColor: primaryColor }}
              onClick={() => alert("Thank you for your feedback!")}
              className="w-full text-white py-2.5 rounded-xl text-xs font-medium shadow-sm hover:opacity-95 transition"
            >
              {t.submitFeedback}
            </button>
          </div>
        </main>
      )}

    </div>
  );
}