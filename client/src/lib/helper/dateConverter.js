export default function getRelativeTimeString(dateString) {
    const date = new Date(dateString);
    const now = new Date(); // current date and time
    const diffInSeconds = Math.floor((now - date) / 1000);// time difference in seconds
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];
  
    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(diffInSeconds / interval.seconds);//counting second/minute/hour/day/month/year from the current time
      
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  }