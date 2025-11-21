"use client";

import { useOptimistic, useRef } from "react";
import { addPaste, deletePaste } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Paste } from "@/db/schema";
import { DeleteAllButton } from "./delete-all-button";
import { CopyButton } from "./copy-button";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type PasteManagerProps = {
  initialPastes: Paste[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send"
      )}
    </Button>
  );
}

function DeleteButton({ id }: { id: number }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
      title="Delete"
      disabled={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}

export function PasteManager({ initialPastes }: PasteManagerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticPastes, addOptimisticPaste] = useOptimistic(
    initialPastes,
    (state, newPaste: Paste | number | "CLEAR") => {
      if (newPaste === "CLEAR") {
        return [];
      } else if (typeof newPaste === "number") {
        return state.filter((p) => p.id !== newPaste);
      } else {
        return [newPaste, ...state];
      }
    }
  );

  async function handleAdd(formData: FormData) {
    const content = formData.get("content") as string;
    const mode = (formData.get("mode") as string) ?? "plaintext";
    if (!content) return;

    const newPaste: Paste = {
      id: Math.random(), // Temporary ID
      content,
      mode: mode as any,
      createdAt: new Date().toISOString(),
    };

    addOptimisticPaste(newPaste);
    formRef.current?.reset();
    await addPaste(formData);
  }

  async function handleDelete(formData: FormData) {
    const id = Number(formData.get("id"));
    addOptimisticPaste(id);
    await deletePaste(formData);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>New Paste</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleAdd} ref={formRef} className="space-y-4">
            <Textarea
              name="content"
              placeholder="Paste your text here..."
              className="min-h-[150px] font-mono"
              required
            />
            <div className="flex items-center gap-4 justify-between">
              <Select name="mode" defaultValue="plaintext">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plaintext">Plain Text</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">History</h2>
          {optimisticPastes.length > 0 && (
            <DeleteAllButton onClear={() => addOptimisticPaste("CLEAR")} />
          )}
        </div>
        {optimisticPastes.length === 0 ? (
          <p className="text-gray-500">No pastes yet.</p>
        ) : (
          optimisticPastes.map((paste) => (
            <Card key={paste.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  {paste.mode === "markdown" ? (
                    <div className="prose max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {paste.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 flex-1">
                      {paste.content}
                    </pre>
                  )}
                  <div className="flex gap-2">
                    <CopyButton content={paste.content} />
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={paste.id} />
                      <DeleteButton id={paste.id} />
                    </form>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
