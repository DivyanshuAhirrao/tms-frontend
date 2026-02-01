import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.error}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message || "An error occurred"}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.retryBtn}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
