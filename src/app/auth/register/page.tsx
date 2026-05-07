'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { auth } from '@/lib/auth';
import styles from '../auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
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
      await auth.register({ name, email, password });
      // After register, auto-login or redirect to login
      await auth.login({ email, password });
      router.push('/booking');
    } catch (err: any) {
      setError(err.message || 'Falha ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Card className={`${styles.authCard} fade-in`}>
        <h1 className={styles.title}>Criar Conta</h1>
        <p className={styles.subtitle}>Junte-se à nossa comunidade de impacto.</p>
        
        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Nome Completo</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Registrar'}
          </Button>
        </form>

        <p className={styles.footer}>
          Já tem uma conta? <Link href="/auth/login" className={styles.link}>Entrar</Link>
        </p>
      </Card>
    </div>
  );
}
