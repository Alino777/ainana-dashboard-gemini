import { useState } from "react";
import { motion } from "framer-motion";
import 'react-calendar/dist/Calendar.css'; 
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend, PieChart, Pie, Cell
} from 'recharts';

// Componente Icona per chiarezza
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const user = { name: "Anna", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState({
     // Aggiungo un appuntamento d'esempio per oggi per mostrare la funzionalità
     [new Date().toDateString()]: ["10:00: prima visita Mario Rossi"]
  });
  const [newAppt, setNewAppt] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  // ----- FUNZIONE AGGIORNATA PER MOSTRARE 7 GIORNI -----
  function getWeekDays(baseDate = new Date(), offset = 0) {
    const start = new Date(baseDate);
    start.setDate(start.getDate() + offset * 7); 
    const dayOfWeek = start.getDay();
    const diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    const monday = new Date(start.setDate(diff));
    const days = [];
    for (let i = 0; i < 7; i++) { // Loop modificato per 7 giorni
        const d = new Date(monday);
        d.setDate(monday.getDate() + i); 
        days.push({
            label: d.toLocaleDateString("it-IT", { weekday: "short" }),
            fullDate: d,
        });
    }
    return days;
  }
  
  const weekDays = getWeekDays(new Date(), weekOffset);
  const currentMonthYear = weekDays[0].fullDate.toLocaleDateString("it-IT", {
      month: "long", year: "numeric"
  });


  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "dieta", label: "Diete" },
    { key: "consigli", label: "Consigli" },
    { key: "client", label: "Client management" },
  ];
  
  // Dati per i grafici
  const ageData = [
    { group: '13-18', value: 30 }, { group: '19-25', value: 80 }, { group: '26-30', value: 50 },
    { group: '31-40', value: 70 }, { group: '<40', value: 40 },
  ];
  const visitsData = Array.from({ length: 14 }, (_, i) => ({
    day: `G${i + 1}`, prime: Math.floor(Math.random() * 50 + 50), check: Math.floor(Math.random() * 50),
  }));
  const pieData = [ { name: 'Empatico', value: 400 }, { name: 'Altri', value: 400 } ];
  const adherenceData = [
    { day: 'L', value: 60 }, { day: 'M', value: 80 }, { day: 'M', value: 40 },
    { day: 'G', value: 90 }, { day: 'V', value: 75 }, { day: 'S', value: 90 }, { day: 'D', value: 60 },
  ];
  const COLORS = ['#FFCE00', '#F1F1F1'];


  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans text-[#333] p-6">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-10">
          <img src="/logo.png" alt="Ainana logo" className="h-8 w-auto" />
          <div className="relative bg-[#fff4cc] rounded-full px-2 py-1 flex gap-2 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`relative z-10 px-4 py-2 font-medium rounded-full transition-colors ${
                  activeSection === tab.key ? "text-black" : "text-gray-600 hover:text-black"
                }`}
              >
                {tab.label}
                {activeSection === tab.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-yellow-400 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
            <SearchIcon />
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <img src={user.avatar} alt="Profilo" className="w-full h-full object-cover rounded-full" />
             </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-200 overflow-hidden shadow-inner">
              <img src={user.avatar} alt="Profilo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-xl font-semibold text-[#333] leading-tight">
              <span>Ciao {user?.name},</span>
              <span>bentornata!</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            {/* CALENDARIO A 7 GIORNI */}
            <div>
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold capitalize">{currentMonthYear}</h3>
                  <div className="flex gap-2 text-gray-400">
                      <button onClick={() => setWeekOffset(prev => prev - 1)} className="hover:text-black">{'<'}</button>
                      <button onClick={() => setWeekOffset(prev => prev + 1)} className="hover:text-black">{'>'}</button>
                  </div>
              </div>
              <div className="flex justify-between gap-1">
                  {weekDays.map(({ label, fullDate }) => {
                      const isActive = selectedDate.toDateString() === fullDate.toDateString();
                      return (
                          <button 
                              key={fullDate.toISOString()}
                              onClick={() => setSelectedDate(fullDate)}
                              className={`text-center p-1 rounded-lg w-full transition-colors ${
                                  isActive ? 'bg-yellow-400 text-white shadow-md' : 'hover:bg-yellow-50'
                              }`}
                          >
                              <div className={`text-xs capitalize ${isActive ? 'text-white' : 'text-gray-500'}`}>{label}</div>
                              <div className="font-bold text-base">{fullDate.getDate()}</div>
                          </button>
                      )
                  })}
              </div>
            </div>
            
            <div>
                {(appointments[selectedDate.toDateString()] || []).map((appt, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 text-sm mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-800 flex-grow">{appt}</span>
                        <button 
                            onClick={() => {
                                const key = selectedDate.toDateString();
                                setAppointments(prev => ({
                                    ...prev,
                                    [key]: prev[key].filter((_, index) => index !== i)
                                }));
                            }}
                            className="text-gray-400 hover:text-red-500 font-bold"
                        >
                            {'>'}
                        </button>
                    </div>
                ))}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!newAppt.trim()) return;
                        const key = selectedDate.toDateString();
                        const currentAppts = appointments[key] || [];
                        setAppointments(prev => ({...prev, [key]: [...currentAppts, newAppt]}));
                        setNewAppt("");
                    }}
                    className="flex flex-col gap-2 mt-4"
                >
                    <input
                        type="text"
                        value={newAppt}
                        onChange={(e) => setNewAppt(e.target.value)}
                        placeholder="Nuovo appuntamento..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                    />
                </form>
            </div>
          </div>
          
          {/* RIQUADRO SEPARATO PER LE RICETTE */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold px-2">Ultime ricette caricate</h3>
            <div className="bg-white p-2 rounded-lg flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1540420773420-2366e2c88c24?q=80&w=400&auto=format&fit=crop" alt="Pokè" className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <p className="font-semibold text-sm">Pokè di quinoa, ceci e verdure</p>
                    <a href="#" className="text-xs text-yellow-600 font-semibold">Modifica ricetta</a>
                </div>
            </div>
             <div className="bg-white p-2 rounded-lg flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop" alt="Salmone" className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <p className="font-semibold text-sm">Salmone scottato con limone</p>
                    <a href="#" className="text-xs text-yellow-600 font-semibold">Modifica ricetta</a>
                </div>
            </div>
            <button className="bg-yellow-400 text-black font-semibold px-4 py-3 rounded-lg mt-2 w-full shadow-md hover:bg-yellow-500 transition-all">Vai alle ricette</button>
          </div>
        </div>

        {/* COLONNA DESTRA (INVARIATA) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFF9E6] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-yellow-400/50 p-3 rounded-full">
                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl">800</h3>
                  <p className="text-sm text-gray-500">Contatti</p>
                </div>
            </div>
             <div className="bg-[#FFF5F5] rounded-2xl p-4 flex items-center gap-4">
                 <div className="bg-red-400/50 p-3 rounded-full">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                 </div>
                <div>
                  <h3 className="font-bold text-xl">10 mila</h3>
                  <p className="text-sm text-gray-500">Visualizzazioni</p>
                </div>
            </div>
             <div className="bg-[#EBF8FF] rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-blue-400/50 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl">200</h3>
                  <p className="text-sm text-gray-500">Apprezzamenti</p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold mb-2">Media età</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ageData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="group" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255, 206, 0, 0.1)'}} />
                  <Bar dataKey="value" fill="#FFB400" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold mb-2">Prime visita VS check</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={visitsData}>
                  <defs>
                    <linearGradient id="colorPrime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d61414" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#d61414" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCheck" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3FA9F5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3FA9F5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false}/>
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="prime" name="Media prima visita" stroke="#d61414" fill="url(#colorPrime)" />
                  <Area type="monotone" dataKey="check" name="Media check" stroke="#3FA9F5" fill="url(#colorCheck)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl p-4 border border-gray-100 relative">
              <h3 className="font-bold mb-2">Giugno 2025</h3>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="font-bold text-2xl">800</p>
                <p className="text-sm text-gray-500">Contatti</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Tooltip />
                  <Pie data={pieData} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-sm mt-2 text-center text-gray-600">400 contatti hanno scelto un approccio empatico</p>
            </div>
            <div className="rounded-2xl p-4 border border-gray-100">
              <h3 className="font-bold mb-2">Adesione piani alimentari</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                 <p>Molti utenti preferiscono concedersi lo sgarro il sabato</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={adherenceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255, 206, 0, 0.1)'}} />
                  <Bar dataKey="value" fill="#FFCE00" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg flex items-center gap-3">
        <span>💬</span>
        <span>Hai 3 nuovi messaggi</span>
      </div>
    </div>
  );
}