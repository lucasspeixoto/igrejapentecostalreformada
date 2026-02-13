--DROP FUNCTION get_monthly_totals(integer, text)

create or replace function get_monthly_totals(target_year int, target_type text)
returns table (
  category_id uuid,
  category_name text,
  month int,
  total numeric,
  type text -- Mantemos text no retorno para facilitar o front-end
)
language plpgsql
as $$
begin
  return query
  select
    fc.id as category_id,
    fc.name as category_name,
    extract(month from fn.date)::int as month,
    sum(fn.value)::numeric as total,
    fc.type::text -- Convertemos o enum para text aqui
  from
    finance_notes fn
  join
    finance_categories fc on fn.category_id = fc.id
  where
    extract(year from fn.date) = target_year
    and (
      target_type = 'A'
      or fc.type::text = target_type -- Comparamos como texto para evitar erro de cast
    )
  group by
    fc.id,
    fc.name,
    fc.type,
    extract(month from fn.date)
  order by
    month asc,
    total desc;
end;
$$;
