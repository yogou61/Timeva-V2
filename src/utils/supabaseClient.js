import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmtlnmjsvgbovpharzvk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdGxubWpzdmdib3ZwaGFyenZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjM4ODksImV4cCI6MjA2Mzk5OTg4OX0.Q0c7pmAU40w5pU94lvTUxf4wHxMcvtiZfixDUpqVsI0'; // Mets ici ta clé "anon public" de Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);