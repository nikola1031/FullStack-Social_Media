import { formatRelativeTime } from "../../../utils/timeAgoFormatter";
import styles from "./Time.module.css";

interface TimeProps {
    time: string
}

export default function Time({time}: TimeProps) {
  return (
    <time className={styles["time"]}>
        {formatRelativeTime(time)}
    </time>
  )
}
