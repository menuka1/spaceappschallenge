export const TimelineStatus = ({ timeline }) => {
  return (
    <div className="relative">
      <div className="absolute top-5 left-5 h-[calc(100%-40px)] w-0.5 bg-gray-200" />
      
      <div className="space-y-8">
        {timeline.map((status, index) => (
          <div key={index} className="relative flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {status.completed ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-3 h-3 bg-current rounded-full" />
              )}
            </div>
            
            <div className="ml-4">
              <p className={`font-medium ${status.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                {status.status}
              </p>
              {status.date && (
                <p className="text-sm text-gray-500">
                  {new Date(status.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};