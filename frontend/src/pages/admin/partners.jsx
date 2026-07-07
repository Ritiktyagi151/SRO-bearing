import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, Check, AlertCircle, Plus, Trash2, Edit2, Users } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminPartners() {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Modal / Form state for client item
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
    const clientsList = partnerData.clients.filter((_, i) => i !== idx);
    setPartnerData({
      ...partnerData,
      clients: clientsList,
    });
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/cms/partners", partnerData);
      setPartnerData(data.partner);
      setMessage({ type: "success", text: "Partnership CMS updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-40 bg-white rounded-xl"></div>
          <div className="h-40 bg-white rounded-xl"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Partners CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans text-gray-800">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-8 h-8 text-green-700" />
              Partners & Clients CMS
            </h1>
            <p className="text-sm text-gray-650 mt-1">
              Manage client logos, statistics metrics, and introduction paragraphs dynamically.
            </p>
          </div>
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 py-2.5 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-700"
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
          {/* Left Columns - Text Content Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-150 pb-3">
                1. Text Headers & Paragraphs
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Badge Title
                  </label>
                  <input
                    type="text"
                    value={partnerData.badge || ""}
                    onChange={(e) => handleTextChange("badge", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={partnerData.title || ""}
                    onChange={(e) => handleTextChange("title", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Intro Description
                </label>
                <textarea
                  value={partnerData.description || ""}
                  onChange={(e) => handleTextChange("description", e.target.value)}
                  rows="3"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-150 pb-3">
                2. Statistical Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Happy Clients (E.g. 12+)
                  </label>
                  <input
                    type="text"
                    value={partnerData.happyClientsCount || ""}
                    onChange={(e) => handleTextChange("happyClientsCount", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Satisfaction Rate (E.g. 98%)
                  </label>
                  <input
                    type="text"
                    value={partnerData.satisfactionRate || ""}
                    onChange={(e) => handleTextChange("satisfactionRate", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Average Rating
                  </label>
                  <input
                    type="text"
                    value={partnerData.averageRating || ""}
                    onChange={(e) => handleTextChange("averageRating", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Managing Clients List */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-gray-150 pb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  3. Clients list
                </h2>
                <button
                  type="button"
                  onClick={handleOpenAddClient}
                  className="flex items-center gap-1 py-1 px-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Client
                </button>
              </div>

              {/* Client items grid */}
              {(!partnerData.clients || partnerData.clients.length === 0) ? (
                <p className="text-gray-500 text-sm italic">No client logos added yet.</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {partnerData.clients.map((client, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-sm shadow-sm">
                          {client.image ? (
                            <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="w-full h-full bg-green-700 text-white flex items-center justify-center">{client.logo}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{client.color}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditClient(idx, client)}
                          className="p-1.5 bg-white border border-gray-200 text-gray-600 hover:text-green-700 rounded-md transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveClient(idx)}
                          className="p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-700 rounded-md transition"
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
        </div>
      </div>

      {/* ADD / EDIT CLIENT MODAL DIALOG */}
      {showClientForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-200 text-gray-800">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isEditingClient ? "Edit Client Item" : "Add Client Partner"}
            </h3>

            <form onSubmit={handleSaveClientItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="E.g. TechCorp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Initials (Optional fallback, 2 letters max)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={clientForm.logo}
                  onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                  placeholder="E.g. TC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Image (JPEG/PNG/WEBP, under 1MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-150 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
                {clientForm.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <img src={clientForm.image} alt="Preview" className="w-12 h-12 object-contain border border-gray-200 rounded-lg p-1 bg-white" />
                    <button
                      type="button"
                      onClick={() => setClientForm({ ...clientForm, image: "" })}
                      className="text-xs text-red-650 hover:underline cursor-pointer"
                    >
                      Remove Logo Image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visual Color Class (Tailwind gradient)
                </label>
                <input
                  type="text"
                  value={clientForm.color}
                  onChange={(e) => setClientForm({ ...clientForm, color: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                  placeholder="E.g. from-gray-500 to-gray-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm transition"
                >
                  Save Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientForm(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
