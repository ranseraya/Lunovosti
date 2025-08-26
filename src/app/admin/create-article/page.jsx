'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TiptapEditor from '@/components/TiptapEditor';

export default function CreateArticlePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [status, setStatus] = useState('draft');

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 const dummyCategories = [
      { id: 1, name: 'General' },
      { id: 2, name: 'World' },
      { id: 3, name: 'Technology' },
  ];
  const dummyAuthors = [
      { id: 1, name: 'Eleanor Vance' },
      { id: 2, name: 'Marcus Thorne' },
  ];

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/admin/form-data');
        if (!response.ok) throw new Error('Failed to load form data');
        const data = await response.json();
        setAuthors(data.authors);
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFormData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category_id: parseInt(categoryId),
          author_id: parseInt(authorId),
          status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create article');
      }

      const newArticle = await response.json();
      alert(`Article "${newArticle.title}" successfully created!`);
      router.push('/admin/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const userRole = session?.user?.role?.toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Article Title</label>
          <input
            type="text" id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Summary (Excerpt)</label>
          <textarea
            id="excerpt" rows="3" value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <TiptapEditor
            content={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="shadow border rounded w-full py-2 px-3">
                <option value="">Pilih Kategori</option>
                {dummyCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
            <select id="author" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required className="shadow border rounded w-full py-2 px-3">
                <option value="">Pilih Penulis</option>
                {dummyAuthors.map(auth => <option key={auth.id} value={auth.id}>{auth.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="shadow border rounded w-full py-2 px-3">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
      </form>
    </div>
  );
}