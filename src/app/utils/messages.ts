import type { PostgrestError } from '@supabase/supabase-js';

export const messages: Record<string, string> = {
  '400': 'E-mail ou senha incorretos!',
  '23505': 'Já existe um registro com estes dados (duplicidade).',
  '23503': 'Operação não permitida pois este dado está vinculado a outros registros.',
  '23502': 'Um ou mais campos obrigatórios não foram preenchidos corretamente.',
  'PGRST116': 'O registro solicitado não foi encontrado.',
  'PGRST000': 'Erro de conexão com o banco de dados. Verifique sua internet.',
};

/**
 * Retorna uma mensagem amigável baseada no erro do Supabase.
 * @param error O erro retornado pelo Supabase (PostgrestError).
 * @returns Uma string com a mensagem traduzida ou a mensagem original se não houver tradução.
 */
export function getSupabaseErrorMessage(error: PostgrestError | null | undefined): string {
  if (!error) return 'Ocorreu um erro inesperado.';

  // P0001 é o código genérico para exceções levantadas via RAISE EXCEPTION no Postgres
  if (error.code === 'P0001') {
    return error.message;
  }

  return messages[error.code] || error.message || 'Erro ao processar a operação.';
}
