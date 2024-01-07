function getUserLocale() {
    if (navigator.language) {
      return navigator.language;
    } else {
      return 'en-US';
    }
  }

export function formatRelativeTime(createdAt: string) {
    const currentDate = new Date();
    const pastDate = new Date(createdAt);
    const locale = getUserLocale();
    // Calculate the time difference in seconds
    // @ts-ignore
    const secondsAgo = Math.floor((currentDate - pastDate) / 1000);
  
    // Create a RelativeTimeFormat object
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
    if (secondsAgo < 60) {
      return rtf.format(-secondsAgo, 'second');
    }
  
    // Calculate the time difference in minutes
    const minutesAgo = Math.floor(secondsAgo / 60);
  
    if (minutesAgo < 60) {
      return rtf.format(-minutesAgo, 'minute');
    }
  
    // Calculate the time difference in hours
    const hoursAgo = Math.floor(minutesAgo / 60);
  
    if (hoursAgo < 24) {
      return rtf.format(-hoursAgo, 'hour');
    }
  
    // Calculate the time difference in days
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (daysAgo < 7) {
      return rtf.format(-daysAgo, 'day');
    }
  
    // Calculate the time difference in weeks
    const weeksAgo = Math.floor(daysAgo / 7);
  
    return rtf.format(-weeksAgo, 'week');
  }