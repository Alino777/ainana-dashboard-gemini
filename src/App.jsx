import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from "framer-motion";

export default function App() {
  const [selectedDay, setSelectedDay] = useState("6");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [date, setDate] = useState(new Date());
  const user = { name: "Anna" };

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "dieta", label: "Diete" },
    { key: "consigli", label: "Consigli" },
    { key: "client", label: "Client management" },
  ];

  return (
    <div className="min-h-screen bg-[#fffceb] font-sans text-[#333] p-4">
      {/* Navbar con logo, tab animati, e notifiche */}
      <nav className="flex justify-between items-center mb-6 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Ainana logo" className="h-8 w-auto" />
        </div>

        {/* Navbar centrale */}
        <div className="relative bg-[#fff4cc] rounded-full px-2 py-1 flex gap-2 shadow-md ml-8">
          <div className="relative flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`relative z-10 px-4 py-2 font-medium rounded-full transition-all ${
                  activeSection === tab.key ? "text-black" : "text-gray-600"
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

        {/* Notifiche */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          🔔
        </div>
      </nav>
{/* Saluto utente */}
<div className="flex items-center gap-4 px-6 mb-4">
  {/* Placeholder per immagine profilo */}
  <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center text-xl font-bold text-white shadow-inner">
    {/* In futuro ci andrà un'immagine */}
    <img src="https://via.placeholder.com/150" alt="Profilo" className="w-full h-full object-cover rounded-full" />
  </div>

  {/* Testo saluto */}
  <div className="text-lg font-semibold text-[#333]">
    Ciao {user?.name}, bentornata!
  </div>
</div>
      {/* Contenuto principale */}
      <div className="grid grid-cols-4 gap-4">
        {/* Colonna sinistra */}
        <div className="col-span-1 bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Calendario</h2>
          <Calendar
            onChange={setDate}
            value={date}
            locale="it-IT"
            className="rounded-lg"
          />
          <p className="text-sm mt-4">
            Hai selezionato: <strong>{date.toLocaleDateString('it-IT')}</strong>
          </p>

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Ultime ricette caricate</h3>
            <div className="bg-gray-100 p-2 rounded mb-1">Pokè di quinoa, ceci e verdure</div>
            <div className="bg-gray-100 p-2 rounded mb-1">Salmone scottato con limone</div>
            <button className="bg-yellow-400 px-4 py-2 rounded mt-2 w-full">Vai alle ricette</button>
          </div>
        </div>

        {/* Colonna centrale */}
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <p className="text-sm text-gray-600">Contatti</p>
            <h2 className="text-2xl font-bold">800</h2>
            <p className="text-xs mt-1">+20 lead</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <p className="text-sm text-gray-600">Visualizzazioni</p>
            <h2 className="text-2xl font-bold">10 mila</h2>
            <p className="text-xs text-red-500">+1000 view</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <p className="text-sm text-gray-600">Apprezzamenti</p>
            <h2 className="text-2xl font-bold">200</h2>
            <p className="text-xs mt-1">+20 like</p>
          </div>

          <div className="col-span-3 bg-white rounded-2xl p-4 shadow mt-4">
            <h3 className="font-bold mb-2">Adesione piani alimentari</h3>
            <p className="text-sm text-red-600">Molti utenti preferiscono sgarrare il sabato</p>
            <div className="w-full h-40 bg-gray-100 mt-2 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
