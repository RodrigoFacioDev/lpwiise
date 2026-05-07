import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import styles from "./reputation.module.css";

const history = [
  { id: 1, action: "Mentored at Zen Workshop", impact: "+50 pts", date: "2 days ago" },
  { id: 2, action: "Donated tools to Garden", impact: "+120 pts", date: "1 week ago" },
  { id: 3, action: "Cleaned Meditation Hall", impact: "+30 pts", date: "2 weeks ago" },
];

export default function ReputationPage() {
  return (
    <main className={styles.main}>
      <header className={`${styles.header} fade-in`}>
        <h1 className={styles.title}>Your <span className={styles.highlight}>Legacy</span></h1>
        <p className={styles.subtitle}>Tracking your social impact in the Aether.</p>
      </header>

      <div className={styles.stats}>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Current Tier</span>
          <h2 className={styles.tierName}>Emerald</h2>
          <ProgressBar progress={75} label="Next Tier: Obsidian" subLabel="750/1000 pts" />
        </Card>

        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Total Impact</span>
          <h2 className={styles.statValue}>2,450</h2>
          <p className={styles.statSubText}>Points earned since joining</p>
        </Card>
      </div>

      <section className={styles.history}>
        <h3 className={styles.sectionTitle}>Impact History</h3>
        <div className={styles.historyList}>
          {history.map((item) => (
            <Card key={item.id} className={styles.historyItem} padding="1.5rem">
              <div className={styles.historyContent}>
                <div>
                  <h4 className={styles.actionName}>{item.action}</h4>
                  <span className={styles.historyDate}>{item.date}</span>
                </div>
                <span className={styles.impactValue}>{item.impact}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
