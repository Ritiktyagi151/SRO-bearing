import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check, Plus, X } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";

export default function AdminIndustries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    icon: "",
    features: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchIndustries = async () => {
    try {
      const data = await apiGet("/cms/industries");
      setIndustries(data.industries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Industry image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(selectedFile.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (ind) => {
    setForm({
      id: ind._id,
      name: ind.name,
      description: ind.description || "",
      icon: ind.icon || "",
      features: Array.isArray(ind.features) ? ind.features.join("\n") : (ind.features || ""),
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this industry sector?")) return;
    try {
      await apiDelete(`/cms/industries/${id}`);
      setMessage({ type: "success", text: "Industry deleted successfully!" });
      fetchIndustries();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("icon", form.icon);

    const parsedFeatures = form.features.split("\n").map(line => line.trim()).filter(Boolean);
    formData.append("features", JSON.stringify(parsedFeatures));

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await apiPut(`/cms/industries/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Industry updated successfully!" });
      } else {
        await apiPost("/cms/industries", formData, true);
        setMessage({ type: "success", text: "Industry created successfully!" });
      }

      setForm({ id: "", name: "", description: "", icon: "", features: "" });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchIndustries();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Industries CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-100 tracking-wide">Industries CMS Manager</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({ id: "", name: "", description: "", icon: "", features: "" });
                setFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer animate-pulse"
            >
              <Plus className="w-4.5 h-4.5" />
              Create Industry
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

        {showForm ? (
          /* Full Page Editor Form */
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-100 rounded-xl border border-slate-800 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-black text-slate-100 mb-8 uppercase tracking-wider flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-emerald-500" />
              {isEditing ? "Edit Industry Canvas" : "Add Industry Canvas"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Industry Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. Steel Industry"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. 🔥"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                    Description (Rich Text Editor)
                  </label>
                  <TiptapMiniEditor
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    placeholder="Provide a detailed sector description..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Features / Specifications (One item per line)
                  </label>
                  <textarea
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    rows="5"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 font-mono text-xs transition"
                    placeholder="Feature 1...&#10;Feature 2..."
                  />
                </div>

                <div className="md:col-span-2 border-t border-slate-900 pt-6 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Industry Image Banner (JPG, PNG, WEBP, GIF up to 100MB)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1.5 block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-slate-800 file:text-xs file:font-bold file:bg-slate-900 file:text-slate-300 hover:file:bg-slate-850 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Publish Industry"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ id: "", name: "", description: "", icon: "", features: "" });
                    setFile(null);
                    setIsEditing(false);
                    setShowForm(false);
                  }}
                  className="py-2.5 px-8 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Full Width List Table */
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl overflow-x-auto animate-fadeIn">
            <h2 className="text-lg font-black text-slate-100 mb-6 uppercase tracking-wider">Existing Industries</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-slate-900 rounded-xl"></div>
                ))}
              </div>
            ) : industries.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No sectors listed yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-black">
                    <th className="py-4 px-4">Image</th>
                    <th className="py-4 px-4">Icon</th>
                    <th className="py-4 px-4">Sector Name</th>
                    <th className="py-4 px-4">Slug</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {industries.map((ind) => (
                    <tr key={ind._id} className="hover:bg-slate-900/30 transition-all">
                      <td className="py-4 px-4">
                        {ind.image ? (
                          <img
                            src={ind.image.startsWith("http") ? ind.image : `http://localhost:5001${ind.image}`}
                            alt={ind.name}
                            className="w-16 h-10 object-cover rounded-lg border border-slate-800"
                          />
                        ) : (
                          <span className="text-xs text-slate-500 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-2xl">{ind.icon}</td>
                      <td className="py-4 px-4 font-bold text-slate-100">{ind.name}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">{ind.slug}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(ind)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 rounded-xl transition inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ind._id)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 rounded-xl transition inline-flex cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
