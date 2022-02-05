import { useLoadingContext } from "../../hooks/useLoadingContext";

export default function GlobalLoading() {
  const { isLoading } = useLoadingContext();

  return (
    <div className={`w-full ${isLoading ? "h-1" : "h-0"} duration-75`}>
      <div className="animate-pulse flex">
        <div className="flex-1">
          <div className="h-1 bg-primary-blue"></div>
        </div>
      </div>
    </div>
  );
}
