export default function Calendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("fr-FR", { month: "long" });
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay();

  // Adapter le premier jour (Dimanche = 0, mais doit être à la fin en France)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: adjustedFirstDay });

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Calendrier {currentMonth} {currentYear}
        </h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Ajouter un cours
        </button>
      </div>

      {/* Calendrier */}
      <div className="bg-gray-100 rounded-xl shadow-sm">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-px border-b border-gray-300">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div
              key={day}
              className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Cases du calendrier */}
        <div className="grid grid-cols-7 gap-1 p-1">
          {/* Jours vides avant le 1er du mois */}
          {emptyDays.map((_, index) => (
            <div key={index} className="h-32 bg-gray-100" />
          ))}

          {/* Jours du mois */}
          {days.map((day) => (
            <div
              key={day}
              className={`h-32 flex items-start justify-start text-md text-gray-600 font-semibold p-2 bg-white hover:bg-gray-200 cursor-pointer ${
                day === currentDay ? " border-indigo-500 border-2" : "border-gray-200"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
