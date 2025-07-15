export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '')       // Hapus semua karakter non-kata kecuali -
    .replace(/\-\-+/g, '-');        // Ganti -- ganda dengan satu -
};