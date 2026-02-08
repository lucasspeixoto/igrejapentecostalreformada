create or replace function edit_note_and_update_report(
  p_note_id uuid,
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
  v_old_value numeric;
  v_old_type "Finance Note Type";

  -- Variáveis para calcular o ajuste líquido no relatório
  v_delta_input numeric := 0;
  v_delta_output numeric := 0;
  v_delta_balance numeric := 0;
begin
  -- 1. Buscar os dados ANTIGOS da nota (antes de editar)
  select value, type into v_old_value, v_old_type
  from finance_notes
  where id = p_note_id;

  if v_old_value is null then
    raise exception 'Nota financeira não encontrada.';
  end if;

  -- 2. Localizar o relatório ABERTO
  select id into v_report_id
  from finance_reports
  where state = 'open'
  limit 1;

  if v_report_id is null then
    raise exception 'Não existe um mês aberto para atualizar.';
  end if;

  -- 3. Lógica de ESTORNO (Desfazer o efeito da nota antiga)
  if v_old_type = 'C' then
    -- Se era crédito, removemos do input e do saldo
    v_delta_input := v_delta_input - v_old_value;
    v_delta_balance := v_delta_balance - v_old_value;
  elsif v_old_type = 'D' then
    -- Se era débito, removemos do output e DEVOLVEMOS ao saldo (soma)
    v_delta_output := v_delta_output - v_old_value;
    v_delta_balance := v_delta_balance + v_old_value;
  end if;

  -- 4. Lógica de APLICAÇÃO (Somar o efeito da nova nota)
  if p_type = 'C' then
    -- Novo crédito: soma no input e no saldo
    v_delta_input := v_delta_input + p_value;
    v_delta_balance := v_delta_balance + p_value;
  elsif p_type = 'D' then
    -- Novo débito: soma no output e subtrai do saldo
    v_delta_output := v_delta_output + p_value;
    v_delta_balance := v_delta_balance - p_value;
  else
    raise exception 'Tipo de transação inválido. Use C ou D.';
  end if;

  -- 5. Atualizar o Relatório (Finance Reports) com os deltas calculados
  update finance_reports
  set
    inputs = inputs + v_delta_input,
    outputs = outputs + v_delta_output,
    month_balance = month_balance + v_delta_balance,
    balance = balance + v_delta_balance
  where id = v_report_id;

  -- 6. Atualizar a Nota (Finance Notes) com os novos dados
  update finance_notes
  set
    description = p_description,
    value = p_value,
    type = p_type,
    date = p_date,
    user_id = p_user_id,
    category_id = p_category_id,
    member_id = p_member_id,
    updated_at = now()
  where id = p_note_id;

  return json_build_object('success', true);

exception when others then
  raise exception 'Erro ao editar transação: %', SQLERRM;
end;
$$ language plpgsql;
