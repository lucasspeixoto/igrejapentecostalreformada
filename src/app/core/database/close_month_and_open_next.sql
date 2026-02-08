create or replace function close_month_and_open_next()
returns json as $$
declare
  v_old_report record;
  v_next_month_date date;
  v_next_month_str text;
begin
  -- 1. Localizar o relatório que está 'open'
  select * into v_old_report
  from finance_reports
  where state = 'open'
  limit 1;

  if v_old_report.id is null then
    raise exception 'Não existe um relatório aberto para fechar.';
  end if;

  -- 2. Marcar o mês atual como 'closed'
  update finance_reports
  set
    state = 'closed',
    updated_at = now()
  where id = v_old_report.id;

  -- 3. Calcular a string do próximo mês (Ex: de '02/2026' para '03/2026')
  -- Convertemos a string MM/YYYY para data, somamos 1 mês e formatamos de volta
  v_next_month_date := (to_date(v_old_report.month, 'MM/YYYY') + interval '1 month')::date;
  v_next_month_str := to_char(v_next_month_date, 'MM/YYYY');

  -- 4. Criar o novo registro para o mês seguinte
  insert into finance_reports (
    month,           -- Formato MM/YYYY
    month_balance,   -- Saldo do mês inicia em 0
    balance,         -- Saldo acumulado herda o valor total do anterior
    state,           -- Inicia como open
    inputs,          -- Inicia em 0
    outputs,         -- Inicia em 0
    created_at
  )
  values (
    v_next_month_str,
    0,
    v_old_report.balance,
    'open',
    0,
    0,
    now()
  );

  return json_build_object(
    'success', true,
    'closed', v_old_report.month,
    'opened', v_next_month_str,
    'carried_balance', v_old_report.balance
  );

exception when others then
  raise exception 'Erro ao processar fechamento: %', SQLERRM;
end;
$$ language plpgsql;
