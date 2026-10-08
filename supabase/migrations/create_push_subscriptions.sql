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
