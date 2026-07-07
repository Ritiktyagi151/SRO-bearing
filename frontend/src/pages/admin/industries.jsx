import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";

export default function AdminIndustries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    icon: "",
    features: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditing, setIsEditing] = useState(false);

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

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    description: "",
    icon: "",
    features: "",
  });
  const [editFile, setEditFile] = useState(null);
  const [editMessage, setEditMessage] = useState({ type: "", text: "" });

  const handleEditFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setEditMessage({ type: "error", text: "Industry image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(selectedFile.type)) {
      setEditMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setEditFile(selectedFile);
    setEditMessage({ type: "", text: "" });
  };

  const handleEdit = (ind) => {
    setEditForm({
      id: ind._id,
      name: ind.name,
      description: ind.description || "",
      icon: ind.icon || "",
      features: Array.isArray(ind.features) ? ind.features.join("\n") : (ind.features || ""),
    });
    setEditFile(null);
    setEditMessage({ type: "", text: "" });
    setShowEditModal(true);
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
      await apiPost("/cms/industries", formData, true);
      setMessage({ type: "success", text: "Industry created successfully!" });

      setForm({ id: "", name: "", description: "", icon: "", features: "" });
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = null;
      fetchIndustries();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("icon", editForm.icon);

    const parsedFeatures = editForm.features.split("\n").map(line => line.trim()).filter(Boolean);
    formData.append("features", JSON.stringify(parsedFeatures));

    if (editFile) {
      formData.append("image", editFile);
    }

    try {
      await apiPut(`/cms/industries/${editForm.id}`, formData, true);
      setMessage({ type: "success", text: "Industry updated successfully!" });
      setShowEditModal(false);
      fetchIndustries();
    } catch (err) {
      setEditMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Industries CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <h1 className="text-3xl font-bold text-gray-900">Industries CMS Manager</h1>

        {message.text && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
              message.type === "success"
                ? "bg-green-500/15 border-emerald-500/20 text-green-700"
                : "bg-red-500/15 border-red-500/20 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 h-fit shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-green-700" />
              Add Industry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="e.g. Steel Industry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  required
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="e.g. 🔥"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="3"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="Sector brief..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features / Specifications (One item per line)
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  rows="4"
                  className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-mono text-xs"
                  placeholder="Feature 1...&#10;Feature 2..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry Image Banner (JPG, PNG, WEBP, GIF up to 100MB)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-green-50 hover:bg-green-700 text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
                >
                  Create Industry
                </button>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Existing Industries</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-white rounded-lg"></div>
                ))}
              </div>
            ) : industries.length === 0 ? (
              <p className="text-gray-500 text-sm">No sectors listed yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                    <th className="py-3 px-4">Icon</th>
                    <th className="py-3 px-4">Sector Name</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {industries.map((ind) => (
                    <tr key={ind._id} className="hover:bg-white/30 transition-all">
                      <td className="py-4 px-4 text-2xl">{ind.icon}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{ind.name}</td>
                      <td className="py-4 px-4 text-gray-650">{ind.slug}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(ind)}
                          className="p-2 bg-white border border-gray-200 text-gray-700 hover:text-green-700 hover:border-emerald-500/20 rounded-md transition-all inline-flex"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ind._id)}
                          className="p-2 bg-white border border-gray-200 text-slate-355 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex"
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
        </div>
      </div>

      {/* Edit Industry Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-gray-900">Edit Industry Canvas</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold transition-all"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {editMessage.text && (
                <div
                  className={`p-3.5 rounded-lg flex items-start gap-2 border text-xs ${
                    editMessage.type === "success"
                      ? "bg-green-500/15 border-emerald-500/20 text-green-700"
                      : "bg-red-500/15 border-red-500/20 text-red-400"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{editMessage.text}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700">Industry Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Icon (Emoji)</label>
                <input
                  type="text"
                  required
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows="3"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Features / Specifications (One item per line)</label>
                <textarea
                  value={editForm.features}
                  onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                  rows="4"
                  className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Update Image Banner (JPG, PNG, WEBP, GIF up to 100MB)
                </label>
                <input
                  type="file"
                  onChange={handleEditFileChange}
                  className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-gray-150 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-205 text-gray-800 font-bold rounded-lg text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-green-50 hover:bg-green-700 text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
