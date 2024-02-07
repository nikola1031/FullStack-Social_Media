import { formatRelativeTime } from "../../../utils/timeAgoFormatter";
import "./Time.css";

interface TimeProps {
    time: string
}

export default function Time({time}: TimeProps) {
  return (
    <time className="time">
        {formatRelativeTime(time)}
    </time>
  )
}
