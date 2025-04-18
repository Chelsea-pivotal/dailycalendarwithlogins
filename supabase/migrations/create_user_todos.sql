/*
  # Create user_todos table

  1. New Tables
    - `user_todos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `text` (text, not null)
      - `completed` (boolean, default false)
      - `category` (text, not null)
      - `priority` (text, not null)
      - `created_at` (timestamptz, default now())
      - `scheduled_date` (date)
      - `scheduled_time` (time)
      - `start_time` (time)
      - `end_time` (time)
  2. Security
    - Enable RLS on `user_todos` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to update their own data
    - Add policy for authenticated users to delete their own data
*/

CREATE TABLE IF NOT EXISTS user_todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  text text NOT NULL,
  completed boolean DEFAULT false,
  category text NOT NULL,
  priority text NOT NULL,
  created_at timestamptz DEFAULT now(),
  scheduled_date date,
  scheduled_time time,
  start_time time,
  end_time time
);

ALTER TABLE user_todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own todos"
  ON user_todos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own todos"
  ON user_todos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own todos"
  ON user_todos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own todos"
  ON user_todos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
