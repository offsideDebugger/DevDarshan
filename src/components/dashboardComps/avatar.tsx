

export default function Avatar({ initials }: { initials: string }) {


  
  // Show loading state to prevent hydration mismatch
  

  
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8  hover:bg-gray-500 hover:scale-115 transition duration-300 ease-in-out overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {initials}
      </span>
    </div>
  )
}