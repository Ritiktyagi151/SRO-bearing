import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check, Plus, X } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    icon: "",
    caseStudy: "",
    fullDescription: "",
    benefits: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchServices = async () => {
    try {
      const data = await apiGet("/cms/services");
      setServices(data.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Service image exceeds 100MB limit!" });
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

  const handleEdit = (service) => {
    setForm({
      id: service._id,
      title: service.title,
      description: service.description || "",
      icon: service.icon || "",
      caseStudy: service.caseStudy || "",
      fullDescription: Array.isArray(service.fullDescription) ? service.fullDescription.join("\n") : (service.fullDescription || ""),
      benefits: Array.isArray(service.benefits) ? service.benefits.join("\n") : (service.benefits || ""),
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await apiDelete(`/cms/services/${id}`);
      setMessage({ type: "success", text: "Service deleted successfully!" });
      fetchServices();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("icon", form.icon);
    formData.append("caseStudy", form.caseStudy);

    const parsedFullDesc = [form.fullDescription];
    const parsedBenefits = form.benefits.split("\n").map(line => line.trim()).filter(Boolean);

    formData.append("fullDescription", JSON.stringify(parsedFullDesc));
    formData.append("benefits", JSON.stringify(parsedBenefits));

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await apiPut(`/cms/services/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Service updated successfully!" });
      } else {
        await apiPost("/cms/services", formData, true);
        setMessage({ type: "success", text: "Service created successfully!" });
      }

      setForm({
        id: "",
        title: "",
        description: "",
        icon: "",
        caseStudy: "",
        fullDescription: "",
        benefits: "",
      });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Services CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-100 tracking-wide">Services CMS Manager</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({
                  id: "",
                  title: "",
                  description: "",
                  icon: "",
                  caseStudy: "",
                  fullDescription: "",
                  benefits: "",
                });
                setFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer animate-pulse"
            >
              <Plus className="w-4.5 h-4.5" />
              Create Service
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
              {isEditing ? "Edit Service Canvas" : "Add Service Canvas"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. Oil Reconditioning"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Icon (Emoji or text)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. 🔄"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Short Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows="2"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition resize-none"
                    placeholder="Short summary excerpt..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Case Study
                  </label>
                  <textarea
                    value={form.caseStudy}
                    onChange={(e) => setForm({ ...form, caseStudy: e.target.value })}
                    rows="3"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition resize-none"
                    placeholder="Success study details..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                    Full Description (Rich Text Editor)
                  </label>
                  <TiptapMiniEditor
                    value={form.fullDescription}
                    onChange={(val) => setForm({ ...form, fullDescription: val })}
                    placeholder="Provide a detailed full description of the service..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Benefits List (One benefit per line)
                  </label>
                  <textarea
                    value={form.benefits}
                    onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                    rows="4"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 font-mono text-xs transition"
                    placeholder="Benefit 1...&#10;Benefit 2..."
                  />
                </div>

                <div className="md:col-span-2 border-t border-slate-900 pt-6 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Service Image (JPG, PNG, WEBP, GIF up to 100MB)
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
                  className="py-2.5 px-8 bg-emerald-50 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Publish Service"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      id: "",
                      title: "",
                      description: "",
                      icon: "",
                      caseStudy: "",
                      fullDescription: "",
                      benefits: "",
                    });
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
            <h2 className="text-lg font-black text-slate-100 mb-6 uppercase tracking-wider">Existing Services</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-slate-900 rounded-xl"></div>
                ))}
              </div>
            ) : services.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No services listed yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-black">
                    <th className="py-4 px-4">Image</th>
                    <th className="py-4 px-4">Icon</th>
                    <th className="py-4 px-4">Title</th>
                    <th className="py-4 px-4">Slug</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-slate-900/30 transition-all">
                      <td className="py-4 px-4">
                        {service.image ? (
                          <img
                            src={service.image.startsWith("http") ? service.image : `http://localhost:5001${service.image}`}
                            alt={service.title}
                            className="w-16 h-10 object-cover rounded-lg border border-slate-800"
                          />
                        ) : (
                          <span className="text-xs text-slate-500 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-2xl">{service.icon}</td>
                      <td className="py-4 px-4 font-bold text-slate-100">{service.title}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">{service.slug}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 rounded-xl transition inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
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
