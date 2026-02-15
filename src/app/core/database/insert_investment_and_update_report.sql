--DROP FUNCTION insert_investment_and_update_report(numeric, text, text);

create or replace function insert_investment_and_update_report(
  p_value numeric,
  p_reason text,
  p_account_bank text
) returns void as $$
declare
  v_open_month_id uuid;
  v_open_month_text text;
  v_target_month_text text;
  v_target_report_id uuid;
  v_user_id uuid;
begin
  -- 1. Obter o ID do usuário logado
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  -- 2. Localizar o mês atual (open)
  select id, month into v_open_month_id, v_open_month_text
  from finance_reports
  where state = 'open'
  limit 1;

  if v_open_month_id is null then
    raise exception 'Não existe relatório com estado "open".';
  end if;

  -- 3. Calcular o mês anterior (MM/YYYY)
  v_target_month_text := to_char(to_date(v_open_month_text, 'MM/YYYY') - interval '1 month', 'MM/YYYY');

  -- 4. Buscar o relatório do mês anterior
  select id into v_target_report_id
  from finance_reports
  where month = v_target_month_text
  limit 1;

  if v_target_report_id is null then
    raise exception 'Relatório do mês anterior (%) não encontrado.', v_target_month_text;
  end if;

  -- 5. Inserir o registro na finance_investments
  insert into finance_investments (
    value,
    reason,
    user_id,
    account_bank,
    month,
    created_at,
    updated_at
  )
  values (
    p_value,
    p_reason,
    v_user_id,
    p_account_bank,
    v_target_month_text,
    now(),
    now()
  );

  -- 6. Atualizar o balance do MÊS ANTERIOR
  update finance_reports
  set
    balance = balance - p_value,
    updated_at = now()
  where id = v_target_report_id;

  -- 7. Atualizar o balance do MÊS ATUAL (Open)
  -- Mantendo a integridade do saldo acumulado
  update finance_reports
  set
    balance = balance - p_value,
    updated_at = now()
  where id = v_open_month_id;

end;
$$ language plpgsql security definer;
