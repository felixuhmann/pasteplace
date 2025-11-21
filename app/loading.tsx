import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Pasteplace</h1>
          <Skeleton className="h-10 w-10 rounded-md" />
        </header>

        <Card>
          <CardHeader>
            <CardTitle>New Paste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">History</h2>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="mt-4">
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
