'use client';

interface PersonalSearchProps {
  username: string;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  customDays: string;
  setCustomDays: (days: string) => void;
  loading: boolean;
  onSearch: () => void;
  resetState: () => void;
}

export default function PersonalSearch({
  username,
  timeframe,
  setTimeframe,
  customDays,
  setCustomDays,
  loading,
  onSearch,
  resetState,
}: PersonalSearchProps) {
  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeframe = e.target.value;
    setTimeframe(newTimeframe);
    resetState();
    window.history.pushState(null, '', '/');
  };

  const handleCustomDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || (Number(value) >= 1 && Number(value) <= 1000)) {
      setCustomDays(value);
      resetState();
      window.history.pushState(null, '', '/');
    }
  };

  const handleSearch = () => {
    window.history.pushState(null, '', '/');
    onSearch();
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      <input
        type="text"
        value={username}
        disabled
        className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white/50 cursor-not-allowed"
      />

      <select
        value={timeframe}
        onChange={handleTimeframeChange}
        className="rounded-lg bg-white/10 px-4 py-2 text-white focus:outline-none"
      >
        <option value="24h">Last 24 Hours</option>
        <option value="week">Past Week</option>
        <option value="month">Past Month</option>
        <option value="year">Past Year</option>
        <option value="custom">Custom Days</option>
      </select>

      {timeframe === "custom" && (
        <input
          type="number"
          value={customDays}
          onChange={handleCustomDaysChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          min="1"
          max="1000"
          placeholder="Number of days (1-1000)"
          className="w-32 rounded-lg bg-white/10 px-4 py-2 text-white focus:outline-none"
        />
      )}

      <button
        onClick={handleSearch}
        disabled={loading}
        className="rounded-lg bg-white/20 px-6 py-2 font-semibold hover:bg-white/30 disabled:opacity-50 focus:outline-none"
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
} 