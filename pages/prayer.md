---
layout: page
title: "Prayer"
subtitle: "Prayer information for Islamic Society of Sheboygan"
permalink: /prayer/
---

<script>
  // Make prayer times settings available to JavaScript
  window.siteData = {
    prayer_times: {{ site.data.prayer_times | jsonify }}
  };
</script>

<div class="prayer-times-section py-4">
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-header bg-primary text-white">
          <h3 class="card-title mb-0">Today's Prayer Times <small class="text-light">(Central Time)</small></h3>
        </div>
        <div class="card-body">
          <div class="today-date text-center mb-3">
            <h5 id="today-date-hijri">Loading Hijri date...</h5>
            <p id="today-date-gregorian">Loading date...</p>
          </div>
          <div class="alert alert-info mb-3 text-center small">
            <i class="fas fa-info-circle me-1"></i> Prayer times are calculated for Sheboygan, WI using the ISNA calculation method.
          </div>
          <table class="table prayer-times-table" id="prayer-times-table">
            <thead>
              <tr>
                <th>Prayer</th>
                <th>Time (CT)</th>
              </tr>
            </thead>
            <tbody>
              <!-- Prayer times will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-header bg-primary text-white">
          <h3 class="card-title mb-0">Jumu'ah Prayer</h3>
        </div>
        <div class="card-body">
          <div class="jumu-ah-info text-center">
            <p class="lead">Friday Prayer (Jumu'ah)</p>
            {% if site.data.prayer_times.jumua_times[0] %}
              {% assign time = site.data.prayer_times.jumua_times[0].time %}
              {% assign hours = time | split: ":" | first | plus: 0 %}
              {% assign minutes = time | split: ":" | last | plus: 0 %}
              {% assign ampm = hours | modulo: 24 | plus: 0 | divided_by: 12 | plus: 0 | modulo: 2 | plus: 0 | replace: "0", "AM" | replace: "1", "PM" %}
              {% assign hour12 = hours | modulo: 12 | plus: 0 | replace: "0", "12" %}
              <h2 class="display-6 mb-3">{{ hour12 }}:{{ minutes | prepend: "00" | slice: -2, 2 }} {{ ampm }}</h2>
              <p>Khutbah starts promptly at {{ hour12 }}:{{ minutes | prepend: "00" | slice: -2, 2 }} {{ ampm }} followed by prayer.</p>
              {% if site.data.prayer_times.jumua_times[0].notes %}
                <p>{{ site.data.prayer_times.jumua_times[0].notes }}</p>
              {% endif %}
            {% endif %}
            <p>Please arrive early to secure a spot in the prayer hall.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="/assets/js/prayer-times.js"></script>
