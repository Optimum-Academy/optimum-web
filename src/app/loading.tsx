export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-purple-200 border-t-brand-purple-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
