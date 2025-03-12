export default function FastActionCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
      <div className="space-y-3">
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Programmer un cours
        </button>
        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Modifier les informations
        </button>
      </div>
    </div>
  );
}
