import styles from './TextBlock.module.css';

export default function TextBlock({ title, paragraphs }) {
  return (
    <div className={styles.textBlock} >
      <h2>{title}</h2>
      {paragraphs.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
