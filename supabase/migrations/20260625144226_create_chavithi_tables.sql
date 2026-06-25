
CREATE TABLE IF NOT EXISTS chanda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  amount numeric(12,2) NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chanda ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_chanda" ON chanda FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_chanda" ON chanda FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_chanda" ON chanda FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_chanda" ON chanda FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount numeric(12,2) NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_expenses" ON expenses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_expenses" ON expenses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_expenses" ON expenses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_expenses" ON expenses FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_comments" ON comments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_comments" ON comments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "delete_comments" ON comments FOR DELETE TO anon, authenticated USING (true);
