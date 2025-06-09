import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function App() {
  const [selectedDay, setSelectedDay] = useState("6");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#fffceb] font-sans text-[#333] p-4">
      <nav className="relative flex items-center justify-between mb-6 px-6 bg-[#fff4cc] rounded-full shadow-md h-14">
      <div className="flex items-center pl-2">
  <img src="/logo.png" alt="Ainana logo" className="h-8 w-auto" />
</div>
  <div className="relative flex gap-6 font-medium text-[#333]">
    {["dashboard", "dieta", "consigli", "client"].map((item, idx) => {
      const labels = {
        dashboard: "Dashboard",
        dieta: "Diete",
        consigli: "Consigli",
        client: "Client management",
      };

      const isActive = activeSection === item;

      return (
        <button
          key={idx}
          onClick={() => setActiveSection(item)}
          className={`relative px-4 py-2 z-10 transition-all duration-300 ${
            isActive ? "text-[#000]" : "text-[#555]"
          }`}
        >
          {labels[item]}
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-full bg-yellow-400 rounded-full -z-10 transition-all duration-300"></span>
          )}
        </button>
      );
    })}
  </div>
  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
    🔔
  </div>
</nav>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Calendario</h2>
          <Calendar
            onChange={setDate}
            value={date}
            locale="it-IT"
            className="rounded-lg"
          />
          <p className="text-sm mt-4">Hai selezionato: <strong>{date.toLocaleDateString('it-IT')}</strong></p>

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Ultime ricette caricate</h3>
            <div className="bg-gray-100 p-2 rounded mb-1">Pokè di quinoa, ceci e verdure</div>
            <div className="bg-gray-100 p-2 rounded mb-1">Salmone scottato con limone</div>
            <button className="bg-yellow-400 px-4 py-2 rounded mt-2 w-full">Vai alle ricette</button>
          </div>
        </div>

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
