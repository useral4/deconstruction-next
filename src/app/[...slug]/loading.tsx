import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-[#f4f2ed]">
      <div className="text-ink flex items-center gap-3 font-bold">
        <Spinner />
        Загружаем страницу
      </div>
    </div>
  );
}
