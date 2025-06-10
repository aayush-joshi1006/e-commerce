export default function Loading() {
  return (
    <div
      className="min-h-screen flex justify-center items-center 
      bg-white dark:bg-gray-900 
      transition-colors duration-300
    "
    >
      <h2
        className="text-3xl font-semibold animate-pulse 
        text-gray-700 dark:text-gray-200 
        transition-colors duration-300
      "
      >
        Loading...
      </h2>
    </div>
  );
}
