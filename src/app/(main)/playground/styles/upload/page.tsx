"use client";

import { useEffect, useMemo, useState } from "react";

type ArtStyle = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function ArtStyleUploadPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [styles, setStyles] = useState<ArtStyle[]>([]);
  const [error, setError] = useState("");

  const preview = useMemo(() => imageUrl.trim(), [imageUrl]);

  async function loadStyles() {
    const res = await fetch("/api/art-styles");
    const data = await res.json();
    setStyles(data.styles ?? []);
  }

  useEffect(() => {
    loadStyles().catch((err) => {
      console.error(err);
      setError("Failed to load styles.");
    });
  }, []);

  async function onSelectFile(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageUrl(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/art-styles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, imageUrl }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Failed to save style.");
        return;
      }
      setName("");
      setDescription("");
      setImageUrl("");
      await loadStyles();
    } catch (err) {
      console.error(err);
      setError("Failed to save style.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="pt-28 pb-16 px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-5 space-y-6">
          <header>
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-secondary">STYLE_REGISTRY</p>
            <h1 className="text-5xl font-headline font-black italic tracking-tighter">ART DNA UPLOAD</h1>
            <p className="text-zinc-500 mt-2">Upload new visual styles to the database for the generator.</p>
          </header>

          <form onSubmit={onSubmit} className="space-y-4 bg-surface-container-low border border-zinc-800 p-6">
            <div className="space-y-2">
              <label className="font-label text-[10px] tracking-[0.15em] uppercase text-zinc-400">Style Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-primary"
                placeholder="NEURAL_FLUX"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] tracking-[0.15em] uppercase text-zinc-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-primary min-h-24"
                placeholder="A kinetic style with high contrast signal forms."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] tracking-[0.15em] uppercase text-zinc-400">Image URL</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-primary"
                placeholder="https://... or upload file below"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] tracking-[0.15em] uppercase text-zinc-400">Or Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
                className="w-full text-xs"
              />
            </div>

            {error ? <p className="text-red-400 text-sm">{error}</p> : null}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-on-primary p-3 font-bold tracking-wider disabled:opacity-60"
            >
              {isSaving ? "SAVING..." : "SAVE STYLE TO DB"}
            </button>
          </form>
        </section>

        <section className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-low border border-zinc-800 p-4">
            <h2 className="font-label text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-3">Preview</h2>
            <div className="aspect-[4/3] bg-zinc-950 border border-zinc-800 overflow-hidden">
              {preview ? <img src={preview} alt="Style preview" className="w-full h-full object-cover" /> : null}
            </div>
          </div>

          <div className="bg-surface-container-low border border-zinc-800 p-4">
            <h2 className="font-label text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-3">Styles In Database</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {styles.map((style) => (
                <article key={style.id} className="border border-zinc-800 bg-zinc-950 p-3 space-y-2">
                  <div className="aspect-video overflow-hidden border border-zinc-800">
                    <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-headline font-bold">{style.name}</h3>
                  <p className="text-xs text-zinc-500">{style.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
