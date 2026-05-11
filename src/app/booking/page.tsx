'use client';

import { useState, useEffect } from 'react';
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

  const [formData, setFormData] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
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
      } catch (err: any) {
        console.error('Failed to load categories', err);
        setError(`Erro de conexão: ${err.message}. Verifique o servidor.`);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  async function handleSubmit(e?: React.FormEvent | React.MouseEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    if (categories.length === 0) {
      setError('O sistema ainda está carregando ou o servidor está offline.');
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      setError('Por favor, selecione as datas e horários de início e término.');
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.eventDescription.length < 10) {
      setError('A descrição do evento deve ter no mínimo 10 caracteres.');
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const catMapping: Record<string, string> = {
        donation: 'food',
        time_impact: 'education',
        content_impact: 'community'
      };
      const targetCatName = catMapping[formData.contributionType];
      const category = categories.find(c => c.name === targetCatName) || categories[0];

      const combinedStart = `${formData.startDate}T${formData.startTime}`;
      const combinedEnd = `${formData.endDate}T${formData.endTime}`;
      
      const startDateObj = new Date(combinedStart);
      const endDateObj = new Date(combinedEnd);

      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        throw new Error('Data ou horário inválido.');
      }

      if (endDateObj <= startDateObj) {
        throw new Error('A data de término deve ser posterior à data de início.');
      }

      const payload = {
        ...formData,
        startDate: startDateObj.toISOString(),
        endDate: endDateObj.toISOString(),
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
      setError(err.message || 'Falha ao criar reserva.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className={styles.main}>
        <div className={`${styles.formContainer} fade-in`} style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <h2 className={styles.title} style={{ color: 'var(--accent-emerald)' }}>Solicitado!</h2>
          <p className={styles.subtitle}>Sua reserva foi encaminhada para curadoria. Retorno em até 48h.</p>
          <div style={{ marginTop: '2rem' }}>
            <Button variant="primary" onClick={() => router.push('/')}>Voltar para Home</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <header className={`${styles.header} fade-in`}>
        <h1 className={styles.title}>Nova <span className={styles.highlight}>Reserva</span></h1>
        <p className={styles.subtitle}>Processo simplificado de curadoria de impacto.</p>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <form className={`${styles.formContainer} fade-in`} noValidate>
        {/* Step 1 */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span className={styles.stepNum}>1</span>
            <h3>Evento</h3>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Título do Projeto</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Workshop de Robótica"
              value={formData.eventTitle}
              onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Tipo de Uso</label>
              <select
                className={styles.input}
                value={formData.usageType}
                onChange={(e) => setFormData({ ...formData, usageType: e.target.value })}
              >
                <option value="course">Curso / Capacitação</option>
                <option value="social_event">Evento Social</option>
                <option value="content_recording">Gravação</option>
              </select>
            </div>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Data e Horário de Início</label>
                <div className={styles.dateTimeRow}>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                  <input
                    type="time"
                    className={styles.input}
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Data e Horário de Término</label>
                <div className={styles.dateTimeRow}>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                  <input
                    type="time"
                    className={styles.input}
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Objetivos do Impacto</label>
            <textarea
              placeholder="O que você pretende alcançar com este uso?"
              className={styles.textarea}
              value={formData.eventDescription}
              onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
            ></textarea>
          </div>
        </section>

        {/* Step 2 */}
        <section className={styles.section} style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '2rem' }}>
          <div className={styles.sectionTitle}>
            <span className={styles.stepNum}>2</span>
            <h3>Contrapartida</h3>
          </div>

          <div className={styles.inputGroup}>
            <label>Tipo de Contribuição</label>
            <div className={styles.options}>
              <div className={styles.option}>
                <input
                  type="radio"
                  name="impact"
                  id="donation"
                  checked={formData.contributionType === 'donation'}
                  onChange={() => setFormData({ ...formData, contributionType: 'donation' })}
                />
                <label htmlFor="donation">Doação</label>
              </div>
              <div className={styles.option}>
                <input
                  type="radio"
                  name="impact"
                  id="teaching"
                  checked={formData.contributionType === 'time_impact'}
                  onChange={() => setFormData({ ...formData, contributionType: 'time_impact' })}
                />
                <label htmlFor="teaching">Tempo</label>
              </div>
              <div className={styles.option}>
                <input
                  type="radio"
                  name="impact"
                  id="content"
                  checked={formData.contributionType === 'content_impact'}
                  onChange={() => setFormData({ ...formData, contributionType: 'content_impact' })}
                />
                <label htmlFor="content">Conteúdo</label>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>O que será feito?</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Cestas Básicas"
                value={formData.contributionSubtype}
                onChange={(e) => setFormData({ ...formData, contributionSubtype: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Quantidade</label>
              <input
                type="number"
                className={styles.input}
                value={formData.contributionQuantity}
                onChange={(e) => setFormData({ ...formData, contributionQuantity: Number(e.target.value) })}
                min="1"
              />
            </div>
          </div>
        </section>

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={handleSubmit}
            variant="primary"
            className={styles.confirmButton}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Solicitar Reserva'}
          </Button>
          <p className={styles.subtitle} style={{ fontSize: '0.85rem' }}>
            Sujeito à aprovação do comitê de ética e impacto.
          </p>
        </div>
      </form>
    </main>
  );
}
