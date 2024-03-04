import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import TheHomePage from "@/components/homepage/TheHomePage";
import { fetchAdminValues } from "@/axios-instances/axios";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });
  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TheHomePage />
      </HydrationBoundary>
    </div>
  );
}
