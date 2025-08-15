'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditArticlePage({ params }) {
  const { slug } = params;
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      async function fetchArticle() {
        try {
          const response = await fetch(`/api/articles/${slug}`);
          if (!response.ok) throw new Error('Artikel tidak ditemukan');
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError(err.message);
        }
      }
      fetchArticle();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to Modify Article');
      alert('Successfully to update article!');
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData && !error) return <p>Load Article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Modify Article</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Article Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" required />
        </div>
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Summary</label>
          <textarea name="excerpt" rows="3" value={formData.excerpt} onChange={handleChange} className="shadow border rounded w-full py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea name="content" rows="10" value={formData.content} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" required></textarea>
        </div>
        {/* Status */}
         <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="shadow border rounded w-full py-2 px-3">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>
        </div>
        <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
          {isLoading ? 'Menyimpan...' : 'Perbarui Artikel'}
        </button>
      </form>
    </div>
  );
}