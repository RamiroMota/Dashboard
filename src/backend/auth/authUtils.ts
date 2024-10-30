// src/backend/authUtils.js
import   supabase   from '../utils/supabase';
import { useStore } from '../../components/store/useStore';

async function signInWithEmail (email: string, password: string) {
  try {
    // Autenticar con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Si la autenticación es exitosa, guarda los datos del usuario en el estado global
    const setUser = useStore.getState().setUser;
    setUser({
      name: data.user.user_metadata.full_name || 'Usuario',
      email: data.user.email ?? '',
      role: data.user.user_metadata.role || 'Usuario',
    });

    return { success: true };
  } catch (error: unknown) {
    const errorAsError = error as Error;
    console.error('Error al iniciar sesión:', errorAsError.message);
    return { success: false, message: errorAsError.message };
  }
}

export default signInWithEmail;