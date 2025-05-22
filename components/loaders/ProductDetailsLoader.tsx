import React from "react";

const ProductDetailsLoader = () => {
  return (
    <div className="w-full max-md:px-4 max-lg:px-5 animate-pulse">
      <div className="container">
        <div className="w-full">
          <div className="flex flex-col items-center pt-[92px]">
            <div className="h-10 w-1/2 bg-gray-300 rounded mb-24"></div>
          </div>

          <div className="w-full flex lg:hidden items-start justify-between max-lg:flex-col">
            <div className="w-full lg:w-[67%] grid grid-cols-3 lg:grid-cols-2 gap-2">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[0.81] first:col-span-3 bg-gray-300 rounded"
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:flex items-start justify-between max-lg:flex-col">
            <div className="w-full lg:w-[67%] hidden lg:grid grid-cols-3 lg:grid-cols-2 gap-2">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[0.81] bg-gray-300 rounded"
                />
              ))}
            </div>

            <div className="sticky top-4 w-full lg:w-[31%] max-lg:mt-6 space-y-6">
              <div className="h-6 w-1/3 bg-gray-300 rounded" />
              <div className="flex justify-between border-b pb-4">
                <div className="h-6 w-2/3 bg-gray-300 rounded" />
                <div className="h-6 w-16 bg-gray-300 rounded" />
              </div>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="w-4 h-4 bg-gray-300 rounded-full" />
                ))}
                <div className="h-4 w-16 bg-gray-300 rounded" />
              </div>

              <div className="flex gap-3 mt-4 mb-9">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              </div>

              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
                <div className="flex gap-3">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="px-3 py-2 bg-gray-300 rounded" />
                  ))}
                </div>
              </div>

              <div className="w-full h-12 bg-gray-300 rounded mt-5" />

              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-[34px] h-[34px] bg-gray-300 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-2/3 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </div>

              <div className="flex justify-between py-5 border-b border-borderGrey2">
                <div className="h-4 w-[106px] bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </div>

              <div className="flex justify-between py-5">
                <div className="h-4 w-[106px] bg-gray-300 rounded" />
                <div className="h-10 w-1/2 bg-gray-300 rounded" />
              </div>

              <div className="w-full h-40 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
