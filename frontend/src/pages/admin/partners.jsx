import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, Check, AlertCircle, Plus, Trash2, Edit2, Users, X } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminPartners() {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [isEditingClient, setIsEditingClient] = useState(false);
  const [clientFormIndex, setClientFormIndex] = useState(-1);
  const [clientForm, setClientForm] = useState({
    name: "",
    logo: "",
    image: "",
    color: "from-gray-500 to-gray-600",
  });
  const [showClientForm, setShowClientForm] = useState(false);

  const fetchPartners = async () => {
    try {
      const data = await apiGet("/cms/partners");
      setPartnerData(data.partner);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleTextChange = (field, val) => {
    if (!partnerData) return;
    setPartnerData({
      ...partnerData,
      [field]: val,
    });
  };

  const handleOpenAddClient = () => {
    setClientForm({
      name: "",
      logo: "",
      image: "",
      color: "from-gray-500 to-gray-600",
    });
    setClientFormIndex(-1);
    setIsEditingClient(false);
    setShowClientForm(true);
  };

  const handleOpenEditClient = (idx, client) => {
    setClientForm({
      name: client.name,
      logo: client.logo || "",
      image: client.image || "",
      color: client.color || "from-gray-500 to-gray-600",
    });
    setClientFormIndex(idx);
    setIsEditingClient(true);
    setShowClientForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert("Logo image size should not exceed 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setClientForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClientItem = (e) => {
    e.preventDefault();
    if (!partnerData) return;

    const clientsList = [...(partnerData.clients || [])];

    if (isEditingClient) {
      clientsList[clientFormIndex] = clientForm;
    } else {
      clientsList.push(clientForm);
    }

    setPartnerData({
      ...partnerData,
      clients: clientsList,
    });

    setShowClientForm(false);
  };

  const handleRemoveClient = (idx) => {
    if (!partnerData) return;
    const clientsList = (partnerData.clients || []).filter((_, i) => i !== idx);
    setPartnerData({
      ...partnerData,
      clients: clientsList,
    });
  };

  const handleSaveAll = async () => {
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/cms/partners", partnerData);
      setPartnerData(data.partner);
      setMessage({ type: "success", text: "Partners CMS updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-40 bg-slate-900 rounded-xl"></div>
          <div className="h-40 bg-slate-900 rounded-xl"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!partnerData) {
    return (
      <AdminLayout>
        <p className="text-slate-400 text-sm italic">Partners schema load failure.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Partners CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-100 tracking-wide">Partners CMS Manager</h1>
          {!showClientForm && (
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
            >
              <Save className="w-4.5 h-4.5" />
              Save All Changes
            </button>
          )}
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
              message.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                : "bg-rose-950/40 border-rose-500/20 text-rose-400"
            }`}
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {showClientForm ? (
          /* Inline Client Edit Form */
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative animate-fadeIn max-w-3xl">
            <button
              onClick={() => setShowClientForm(false)}
              className="absolute top-6 right-6 p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-100 rounded-xl border border-slate-800 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-100 mb-6 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              {isEditingClient ? "Edit Client Item" : "Add Client Partner"}
            </h3>

            <form onSubmit={handleSaveClientItem} className="space-y-6 max-w-xl">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                  placeholder="E.g. TechCorp"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                  Logo Initials (Optional fallback, 2 letters max)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={clientForm.logo}
                  onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value.toUpperCase() })}
                  className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-mono transition"
                  placeholder="E.g. TC"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                  Logo Image (JPEG/PNG/WEBP, under 1MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1.5 block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-slate-800 file:text-xs file:font-bold file:bg-slate-900 file:text-slate-300 hover:file:bg-slate-850 cursor-pointer"
                />
                {clientForm.image && (
                  <div className="mt-4 flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <img src={clientForm.image} alt="Preview" className="w-12 h-12 object-contain border border-slate-700 rounded-lg p-1 bg-white" />
                    <button
                      type="button"
                      onClick={() => setClientForm({ ...clientForm, image: "" })}
                      className="text-xs text-rose-400 hover:underline cursor-pointer"
                    >
                      Remove Logo Image
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                  Visual Color Class (Tailwind gradient)
                </label>
                <input
                  type="text"
                  value={clientForm.color}
                  onChange={(e) => setClientForm({ ...clientForm, color: e.target.value })}
                  className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-mono transition"
                  placeholder="E.g. from-gray-500 to-gray-600"
                />
              </div>

              <div className="pt-6 border-t border-slate-900 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                >
                  Save Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientForm(false)}
                  className="py-2.5 px-8 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Normal grid layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Left Columns - Text Content Settings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
                <h2 className="text-lg font-black text-slate-100 mb-2 border-b border-slate-900 pb-3 uppercase tracking-wider">
                  1. Text Headers & Paragraphs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                      Badge Title
                    </label>
                    <input
                      type="text"
                      value={partnerData.badge || ""}
                      onChange={(e) => handleTextChange("badge", e.target.value)}
                      className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 text-sm font-semibold transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={partnerData.title || ""}
                      onChange={(e) => handleTextChange("title", e.target.value)}
                      className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 text-sm font-semibold transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Intro Description
                  </label>
                  <textarea
                    rows={3}
                    value={partnerData.description || ""}
                    onChange={(e) => handleTextChange("description", e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 text-sm font-semibold transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Client Items */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h2 className="text-lg font-black text-slate-100 uppercase tracking-wider">
                  2. Client Brands
                </h2>
                <button
                  type="button"
                  onClick={handleOpenAddClient}
                  className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {(partnerData.clients || []).length === 0 ? (
                <p className="text-slate-400 text-sm italic">No client brands added yet.</p>
              ) : (
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {(partnerData.clients || []).map((client, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:bg-slate-900 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex items-center justify-center font-bold text-sm shadow-sm border border-slate-850">
                          {client.image ? (
                            <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="w-full h-full bg-emerald-800 text-white flex items-center justify-center">{client.logo}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-100">{client.name}</p>
                          <p className="text-[10px] text-slate-450 font-mono">{client.color}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditClient(idx, client)}
                          className="p-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-emerald-450 hover:border-emerald-500/20 rounded-lg transition cursor-pointer inline-flex"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveClient(idx)}
                          className="p-1.5 bg-slate-950 border border-slate-855 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 rounded-lg transition cursor-pointer inline-flex"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
