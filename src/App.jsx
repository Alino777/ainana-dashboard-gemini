import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [date, setDate] = useState(new Date());
  const user = { name: "Giovanna" };
  const [selectedDate, setSelectedDate] = useState(new Date());
const [appointments, setAppointments] = useState({});
const [newAppt, setNewAppt] = useState("");


  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "dieta", label: "Diete" },
    { key: "consigli", label: "Consigli" },
    { key: "client", label: "Client management" },
  ];
// 🔁 Funzione per ottenere i 7 giorni della settimana attiva
function getWeekDays(baseDate = new Date()) {
  const start = new Date(baseDate);
  const day = start.getDay(); // 0 (Domenica) -> 6 (Sabato)
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Inizio da Lunedì
  const days = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(start.setDate(diff + i));
    days.push({
      label: d.toLocaleDateString("it-IT", { weekday: "short" }), // es. "lun"
      date: d,
    });
  }

  return days;
}
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
  <div className="flex flex-col text-lg font-semibold text-[#333] leading-tight">
  <span>Ciao {user?.name},</span>
  <span>bentornata!</span>
</div>
</div>
      {/* Contenuto principale */}
      <div className="grid grid-cols-4 gap-4">
        {/* Colonna sinistra */}
        <div className="col-span-1 bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Calendario</h2>
          {/* Calendario settimanale */}
<div>
  <h2 className="text-lg font-semibold mb-2">
    Settimana del {getWeekDays(selectedDate)[0].date.toLocaleDateString("it-IT")}
  </h2>
  <div className="flex gap-2 mb-4">
    {getWeekDays(selectedDate).map((d) => {
      const isActive = d.date.toDateString() === selectedDate.toDateString();
      return (
        <button
          key={d.date.toISOString()}
          onClick={() => setSelectedDate(d.date)}
          className={`px-3 py-2 rounded-xl font-medium text-sm text-center w-12 ${
            isActive
              ? "bg-yellow-400 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="capitalize">{d.label}</div>
          <div>{d.date.getDate()}</div>
        </button>
      );
    })}
  </div>

  {/* Appuntamenti per il giorno selezionato */}
  <h3 className="font-semibold text-sm mb-2">
    Appuntamenti per il {selectedDate.toLocaleDateString("it-IT")}
  </h3>
  <div className="flex flex-col gap-2 mb-2">
    {(appointments[selectedDate.toDateString()] || []).map((appt, i) => (
      <div key={i} className="text-sm">
        • {appt}
      </div>
    ))}
  </div>

  {/* Form nuovo appuntamento */}
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setAppointments((prev) => {
        const key = selectedDate.toDateString();
        const current = prev[key] || [];
        return {
          ...prev,
          [key]: [...current, newAppt],
        };
      });
      setNewAppt("");
    }}
    className="flex gap-2"
  >
    <input
      type="text"
      value={newAppt}
      onChange={(e) => setNewAppt(e.target.value)}
      placeholder="Nuovo appuntamento"
      className="flex-1 px-2 py-1 rounded border text-sm"
    />
    <button
      type="submit"
      className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
    >
      Aggiungi
    </button>
  </form>
</div>


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
