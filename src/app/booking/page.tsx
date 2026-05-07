'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import styles from "./booking.module.css";
import { useRouter } from "next/navigation";


export default function BookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    usageType: 'course',
    eventTitle: '',
    eventDescription: '',
    contributionType: 'donation',
    contributionSubtype: '',
    contributionQuantity: 1,
    contributionUnit: 'unidades',
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await apiFetch('/impact/categories');
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.eventDescription.length < 10) {
      setError('A descrição do evento deve ter no mínimo 10 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Map contribution type to category name defined in backend seed
      const catMapping: Record<string, string> = {
        donation: 'food',
        time_impact: 'education',
        content_impact: 'community' // or education, depends on context
      };
      const targetCatName = catMapping[formData.contributionType];
      const category = categories.find(c => c.name === targetCatName) || categories[0];

      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : new Date(new Date(formData.startDate).getTime() + 4 * 60 * 60 * 1000).toISOString(),
        impactCategoryId: category?.id || '00000000-0000-0000-0000-000000000000',
        contributionQuantity: Number(formData.contributionQuantity)
      };

      await apiFetch('/reservations', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Falha ao criar reserva. Verifique sua reputação e dados.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className={styles.main}>
        <Card className={`${styles.stepCard} fade-in`} style={{ textAlign: 'center', padding: '4rem' }}>
          <h2 className={styles.title} style={{ color: 'var(--accent-emerald)' }}>Solicitação Enviada!</h2>
          <p className={styles.subtitle}>Sua reserva foi encaminhada para curadoria. Você receberá um retorno em até 48h.</p>
          <Button variant="primary" onClick={() => router.push('/')}>Voltar para Home</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <header className={`${styles.header} fade-in`}>
        <h1 className={styles.title}>Solicitar <span className={styles.highlight}>Reserva</span></h1>
        <p className={styles.subtitle}>Siga os passos abaixo para submeter seu projeto à nossa curadoria.</p>
      </header>

      {error && <div className={styles.error} style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem',
        background: '#fef2f2',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid #fee2e2'
      }}>{error}</div>}

      <form className={styles.content} onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>01</span>
              <h3>Detalhes do Evento</h3>
            </div>

            <div className={styles.formGrid} style={{ display: 'grid', gap: '1.5rem' }}>
              <div className={styles.inputGroup}>
                <label>Título do Evento</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: Workshop de Robótica"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Tipo de Uso</label>
                <select
                  className={styles.input}
                  value={formData.usageType}
                  onChange={(e) => setFormData({ ...formData, usageType: e.target.value })}
                >
                  <option value="course">Curso / Capacitação</option>
                  <option value="social_event">Evento Social / Comunitário</option>
                  <option value="content_recording">Gravação de Conteúdo</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Descrição do Projeto</label>
                <textarea
                  placeholder="Descreva seu projeto, público-alvo e objetivos..."
                  className={styles.textarea}
                  value={formData.eventDescription}
                  onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                  required
                ></textarea>
              </div>
            </div>
          </Card>

          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>02</span>
              <h3>Sua Contrapartida Social</h3>
            </div>

            <div className={styles.formGrid} style={{ display: 'grid', gap: '1.5rem' }}>
              <div className={styles.inputGroup}>
                <label>Tipo de Impacto</label>
                <div className={styles.options}>
                  <div className={styles.option}>
                    <input
                      type="radio"
                      name="impact"
                      id="donation"
                      checked={formData.contributionType === 'donation'}
                      onChange={() => setFormData({ ...formData, contributionType: 'donation' })}
                    />
                    <label htmlFor="donation">Doação (Cestas/Materiais)</label>
                  </div>
                  <div className={styles.option}>
                    <input
                      type="radio"
                      name="impact"
                      id="teaching"
                      checked={formData.contributionType === 'time_impact'}
                      onChange={() => setFormData({ ...formData, contributionType: 'time_impact' })}
                    />
                    <label htmlFor="teaching">Tempo (Aula/Mentoria)</label>
                  </div>
                  <div className={styles.option}>
                    <input
                      type="radio"
                      name="impact"
                      id="content"
                      checked={formData.contributionType === 'content_impact'}
                      onChange={() => setFormData({ ...formData, contributionType: 'content_impact' })}
                    />
                    <label htmlFor="content">Conteúdo (Vídeo/Digital)</label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.inputGroup}>
                  <label>O que será doado/feito?</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={
                      formData.contributionType === 'donation' ? 'Ex: Cestas Básicas' :
                      formData.contributionType === 'time_impact' ? 'Ex: Aula de Inglês' :
                      'Ex: Vídeo Educativo'
                    }
                    value={formData.contributionSubtype}
                    onChange={(e) => setFormData({ ...formData, contributionSubtype: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>
                    {formData.contributionType === 'time_impact' ? 'Quantidade (Horas)' : 
                     formData.contributionType === 'content_impact' ? 'Quantidade (Vídeos/Postagens)' : 
                     'Quantidade'}
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.contributionQuantity}
                    onChange={(e) => setFormData({ ...formData, contributionQuantity: Number(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>03</span>
              <h3>Agendamento</h3>
            </div>
            <div className={styles.inputGroup}>
              <label>Data e Horário de Início</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </Card>
        </section>

        <aside className={styles.sidebar}>
          <Card className={styles.summaryCard}>
            <h3>Resumo</h3>
            <p className={styles.summaryText}>
              Sua solicitação será analisada com base no seu histórico e potencial de impacto.
            </p>
            <div className={styles.ruleBox}>
              <p>✓ Uso não-comercial</p>
              <p>✓ Comprovação obrigatória</p>
              <p>✓ Termo de responsabilidade</p>
            </div>
            <Button
              type="submit"
              variant="primary"
              className={styles.confirmButton}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Confirmar Reserva'}
            </Button>
          </Card>
        </aside>
      </form>
    </main>
  );
}
