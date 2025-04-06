/**
 * Main JavaScript for Islamic Society of Sheboygan Website
 * 
 * Includes:
 * - Prayer Times Calculation & Display
 * - Dynamic Elements
 * - User Interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializePrayerTimes();
  initializeEvents();
  initializeAnimations();
  initializeNavigation();
  
  // Add any other initialization functions here
});

/**
 * Prayer Times Component
 * Uses the Aladhan API to fetch and display prayer times
 */
function initializePrayerTimes() {
  const nextPrayerContainer = document.getElementById('next-prayer-container');
  
  // Prayer names mapping
  const prayerNames = {
    'fajr': 'Fajr',
    'sunrise': 'Sunrise',
    'dhuhr': 'Dhuhr',
    'asr': 'Asr',
    'maghrib': 'Maghrib',
    'isha': 'Isha'
  };
  
  // Get the date in Sheboygan's timezone (Central Time)
  const sheboyganDate = getSheboyganDate();
  const year = sheboyganDate.getFullYear();
  const month = sheboyganDate.getMonth() + 1;
  const day = sheboyganDate.getDate();
  
  // Update the Hijri date on the prayer times page
  updateHijriDate(year, month, day);
  
  // Get prayer times settings from the site data
  const prayerSettings = window.siteData?.prayer_times?.settings || {
    method: 'ISNA',
    asr_method: 'Standard',
    dst: true
  };
  
  const adjustments = window.siteData?.prayer_times?.adjustments || {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0
  };

  // Map calculation methods to API method numbers
  const methodMap = {
    'ISNA': 2,
    'MWL': 3,
    'Egyptian': 5,
    'Karachi': 4,
    'Makkah': 4
  };

  // Get the API method number
  const apiMethod = methodMap[prayerSettings.method] || 2;
  
  // Define mock prayer times as fallback in case API fails
  const mockPrayerTimes = {
    'fajr': '05:15 AM',
    'sunrise': '06:30 AM',
    'dhuhr': '12:30 PM',
    'asr': '03:45 PM',
    'maghrib': '08:00 PM',
    'isha': '09:30 PM'
  };
  
  const prayerTable = document.getElementById('prayer-times-table');
  
  // Try to get data from cache first
  const cachedData = localStorage.getItem('prayerTimes');
  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      const cachedDate = parsedData.date;
      const currentDate = `${year}-${month}-${day}`;
      
      console.log(`Cached date: ${cachedDate}, Current date: ${currentDate}`);
      
      // Use cached data only if it's from today
      if (cachedDate === currentDate) {
        console.log('Using cached prayer times');
        updateNextPrayer(parsedData.times);
        
        if (prayerTable) {
          populatePrayerTimesTable(prayerTable, parsedData.times);
        }
        
        // Still continue to fetch from API to ensure latest data
      }
    } catch (e) {
      console.error('Error parsing cached prayer times:', e);
      // Continue to fetch from API
    }
  }
  
  // Format date parts correctly for API
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  
  console.log(`Fetching prayer times for ${year}-${formattedMonth}-${formattedDay} using method ${apiMethod}`);
  
  // Use the Aladhan API to fetch prayer times
  fetch(`https://api.aladhan.com/v1/timingsByCity/${year}-${formattedMonth}-${formattedDay}?city=Sheboygan&country=USA&method=${apiMethod}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.code === 200) {
        const times = data.data.timings;
        
        // Convert times to 12-hour format and apply adjustments
        const formattedTimes = {};
        Object.keys(times).forEach(prayer => {
          if (times[prayer]) {
            // Parse the time from the API response
            const [hours, minutes] = times[prayer].split(':').map(Number);
            
            // Create a date object for today with the prayer time
            const date = new Date();
            date.setHours(hours, minutes + (adjustments[prayer] || 0));
            
            // Format the adjusted time
            formattedTimes[prayer] = formatTime12Hour(date);
          }
        });

        // Cache the results
        const cacheData = {
          date: `${year}-${month}-${day}`,
          times: formattedTimes
        };
        localStorage.setItem('prayerTimes', JSON.stringify(cacheData));
        
        // Update the UI
        updateNextPrayer(formattedTimes);
        
        if (prayerTable) {
          populatePrayerTimesTable(prayerTable, formattedTimes);
        }
      } else {
        console.error('API returned error:', data);
        fallbackToMockData();
      }
    })
    .catch(error => {
      console.error('Error fetching prayer times:', error);
      fallbackToMockData();
    });
  
  // Helper function to use mock data as fallback
  function fallbackToMockData() {
    console.log("Using fallback prayer time data");
    
    if (nextPrayerContainer) {
      updateNextPrayer(mockPrayerTimes);
    }
    
    if (prayerTable) {
      // Clear any existing rows first
      const tbody = prayerTable.querySelector('tbody');
      if (tbody) {
        tbody.innerHTML = '';
        populatePrayerTimesTable(prayerTable, mockPrayerTimes);
      }
    }
  }
  
  // Helper function to convert 24h format from API to 12h format
  function formatTime12Hour(time24) {
    if (!time24) return '';
    
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }
}

/**
 * Calculates and displays the next prayer time
 */
function updateNextPrayer(times) {
  const now = new Date();
  const nextPrayerName = document.getElementById('next-prayer-name');
  const nextPrayerTime = document.getElementById('next-prayer-time');
  
  if (!nextPrayerName || !nextPrayerTime) return;
  
  let nextPrayer = null;
  let nextPrayerDateTime = null;
  
  // Convert prayer times to Date objects for comparison
  const prayerDateTimes = {};
  for (const prayer in times) {
    const timeParts = times[prayer].match(/(\d+):(\d+) ([AP]M)/);
    if (!timeParts) continue;
    
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const isPM = timeParts[3] === 'PM';
    
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    const prayerDate = new Date(now);
    prayerDate.setHours(hours, minutes, 0, 0);
    
    prayerDateTimes[prayer] = prayerDate;
    
    // Find the next prayer
    if (prayerDate > now && (!nextPrayerDateTime || prayerDate < nextPrayerDateTime)) {
      nextPrayer = prayer;
      nextPrayerDateTime = prayerDate;
    }
  }
  
  // If no next prayer found today, the next prayer is Fajr tomorrow
  if (!nextPrayer) {
    nextPrayer = 'fajr';
    nextPrayerDateTime = new Date(now);
    nextPrayerDateTime.setDate(nextPrayerDateTime.getDate() + 1);
    const fajrTime = times['fajr'].match(/(\d+):(\d+) ([AP]M)/);
    if (fajrTime) {
      let hours = parseInt(fajrTime[1]);
      const minutes = parseInt(fajrTime[2]);
      const isPM = fajrTime[3] === 'PM';
      
      if (isPM && hours < 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
      
      nextPrayerDateTime.setHours(hours, minutes, 0, 0);
    }
  }
  
  // Update the UI
  if (nextPrayer && nextPrayerDateTime) {
    nextPrayerName.textContent = nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1);
    nextPrayerTime.textContent = formatTime(nextPrayerDateTime);
    
    // Calculate countdown
    const countdown = document.createElement('span');
    countdown.className = 'countdown ms-2';
    countdown.textContent = `(${calculateCountdown(now, nextPrayerDateTime)})`;
    nextPrayerTime.appendChild(countdown);
    
    // Update the countdown every minute
    setInterval(() => {
      const now = new Date();
      countdown.textContent = `(${calculateCountdown(now, nextPrayerDateTime)})`;
    }, 60000);
  } else {
    nextPrayerName.textContent = 'Prayer times unavailable';
    nextPrayerTime.textContent = '';
  }
}

/**
 * Format time in 12-hour format
 */
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Calculate time difference as a countdown string
 */
function calculateCountdown(current, target) {
  const diff = target - current;
  
  // If the date has passed
  if (diff <= 0) {
    return 'Now';
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Populate the prayer times table with data
 */
function populatePrayerTimesTable(table, times) {
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  
  // Clear any existing rows first
  tbody.innerHTML = '';
  
  const prayerNames = {
    'fajr': 'Fajr',
    'sunrise': 'Sunrise',
    'dhuhr': 'Dhuhr',
    'asr': 'Asr',
    'maghrib': 'Maghrib',
    'isha': 'Isha'
  };
  
  for (const prayer in prayerNames) {
    if (times[prayer]) {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = prayerNames[prayer];
      row.appendChild(nameCell);
      
      const timeCell = document.createElement('td');
      timeCell.textContent = times[prayer];
      row.appendChild(timeCell);
      
      tbody.appendChild(row);
    }
  }
}

/**
 * Events Calendar Functionality
 */
function initializeEvents() {
  // This would handle the initialization of a calendar component
  // such as FullCalendar.js if used on the events page
  const calendarContainer = document.getElementById('events-calendar');
  
  if (!calendarContainer) return;
  
  // In a full implementation, FullCalendar would be initialized here
  // For now, we'll just add a message
  calendarContainer.innerHTML = '<div class="alert alert-info">Calendar will load here dynamically</div>';
}

/**
 * Initialize animations for elements as they scroll into view
 */
function initializeAnimations() {
  // Add animation classes when elements scroll into view
  const animatedElements = document.querySelectorAll('.card, .section-title, .program-icon');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animatedElements.forEach(element => {
      element.classList.add('fade-in');
    });
  }
}

/**
 * Initialize navigation and menu functionality
 */
function initializeNavigation() {
  // Highlight the current page in the navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath) && linkPath !== '/') {
      link.classList.add('active');
      
      // If it's in a dropdown, activate the parent as well
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
          dropdownToggle.classList.add('active');
        }
      }
    }
  });
}

/**
 * Add to Calendar functionality
 */
function addToCalendar(event) {
  // This would handle the "Add to Calendar" functionality
  // In a full implementation, this would generate and download iCal files
  // or create the correct links for Google Calendar, etc.
  console.log('Add to calendar:', event);
}

/**
 * Get the current date in Sheboygan's time zone (Central Time)
 * This ensures prayer times are always calculated for the correct local time
 * regardless of where the user is accessing the site from
 */
function getSheboyganDate() {
  try {
    // Create formatter for Central Time
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    
    // Get date parts in Central Time
    const parts = formatter.formatToParts(new Date());
    const dateParts = {};
    parts.forEach(part => {
      if (part.type !== 'literal') {
        dateParts[part.type] = parseInt(part.value);
      }
    });
    
    // Return date object (still in local timezone but with CT values)
    const ctDate = new Date();
    ctDate.setFullYear(dateParts.year);
    ctDate.setMonth(dateParts.month - 1); // month is 0-based
    ctDate.setDate(dateParts.day);
    ctDate.setHours(dateParts.hour);
    ctDate.setMinutes(dateParts.minute);
    ctDate.setSeconds(dateParts.second);
    
    return ctDate;
  } catch (e) {
    console.error('Error getting Sheboygan date:', e);
    return new Date(); // Fallback to browser local time
  }
}

/**
 * Update the Hijri date on the prayer times page
 * Uses the Aladhan API to convert Gregorian to Hijri date
 */
function updateHijriDate(year, month, day) {
  const hijriElement = document.getElementById('today-date-hijri');
  const gregorianElement = document.getElementById('today-date-gregorian');
  
  if (!hijriElement && !gregorianElement) return;
  
  // Update Gregorian date display IMMEDIATELY with Central Time indicator
  if (gregorianElement) {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Chicago'
    };
    
    try {
      gregorianElement.textContent = `${new Date(year, month-1, day).toLocaleDateString('en-US', options)} (Central Time)`;
    } catch (e) {
      console.error('Error formatting Gregorian date:', e);
      gregorianElement.textContent = `${month}/${day}/${year} (Central Time)`;
    }
  }
  
  // Set fallback text IMMEDIATELY, then update if API succeeds
  if (hijriElement) {
    // Set fallback text immediately
    const fallbackDate = new Date(year, month-1, day);
    hijriElement.textContent = `Hijri date for ${fallbackDate.toLocaleDateString()}`;
    
    console.log(`Fetching Hijri date for ${day}-${month}-${year}`);
    
    // Format date correctly for API: DD-MM-YYYY
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    
    fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDay}-${formattedMonth}-${year}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.code === 200 && data.data) {
          const hijri = data.data.hijri;
          hijriElement.textContent = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
          console.log('Successfully updated Hijri date');
        } else {
          console.error("Unexpected API response for Hijri date:", data);
          // Fallback already set
        }
      })
      .catch(error => {
        console.error("Failed to fetch Hijri date:", error);
        // Fallback already set
      });
  }
}
