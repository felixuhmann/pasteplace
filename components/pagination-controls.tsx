"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  totalPages: number;
};

export function PaginationControls({ totalPages }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrev}
        asChild={hasPrev}
      >
        {hasPrev ? (
          <Link href={`/?page=${currentPage - 1}`} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </span>
        )}
      </Button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {Math.max(1, totalPages)}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext}
        asChild={hasNext}
      >
        {hasNext ? (
          <Link href={`/?page=${currentPage + 1}`} className="flex items-center gap-2">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-2">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
