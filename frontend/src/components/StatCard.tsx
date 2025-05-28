interface StatCardProps {
  coursesCount: number;
  coursesPending: number;
}
export default function StatCard({
  coursesCount,
  coursesPending,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
      <div className="flex items-center h-32">
        <div className="flex-1">
          <div className="text-sm text-gray-500">Total des cours</div>
          <div className="text-2xl font-semibold text-gray-900">
            {coursesCount}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">Paiements en attente</div>
          <div className="text-2xl font-semibold text-red-600">
            {coursesPending}
          </div>
        </div>
      </div>
    </div>
  );
}
