import { useEffect, useState } from "react";
import Head from "next/head";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";
import AdminLayout from "@/components/AdminLayout";
import { BookOpen, Plus, Trash2, Edit2, AlertCircle, Check, X } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    category: "Maintenance",
    readTime: "5 min read",
    date: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchBlogs = async () => {
    try {
      const data = await apiGet("/blogs");
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Blog image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setImageFile(file);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (blog) => {
    setForm({
      id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Maintenance",
      readTime: blog.readTime || "5 min read",
      date: blog.date ? new Date(blog.date).toISOString().substring(0, 10) : "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
      canonicalUrl: blog.canonicalUrl || "",
    });
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await apiDelete(`/blogs/${id}`);
      setMessage({ type: "success", text: "Blog post deleted successfully!" });
      fetchBlogs();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("readTime", form.readTime);
    formData.append("date", form.date);
    formData.append("metaTitle", form.metaTitle);
    formData.append("metaDescription", form.metaDescription);
    formData.append("metaKeywords", form.metaKeywords);
    formData.append("canonicalUrl", form.canonicalUrl);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEditing) {
        await apiPut(`/blogs/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Blog updated successfully!" });
      } else {
        await apiPost("/blogs", formData, true);
        setMessage({ type: "success", text: "Blog published successfully!" });
      }

      // Reset
      setForm({
        id: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Maintenance",
        readTime: "5 min read",
        date: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        canonicalUrl: "",
      });
      setImageFile(null);
      setShowForm(false);
      setIsEditing(false);
      fetchBlogs();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Blogs | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-100 tracking-wide">Blog Management</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({
                  id: "",
                  title: "",
                  excerpt: "",
                  content: "",
                  category: "Maintenance",
                  readTime: "5 min read",
                  date: "",
                  metaTitle: "",
                  metaDescription: "",
                  metaKeywords: "",
                  canonicalUrl: "",
                });
                setImageFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all animate-pulse cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" />
              Write New Blog
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
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2.5 bg-slate-900 hover:bg-slate-855 text-slate-400 hover:text-slate-100 rounded-xl border border-slate-800 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-black text-slate-100 mb-8 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              {isEditing ? "Edit Blog Post" : "Write Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. 5 Maintenance Tips"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. Maintenance, Guide"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                    placeholder="e.g. 5 min read"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 text-sm font-semibold transition"
                  />
                </div>

                <div className="md:col-span-2 border-t border-slate-900 pt-6 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">
                    Image (JPG, PNG, WEBP, GIF up to 100MB)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1.5 block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-slate-800 file:text-xs file:font-bold file:bg-slate-900 file:text-slate-300 hover:file:bg-slate-850 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-1">
                  Excerpt / Brief Summary
                </label>
                <textarea
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows="2"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition resize-none"
                  placeholder="Provide a short summary that will appear on index cards..."
                />
              </div>

              {/* Rich Text Editor */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider mb-2">
                  Content Description (Rich Text Editor)
                </label>
                <TiptapMiniEditor
                  value={form.content}
                  onChange={(val) => setForm({ ...form, content: val })}
                  placeholder="Write your main article description here..."
                  editorClass="min-h-[500px] max-h-[800px]"
                />
              </div>

              {/* SEO Configurations */}
              <div className="border-t border-slate-900 pt-6 space-y-4">
                <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">SEO & Metadata Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Meta Title</label>
                    <input
                      type="text"
                      value={form.metaTitle}
                      onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                      placeholder="Title tag for search engines"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Canonical URL</label>
                    <input
                      type="text"
                      value={form.canonicalUrl}
                      onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                      placeholder="e.g. https://www.srobearings.com/blogs/..."
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Meta Description</label>
                    <textarea
                      value={form.metaDescription}
                      onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      rows="2"
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition resize-none"
                      placeholder="Short description for search result snippet"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Meta Keywords</label>
                    <input
                      type="text"
                      value={form.metaKeywords}
                      onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500 text-sm font-semibold transition"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Publish Article"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      id: "",
                      title: "",
                      excerpt: "",
                      content: "",
                      category: "Maintenance",
                      readTime: "5 min read",
                      date: "",
                      metaTitle: "",
                      metaDescription: "",
                      metaKeywords: "",
                      canonicalUrl: "",
                    });
                    setImageFile(null);
                    setIsEditing(false);
                    setShowForm(false);
                  }}
                  className="py-2.5 px-8 bg-slate-900 hover:bg-slate-855 text-slate-300 border border-slate-800 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl overflow-x-auto animate-fadeIn">
            <h2 className="text-lg font-black text-slate-100 mb-6 uppercase tracking-wider">Existing Blogs</h2>
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-slate-900 rounded-xl"></div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No blog posts available.</p>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-black">
                    <th className="py-4 px-4">Image</th>
                    <th className="py-4 px-4">Title</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-slate-900/30 transition-all">
                      <td className="py-4 px-4">
                        {blog.image ? (
                          <img
                            src={blog.image.startsWith("http") ? blog.image : `http://localhost:5001${blog.image}`}
                            alt={blog.title}
                            className="w-16 h-10 object-cover rounded-lg border border-slate-800"
                          />
                        ) : (
                          <span className="text-xs text-slate-500 italic">No image</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-100">
                        <div>{blog.title}</div>
                        <div className="text-xs text-slate-450 font-mono mt-0.5">{blog.slug}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        <span className="bg-emerald-950/40 text-emerald-450 text-[10px] px-2.5 py-1 rounded-xl border border-emerald-900/60 uppercase font-black tracking-wide">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-450">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 rounded-xl transition inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
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
