"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { EventIcon } from "@/components/event-icons";
import { supabase } from "@/lib/supabase-browser";

const PRESENTATION_DEADLINE = "30 October 2026";
const MAX_PRESENTATION_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "ppt", "pptx"]);

type PresentationRow = {
  team_id: string;
  original_filename: string;
  file_bytes: number;
  file_format: string;
  uploaded_by: string;
  uploaded_at: string;
  secure_url: string;
};

type UploadResponse = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  bytes: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extensionOf(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function PresentationUpload({
  teamId,
  teamCode,
}: {
  teamId: string;
  teamCode: string;
}) {
  const [presentation, setPresentation] = useState<PresentationRow | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("btf_team_presentations")
      .select("team_id, original_filename, file_bytes, file_format, uploaded_by, uploaded_at, secure_url")
      .eq("team_id", teamId)
      .maybeSingle();

    if (error) {
      setMessage({ tone: "error", text: error.message });
    } else {
      setPresentation(data as PresentationRow | null);
    }
    setLoading(false);
  }, [teamId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setMessage(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = extensionOf(file.name);
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      setSelectedFile(null);
      setMessage({ tone: "error", text: "Choose a PDF, PPT, or PPTX presentation file." });
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PRESENTATION_BYTES) {
      setSelectedFile(null);
      setMessage({ tone: "error", text: "Presentation files must be 10 MB or smaller." });
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setMessage(null);

    try {
      const extension = extensionOf(selectedFile.name);
      const uploadBody = new FormData();
      uploadBody.append("file", selectedFile);
      uploadBody.append("upload_preset", "ml_default");
      uploadBody.append("asset_folder", "btf2026/presentations");
      uploadBody.append("public_id", `team-${teamCode}-presentation`);
      uploadBody.append("overwrite", "true");
      uploadBody.append("tags", "btf2026,presentation");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvdobvlm4/raw/upload",
        { method: "POST", body: uploadBody },
      );

      if (!response.ok) {
        throw new Error("The presentation could not be uploaded. Please try again.");
      }

      const uploaded = (await response.json()) as UploadResponse;

      const { error } = await supabase
        .from("btf_presentation_submission_requests")
        .insert({
          asset_id: uploaded.asset_id,
          public_id: uploaded.public_id,
          secure_url: uploaded.secure_url,
          original_filename: selectedFile.name,
          file_bytes: uploaded.bytes || selectedFile.size,
          file_format: extension,
        })
        .select("submitted_team_id")
        .single();

      if (error) throw error;

      setSelectedFile(null);
      setMessage({ tone: "success", text: "Project presentation uploaded successfully." });
      await refresh();
    } catch (error) {
      const text =
        error && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "The presentation could not be uploaded. Please try again.";
      setMessage({ tone: "error", text });
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="team-presentation-card">
      <div className="portal-card-heading">
        <div>
          <p className="eyebrow">Project submission</p>
          <h3>Upload project presentation</h3>
        </div>
        <span>{presentation ? "Submitted" : "Required"}</span>
      </div>

      <div className="presentation-deadline">
        <EventIcon name="calendar" />
        <div>
          <strong>Deadline: {PRESENTATION_DEADLINE}</strong>
          <span>One presentation per team · PDF, PPT, or PPTX · maximum 10 MB</span>
        </div>
      </div>

      {loading ? (
        <p className="presentation-loading">Checking submission status…</p>
      ) : presentation ? (
        <div className="presentation-status">
          <span className="presentation-status-icon"><EventIcon name="check" /></span>
          <div>
            <strong>Presentation submitted</strong>
            <span>{presentation.original_filename} · {formatBytes(presentation.file_bytes)}</span>
            <small>
              Uploaded {new Date(presentation.uploaded_at).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </small>
          </div>
        </div>
      ) : (
        <div className="presentation-empty">
          <EventIcon name="document" />
          <strong>No presentation uploaded yet.</strong>
          <span>Your team must upload its project presentation by 30 October 2026.</span>
        </div>
      )}

      <form className="presentation-upload-form" onSubmit={handleSubmit}>
        <label htmlFor="project-presentation">
          {presentation ? "Replace project presentation" : "Choose project presentation"}
        </label>
        <input
          id="project-presentation"
          type="file"
          accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          onChange={handleFile}
          disabled={uploading}
          required
        />

        {selectedFile ? (
          <div className="presentation-selected-file">
            <EventIcon name="document" />
            <span>{selectedFile.name}</span>
            <small>{formatBytes(selectedFile.size)}</small>
          </div>
        ) : null}

        {message ? (
          <div className={`portal-message portal-message-${message.tone}`} role="status">
            {message.text}
          </div>
        ) : null}

        <button className="button" type="submit" disabled={!selectedFile || uploading}>
          {uploading
            ? "Uploading…"
            : presentation
              ? "Replace project presentation"
              : "Upload project presentation"}
        </button>

        <p className="presentation-upload-note">
          Any member of the team can upload or replace the team presentation before the deadline.
          The latest successful upload is treated as the team&apos;s submission.
        </p>
      </form>
    </section>
  );
}
