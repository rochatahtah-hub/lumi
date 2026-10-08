-- Tabela para armazenar push subscriptions
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  auth_key text not null,
  p256dh_key text not null,
  user_id uuid,
  device_id text not null unique,
  status text default 'active' check (status in ('active', 'inactive', 'revoked')),
  notification_enabled boolean default true,
  preferred_hour integer check (preferred_hour >= 0 and preferred_hour < 24),
  preferred_minute integer default 0 check (preferred_minute >= 0 and preferred_minute < 60),
  last_notification_at timestamp,
  authorized_at timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Índices para performance
create index if not exists idx_push_subscriptions_user_id on push_subscriptions(user_id);
create index if not exists idx_push_subscriptions_device_id on push_subscriptions(device_id);
create index if not exists idx_push_subscriptions_status on push_subscriptions(status);
create index if not exists idx_push_subscriptions_enabled on push_subscriptions(notification_enabled);

-- Função para atualizar updated_at automaticamente
create or replace function update_push_subscriptions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para updated_at
drop trigger if exists update_push_subscriptions_timestamp on push_subscriptions;
create trigger update_push_subscriptions_timestamp
  before update on push_subscriptions
  for each row
  execute function update_push_subscriptions_updated_at();

-- Tabela para histórico de notificações enviadas
create table if not exists notification_log (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references push_subscriptions(id) on delete cascade,
  message text not null,
  title text not null,
  sent_at timestamp default now(),
  delivered boolean default false,
  clicked boolean default false,
  clicked_at timestamp
);

create index if not exists idx_notification_log_subscription on notification_log(subscription_id);
create index if not exists idx_notification_log_sent_at on notification_log(sent_at);

-- ===== ROW LEVEL SECURITY (RLS) =====

-- Habilitar RLS
alter table push_subscriptions enable row level security;
alter table notification_log enable row level security;

-- Política pública para INSERT (qualquer um pode se inscrever)
create policy "anyone_can_insert_push_subscription"
  on push_subscriptions for insert
  with check (true);

-- Política para SELECT (ver próprias subscriptions)
create policy "users_can_view_own_subscriptions"
  on push_subscriptions for select
  using (
    auth.uid() = user_id
    or user_id is null  -- não autenticados também podem ver (por device_id)
  );

-- Política para UPDATE (atualizar próprias subscriptions)
create policy "users_can_update_own_subscriptions"
  on push_subscriptions for update
  using (
    auth.uid() = user_id
    or user_id is null
  );

-- Política pública para notification_log (para logging)
create policy "system_can_log_notifications"
  on notification_log for insert
  with check (true);

create policy "users_can_view_own_notifications"
  on notification_log for select
  using (
    exists (
      select 1 from push_subscriptions
      where push_subscriptions.id = notification_log.subscription_id
      and (
        auth.uid() = push_subscriptions.user_id
        or push_subscriptions.user_id is null
      )
    )
  );
