export default function BottomNavBar({ activeTab, setActiveTab }) {
    const tabs = ["Dashboard", "Attendance", "Results"];
  
    return (
      <div className="bg-gray-200 py-4 flex justify-center gap-12 text-xl font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded ${
              activeTab === tab
                ? "bg-[#9569D8] text-white shadow-md"
                : "text-[#2D2A43] hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  