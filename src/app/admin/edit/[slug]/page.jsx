'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TiptapEditor from '@/components/TiptapEditor';

export default function EditArticlePage({ params }) {
  const { slug } = params;
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`/api/articles/${slug}`);
          if (!response.ok) throw new Error('Article not found');
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchArticle();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
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
      if (!response.ok) throw new Error('Failed to update article');
      alert('Successfully updated article!');
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const userRole = session?.user?.role?.toUpperCase();

  if (!formData) return <p>Loading Article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Modify Article</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">

        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Article Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" required />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Summary</label>
          <textarea name="excerpt" rows="3" value={formData.excerpt || ''} onChange={handleChange} className="shadow border rounded w-full py-2 px-3"></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          {formData.content !== null && typeof formData.content !== 'undefined' && (
            <TiptapEditor
              content={formData.content}
              onChange={handleContentChange}
            />
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
          <select 
            name="status" value={formData.status} onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3"
            disabled={userRole !== 'ADMIN' && userRole !== 'EDITOR'}
          >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
          {isLoading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
    </div>
  );
}