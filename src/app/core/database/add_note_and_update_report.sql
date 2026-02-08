create or replace function add_note_and_update_report(
  p_date date,
  p_user_id uuid,
  p_description text,
  p_category_id uuid,
  p_member_id bigint,
  p_type "Finance Note Type",
  p_value numeric
) returns json as $$
declare
  v_report_id uuid;
  v_new_note_id uuid;
begin
  -- 1. Localizar o relatório aberto ('open')
  select id into v_report_id
  from finance_reports
  where state = 'open'
  limit 1;

  -- Se não existir relatório aberto, lança um erro e aborta tudo
  if v_report_id is null then
    raise exception 'Não existe mês aberto com estado "open".';
  end if;

  -- 2. Inserir a nova nota (finance_notes)
  insert into finance_notes (description, value, type, date, category_id, user_id, member_id, created_at)
  values (p_description, p_value, p_type, p_date, p_category_id, p_user_id, p_member_id, now())
  returning id into v_new_note_id;

  -- 3. Atualizar o relatório (finance_reports)
  -- Lógica:
  -- Se for 'C' (Crédito): Soma no inputs, Soma no month_balance, Soma no balance total
  -- Se for 'D' (Débito): Soma no outputs, Subtrai no month_balance, Subtrai no balance total

  if p_type = 'C' then
    update finance_reports
    set
      inputs = inputs + p_value,
      month_balance = month_balance + p_value,
      balance = balance + p_value
    where id = v_report_id;

  elsif p_type = 'D' then
    update finance_reports
    set
      outputs = outputs + p_value,
      month_balance = month_balance - p_value,
      balance = balance - p_value
    where id = v_report_id;

  else
    raise exception 'Tipo de nota inválido. Use C ou D.';
  end if;

  -- Retorna sucesso
  return json_build_object('success', true, 'note_id', v_new_note_id);

exception when others then
  -- O Rollback é automático no Postgres quando ocorre uma exception,
  -- mas aqui podemos relançar o erro para o Angular pegar.
  raise exception 'Erro ao processar nota: %', SQLERRM;
end;
$$ language plpgsql;
