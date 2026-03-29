// Storage utility - replaces window.storage from Claude Artifact
// - shared=false  →  localStorage (persönliche Daten, z.B. Lehrername)
// - shared=true   →  Supabase (geteilte Daten, z.B. Koordinationsdaten)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates',
});

export const storage = {
  async get(key, shared = false) {
    try {
      if (!shared) {
        const val = localStorage.getItem(key);
        return val ? { key, value: val, shared: false } : null;
      }
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/abu_storage?key=eq.${encodeURIComponent(key)}&select=key,value`,
        { headers: headers() }
      );
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return null;
      return { key, value: data[0].value, shared: true };
    } catch (e) {
      console.error('storage.get error:', e);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      if (!shared) {
        localStorage.setItem(key, value);
        return { key, value, shared: false };
      }
      await fetch(`${SUPABASE_URL}/rest/v1/abu_storage`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
      });
      return { key, value, shared: true };
    } catch (e) {
      console.error('storage.set error:', e);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      if (!shared) {
        localStorage.removeItem(key);
        return { key, deleted: true, shared: false };
      }
      await fetch(
        `${SUPABASE_URL}/rest/v1/abu_storage?key=eq.${encodeURIComponent(key)}`,
        { method: 'DELETE', headers: headers() }
      );
      return { key, deleted: true, shared: true };
    } catch (e) {
      console.error('storage.delete error:', e);
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    try {
      if (!shared) {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
        return { keys, shared: false };
      }
      const filter = prefix
        ? `?key=like.${encodeURIComponent(prefix + '%')}&select=key`
        : '?select=key';
      const res = await fetch(`${SUPABASE_URL}/rest/v1/abu_storage${filter}`, {
        headers: headers(),
      });
      const data = await res.json();
      return { keys: (data || []).map(r => r.key), shared: true };
    } catch (e) {
      console.error('storage.list error:', e);
      return { keys: [], shared };
    }
  },
};
