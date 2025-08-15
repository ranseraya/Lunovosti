'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [status, setStatus] = useState('DRAFT');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const dummyCategories = [
      { id: 1, name: 'General' },
      { id: 2, name: 'World' },
      { id: 3, name: 'Technology' },
  ];
  const dummyAuthors = [
      { id: 1, name: 'Eleanor Vance' },
      { id: 2, name: 'Marcus Thorne' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category_id: categoryId,
          author_id: authorId,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const newArticle = await response.json();
      alert(`Article "${newArticle.title}" successfully created!`);
      router.push('/Home');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Article Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Summary (Excerpt)</label>
          <textarea
            id="excerpt"
            rows="3"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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