create or replace function delete_note_and_update_report(
  p_note_id uuid
) returns json as $$
declare
  v_report_id uuid;
  v_old_value numeric;
  v_old_type text;
begin
  -- 1. Buscar dados da nota ANTES de deletar para saber quanto estornar
  select value, type into v_old_value, v_old_type
  from finance_notes
  where id = p_note_id;

  if v_old_value is null then
    raise exception 'Nota financeira não encontrada ou já deletada.';
  end if;

  -- 2. Localizar o relatório aberto
  select id into v_report_id
  from finance_reports
  where state = 'open'
  limit 1;

  if v_report_id is null then
    raise exception 'Não existe mês aberto para atualizar.';
  end if;

  -- 3. Atualizar o Relatório (Estorno)
  if v_old_type = 'C' then
    -- Estornar Crédito: Remove dos ganhos e reduz o saldo
    update finance_reports
    set
      inputs = inputs - v_old_value,
      month_balance = month_balance - v_old_value,
      balance = balance - v_old_value
    where id = v_report_id;

  elsif v_old_type = 'D' then
    -- Estornar Débito: Remove dos gastos e DEVOLVE o valor ao saldo
    update finance_reports
    set
      outputs = outputs - v_old_value,
      month_balance = month_balance + v_old_value,
      balance = balance + v_old_value
    where id = v_report_id;
  end if;

  -- 4. Deletar a nota permanentemente
  delete from finance_notes
  where id = p_note_id;

  return json_build_object('success', true);

exception when others then
  raise exception 'Erro ao deletar transação: %', SQLERRM;
end;
$$ language plpgsql;
