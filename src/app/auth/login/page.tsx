'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { auth } from '@/lib/auth';
import styles from '../auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await auth.login({ email, password });
      router.push('/booking');
    } catch (err: any) {
      setError(err.message || 'Falha ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Card className={`${styles.authCard} fade-in`}>
        <h1 className={styles.title}>Bem-vindo</h1>
        <p className={styles.subtitle}>Entre para gerenciar suas reservas de impacto.</p>
        
        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className={styles.footer}>
          Não tem uma conta? <Link href="/auth/register" className={styles.link}>Criar conta</Link>
        </p>
      </Card>
    </div>
  );
}
