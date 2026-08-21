/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const CUSTOM_REMEMBER_ME_KEY = 'skillsync_remember_me';

const safeGet = (storage: Storage, key: string): string | null => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (storage: Storage, key: string, value: string): void => {
  try {
    storage.setItem(key, value);
  } catch {}
};

const safeRemove = (storage: Storage, key: string): void => {
  try {
    storage.removeItem(key);
  } catch {}
};

// Custom storage provider to dynamically switch between localStorage and sessionStorage
const customStorage: any = {
  getItem(key: string): string | null {
    const localVal = safeGet(localStorage, key);
    if (localVal !== null) return localVal;
    return safeGet(sessionStorage, key);
  },
  setItem(key: string, value: string): void {
    const rememberMe = safeGet(localStorage, CUSTOM_REMEMBER_ME_KEY) === 'true';
    if (rememberMe) {
      safeSet(localStorage, key, value);
      safeRemove(sessionStorage, key);
    } else {
      safeSet(sessionStorage, key, value);
      safeRemove(localStorage, key);
    }
  },
  removeItem(key: string): void {
    safeRemove(localStorage, key);
    safeRemove(sessionStorage, key);
  }
};

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://jzwqbcwxdevdgxuyitep.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_f_BaMmoQtnxduvVgc4pN5w_z8byScky';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper to configure persistence preference
export const setRememberMe = (remember: boolean) => {
  safeSet(localStorage, CUSTOM_REMEMBER_ME_KEY, remember ? 'true' : 'false');
};

// Helper to get current remember-me preference
export const getRememberMe = (): boolean => {
  return safeGet(localStorage, CUSTOM_REMEMBER_ME_KEY) === 'true';
};
