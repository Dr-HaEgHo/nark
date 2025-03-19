const ItemCardLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full animate-pulse aspect-[1.01] overflow-hidden bg-borderGrey2 rounded-[20px] relative"/>
      <div className="w-[90%] h-8 animate-pulse overflow-hidden bg-borderGrey2 rounded-full relative"/>
      <div className="w-[90%] h-6 animate-pulse overflow-hidden bg-borderGrey2 rounded-full relative"/>
    </div>
  );
};

export default ItemCardLoading;