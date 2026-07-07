import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check, X, Plus } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    category: "",
    order: 0,
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchData = async () => {
    try {
      const [prods, cats] = await Promise.all([
        apiGet("/products"),
        apiGet("/categories"),
      ]);
      setProducts(prods.products || []);
      setCategories(cats.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Product image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "application/pdf"];
    if (!allowed.includes(selectedFile.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, GIF, and PDF formats are supported!" });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (prod) => {
    setForm({
      id: prod._id,
      name: prod.name,
      slug: prod.slug,
      description: prod.description || "",
      category: prod.category?._id || "",
      order: prod.order || 0,
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiDelete(`/products/${id}`);
      setMessage({ type: "success", text: "Product deleted successfully!" });
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    formData.append("description", form.description);
    if (form.category) {
      formData.append("category", form.category);
    }
    formData.append("order", form.order);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await apiPut(`/products/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Product updated successfully!" });
      } else {
        await apiPost("/products", formData, true);
        setMessage({ type: "success", text: "Product created successfully!" });
      }

      setForm({ id: "", name: "", slug: "", description: "", category: "", order: 0 });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Products | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-100 tracking-wide">Products Catalog</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({ id: "", name: "", slug: "", description: "", category: "", order: 0 });
                setFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer animate-pulse"
            >
              <Plus className="w-4.5 h-4.5" />
              Create Product
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
              {isEditing ? "Edit Product Details" : "Add Product Details"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. Cylindrical Roller Bearing"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Product Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. cylindrical-roller-bearing"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 focus:bg-slate-950 text-sm font-semibold transition"
                  >
                    <option value="">Select Category (Optional)</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Order Index (Sorting)
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                    Product Description
                  </label>
                  <TiptapMiniEditor
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    placeholder="Product specifications, features, etc..."
                  />
                </div>

                <div className="md:col-span-2 border-t border-slate-900 pt-6 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Product Image (JPG, PNG, WEBP, GIF, PDF up to 100MB)
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
                  {isEditing ? "Save Changes" : "Publish Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ id: "", name: "", slug: "", description: "", category: "", order: 0 });
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
            <h2 className="text-lg font-black text-slate-100 mb-6 uppercase tracking-wider">Existing Products</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-slate-900 rounded-xl"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No products in catalog yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-black">
                    <th className="py-4 px-4">Image</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Order</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-slate-900/30 transition-all">
                      <td className="py-4 px-4">
                        {prod.image ? (
                          <img
                            src={prod.image.startsWith("http") ? prod.image : `http://localhost:5001${prod.image}`}
                            alt={prod.name}
                            className="w-16 h-10 object-cover rounded-lg border border-slate-800"
                          />
                        ) : (
                          <span className="text-xs text-slate-550 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-100">
                        <div>{prod.name}</div>
                        <div className="text-xs text-slate-450 font-mono mt-0.5">{prod.slug}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {prod.category ? (
                          <span className="bg-emerald-950/40 text-emerald-450 text-[10px] px-2.5 py-1 rounded-xl border border-emerald-900/60 uppercase font-black tracking-wide">
                            {prod.category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-450">{prod.order}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(prod)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 rounded-xl transition inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod._id)}
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
