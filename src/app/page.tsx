import styles from "./page.module.css";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* 1. HERO */}
      <section className={`${styles.hero} fade-in`}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Onde Grandes Projetos <span className={styles.impact}>Geram Impacto Real</span>
          </h1>
          <p className={styles.subtitle}>
            Reserve um galpão de alto padrão para suas iniciativas. O custo? Sua contribuição social para a comunidade.
          </p>
          <div className={styles.actions}>
            <Link href="/booking"><Button variant="primary">Solicitar Reserva</Button></Link>
          </div>
          <p className={styles.quickExplain}>
            Infraestrutura premium acessível através de doações, aulas ou produção de conteúdo educativo.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.sphere}></div>
          <div className={styles.orbit}></div>
        </div>
      </section>

      {/* 2. O PROBLEMA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Espaços ociosos não transformam realidades</h2>
          <p className={styles.sectionText}>
            Galpões vazios são oportunidades perdidas. Enquanto estruturas premium ficam fechadas,
            educadores e ONGs lutam por um lugar digno para atuar. É hora de conectar infraestrutura
            de ponta com quem realmente faz a diferença.
          </p>
        </div>
      </section>

      {/* 3. A SOLUÇÃO */}
      <section className={styles.section}>
        <Card className={styles.solutionCard}>
          <h2 className={styles.sectionTitle}>Um Hub de Impacto, Não um Aluguel</h2>
          <p className={styles.sectionText}>
            Criamos uma ponte entre o alto padrão físico e a alta performance social. Aqui, o valor
            de troca é o benefício que você gera para o próximo.
          </p>
          <p className={styles.impactPhrase}>
            "Sua inteligência e recursos são a única moeda que aceitamos."
          </p>
        </Card>
      </section>

      {/* 4. COMO FUNCIONA */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Como Funciona</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <h3>Solicite o Uso</h3>
            <p>Envie seu projeto e diga o que pretende fazer no espaço.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <h3>Defina a Contrapartida</h3>
            <p>Escolha como irá retribuir: doação, aula ou conteúdo.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <h3>Realize a Atividade</h3>
            <p>Utilize a estrutura para executar seu projeto com excelência.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>04</div>
            <h3>Gere Impacto</h3>
            <p>Comprove sua ação social e fortaleça seu legado na comunidade.</p>
          </div>
        </div>
      </section>

      {/* 5. QUEM PODE USAR & 6. QUEM NÃO É PARA */}
      <section className={styles.section}>
        <div className={styles.dualGrid}>
          <Card className={styles.audienceCard}>
            <h3 className={styles.emeraldText}>Quem Pode Usar</h3>
            <ul className={styles.list}>
              <li><strong>Educadores:</strong> Professores focados em capacitação.</li>
              <li><strong>ONGs:</strong> Projetos estruturados e mensuráveis.</li>
              <li><strong>Criadores:</strong> Produtores de conteúdo educativo.</li>
            </ul>
            <p className={styles.curationNote}>* Acesso sujeito a curadoria rigorosa.</p>
          </Card>
          <Card className={styles.negativeCard}>
            <h3 className={styles.redText}>Quem Não é Para</h3>
            <ul className={styles.list}>
              <li>Eventos comerciais ou vendas de produtos.</li>
              <li>Festas privadas ou celebrações pessoais.</li>
              <li>Uso recreativo sem contrapartida social.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 7. FORMAS DE CONTRAPARTIDA */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Formas de Contrapartida</h2>
        <div className={styles.grid}>
          <Card className={styles.featureCard}>
            <div className={styles.icon}>📦</div>
            <h3>Doação</h3>
            <p>Cestas básicas, roupas ou materiais para comunidades locais.</p>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.icon}>🎓</div>
            <h3>Tempo (Ensino)</h3>
            <p>Aulas gratuitas ou mentorias para jovens e adultos da região.</p>
          </Card>
          <Card className={styles.featureCard}>
            <div className={styles.icon}>🎥</div>
            <h3>Conteúdo</h3>
            <p>Produção de materiais educativos distribuídos gratuitamente.</p>
          </Card>
        </div>
      </section>

      {/* 8. IMPACTO GERADO */}
      <section className={styles.section}>
        <div className={styles.impactBox}>
          <h2 className={styles.sectionTitle}>Impacto na Região</h2>
          <p className={styles.sectionText}>Transformamos o espaço físico em progresso humano em Sapucaí Mirim.</p>
          <ProgressBar progress={85} label="Metas de Educação 2024" subLabel="850/1000 horas" />
          <div className={styles.impactStats}>
            <div>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Famílias Beneficiadas</span>
            </div>
            <div>
              <span className={styles.statValue}>12k</span>
              <span className={styles.statLabel}>Refeições Doadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SOBRE O ESPAÇO */}
      <section className={styles.section}>
        <div className={styles.spaceContainer}>
          <div className={styles.spaceInfo}>
            <h2 className={styles.sectionTitle}>Infraestrutura Premium</h2>
            <p className={styles.sectionText}>
              Um ambiente desenhado para o alto desempenho. 500m² com acústica tratada,
              iluminação profissional e internet de alta velocidade.
            </p>
            <ul className={styles.specs}>
              <li>✓ Climatização Central</li>
              <li>✓ Estúdio de Gravação</li>
              <li>✓ Área de Workshop</li>
              <li>✓ Lounge de Networking</li>
            </ul>
          </div>
          <div className={styles.spaceVisual}>
            <div className={styles.visualMockup}></div>
          </div>
        </div>
      </section>

      {/* 10. PROVA / CONFIANÇA & 11. SOBRE NÓS */}
      <section className={styles.section}>
        <Card className={styles.missionCard}>
          <h2 className={styles.sectionTitle}>Nossa Missão</h2>
          <p className={styles.sectionText}>
            Nascemos do desejo de ver nossa região se tornar um polo de educação e inovação social.
            Utilizamos recursos de elite para o bem comum, com total transparência e relatórios públicos de impacto.
          </p>
        </Card>
      </section>

      {/* 12. COMO RESERVAR */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>O Caminho para sua Reserva</h2>
        <div className={styles.reservationSteps}>
          <div className={styles.resStep}>
            <span className={styles.dot}></span>
            <p>Escolha a data no calendário</p>
          </div>
          <div className={styles.resStep}>
            <span className={styles.dot}></span>
            <p>Descreva seu projeto de uso</p>
          </div>
          <div className={styles.resStep}>
            <span className={styles.dot}></span>
            <p>Selecione a contrapartida</p>
          </div>
          <div className={styles.resStep}>
            <span className={styles.dot}></span>
            <p>Aguarde a aprovação (48h)</p>
          </div>
        </div>
      </section>

      {/* 13. CALL TO ACTION FINAL */}
      <section className={styles.finalCta}>
        <h2 className={styles.ctaTitle}>Transforme seu projeto em impacto agora.</h2>
        <p className={styles.ctaSub}>O espaço está pronto. Só falta você.</p>
        <Link href="/booking"><Button variant="primary" className={styles.hugeButton}>Solicitar Minha Vaga</Button></Link>
      </section>

      {/* 13.5. LOCALIZAÇÃO */}
      <section id="location" className={styles.locationSection}>
        <h2 className={styles.sectionTitleCenter}>Onde Estamos</h2>
        <div className={styles.locationGrid}>
          <div className={styles.locationInfo}>
            <Card className={styles.addressBox}>
              <h3>Endereço</h3>
              <p>
                Av. Pres. Roosevelt, 78<br />
                São Francisco, Niterói - RJ<br />
                CEP: 24360-066
              </p>
            </Card>

            <div className={styles.howToArrive}>
              <h4>Como Chegar</h4>
              <p>
                Localizado no coração de São Francisco, nosso hub é facilmente acessível
                por transporte público e possui estacionamento conveniado próximo.
              </p>
              <p>
                <strong>De carro:</strong> Acesso principal pela Av. Quintino Bocaiúva,
                entrando na Av. Pres. Roosevelt logo após o McDonald's.
              </p>
              <p>
                <strong>De ônibus:</strong> Linhas que passam pela orla de São Francisco
                param a poucos metros da nossa entrada.
              </p>
            </div>


          </div>

          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14699.837327113106!2d-43.1035489516999!3d-22.9148708179806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x998401e9471b0b%3A0x91ab5a7621c26abf!2sAv.%20Pres.%20Roosevelt%2C%2078%20-%20S%C3%A3o%20Francisco%2C%20Niter%C3%B3i%20-%20RJ%2C%2024360-066!5e0!3m2!1spt-BR!2sbr!4v1778424367092!5m2!1spt-BR!2sbr"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Localização"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Dúvidas Frequentes</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>Preciso pagar algo?</h4>
            <p>Financeiramente, não. Sua moeda de troca é a contrapartida social escolhida.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Como funciona a aprovação?</h4>
            <p>Analisamos a viabilidade técnica e o potencial de impacto social do seu projeto.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Como comprovo a contrapartida?</h4>
            <p>Através de fotos, listas de presença, recibos de doação ou links de conteúdo.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Quem pode reservar?</h4>
            <p>Qualquer pessoa ou entidade que tenha um projeto educacional ou social genuíno.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Aether Impact Hub. Desenvolvido para transformar.</p>
      </footer>
    </main>
  );
}
