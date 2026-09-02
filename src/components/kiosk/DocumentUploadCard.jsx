import React, { useState } from 'react';
import { Upload, Camera, FileText, CheckCircle2, Loader2, Edit3, Trash2, Plus, Sparkles, Check } from 'lucide-react';
import { useKiosk } from '../../context/KioskContext';

export const DocumentUploadCard = () => {
  const { uploadedDocs, setUploadedDocs } = useKiosk();
  const [isUploading, setIsUploading] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);

  // File upload trigger simulation
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    const newDocId = `doc_${Date.now()}`;
    const filename = file ? file.name : "Prescription_Scan_2026.jpg";

    setIsUploading(true);

    // Step 1: Add doc with "Processing..." status
    const tempDoc = {
      id: newDocId,
      filename,
      fileSize: "1.2 MB",
      uploadedTime: "Just now",
      thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=60",
      status: "processing",
      extractedData: {
        hospitalName: "AIIMS OPD Clinic",
        doctorName: "Dr. A. K. Roy",
        visitDate: "2026-08-15",
        diagnosis: "Upper Respiratory Tract Infection & Mild Fever",
        medicines: [
          { name: "Tab. Azithromycin", dosage: "500mg", frequency: "1-0-0", duration: "3 Days" },
          { name: "Tab. Paracetamol", dosage: "650mg", frequency: "1-1-1", duration: "5 Days" }
        ],
        investigationsRequired: "FBC, Serum CRP",
        notes: "Rest and warm fluids. Review in 5 days."
      }
    };

    setUploadedDocs(prev => [tempDoc, ...prev]);

    // Step 2: Transition status from "processing" to "extracted" after 2 seconds
    setTimeout(() => {
      setUploadedDocs(prev => prev.map(d => d.id === newDocId ? { ...d, status: 'extracted' } : d));
      setIsUploading(false);
    }, 2200);
  };

  const updateExtractedField = (docId, field, value) => {
    setUploadedDocs(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          extractedData: {
            ...doc.extractedData,
            [field]: value
          }
        };
      }
      return doc;
    }));
  };

  const removeDoc = (docId) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== docId));
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone & Camera Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File Dropzone */}
        <label className="relative flex flex-col items-center justify-center p-8 rounded-3xl border-3 border-dashed border-kiosk-primary/40 bg-white hover:bg-kiosk-primaryLight/30 cursor-pointer transition-all duration-200 text-center shadow-kiosk-sm hover:shadow-kiosk-card group touch-target">
          <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" className="hidden" />
          <div className="w-16 h-16 rounded-2xl bg-kiosk-primaryLight text-kiosk-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-lg font-bold text-slate-800">Drag & Drop Prescription / Report</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Tap to browse image or PDF from file</span>
        </label>

        {/* Camera Capture Button */}
        <label className="relative flex flex-col items-center justify-center p-8 rounded-3xl border-3 border-dashed border-emerald-400/50 bg-white hover:bg-emerald-50 cursor-pointer transition-all duration-200 text-center shadow-kiosk-sm hover:shadow-kiosk-card group touch-target">
          <input type="file" onChange={handleFileUpload} accept="image/*" capture="environment" className="hidden" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8" />
          </div>
          <span className="text-lg font-bold text-slate-800">Use Kiosk Document Camera</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Snap a clear live photo of physical prescription</span>
        </label>
      </div>

      {/* Uploaded Files & OCR Status Badges */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-kiosk-primary" />
          <span>Uploaded Records ({uploadedDocs.length})</span>
        </h4>

        {uploadedDocs.map(doc => {
          const isProcessing = doc.status === 'processing';
          const isEditing = editingDocId === doc.id;

          return (
            <div key={doc.id} className="bg-white rounded-3xl border border-slate-200 shadow-kiosk-card overflow-hidden transition-all">
              {/* File Header Row */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/80 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.thumbnail}
                    alt="Thumbnail"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-base leading-snug">{doc.filename}</h5>
                    <span className="text-xs font-semibold text-slate-500">{doc.fileSize} • Uploaded {doc.uploadedTime}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                      <span>Processing OCR...</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>OCR Extracted</span>
                    </span>
                  )}

                  <button
                    onClick={() => removeDoc(doc.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Extracted OCR Card (Editable) */}
              {!isProcessing && doc.extractedData && (
                <div className="p-5 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-kiosk-primary flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> AI Extracted Data Card (Confirm or Edit)
                    </span>
                    <button
                      onClick={() => setEditingDocId(isEditing ? null : doc.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-kiosk-accent hover:underline"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{isEditing ? "Save Edits" : "Edit Fields"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 block mb-1">Diagnosis</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={doc.extractedData.diagnosis}
                          onChange={(e) => updateExtractedField(doc.id, 'diagnosis', e.target.value)}
                          className="w-full text-sm font-bold border border-slate-300 rounded-lg p-1.5"
                        />
                      ) : (
                        <span className="text-sm font-bold text-slate-800">{doc.extractedData.diagnosis}</span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 block mb-1">Prescribing Doctor / Hospital</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={doc.extractedData.doctorName}
                          onChange={(e) => updateExtractedField(doc.id, 'doctorName', e.target.value)}
                          className="w-full text-sm font-bold border border-slate-300 rounded-lg p-1.5"
                        />
                      ) : (
                        <span className="text-sm font-bold text-slate-800">{doc.extractedData.doctorName}</span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 block mb-1">Visit Date</span>
                      {isEditing ? (
                        <input
                          type="date"
                          value={doc.extractedData.visitDate}
                          onChange={(e) => updateExtractedField(doc.id, 'visitDate', e.target.value)}
                          className="w-full text-sm font-bold border border-slate-300 rounded-lg p-1.5"
                        />
                      ) : (
                        <span className="text-sm font-bold text-slate-800">{doc.extractedData.visitDate}</span>
                      )}
                    </div>
                  </div>

                  {/* Medicines List */}
                  {doc.extractedData.medicines && doc.extractedData.medicines.length > 0 && (
                    <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100">
                      <span className="text-xs font-bold text-teal-800 block mb-2">Prescribed Medicines Extracted</span>
                      <div className="flex flex-wrap gap-2">
                        {doc.extractedData.medicines.map((med, idx) => (
                          <span key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-teal-200 text-xs font-semibold text-teal-900 shadow-sm">
                            {med.name} ({med.dosage}) — {med.frequency}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
